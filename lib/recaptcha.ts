import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

export { RECAPTCHA_CONTACT_ACTION } from "@/lib/recaptcha-actions";

// Scores range 0.0 (likely bot) to 1.0 (likely human); 0.5 is Google's
// recommended starting threshold for form protection.
const SCORE_THRESHOLD = 0.5;

// The gRPC client is expensive to construct, so it is cached per server instance.
let client: RecaptchaEnterpriseServiceClient | null = null;

function getClient(): RecaptchaEnterpriseServiceClient {
  client ??= new RecaptchaEnterpriseServiceClient();
  return client;
}

export function isRecaptchaConfigured(): boolean {
  return Boolean(
    process.env.RECAPTCHA_PROJECT_ID && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  );
}

export type RecaptchaVerdict =
  | { ok: true; score: number }
  | { ok: false; reason: string };

/**
 * Creates a reCAPTCHA Enterprise assessment for a client token and decides
 * whether the interaction looks legitimate.
 */
export async function assessRecaptchaToken(
  token: string,
  expectedAction: string,
): Promise<RecaptchaVerdict> {
  const projectId = process.env.RECAPTCHA_PROJECT_ID;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!projectId || !siteKey) {
    return { ok: false, reason: "reCAPTCHA is not configured on the server." };
  }

  const recaptcha = getClient();
  const [response] = await recaptcha.createAssessment({
    parent: recaptcha.projectPath(projectId),
    assessment: {
      event: { token, siteKey },
    },
  });

  if (!response.tokenProperties?.valid) {
    return {
      ok: false,
      reason: `Token invalid: ${response.tokenProperties?.invalidReason ?? "UNKNOWN"}`,
    };
  }

  if (response.tokenProperties.action !== expectedAction) {
    return {
      ok: false,
      reason: `Action mismatch: expected "${expectedAction}", got "${response.tokenProperties.action}".`,
    };
  }

  const score = response.riskAnalysis?.score ?? 0;
  if (score < SCORE_THRESHOLD) {
    return { ok: false, reason: `Score ${score} below threshold ${SCORE_THRESHOLD}.` };
  }

  return { ok: true, score };
}
