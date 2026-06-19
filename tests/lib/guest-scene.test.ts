import { generateGuestScene, validateGuestScenePrompt } from "@/lib/guest-scene";

const validPrompt = {
  oc: "Mara, a guarded archive courier who notices missing records.",
  connection: "Rowan, a rival investigator.",
  dynamic: "Suspicion turning into careful trust and mutual protection.",
  context: "A rain-heavy archive city where records can disappear.",
  boundaries: "Mature romantic tension, no explicit scenes.",
  adultConfirmed: true,
};

describe("guest scene generation", () => {
  it("requires the adult and non-explicit confirmation", () => {
    const result = validateGuestScenePrompt({
      ...validPrompt,
      adultConfirmed: false,
    });

    expect(result.ok).toBe(false);
    expect(result.error).toContain("confirm");
  });

  it("rejects minor-coded mature romance prompts before generation", () => {
    const result = validateGuestScenePrompt({
      ...validPrompt,
      oc: "A 16 year old student in a romance setup.",
    });

    expect(result.ok).toBe(false);
    expect(result.error).toContain("adult characters");
  });

  it("returns a usable local fallback when no text API key is configured", async () => {
    const result = await generateGuestScene(validPrompt, {
      env: {},
    });

    expect(result.provider).toBe("local-fallback");
    expect(result.sceneText).toContain("Mara");
    expect(result.memory.dynamic).toContain(validPrompt.dynamic);
    expect(result.memory.boundaries).toContain(validPrompt.boundaries);
  });

  it("returns a localized fallback for Chinese visitor previews", async () => {
    const result = await generateGuestScene(
      {
        ...validPrompt,
        locale: "zh",
      },
      {
        env: {},
      }
    );

    expect(result.provider).toBe("local-fallback");
    expect(result.sceneTitle).toBe("Mara 与第一个谨慎选择");
    expect(result.sceneTitle).toContain("谨慎选择");
    expect(result.memory.oc).toContain("OC 档案");
  });

  it("uses an Evolink-style JSON response when a text API key is configured", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                sceneTitle: "The second ledger",
                sceneText:
                  "Mara kept the ledger open between them, letting the silence become a test neither of them named. Rowan wrote first, careful and exact, and the room seemed to remember how to breathe.",
                memory: {
                  oc: "OC Profile: guarded and precise.",
                  dynamic: "Relationship Dynamic: careful trust.",
                  context: "Story Context: archive city.",
                  boundaries: "Preferences & Boundaries: non-explicit.",
                },
              }),
            },
          },
        ],
      }),
    });

    const result = await generateGuestScene(validPrompt, {
      env: {
        TEXT_API_KEY: "test-key",
        TEXT_API_BASE_URL: "https://text.example.test/v1",
        TEXT_MODEL: "deepseek-v4-flash",
      },
      fetcher,
    });

    expect(result.provider).toBe("evolink");
    expect(result.sceneTitle).toBe("The second ledger");
    expect(fetcher).toHaveBeenCalledWith(
      "https://text.example.test/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-key",
        }),
      })
    );
  });
});
