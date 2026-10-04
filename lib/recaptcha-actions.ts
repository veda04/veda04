// Action names shared between the server-side assessment (lib/recaptcha.ts,
// which pulls in the heavy @google-cloud/recaptcha-enterprise SDK and must
// stay server-only) and client components that execute the reCAPTCHA widget.
// This file has zero dependencies so it is safe to import from client code.
export const RECAPTCHA_CONTACT_ACTION = "CONTACT_FORM";
