const toBoolean = (value: string | undefined): boolean =>
  value?.toLowerCase() === "true";

const DEFAULT_APP_URL = "http://localhost:3000";

export const analyticsConfig = {
  enableInDevelopment: toBoolean(process.env.NEXT_PUBLIC_ANALYTICS_ENABLE_IN_DEVELOPMENT),
};

export const websiteConfig = {
  appName: "AI Fandom OC Creator",
  docsName: "AI Fandom OC Creator Docs",
  appUrl: (process.env.NEXT_PUBLIC_APP_URL || DEFAULT_APP_URL).trim(),
};
