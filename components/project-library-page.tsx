"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  Clock3,
  FileText,
  LockKeyhole,
  PenLine,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/button";
import { useSession } from "@/lib/auth-client";
import type {
  ApiErrorResponse,
  ProjectsResponse,
  ProjectSummary,
} from "@/lib/client-api";
import {
  clearGuestSceneDraft,
  readGuestSceneDraft,
  type GuestSceneDraft,
} from "@/lib/guest-scene-draft";

function buildLibraryStats(
  t: ReturnType<typeof useTranslations<"projectLibrary">>
) {
  return [
    {
      label: t("stats.activeProject.label"),
      value: t("stats.activeProject.value"),
    },
    {
      label: t("stats.savedVersions.label"),
      value: t("stats.savedVersions.value"),
    },
    {
      label: t("stats.memoryActions.label"),
      value: t("stats.memoryActions.value"),
    },
  ];
}

function buildProjects(t: ReturnType<typeof useTranslations<"projectLibrary">>) {
  return [
    {
      title: t("projects.archive.title"),
      status: t("projects.archive.status"),
      description: t("projects.archive.description"),
      updated: t("projects.archive.updated"),
      memory: t("projects.archive.memory"),
      action: t("projects.archive.action"),
    },
  ];
}

function buildChecklist(
  t: ReturnType<typeof useTranslations<"projectLibrary">>
) {
  return [
    t("checklist.items.firstScene"),
    t("checklist.items.memoryReview"),
    t("checklist.items.versionSave"),
    t("checklist.items.export"),
  ];
}

function getProjectStatusLabel(
  t: ReturnType<typeof useTranslations<"projectLibrary">>,
  status: string
) {
  if (status === "active") {
    return t("realProjects.status.active");
  }

  return status;
}

function formatProjectDate(locale: string, value: ProjectSummary["updatedAt"]) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    dateStyle: "medium",
  }).format(date);
}

async function readProjectsResponse(response: Response) {
  const payload = (await response.json()) as
    | ApiErrorResponse
    | ProjectsResponse;

  if (!response.ok) {
    throw new Error(
      "error" in payload && payload.error ? payload.error : "Failed to load"
    );
  }

  return "projects" in payload && Array.isArray(payload.projects)
    ? payload.projects
    : [];
}

