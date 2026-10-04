import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { PROFILE } from "@/app/constants";
import {
  assessRecaptchaToken,
  isRecaptchaConfigured,
  RECAPTCHA_CONTACT_ACTION,
} from "@/lib/recaptcha";
import { getServiceLabelMap } from "@/lib/services";

const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const SERVICE_LABELS = getServiceLabelMap();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  recaptchaToken?: unknown;
};

function asTrimmedString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) {
    return null;
  }
  return trimmed;
}

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP environment variables are not configured.");
    return NextResponse.json(
      { success: false, message: "Email is not configured on the server." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = asTrimmedString(payload.name, MAX_FIELD_LENGTH);
  const email = asTrimmedString(payload.email, MAX_FIELD_LENGTH);
  const service = asTrimmedString(payload.service, MAX_FIELD_LENGTH);
  const message = asTrimmedString(payload.message, MAX_MESSAGE_LENGTH);

  if (!name || !email || !service || !message) {
    return NextResponse.json(
      { success: false, message: "Please fill in all fields." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const serviceLabel = SERVICE_LABELS.get(service);
  if (!serviceLabel) {
    return NextResponse.json(
      { success: false, message: "Please select a valid service." },
      { status: 400 },
    );
  }

  if (isRecaptchaConfigured()) {
    const token = typeof payload.recaptchaToken === "string" ? payload.recaptchaToken : null;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't confirm you're human. Please refresh the page and try again.",
        },
        { status: 400 },
      );
    }

    try {
      const verdict = await assessRecaptchaToken(token, RECAPTCHA_CONTACT_ACTION);
      if (!verdict.ok) {
        console.warn(`Contact form: reCAPTCHA rejected submission. ${verdict.reason}`);
        return NextResponse.json(
          {
            success: false,
            message: "We couldn't confirm you're human. Please refresh the page and try again.",
          },
          { status: 400 },
        );
      }
    } catch (err) {
      // Assessment API unreachable/misconfigured: let the message through rather
      // than lock out legitimate visitors, but log loudly so it gets fixed.
      console.error("Contact form: reCAPTCHA assessment failed, accepting without verification.", err);
    }
  }

  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject = `${serviceLabel} enquiry from ${name}`;
  const text = [
    message,
    "",
    "---",
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${serviceLabel}`,
    `Sent from the ${PROFILE.websiteLabel} contact form.`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"${name} via ${PROFILE.websiteLabel}" <${SMTP_USER}>`,
      to: PROFILE.primaryEmail,
      replyTo: `"${name}" <${email}>`,
      subject,
      text,
    });
  } catch (err) {
    console.error("Contact form: failed to send email.", err);
    return NextResponse.json(
      { success: false, message: "Failed to send your message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, message: "Message sent." });
}
