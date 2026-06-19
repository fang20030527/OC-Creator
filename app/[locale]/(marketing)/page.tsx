import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LandingPage } from "@/components/landing-page";
import type { Locale } from "@/i18n.config";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return generatePageMetadata({
    locale,
    path: "",
    title: t("home.title"),
    description: t("home.description"),
  });
}

export default function Home() {
  return <LandingPage />;
}
