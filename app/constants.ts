export const SITE = {
  ownerName: "Veda Salkar",
  brandName: "salkar veda",
  title: "Veda Salkar",
  copyrightSuffix: "All rights reserved.",
} as const;

// Spellings people actually type when searching for Veda Salkar.
// Surfaced in structured data, llms.txt, and visible copy so search and
// answer engines resolve them to the same person.
export const NAME_VARIANTS = [
  "Veda Salkar",
  "Miss Salkar",
  "Vada Salakar",
  "Salkar Veda",
  "Veda04",
] as const;

export const LOCATION = {
  locality: "Huddersfield",
  region: "England",
  country: "GB",
  countryLabel: "United Kingdom",
} as const;

export const PROFILE = {
  name: "Veda Salkar",
  primaryEmail: "salkarveda@gmail.com",
  // Server-only: NEXT_PUBLIC_APP_URL is not NEXT_PUBLIC_-prefixed, so it is
  // undefined in the browser bundle. Client components must use
  // websiteCanonicalUrl instead or they will hydration-mismatch.
  websiteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://www.salkarveda.com",
  websiteCanonicalUrl: "https://www.salkarveda.com",
  websiteLabel: "salkarveda.com",
  linkedInUrl: "https://www.linkedin.com/in/vedasalkar/",
  linkedInDisplay: "linkedin.com/in/vedasalkar/",
  githubLabel: "veda04",
  githubUrl: "https://github.com/veda04",
  orcidLabel: "0009-0005-6084-7769",
  orcidUrl: "https://orcid.org/0009-0005-6084-7769",
  twitterHandle: "@salkarveda",
  affiliationName: "University of Huddersfield",
  affiliationUrl: "https://hud.ac.uk",
  profileImageAlt: "Profile picture of Veda Salkar",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  resume: "/resume",
  work: "/work",
  publications: "/publications",
  blogs: "/blogs",
  contact: "/contact",
} as const;

// Site owner started their career in 2019; used to compute "years of experience" copy.
export const CAREER_START_YEAR = 2019;

export const EXTERNAL_LINKS = {
  cosmokode: "https://cosmokode.com",
} as const;

export const SOCIAL_LINKS = [
  {
    "label": "LinkedIn",
    "url": "https://www.linkedin.com/in/vedasalkar/",
    "handle": "vedasalkar",
    "icon": "Linkedin02Icon"
  },
  {
    "label": "GitHub",
    "url": "https://github.com/veda04",
    "handle": "veda04",
    "icon": "GithubIcon"
  },
  {
    "label": "Gmail",
    "url": "mailto:salkarveda@gmail.com",
    "handle": "salkarveda@gmail.com",
    "icon": "MailAtSign01Icon"
  },
] as const;

export const SOCIAL_HANDLES = {
  linkedIn: "vedasalkar",
  github: "veda04",
} as const;