import type { GuestSceneDraft } from "@/lib/guest-scene-draft";
import { count, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  ocDraft,
  ocDraftVersion,
  ocProject,
  ocProjectMemory,
} from "@/lib/db/schema";

export type ProjectSource = "guest_scene";
export type ProjectStatus = "active";

export const PROJECT_SUMMARY_LIST_LIMIT = 20;

export type GuestProjectRecords = {
  project: {
    id: string;
    userId: string;
    title: string;
    source: ProjectSource;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
  };
  draft: {
    id: string;
    projectId: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  };
  version: {
    id: string;
    projectId: string;
    draftId: string;
    label: string;
    content: string;
    versionNumber: number;
    createdAt: Date;
  };
  memory: {
    id: string;
    projectId: string;
    ocProfile: string;
    relationshipDynamic: string;
    storyContext: string;
    preferencesBoundaries: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

type BuildGuestProjectRecordsInput = {
  userId: string;
  draft: GuestSceneDraft;
  now?: Date;
  createId?: () => string;
};

type ProjectTransaction = {
  insert: (table: unknown) => {
    values: (values: unknown) => Promise<unknown>;
  };
};

type ProjectDatabase = {
  transaction: <T>(
    callback: (transaction: ProjectTransaction) => Promise<T> | T
  ) => Promise<T>;
};

type ProjectSummaryDatabase = Pick<typeof db, "select">;

export type ProjectSummaryRow = {
  id: string;
  title: string;
  source: string;
  status: string;
  updatedAt: Date | string;
  draftId: string | null;
  draftContent: string | null;
  memoryDynamic: string | null;
  versionCount: number | string | null;
};

export type UserProjectSummary = {
  id: string;
  title: string;
  source: string;
  status: string;
  updatedAt: string;
  draftId: string | null;
  draftPreview: string;
  memoryPreview: string;
  versionCount: number;
};

type ListProjectSummaryRowsInput = {
  userId: string;
  limit: number;
};

type FetchProjectSummaryRows = (
  input: ListProjectSummaryRowsInput
) => Promise<ProjectSummaryRow[]>;

type CreateProjectFromGuestDraftInput = {
  userId: string;
  draft: GuestSceneDraft;
};

type CreateProjectFromGuestDraftDeps = {
  database?: ProjectDatabase;
  now?: Date;
  createId?: () => string;
};

type ListUserProjectSummariesInput = {
  userId: string;
  limit?: number;
};

type ListUserProjectSummariesDeps = {
  database?: ProjectSummaryDatabase;
  fetchRows?: FetchProjectSummaryRows;
};

function normalizeProjectSummaryLimit(limit?: number) {
  if (typeof limit !== "number" || !Number.isFinite(limit)) {
    return PROJECT_SUMMARY_LIST_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(limit), 1), PROJECT_SUMMARY_LIST_LIMIT);
}

function toIsoString(value: Date | string) {
  return value instanceof Date ? value.toISOString() : value;
}

function buildPreview(value: string | null, maxLength = 180) {
  const normalized = (value ?? "").replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 3)}...`;
}

function toVersionCount(value: number | string | null) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function fetchProjectSummaryRows(
  { userId, limit }: ListProjectSummaryRowsInput,
  database: ProjectSummaryDatabase
): Promise<ProjectSummaryRow[]> {
  return database
    .select({
      id: ocProject.id,
      title: ocProject.title,
      source: ocProject.source,
      status: ocProject.status,
      updatedAt: ocProject.updatedAt,
      draftId: ocDraft.id,
      draftContent: ocDraft.content,
      memoryDynamic: ocProjectMemory.relationshipDynamic,
      versionCount: count(ocDraftVersion.id),
    })
    .from(ocProject)
    .leftJoin(ocDraft, eq(ocDraft.projectId, ocProject.id))
    .leftJoin(ocProjectMemory, eq(ocProjectMemory.projectId, ocProject.id))
    .leftJoin(ocDraftVersion, eq(ocDraftVersion.projectId, ocProject.id))
    .where(eq(ocProject.userId, userId))
    .groupBy(
      ocProject.id,
      ocProject.title,
      ocProject.source,
      ocProject.status,
      ocProject.updatedAt,
      ocDraft.id,
      ocDraft.content,
      ocProjectMemory.relationshipDynamic
    )
    .orderBy(desc(ocProject.updatedAt))
    .limit(limit);
}

function mapProjectSummaryRow(row: ProjectSummaryRow): UserProjectSummary {
  return {
    id: row.id,
    title: row.title,
    source: row.source,
    status: row.status,
    updatedAt: toIsoString(row.updatedAt),
    draftId: row.draftId,
    draftPreview: buildPreview(row.draftContent),
    memoryPreview: buildPreview(row.memoryDynamic),
    versionCount: toVersionCount(row.versionCount),
  };
}

export function buildGuestProjectRecords({
  userId,
  draft,
  now = new Date(),
  createId = crypto.randomUUID,
}: BuildGuestProjectRecordsInput): GuestProjectRecords {
  const projectId = createId();
  const draftId = createId();
  const versionId = createId();
  const memoryId = createId();
  const title = draft.result.sceneTitle;
  const content = draft.result.sceneText;

  return {
    project: {
      id: projectId,
      userId,
      title,
      source: "guest_scene",
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    draft: {
      id: draftId,
      projectId,
      title,
      content,
      createdAt: now,
      updatedAt: now,
    },
    version: {
      id: versionId,
      projectId,
      draftId,
      label: "Guest preview import",
      content,
      versionNumber: 1,
      createdAt: now,
    },
    memory: {
      id: memoryId,
      projectId,
      ocProfile: draft.result.memory.oc,
      relationshipDynamic: draft.result.memory.dynamic,
      storyContext: draft.result.memory.context,
      preferencesBoundaries: draft.result.memory.boundaries,
      createdAt: now,
      updatedAt: now,
    },
  };
}

export async function createProjectFromGuestDraft(
  input: CreateProjectFromGuestDraftInput,
  {
    database = db as ProjectDatabase,
    now = new Date(),
    createId = crypto.randomUUID,
  }: CreateProjectFromGuestDraftDeps = {}
) {
  const records = buildGuestProjectRecords({
    userId: input.userId,
    draft: input.draft,
    now,
    createId,
  });

  await database.transaction(async tx => {
    await tx.insert(ocProject).values(records.project);
    await tx.insert(ocDraft).values(records.draft);
    await tx.insert(ocDraftVersion).values(records.version);
    await tx.insert(ocProjectMemory).values(records.memory);
  });

  return {
    projectId: records.project.id,
    draftId: records.draft.id,
  };
}

export async function listUserProjectSummaries(
  input: ListUserProjectSummariesInput,
  {
    database = db,
    fetchRows,
  }: ListUserProjectSummariesDeps = {}
): Promise<UserProjectSummary[]> {
  const limit = normalizeProjectSummaryLimit(input.limit);
  const rows = fetchRows
    ? await fetchRows({ userId: input.userId, limit })
    : await fetchProjectSummaryRows({ userId: input.userId, limit }, database);

  return rows.map(mapProjectSummaryRow);
}
