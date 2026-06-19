import type { GuestSceneResponsePayload } from "@/lib/client-api";

export const GUEST_SCENE_DRAFT_STORAGE_KEY =
  "ai-fandom-oc-creator:guest-scene-draft:v1";

export type GuestSceneDraftPrompt = {
  oc: string;
  connection: string;
  dynamic: string;
  context: string;
  boundaries: string;
};

export type GuestSceneDraft = {
  prompt: GuestSceneDraftPrompt;
  result: GuestSceneResponsePayload;
  locale: "en" | "zh";
  createdAt: string;
};

export function saveGuestSceneDraft(draft: GuestSceneDraft) {
  if (!hasLocalStorage()) return;

  window.localStorage.setItem(
    GUEST_SCENE_DRAFT_STORAGE_KEY,
    JSON.stringify(draft)
  );
}

export function readGuestSceneDraft(): GuestSceneDraft | null {
  if (!hasLocalStorage()) return null;

  const rawDraft = window.localStorage.getItem(GUEST_SCENE_DRAFT_STORAGE_KEY);
  if (!rawDraft) return null;

  try {
    const parsed = JSON.parse(rawDraft) as unknown;
    return isGuestSceneDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearGuestSceneDraft() {
  if (!hasLocalStorage()) return;

  window.localStorage.removeItem(GUEST_SCENE_DRAFT_STORAGE_KEY);
}

function hasLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function isGuestSceneDraft(value: unknown): value is GuestSceneDraft {
  if (!value || typeof value !== "object") return false;

  const draft = value as Partial<GuestSceneDraft>;

  return (
    isPrompt(draft.prompt) &&
    isResult(draft.result) &&
    (draft.locale === "en" || draft.locale === "zh") &&
    typeof draft.createdAt === "string"
  );
}

function isPrompt(value: unknown): value is GuestSceneDraftPrompt {
  if (!value || typeof value !== "object") return false;

  const prompt = value as Partial<GuestSceneDraftPrompt>;

  return (
    typeof prompt.oc === "string" &&
    typeof prompt.connection === "string" &&
    typeof prompt.dynamic === "string" &&
    typeof prompt.context === "string" &&
    typeof prompt.boundaries === "string"
  );
}

function isResult(value: unknown): value is GuestSceneResponsePayload {
  if (!value || typeof value !== "object") return false;

  const result = value as Partial<GuestSceneResponsePayload>;
  const memory = result.memory as
    | Partial<GuestSceneResponsePayload["memory"]>
    | undefined;

  return (
    (result.provider === "local-fallback" || result.provider === "evolink") &&
    typeof result.sceneTitle === "string" &&
    typeof result.sceneText === "string" &&
    !!memory &&
    typeof memory.oc === "string" &&
    typeof memory.dynamic === "string" &&
    typeof memory.context === "string" &&
    typeof memory.boundaries === "string"
  );
}
