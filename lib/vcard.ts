import { PROFILE } from "@/app/constants";

export function buildProfileVCard(): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${PROFILE.name}`,
    `ORG:${PROFILE.affiliationName}`,
    "TITLE:Research Officer",
    `EMAIL:${PROFILE.primaryEmail}`,
    `URL:${PROFILE.websiteCanonicalUrl}`,
    `URL:${PROFILE.linkedInUrl}`,
    "END:VCARD",
  ].join("\n");
}
