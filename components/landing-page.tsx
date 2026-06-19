"use client";

import {
  ArrowRight,
  BookOpenText,
  Check,
  Feather,
  FileText,
  LockKeyhole,
  PenLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/button";

type PromptField = {
  label: string;
  value: string;
  ariaLabel: string;
};

type TextCard = {
  title: string;
  body: string;
};

type SectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

function buildPromptFields(
  t: ReturnType<typeof useTranslations<"landing">>
): PromptField[] {
  return [
    {
      label: t("promptFields.oc.label"),
      value: t("promptFields.oc.value"),
      ariaLabel: t("promptFields.oc.ariaLabel"),
    },
    {
      label: t("promptFields.connection.label"),
      value: t("promptFields.connection.value"),
      ariaLabel: t("promptFields.connection.ariaLabel"),
    },
    {
      label: t("promptFields.dynamic.label"),
      value: t("promptFields.dynamic.value"),
      ariaLabel: t("promptFields.dynamic.ariaLabel"),
    },
  ];
}

function buildSteps(t: ReturnType<typeof useTranslations<"landing">>) {
  return [
    {
      title: t("howItWorks.steps.premise.title"),
      body: t("howItWorks.steps.premise.body"),
    },
    {
      title: t("howItWorks.steps.snippet.title"),
      body: t("howItWorks.steps.snippet.body"),
    },
    {
      title: t("howItWorks.steps.memory.title"),
      body: t("howItWorks.steps.memory.body"),
    },
    {
      title: t("howItWorks.steps.save.title"),
      body: t("howItWorks.steps.save.body"),
    },
  ];
}

function buildMemoryCards(
  t: ReturnType<typeof useTranslations<"landing">>
): TextCard[] {
  return [
    {
      title: t("memory.cards.oc.title"),
      body: t("memory.cards.oc.body"),
    },
    {
      title: t("memory.cards.dynamic.title"),
      body: t("memory.cards.dynamic.body"),
    },
    {
      title: t("memory.cards.context.title"),
      body: t("memory.cards.context.body"),
    },
    {
      title: t("memory.cards.boundaries.title"),
      body: t("memory.cards.boundaries.body"),
    },
  ];
}

function buildTrustItems(t: ReturnType<typeof useTranslations<"landing">>) {
  return [
    t("privacy.items.private"),
    t("privacy.items.approval"),
    t("privacy.items.delete"),
    t("privacy.items.rating"),
    t("privacy.items.noPublic"),
    t("privacy.items.noTraining"),
  ];
}

function SectionHeading({ eyebrow, title, description }: SectionCopy) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e5c3d] dark:text-[#d7a96e]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-3xl font-semibold tracking-normal text-[#211713] dark:text-[#fff4e8] md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[#67544a] dark:text-[#c7b09f] md:text-lg">
        {description}
      </p>
    </div>
  );
}