export function ProjectLibraryPage() {
  const t = useTranslations("projectLibrary");
  const locale = useLocale();
  const session = useSession();
  const stats = buildLibraryStats(t);
  const previewProjects = buildProjects(t);
  const checklist = buildChecklist(t);
  const [guestDraft, setGuestDraft] = useState<GuestSceneDraft | null>(null);
  const [savedProjects, setSavedProjects] = useState<ProjectSummary[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState(false);
  const displayName = session.data?.user?.name || session.data?.user?.email || t("fallbackUser");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setGuestDraft(readGuestSceneDraft());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const timeoutId = window.setTimeout(() => {
      async function loadProjects() {
        try {
          const response = await fetch("/api/projects", {
            cache: "no-store",
          });
          const projects = await readProjectsResponse(response);

          if (isMounted) {
            setSavedProjects(projects);
            setProjectsError(false);
          }
        } catch {
          if (isMounted) {
            setProjectsError(true);
          }
        } finally {
          if (isMounted) {
            setIsLoadingProjects(false);
          }
        }
      }

      void loadProjects();
    }, 0);

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
    };
  }, []);

  const discardGuestDraft = () => {
    clearGuestSceneDraft();
    setGuestDraft(null);
  };

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#211713] dark:bg-[#120d0a] dark:text-[#fff4e8]">
      <main className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:pb-24">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#d7c5b7] bg-[#fff8ee] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b5037] dark:border-[#5b4335] dark:bg-[#211713] dark:text-[#d7a96e]">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              {t("eyebrow")}
            </div>
            <h1 className="mt-7 max-w-3xl font-serif text-5xl font-semibold leading-[1] md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5f4c43] dark:text-[#c7b09f]">
              {t("welcome", { name: displayName })}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                as="a"
                className="bg-[#241812] text-[#fff8ee] hover:bg-[#3a291f] dark:bg-[#e0b274] dark:text-[#120d0a] dark:hover:bg-[#f0c384]"
                href={`/${locale}/studio`}
                size="lg"
              >
                <PenLine className="mr-2 h-4 w-4" aria-hidden="true" />
                {t("primaryCta")}
              </Button>
              <Button
                as="a"
                className="border-[#cdb9a8] bg-[#fff8ee] text-[#2b1d17] hover:bg-[#f2e3d2] hover:text-[#2b1d17] dark:border-[#5b4335] dark:bg-[#211713] dark:text-[#f8efe5] dark:hover:bg-[#2f211b] dark:hover:text-[#f8efe5]"
                href={`/${locale}/try`}
                size="lg"
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                {t("secondaryCta")}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-[#d7c5b7] bg-[#fffaf4] p-5 dark:border-[#4c382d] dark:bg-[#1c1410]"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-[#8e5c3d] dark:text-[#d7a96e]">
                  {stat.label}
                </p>
                <p className="mt-4 font-serif text-4xl font-semibold">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e5c3d] dark:text-[#d7a96e]">
                  {t("projectsEyebrow")}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold md:text-5xl">
                  {t("projectsTitle")}
                </h2>
              </div>
              <span className="hidden text-sm text-[#6b574d] dark:text-[#c7b09f] sm:inline">
                {t("freePlanNote")}
              </span>
            </div>

            {guestDraft && (
              <article className="border border-[#241812] bg-[#241812] p-5 text-[#fff8ee] dark:border-[#6f4b37] dark:bg-[#0f0a08]">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 border border-[#e0b274] bg-[#3a291f] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#e0b274]">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("guestDraft.status")}
                    </div>
                    <h3 className="mt-5 font-serif text-3xl font-semibold">
                      {guestDraft.result.sceneTitle}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#e8d5c4]">
                      {t("guestDraft.description")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
                    <Button
                      as="a"
                      className="bg-[#e0b274] text-[#211713] hover:bg-[#f0c384]"
                      href={`/${locale}/studio?from=guest-scene`}
                    >
                      {t("guestDraft.continue")}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                      as="button"
                      className="border-[#6f4b37] bg-transparent text-[#f8efe5] hover:bg-[#2f211b] hover:text-[#f8efe5]"
                      onClick={discardGuestDraft}
                      variant="outline"
                    >
                      {t("guestDraft.discard")}
                    </Button>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-[#e8d5c4] sm:grid-cols-3">
                  <div className="flex items-start gap-2 border border-[#574238] bg-[#2b1d17] p-3">
                    <Clock3 className="mt-0.5 h-4 w-4 text-[#e0b274]" />
                    <span>{t("guestDraft.savedLocally")}</span>
                  </div>
                  <div className="flex items-start gap-2 border border-[#574238] bg-[#2b1d17] p-3">
                    <BookOpenText className="mt-0.5 h-4 w-4 text-[#e0b274]" />
                    <span>{guestDraft.result.memory.dynamic}</span>
                  </div>
                  <div className="flex items-start gap-2 border border-[#574238] bg-[#2b1d17] p-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-[#e0b274]" />
                    <span>{t("privateByDefault")}</span>
                  </div>
                </div>
              </article>
            )}

            {isLoadingProjects && (
              <div className="border border-[#d7c5b7] bg-[#fffaf4] p-5 text-sm font-semibold text-[#6b574d] dark:border-[#4c382d] dark:bg-[#1c1410] dark:text-[#c7b09f]">
                {t("realProjects.loading")}
              </div>
            )}

            {projectsError && (
              <div className="border border-[#d7c5b7] bg-[#fffaf4] p-5 text-sm leading-6 text-[#6b574d] dark:border-[#4c382d] dark:bg-[#1c1410] dark:text-[#c7b09f]">
                {t("realProjects.error")}
              </div>
            )}

            {savedProjects.map((project) => (
              <article
                key={project.id}
                className="border border-[#d7c5b7] bg-[#fffaf4] p-5 dark:border-[#4c382d] dark:bg-[#1c1410]"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 border border-[#c7aa91] bg-[#f2dfc9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6c402b] dark:border-[#6f4b37] dark:bg-[#2f211b] dark:text-[#e0b274]">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      {getProjectStatusLabel(t, project.status)}
                    </div>
                    <h3 className="mt-5 font-serif text-3xl font-semibold">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f4c43] dark:text-[#c7b09f]">
                      {project.draftPreview || t("realProjects.emptyDraft")}
                    </p>
                  </div>
                  <Button
                    as="a"
                    className="bg-[#241812] text-[#fff8ee] hover:bg-[#3a291f] dark:bg-[#e0b274] dark:text-[#120d0a] dark:hover:bg-[#f0c384]"
                    href={`/${locale}/studio?projectId=${encodeURIComponent(project.id)}`}
                  >
                    {t("realProjects.open")}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-[#5f4c43] dark:text-[#c7b09f] sm:grid-cols-3">
                  <div className="flex items-start gap-2 border border-[#eadccd] bg-[#fffdf8] p-3 dark:border-[#4c382d] dark:bg-[#241812]">
                    <Clock3 className="mt-0.5 h-4 w-4 text-[#8e5c3d] dark:text-[#d7a96e]" />
                    <span>
                      {t("realProjects.updated", {
                        date: formatProjectDate(locale, project.updatedAt),
                      })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 border border-[#eadccd] bg-[#fffdf8] p-3 dark:border-[#4c382d] dark:bg-[#241812]">
                    <BookOpenText className="mt-0.5 h-4 w-4 text-[#8e5c3d] dark:text-[#d7a96e]" />
                    <span>
                      {project.memoryPreview || t("realProjects.emptyMemory")}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 border border-[#eadccd] bg-[#fffdf8] p-3 dark:border-[#4c382d] dark:bg-[#241812]">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-[#8e5c3d] dark:text-[#d7a96e]" />
                    <span>
                      {t("realProjects.versionCount", {
                        count: project.versionCount,
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {!isLoadingProjects && savedProjects.length === 0 && previewProjects.map((project) => (
              <article
                key={project.title}
                className="border border-[#d7c5b7] bg-[#fffaf4] p-5 dark:border-[#4c382d] dark:bg-[#1c1410]"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 border border-[#c7aa91] bg-[#f2dfc9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6c402b] dark:border-[#6f4b37] dark:bg-[#2f211b] dark:text-[#e0b274]">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      {project.status}
                    </div>
                    <h3 className="mt-5 font-serif text-3xl font-semibold">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f4c43] dark:text-[#c7b09f]">
                      {project.description}
                    </p>
                  </div>
                  <Button
                    as="a"
                    className="bg-[#241812] text-[#fff8ee] hover:bg-[#3a291f] dark:bg-[#e0b274] dark:text-[#120d0a] dark:hover:bg-[#f0c384]"
                    href={`/${locale}/studio`}
                  >
                    {project.action}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-[#5f4c43] dark:text-[#c7b09f] sm:grid-cols-3">
                  <div className="flex items-start gap-2 border border-[#eadccd] bg-[#fffdf8] p-3 dark:border-[#4c382d] dark:bg-[#241812]">
                    <Clock3 className="mt-0.5 h-4 w-4 text-[#8e5c3d] dark:text-[#d7a96e]" />
                    <span>{project.updated}</span>
                  </div>
                  <div className="flex items-start gap-2 border border-[#eadccd] bg-[#fffdf8] p-3 dark:border-[#4c382d] dark:bg-[#241812]">
                    <BookOpenText className="mt-0.5 h-4 w-4 text-[#8e5c3d] dark:text-[#d7a96e]" />
                    <span>{project.memory}</span>
                  </div>
                  <div className="flex items-start gap-2 border border-[#eadccd] bg-[#fffdf8] p-3 dark:border-[#4c382d] dark:bg-[#241812]">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-[#8e5c3d] dark:text-[#d7a96e]" />
                    <span>{t("privateByDefault")}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="border border-[#d7c5b7] bg-[#f5ecdf] p-5 dark:border-[#4c382d] dark:bg-[#211713]">
              <FileText className="h-6 w-6 text-[#8e5c3d] dark:text-[#d7a96e]" />
              <h2 className="mt-4 font-serif text-2xl font-semibold">
                {t("checklist.title")}
              </h2>
              <div className="mt-5 space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 border border-[#d7c5b7] bg-[#fffaf4] p-3 text-sm leading-6 dark:border-[#4c382d] dark:bg-[#1c1410]"
                  >
                    <span className="mt-1 h-2 w-2 flex-none bg-[#3f7368] dark:bg-[#91d5c3]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#241812] bg-[#241812] p-5 text-[#fff8ee] dark:border-[#6f4b37] dark:bg-[#0f0a08]">
              <h2 className="font-serif text-2xl font-semibold">
                {t("privacy.title")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#e8d5c4]">
                {t("privacy.description")}
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
