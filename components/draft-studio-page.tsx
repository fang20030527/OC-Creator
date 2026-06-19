"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpenText,
  Check,
  Download,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  ListChecks,
  RotateCcw,
  Save,
  Scissors,
  Sparkles,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/button";
import type { ApiErrorResponse, ProjectFromGuestDraftResponse } from "@/lib/client-api";
import {
  clearGuestSceneDraft,
  readGuestSceneDraft,
  type GuestSceneDraft,
} from "@/lib/guest-scene-draft";

type StudioAction = "idle" | "continue" | "rewrite" | "save" | "restore";

function buildMemoryCards(
  t: ReturnType<typeof useTranslations<"draftStudio">>,
  guestDraft: GuestSceneDraft | null
) {
  if (guestDraft) {
    return [
      {
        title: t("memory.cards.oc.title"),
        body: guestDraft.result.memory.oc,
      },
      {
        title: t("memory.cards.dynamic.title"),
        body: guestDraft.result.memory.dynamic,
      },
      {
        title: t("memory.cards.context.title"),
        body: guestDraft.result.memory.context,
      },
      {
        title: t("memory.cards.boundaries.title"),
        body: guestDraft.result.memory.boundaries,
      },
    ];
  }

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

function buildVersions(t: ReturnType<typeof useTranslations<"draftStudio">>) {
  return [
    t("versions.items.opening"),
    t("versions.items.rewrite"),
    t("versions.items.current"),
  ];
}

function buildSourceNotes(t: ReturnType<typeof useTranslations<"draftStudio">>) {
  return [
    t("sources.items.archiveRules"),
    t("sources.items.rainCity"),
    t("sources.items.confirmedOnly"),
  ];
}

function buildPortraitNotes(
  t: ReturnType<typeof useTranslations<"draftStudio">>
) {
  return [
    t("portrait.notes.adult"),
    t("portrait.notes.hair"),
    t("portrait.notes.outfit"),
    t("portrait.notes.noCanon"),
  ];
}

function getStatusText(
  t: ReturnType<typeof useTranslations<"draftStudio">>,
  action: StudioAction
) {
  if (action === "continue") return t("status.continue");
  if (action === "rewrite") return t("status.rewrite");
  if (action === "save") return t("status.save");
  if (action === "restore") return t("status.restore");
  return t("status.idle");
}

export function DraftStudioPage() {
  const t = useTranslations("draftStudio");
  const locale = useLocale();
  const [action, setAction] = useState<StudioAction>("idle");
  const [acceptedSuggestion, setAcceptedSuggestion] = useState(false);
  const [savedCount, setSavedCount] = useState(3);
  const [guestDraft, setGuestDraft] = useState<GuestSceneDraft | null>(null);
  const [draftText, setDraftText] = useState(() => t("editor.sampleText"));
  const [isSavingGuestDraft, setIsSavingGuestDraft] = useState(false);
  const [guestDraftSaveError, setGuestDraftSaveError] = useState<string | null>(null);
  const [savedProjectId, setSavedProjectId] = useState<string | null>(null);
  const memoryCards = buildMemoryCards(t, guestDraft);
  const versions = buildVersions(t);
  const sourceNotes = buildSourceNotes(t);
  const portraitNotes = buildPortraitNotes(t);
  const studioTitle = guestDraft?.result.sceneTitle || t("title");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedDraft = readGuestSceneDraft();
      if (!storedDraft) return;

      setGuestDraft(storedDraft);
      setDraftText(storedDraft.result.sceneText);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const saveGuestDraftAsProject = async () => {
    if (!guestDraft) return;

    setIsSavingGuestDraft(true);
    setGuestDraftSaveError(null);

    try {
      const response = await fetch("/api/projects/from-guest-draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestDraft),
      });
      const payload = (await response.json()) as
        | ApiErrorResponse
        | ProjectFromGuestDraftResponse;

      if (!response.ok) {
        setGuestDraftSaveError(
          (payload as ApiErrorResponse).error || t("guestDraft.saveFailed")
        );
        return;
      }

      setSavedProjectId((payload as ProjectFromGuestDraftResponse).projectId);
    } catch {
      setGuestDraftSaveError(t("guestDraft.saveFailed"));
      return;
    } finally {
      setIsSavingGuestDraft(false);
    }

    clearGuestSceneDraft();
    setGuestDraft(null);
    setSavedCount((count) => Math.max(count, 1));
    setAction("save");
  };

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#211713] dark:bg-[#120d0a] dark:text-[#fff4e8]">
      <main className="mx-auto max-w-[1500px] px-4 pb-10 pt-28 md:px-5">
        <div className="mb-5 flex flex-col gap-4 border border-[#d7c5b7] bg-[#fffaf4] p-4 dark:border-[#4c382d] dark:bg-[#1c1410] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <a
              className="inline-flex items-center gap-2 text-sm text-[#6b574d] transition hover:text-[#211713] dark:text-[#c7b09f] dark:hover:text-[#fff4e8]"
              href={`/${locale}/dashboard`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("back")}
            </a>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[#8e5c3d] dark:text-[#d7a96e]">
              {t("eyebrow")}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold md:text-5xl">
              {studioTitle}
            </h1>
            {guestDraft && (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6b574d] dark:text-[#c7b09f]">
                {t("guestDraft.loaded")}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              className="bg-[#241812] text-[#fff8ee] hover:bg-[#3a291f] dark:bg-[#e0b274] dark:text-[#120d0a] dark:hover:bg-[#f0c384]"
              onClick={() => setAction("continue")}
            >
              <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("actions.continue")}
            </Button>
            <Button
              className="border-[#cdb9a8] bg-[#fff8ee] text-[#2b1d17] hover:bg-[#f2e3d2] hover:text-[#2b1d17] dark:border-[#5b4335] dark:bg-[#211713] dark:text-[#f8efe5] dark:hover:bg-[#2f211b] dark:hover:text-[#f8efe5]"
              onClick={() => setAction("rewrite")}
              variant="outline"
            >
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("actions.rewrite")}
            </Button>
            <Button
              className="border-[#cdb9a8] bg-[#fff8ee] text-[#2b1d17] hover:bg-[#f2e3d2] hover:text-[#2b1d17] dark:border-[#5b4335] dark:bg-[#211713] dark:text-[#f8efe5] dark:hover:bg-[#2f211b] dark:hover:text-[#f8efe5]"
              onClick={() => {
                setSavedCount((count) => count + 1);
                setAction("save");
              }}
              variant="outline"
            >
              <Save className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("actions.saveVersion")}
            </Button>
          </div>
        </div>

        <div className="mb-5 border border-[#d7c5b7] bg-[#f5ecdf] p-3 text-sm text-[#5f4c43] dark:border-[#4c382d] dark:bg-[#211713] dark:text-[#c7b09f]">
          {getStatusText(t, action)}
          {savedProjectId && (
            <p className="mt-1 text-[#3f7368] dark:text-[#91d5c3]">
              {t("guestDraft.saveSuccess", { projectId: savedProjectId })}
            </p>
          )}
        </div>

        {guestDraft && (
          <div className="mb-5 flex flex-col gap-3 border border-[#241812] bg-[#241812] p-4 text-[#fff8ee] dark:border-[#6f4b37] dark:bg-[#0f0a08] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-serif text-xl font-semibold">
                {t("guestDraft.title")}
              </p>
              <p className="mt-1 text-sm leading-6 text-[#e8d5c4]">
                {t("guestDraft.description")}
              </p>
            </div>
            <Button
              className="bg-[#e0b274] text-[#211713] hover:bg-[#f0c384]"
              disabled={isSavingGuestDraft}
              onClick={saveGuestDraftAsProject}
            >
              <Save className="mr-2 h-4 w-4" aria-hidden="true" />
              {isSavingGuestDraft
                ? t("guestDraft.saving")
                : t("guestDraft.save")}
            </Button>
            {guestDraftSaveError && (
              <p className="text-sm leading-6 text-red-200">
                {guestDraftSaveError}
              </p>
            )}
          </div>
        )}

        <section className="grid gap-5 xl:grid-cols-[1fr_420px]">
          <div className="space-y-5">
            <div className="border border-[#d7c5b7] bg-[#fffaf4] dark:border-[#4c382d] dark:bg-[#1c1410]">
              <div className="flex flex-col gap-3 border-b border-[#e4d7cc] p-4 dark:border-[#4c382d] md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#8e5c3d] dark:text-[#d7a96e]">
                    {t("editor.eyebrow")}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-semibold">
                    {t("editor.title")}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="border-[#cdb9a8] bg-[#fff8ee] text-[#2b1d17] hover:bg-[#f2e3d2] hover:text-[#2b1d17] dark:border-[#5b4335] dark:bg-[#211713] dark:text-[#f8efe5] dark:hover:bg-[#2f211b] dark:hover:text-[#f8efe5]"
                    variant="outline"
                  >
                    <Scissors className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("actions.selectedRewrite")}
                  </Button>
                  <Button
                    className="border-[#cdb9a8] bg-[#fff8ee] text-[#2b1d17] hover:bg-[#f2e3d2] hover:text-[#2b1d17] dark:border-[#5b4335] dark:bg-[#211713] dark:text-[#f8efe5] dark:hover:bg-[#2f211b] dark:hover:text-[#f8efe5]"
                    variant="outline"
                  >
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("actions.export")}
                  </Button>
                </div>
              </div>
              <textarea
                aria-label={t("editor.ariaLabel")}
                className="min-h-[520px] w-full resize-y bg-transparent p-5 font-serif text-xl leading-9 text-[#2c1d17] outline-none dark:text-[#f2dfc9]"
                onChange={(event) => setDraftText(event.target.value)}
                value={draftText}
              />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="border border-[#d7c5b7] bg-[#fffaf4] p-5 dark:border-[#4c382d] dark:bg-[#1c1410]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#8e5c3d] dark:text-[#d7a96e]">
                  <ListChecks className="h-4 w-4" aria-hidden="true" />
                  {t("suggestions.eyebrow")}
                </div>
                <h2 className="mt-3 font-serif text-2xl font-semibold">
                  {t("suggestions.title")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#5f4c43] dark:text-[#c7b09f]">
                  {acceptedSuggestion
                    ? t("suggestions.accepted")
                    : t("suggestions.body")}
                </p>
                {!acceptedSuggestion && (
                  <Button
                    className="mt-5 bg-[#241812] text-[#fff8ee] hover:bg-[#3a291f] dark:bg-[#e0b274] dark:text-[#120d0a] dark:hover:bg-[#f0c384]"
                    onClick={() => setAcceptedSuggestion(true)}
                  >
                    <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t("suggestions.accept")}
                  </Button>
                )}
              </div>

              <div className="border border-[#d7c5b7] bg-[#fffaf4] p-5 dark:border-[#4c382d] dark:bg-[#1c1410]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#8e5c3d] dark:text-[#d7a96e]">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  {t("versions.eyebrow")}
                </div>
                <h2 className="mt-3 font-serif text-2xl font-semibold">
                  {t("versions.title", { count: savedCount })}
                </h2>
                <div className="mt-4 space-y-3">
                  {versions.map((version) => (
                    <button
                      key={version}
                      className="flex w-full items-start justify-between gap-3 border border-[#eadccd] bg-[#fffdf8] p-3 text-left text-sm leading-6 text-[#43332b] transition hover:bg-[#f5ecdf] dark:border-[#4c382d] dark:bg-[#241812] dark:text-[#decbbb] dark:hover:bg-[#2f211b]"
                      onClick={() => setAction("restore")}
                      type="button"
                    >
                      <span>{version}</span>
                      <RotateCcw className="mt-1 h-4 w-4 flex-none" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="border border-[#b9cbc4] bg-[#f8fbf7] p-5 dark:border-[#365047] dark:bg-[#1c2823]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#3f7368] dark:text-[#91d5c3]">
                <BookOpenText className="h-4 w-4" aria-hidden="true" />
                {t("memory.eyebrow")}
              </div>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-[#17211e] dark:text-[#eefbf4]">
                {t("memory.title")}
              </h2>
              <div className="mt-4 space-y-3">
                {memoryCards.map((card) => (
                  <div
                    key={card.title}
                    className="border border-[#b9cbc4] bg-[#fffaf4] p-3 dark:border-[#365047] dark:bg-[#151a16]"
                  >
                    <p className="font-semibold text-[#17211e] dark:text-[#eefbf4]">
                      {card.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#4d635d] dark:text-[#bdd5cd]">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#d7c5b7] bg-[#fffaf4] p-5 dark:border-[#4c382d] dark:bg-[#1c1410]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#8e5c3d] dark:text-[#d7a96e]">
                <LinkIcon className="h-4 w-4" aria-hidden="true" />
                {t("sources.eyebrow")}
              </div>
              <h2 className="mt-3 font-serif text-2xl font-semibold">
                {t("sources.title")}
              </h2>
              <div className="mt-4 space-y-3">
                {sourceNotes.map((note) => (
                  <p
                    key={note}
                    className="border border-[#eadccd] bg-[#fffdf8] p-3 text-sm leading-6 text-[#43332b] dark:border-[#4c382d] dark:bg-[#241812] dark:text-[#decbbb]"
                  >
                    {note}
                  </p>
                ))}
              </div>
            </div>

            <div className="border border-[#241812] bg-[#241812] p-5 text-[#fff8ee] dark:border-[#6f4b37] dark:bg-[#0f0a08]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#e0b274]">
                <ImageIcon className="h-4 w-4" aria-hidden="true" />
                {t("portrait.eyebrow")}
              </div>
              <h2 className="mt-3 font-serif text-2xl font-semibold">
                {t("portrait.title")}
              </h2>
              <div className="mt-4 space-y-2 text-sm leading-6 text-[#e8d5c4]">
                {portraitNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
              <Button
                className="mt-5 bg-[#e0b274] text-[#211713] hover:bg-[#f0c384]"
              >
                {t("portrait.cta")}
              </Button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
