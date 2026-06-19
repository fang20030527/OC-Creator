"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  ClipboardList,
  LockKeyhole,
  PenLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/button";

type PromptField = {
  label: string;
  ariaLabel: string;
  value: string;
  rows: number;
};

function buildPromptFields(
  t: ReturnType<typeof useTranslations<"tryScene">>
): PromptField[] {
  return [
    {
      label: t("form.fields.oc.label"),
      ariaLabel: t("form.fields.oc.ariaLabel"),
      value: t("form.fields.oc.value"),
      rows: 4,
    },
    {
      label: t("form.fields.connection.label"),
      ariaLabel: t("form.fields.connection.ariaLabel"),
      value: t("form.fields.connection.value"),
      rows: 4,
    },
    {
      label: t("form.fields.dynamic.label"),
      ariaLabel: t("form.fields.dynamic.ariaLabel"),
      value: t("form.fields.dynamic.value"),
      rows: 4,
    },
    {
      label: t("form.fields.context.label"),
      ariaLabel: t("form.fields.context.ariaLabel"),
      value: t("form.fields.context.value"),
      rows: 3,
    },
    {
      label: t("form.fields.boundaries.label"),
      ariaLabel: t("form.fields.boundaries.ariaLabel"),
      value: t("form.fields.boundaries.value"),
      rows: 3,
    },
  ];
}

function buildMemoryItems(t: ReturnType<typeof useTranslations<"tryScene">>) {
  return [
    t("result.memory.oc"),
    t("result.memory.dynamic"),
    t("result.memory.context"),
    t("result.memory.boundaries"),
  ];
}

function buildTrustItems(t: ReturnType<typeof useTranslations<"tryScene">>) {
  return [
    t("trust.items.private"),
    t("trust.items.onePreview"),
    t("trust.items.approval"),
    t("trust.items.noExplicit"),
  ];
}

