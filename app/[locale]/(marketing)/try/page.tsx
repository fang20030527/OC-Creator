import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { TryScenePage } from "@/components/try-scene-page";
import type { Locale } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tryScene.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function TryPage() {
  return <TryScenePage />;
}
