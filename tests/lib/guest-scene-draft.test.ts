import {
  clearGuestSceneDraft,
  GUEST_SCENE_DRAFT_STORAGE_KEY,
  readGuestSceneDraft,
  saveGuestSceneDraft,
  type GuestSceneDraft,
} from "@/lib/guest-scene-draft";

const draft: GuestSceneDraft = {
  locale: "zh",
  createdAt: "2026-06-19T00:00:00.000Z",
  prompt: {
    oc: "Mara",
    connection: "Rowan",
    dynamic: "Slow-burn trust",
    context: "Archive city",
    boundaries: "Non-explicit",
  },
  result: {
    provider: "local-fallback",
    sceneTitle: "Mara 与第一个谨慎选择",
    sceneText: "A private scene preview.",
    memory: {
      oc: "OC 档案",
      dynamic: "关系动态",
      context: "故事背景",
      boundaries: "偏好与边界",
    },
  },
};

describe("guest scene draft storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("stores and reads a guest scene draft", () => {
    saveGuestSceneDraft(draft);

    expect(readGuestSceneDraft()).toEqual(draft);
  });

  it("clears a stored guest scene draft", () => {
    saveGuestSceneDraft(draft);
    clearGuestSceneDraft();

    expect(readGuestSceneDraft()).toBeNull();
  });

  it("ignores malformed draft JSON", () => {
    window.localStorage.setItem(GUEST_SCENE_DRAFT_STORAGE_KEY, "{broken");

    expect(readGuestSceneDraft()).toBeNull();
  });

  it("ignores draft-shaped data with missing result fields", () => {
    window.localStorage.setItem(
      GUEST_SCENE_DRAFT_STORAGE_KEY,
      JSON.stringify({
        ...draft,
        result: {
          sceneTitle: "Missing provider",
        },
      })
    );

    expect(readGuestSceneDraft()).toBeNull();
  });
});