export function TryScenePage() {
  const t = useTranslations("tryScene");
  const locale = useLocale();
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isAdultConfirmed, setIsAdultConfirmed] = useState(false);
  const promptFields = buildPromptFields(t);
  const memoryItems = buildMemoryItems(t);
  const trustItems = buildTrustItems(t);

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#211713] dark:bg-[#120d0a] dark:text-[#fff4e8]">
      <main className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:pb-24">
        <a
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-[#6b574d] transition hover:text-[#211713] dark:text-[#c7b09f] dark:hover:text-[#fff4e8]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("back")}
        </a>

        <section className="mt-8 grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#d7c5b7] bg-[#fff8ee] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b5037] dark:border-[#5b4335] dark:bg-[#211713] dark:text-[#d7a96e]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t("eyebrow")}
            </div>
            <h1 className="mt-7 max-w-3xl font-serif text-5xl font-semibold leading-[1] tracking-normal md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f4c43] dark:text-[#c7b09f]">
              {t("description")}
            </p>

            <div className="mt-8 grid gap-3 text-sm text-[#5f4c43] dark:text-[#c7b09f] sm:grid-cols-2">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 border border-[#d7c5b7] bg-[#fffaf4] p-4 dark:border-[#4c382d] dark:bg-[#1c1410]"
                >
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 flex-none text-[#8e5c3d] dark:text-[#d7a96e]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            className="border border-[#d7c5b7] bg-[#fffaf4] p-4 shadow-[12px_12px_0_#d8b28e] dark:border-[#5b4335] dark:bg-[#1c1410] dark:shadow-[12px_12px_0_#5b3b2a]"
            onSubmit={(event) => {
              event.preventDefault();
              setHasGenerated(true);
            }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#e4d7cc] pb-4 dark:border-[#4c382d]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8e5c3d] dark:text-[#d7a96e]">
                  {t("form.eyebrow")}
                </p>
                <h2 className="mt-1 font-serif text-2xl font-semibold">
                  {t("form.title")}
                </h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center border border-[#d7c5b7] bg-[#f4eadf] text-[#6f432e] dark:border-[#5b4335] dark:bg-[#2a1d17] dark:text-[#e0b274]">
                <PenLine className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {promptFields.map((field, index) => (
                <label
                  key={field.label}
                  className={
                    index > 2
                      ? "flex flex-col border border-[#eadccd] bg-[#fffdf8] p-4 dark:border-[#4c382d] dark:bg-[#241812] md:col-span-2"
                      : "flex flex-col border border-[#eadccd] bg-[#fffdf8] p-4 dark:border-[#4c382d] dark:bg-[#241812]"
                  }
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8e5c3d] dark:text-[#d7a96e]">
                    {field.label}
                  </span>
                  <textarea
                    aria-label={field.ariaLabel}
                    className="mt-3 resize-none border border-[#e6d7c8] bg-[#fffaf4] p-3 text-sm leading-6 text-[#43332b] outline-none transition focus:border-[#8e5c3d] dark:border-[#4c382d] dark:bg-[#17100d] dark:text-[#decbbb] dark:focus:border-[#d7a96e]"
                    defaultValue={field.value}
                    rows={field.rows}
                  />
                </label>
              ))}
            </div>

            <label className="mt-4 flex items-start gap-3 border border-[#d7c5b7] bg-[#f5ecdf] p-4 text-sm leading-6 text-[#5f4c43] dark:border-[#4c382d] dark:bg-[#211713] dark:text-[#c7b09f]">
              <input
                checked={isAdultConfirmed}
                className="mt-1 h-4 w-4 accent-[#8e5c3d]"
                onChange={(event) => setIsAdultConfirmed(event.target.checked)}
                type="checkbox"
              />
              <span>{t("form.ageConfirmation")}</span>
            </label>

            <div className="mt-4 flex flex-col justify-between gap-4 border border-[#241812] bg-[#241812] p-4 text-[#fff8ee] dark:border-[#6f4b37] dark:bg-[#120d0a] md:flex-row md:items-center">
              <div>
                <p className="font-serif text-2xl font-semibold">
                  {t("form.generateTitle")}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#e8d5c4]">
                  {t("form.generateDescription")}
                </p>
              </div>
              <Button
                as="button"
                className="bg-[#e0b274] text-[#211713] hover:bg-[#f0c384] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isAdultConfirmed}
                size="lg"
                type="submit"
              >
                <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                {t("form.generateButton")}
              </Button>
            </div>
          </form>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border border-[#d7c5b7] bg-[#fffaf4] p-5 dark:border-[#4c382d] dark:bg-[#1c1410]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#8e5c3d] dark:text-[#d7a96e]">
              <BookOpenText className="h-4 w-4" aria-hidden="true" />
              {hasGenerated ? t("result.sceneEyebrow") : t("placeholder.eyebrow")}
            </div>
            <h2 className="mt-4 font-serif text-3xl font-semibold">
              {hasGenerated ? t("result.sceneTitle") : t("placeholder.title")}
            </h2>
            <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#4e3d35] dark:text-[#decbbb]">
              {hasGenerated ? t("result.sceneText") : t("placeholder.body")}
            </p>
          </div>

          <div className="border border-[#d7c5b7] bg-[#f5ecdf] p-5 dark:border-[#4c382d] dark:bg-[#211713]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#8e5c3d] dark:text-[#d7a96e]">
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
              {t("result.memoryEyebrow")}
            </div>
            <h2 className="mt-4 font-serif text-3xl font-semibold">
              {t("result.memoryTitle")}
            </h2>
            <div className="mt-5 space-y-3">
              {memoryItems.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 border border-[#d7c5b7] bg-[#fffaf4] p-3 text-sm leading-6 text-[#43332b] dark:border-[#4c382d] dark:bg-[#1c1410] dark:text-[#decbbb]"
                >
                  <Check
                    className="mt-1 h-4 w-4 flex-none text-[#3f7368] dark:text-[#91d5c3]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 border border-[#241812] bg-[#241812] p-4 text-[#fff8ee] dark:border-[#6f4b37] dark:bg-[#120d0a]">
              <LockKeyhole className="h-5 w-5 text-[#e0b274]" aria-hidden="true" />
              <p className="mt-3 font-serif text-xl font-semibold">
                {t("save.title")}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#e8d5c4]">
                {t("save.description")}
              </p>
              <Button
                as="a"
                className="mt-4 bg-[#e0b274] text-[#211713] hover:bg-[#f0c384]"
                href={`/${locale}/signup`}
              >
                {t("save.cta")}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