function HeroPreview({
  promptFields,
  t,
}: {
  promptFields: PromptField[];
  t: ReturnType<typeof useTranslations<"landing">>;
}) {
  const memoryItems = [
    t("preview.memoryItems.oc"),
    t("preview.memoryItems.dynamic"),
    t("preview.memoryItems.tone"),
    t("preview.memoryItems.boundary"),
  ];

  return (
    <div className="relative border border-[#d7c5b7] bg-[#fffaf4] p-4 shadow-[12px_12px_0_#d8b28e] dark:border-[#5b4335] dark:bg-[#1c1410] dark:shadow-[12px_12px_0_#5b3b2a]">
      <div className="flex items-center justify-between border-b border-[#e4d7cc] pb-3 dark:border-[#4c382d]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8e5c3d] dark:text-[#d7a96e]">
            {t("preview.eyebrow")}
          </p>
          <p className="mt-1 font-serif text-xl font-semibold text-[#241812] dark:text-[#fff4e8]">
            {t("preview.title")}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center border border-[#d7c5b7] bg-[#f4eadf] text-[#6f432e] dark:border-[#5b4335] dark:bg-[#2a1d17] dark:text-[#e0b274]">
          <Feather className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {promptFields.map((field) => (
          <div
            key={field.label}
            className="border border-[#eadccd] bg-[#fffdf8] p-3 dark:border-[#4c382d] dark:bg-[#241812]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8e5c3d] dark:text-[#d7a96e]">
              {field.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#43332b] dark:text-[#decbbb]">
              {field.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 border border-[#2f211b] bg-[#241812] p-4 text-[#f8efe5] dark:border-[#6f4b37] dark:bg-[#120d0a]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#e0b274]">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          {t("preview.sceneLabel")}
        </div>
        <p className="mt-3 text-sm leading-7">{t("preview.sceneText")}</p>
      </div>

      <div className="mt-4 border border-[#d7c5b7] bg-[#f5ecdf] p-4 dark:border-[#4c382d] dark:bg-[#211713]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#7b5037] dark:text-[#d7a96e]">
          <BookOpenText className="h-4 w-4" aria-hidden="true" />
          {t("preview.memoryLabel")}
        </div>
        <div className="mt-3 grid gap-2 text-sm text-[#43332b] dark:text-[#decbbb] sm:grid-cols-2">
          {memoryItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection({
  promptFields,
  t,
}: {
  promptFields: PromptField[];
  t: ReturnType<typeof useTranslations<"landing">>;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f3eadf] px-5 pb-16 pt-32 dark:bg-[#120d0a] md:pb-20 md:pt-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "url(/noise.webp)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-[#d7c5b7] dark:bg-[#4c382d]" />
      <div className="pointer-events-none absolute inset-y-0 left-[9%] w-px bg-[#e1d0c2] dark:bg-[#2f211b]" />
      <div className="pointer-events-none absolute inset-y-0 right-[9%] w-px bg-[#e1d0c2] dark:bg-[#2f211b]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex items-center gap-2 border border-[#d7c5b7] bg-[#fff8ee] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b5037] dark:border-[#5b4335] dark:bg-[#211713] dark:text-[#d7a96e]">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            {t("hero.badge")}
          </div>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-normal text-[#211713] dark:text-[#fff4e8] md:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f4c43] dark:text-[#c7b09f] md:text-xl">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              as="a"
              href="#try-first-scene"
              size="lg"
              className="bg-[#241812] text-[#fff8ee] hover:bg-[#3a291f] dark:bg-[#e0b274] dark:text-[#120d0a] dark:hover:bg-[#f0c384]"
            >
              <span>{t("common.primaryCta")}</span>
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              as="a"
              href="#privacy"
              variant="outline"
              size="lg"
              className="border-[#cdb9a8] bg-[#fff8ee] text-[#2b1d17] hover:bg-[#f2e3d2] hover:text-[#2b1d17] dark:border-[#5b4335] dark:bg-[#211713] dark:text-[#f8efe5] dark:hover:bg-[#2f211b] dark:hover:text-[#f8efe5]"
            >
              <ShieldCheck className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("common.secondaryCta")}
            </Button>
          </div>
          <div className="mt-7 grid max-w-xl gap-3 text-sm text-[#6b574d] dark:text-[#bda694] sm:grid-cols-3">
            <span>{t("hero.trust.age")}</span>
            <span>{t("hero.trust.rating")}</span>
            <span>{t("hero.trust.noPublic")}</span>
          </div>
        </div>

        <HeroPreview promptFields={promptFields} t={t} />
      </div>
    </section>
  );
}

function TryFirstSceneSection({
  promptFields,
  t,
}: {
  promptFields: PromptField[];
  t: ReturnType<typeof useTranslations<"landing">>;
}) {
  return (
    <section
      id="try-first-scene"
      className="border-y border-[#d7c5b7] bg-[#fffaf4] px-5 py-16 dark:border-[#4c382d] dark:bg-[#17100d] md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e5c3d] dark:text-[#d7a96e]">
            {t("tryFirstScene.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#211713] dark:text-[#fff4e8] md:text-5xl">
            {t("tryFirstScene.title")}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#67544a] dark:text-[#c7b09f]">
            {t("tryFirstScene.description")}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {promptFields.map((field) => (
            <label
              key={field.label}
              className="flex min-h-44 flex-col border border-[#d7c5b7] bg-[#fffdf8] p-4 dark:border-[#4c382d] dark:bg-[#211713]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8e5c3d] dark:text-[#d7a96e]">
                {field.label}
              </span>
              <textarea
                className="mt-4 min-h-24 flex-1 resize-none border border-[#e6d7c8] bg-[#fffaf4] p-3 text-sm leading-6 text-[#43332b] outline-none transition focus:border-[#8e5c3d] dark:border-[#4c382d] dark:bg-[#17100d] dark:text-[#decbbb] dark:focus:border-[#d7a96e]"
                defaultValue={field.value}
                aria-label={field.ariaLabel}
              />
            </label>
          ))}
          <label className="flex min-h-36 flex-col border border-[#d7c5b7] bg-[#fffdf8] p-4 dark:border-[#4c382d] dark:bg-[#211713] md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8e5c3d] dark:text-[#d7a96e]">
              {t("tryFirstScene.contextLabel")}
            </span>
            <textarea
              className="mt-4 min-h-20 flex-1 resize-none border border-[#e6d7c8] bg-[#fffaf4] p-3 text-sm leading-6 text-[#43332b] outline-none transition focus:border-[#8e5c3d] dark:border-[#4c382d] dark:bg-[#17100d] dark:text-[#decbbb] dark:focus:border-[#d7a96e]"
              defaultValue={t("tryFirstScene.contextValue")}
              aria-label={t("tryFirstScene.contextAriaLabel")}
            />
          </label>
          <label className="flex min-h-36 flex-col border border-[#d7c5b7] bg-[#fffdf8] p-4 dark:border-[#4c382d] dark:bg-[#211713]">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8e5c3d] dark:text-[#d7a96e]">
              {t("tryFirstScene.boundariesLabel")}
            </span>
            <textarea
              className="mt-4 min-h-20 flex-1 resize-none border border-[#e6d7c8] bg-[#fffaf4] p-3 text-sm leading-6 text-[#43332b] outline-none transition focus:border-[#8e5c3d] dark:border-[#4c382d] dark:bg-[#17100d] dark:text-[#decbbb] dark:focus:border-[#d7a96e]"
              defaultValue={t("tryFirstScene.boundariesValue")}
              aria-label={t("tryFirstScene.boundariesAriaLabel")}
            />
          </label>
          <div className="flex flex-col justify-between border border-[#241812] bg-[#241812] p-4 text-[#fff8ee] dark:border-[#6f4b37] dark:bg-[#120d0a] md:col-span-3 md:flex-row md:items-center">
            <div>
              <p className="font-serif text-2xl font-semibold">
                {t("tryFirstScene.generateTitle")}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#e8d5c4]">
                {t("tryFirstScene.generateDescription")}
              </p>
            </div>
            <Button
              as="button"
              size="lg"
              className="mt-5 bg-[#e0b274] text-[#211713] hover:bg-[#f0c384] dark:bg-[#f0c384] dark:text-[#120d0a] dark:hover:bg-[#ffd59c] md:mt-0"
            >
              <PenLine className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("common.primaryCta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection({
  steps,
  t,
}: {
  steps: TextCard[];
  t: ReturnType<typeof useTranslations<"landing">>;
}) {
  return (
    <section id="how-it-works" className="bg-[#f7efe5] px-5 py-20 dark:bg-[#120d0a] md:py-28">
      <SectionHeading
        eyebrow={t("howItWorks.eyebrow")}
        title={t("howItWorks.title")}
        description={t("howItWorks.description")}
      />

      <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="min-h-64 border border-[#d7c5b7] bg-[#fffaf4] p-5 dark:border-[#4c382d] dark:bg-[#1c1410]"
          >
            <div className="flex h-9 w-9 items-center justify-center border border-[#c7aa91] bg-[#f2dfc9] font-mono text-sm font-semibold text-[#6c402b] dark:border-[#6f4b37] dark:bg-[#2f211b] dark:text-[#e0b274]">
              {index + 1}
            </div>
            <h3 className="mt-6 font-serif text-2xl font-semibold text-[#211713] dark:text-[#fff4e8]">
              {step.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#67544a] dark:text-[#c7b09f]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MemorySection({
  memoryCards,
  t,
}: {
  memoryCards: TextCard[];
  t: ReturnType<typeof useTranslations<"landing">>;
}) {
  return (
    <section id="memory" className="bg-[#fffaf4] px-5 py-20 dark:bg-[#151a16] md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#3f7368] dark:text-[#91d5c3]">
            {t("memory.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#17211e] dark:text-[#eefbf4] md:text-5xl">
            {t("memory.title")}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#4d635d] dark:text-[#bdd5cd]">
            {t("memory.description")}
          </p>
          <div className="mt-8 border border-[#b9cbc4] bg-[#f8fbf7] p-5 text-sm leading-7 text-[#435b55] dark:border-[#365047] dark:bg-[#1c2823] dark:text-[#bdd5cd]">
            <p className="font-semibold text-[#17211e] dark:text-[#eefbf4]">
              {t("memory.noteTitle")}
            </p>
            <p className="mt-2">{t("memory.noteBody")}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {memoryCards.map((card) => (
            <div
              key={card.title}
              className="min-h-56 border border-[#b9cbc4] bg-[#f8fbf7] p-5 dark:border-[#365047] dark:bg-[#1c2823]"
            >
              <div className="flex h-10 w-10 items-center justify-center border border-[#9bb5ad] bg-[#e1ebe6] text-[#2e635a] dark:border-[#4f7468] dark:bg-[#243832] dark:text-[#91d5c3]">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#17211e] dark:text-[#eefbf4]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#4d635d] dark:text-[#bdd5cd]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivacySection({
  trustItems,
  t,
}: {
  trustItems: string[];
  t: ReturnType<typeof useTranslations<"landing">>;
}) {
  return (
    <section id="privacy" className="bg-[#211713] px-5 py-20 dark:bg-[#0f0a08] md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#e0b274]">
            {t("privacy.eyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#fff8ee] md:text-5xl">
            {t("privacy.title")}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#decbbb]">
            {t("privacy.description")}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {trustItems.map((item) => (
            <div
              key={item}
              className="flex min-h-24 items-start gap-3 border border-[#574238] bg-[#2b1d17] p-4 text-[#f5eadf] dark:border-[#4c382d] dark:bg-[#17100d]"
            >
              <Check
                className="mt-1 h-4 w-4 flex-none text-[#e0b274]"
                aria-hidden="true"
              />
              <span className="text-sm leading-6">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection({
  t,
}: {
  t: ReturnType<typeof useTranslations<"landing">>;
}) {
  return (
    <section className="bg-[#f3eadf] px-5 py-20 dark:bg-[#120d0a] md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e5c3d] dark:text-[#d7a96e]">
          {t("finalCta.eyebrow")}
        </p>
        <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#211713] dark:text-[#fff4e8] md:text-6xl">
          {t("finalCta.title")}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#67544a] dark:text-[#c7b09f]">
          {t("finalCta.description")}
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            as="a"
            href="#try-first-scene"
            size="lg"
            className="bg-[#241812] text-[#fff8ee] hover:bg-[#3a291f] dark:bg-[#e0b274] dark:text-[#120d0a] dark:hover:bg-[#f0c384]"
          >
            <PenLine className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("common.primaryCta")}
          </Button>
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  const t = useTranslations("landing");
  const promptFields = buildPromptFields(t);
  const steps = buildSteps(t);
  const memoryCards = buildMemoryCards(t);
  const trustItems = buildTrustItems(t);

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#211713] dark:bg-[#120d0a] dark:text-[#fff4e8]">
      <HeroSection promptFields={promptFields} t={t} />
      <TryFirstSceneSection promptFields={promptFields} t={t} />
      <HowItWorksSection steps={steps} t={t} />
      <MemorySection memoryCards={memoryCards} t={t} />
      <PrivacySection trustItems={trustItems} t={t} />
      <FinalCtaSection t={t} />
    </div>
  );
}
