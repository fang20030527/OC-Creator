import {
  buildGuestProjectRecords,
  createProjectFromGuestDraft,
  listUserProjectSummaries,
} from "@/lib/projects/guest-project";
import type { GuestSceneDraft } from "@/lib/guest-scene-draft";

const createdAt = new Date("2026-06-19T04:00:00.000Z");

const guestDraft: GuestSceneDraft = {
  locale: "zh",
  createdAt: "2026-06-19T03:59:00.000Z",
  prompt: {
    oc: "Mara",
    connection: "Rowan",
    dynamic: "从怀疑变成精准照顾",
    context: "档案城市",
    boundaries: "成熟但非露骨",
  },
  result: {
    provider: "local-fallback",
    sceneTitle: "Mara 与第一个谨慎选择",
    sceneText: "Mara 把第二支笔推过桌面。",
    memory: {
      oc: "OC 档案：Mara 谨慎敏锐。",
      dynamic: "关系动态：从怀疑走向信任。",
      context: "故事背景：档案城市。",
      boundaries: "偏好与边界：成熟但非露骨。",
    },
  },
};

describe("guest project import", () => {
  it("builds linked project records from a guest scene draft", () => {
    let nextId = 0;
    const records = buildGuestProjectRecords({
      userId: "user-1",
      draft: guestDraft,
      now: createdAt,
      createId: () => `id-${++nextId}`,
    });

    expect(records).toEqual({
      project: {
        id: "id-1",
        userId: "user-1",
        title: "Mara 与第一个谨慎选择",
        source: "guest_scene",
        status: "active",
        createdAt,
        updatedAt: createdAt,
      },
      draft: {
        id: "id-2",
        projectId: "id-1",
        title: "Mara 与第一个谨慎选择",
        content: "Mara 把第二支笔推过桌面。",
        createdAt,
        updatedAt: createdAt,
      },
      version: {
        id: "id-3",
        projectId: "id-1",
        draftId: "id-2",
        label: "Guest preview import",
        content: "Mara 把第二支笔推过桌面。",
        versionNumber: 1,
        createdAt,
      },
      memory: {
        id: "id-4",
        projectId: "id-1",
        ocProfile: "OC 档案：Mara 谨慎敏锐。",
        relationshipDynamic: "关系动态：从怀疑走向信任。",
        storyContext: "故事背景：档案城市。",
        preferencesBoundaries: "偏好与边界：成熟但非露骨。",
        createdAt,
        updatedAt: createdAt,
      },
    });
  });

  it("persists guest scene draft records in one transaction", async () => {
    let nextId = 0;
    const insertedValues: unknown[] = [];
    const tx = {
      insert: vi.fn(() => ({
        values: vi.fn(async (values: unknown) => {
          insertedValues.push(values);
        }),
      })),
    };
    const database = {
      transaction: vi.fn(async (callback: (transaction: typeof tx) => unknown) =>
        callback(tx)
      ),
    };

    const result = await createProjectFromGuestDraft(
      {
        userId: "user-1",
        draft: guestDraft,
      },
      {
        database,
        now: createdAt,
        createId: () => `id-${++nextId}`,
      }
    );

    expect(result).toEqual({
      projectId: "id-1",
      draftId: "id-2",
    });
    expect(database.transaction).toHaveBeenCalledTimes(1);
    expect(insertedValues).toEqual([
      buildGuestProjectRecords({
        userId: "user-1",
        draft: guestDraft,
        now: createdAt,
        createId: (() => {
          let id = 0;
          return () => `id-${++id}`;
        })(),
      }).project,
      buildGuestProjectRecords({
        userId: "user-1",
        draft: guestDraft,
        now: createdAt,
        createId: (() => {
          let id = 0;
          return () => `id-${++id}`;
        })(),
      }).draft,
      buildGuestProjectRecords({
        userId: "user-1",
        draft: guestDraft,
        now: createdAt,
        createId: (() => {
          let id = 0;
          return () => `id-${++id}`;
        })(),
      }).version,
      buildGuestProjectRecords({
        userId: "user-1",
        draft: guestDraft,
        now: createdAt,
        createId: (() => {
          let id = 0;
          return () => `id-${++id}`;
        })(),
      }).memory,
    ]);
  });

  it("lists saved project summaries for a user", async () => {
    const summaries = await listUserProjectSummaries(
      {
        userId: "user-1",
      },
      {
        fetchRows: async ({ userId, limit }) => {
          if (userId !== "user-1" || limit !== 20) {
            return [];
          }

          return [
            {
              id: "project-1",
              title: "Mara 与雨中档案馆",
              source: "guest_scene",
              status: "active",
              updatedAt: new Date("2026-06-19T05:00:00.000Z"),
              draftId: "draft-1",
              draftContent:
                "Mara 把第二支笔推过桌面。雨声让每一次停顿都像证词。",
              memoryDynamic: "关系动态：从怀疑走向谨慎信任。",
              versionCount: 2,
            },
          ];
        },
      }
    );

    expect(summaries).toEqual([
      {
        id: "project-1",
        title: "Mara 与雨中档案馆",
        source: "guest_scene",
        status: "active",
        updatedAt: "2026-06-19T05:00:00.000Z",
        draftId: "draft-1",
        draftPreview: "Mara 把第二支笔推过桌面。雨声让每一次停顿都像证词。",
        memoryPreview: "关系动态：从怀疑走向谨慎信任。",
        versionCount: 2,
      },
    ]);
  });
});
