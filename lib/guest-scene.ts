import { z } from "zod";

const guestScenePromptSchema = z.object({
  oc: z.string().trim().min(8).max(900),
  connection: z.string().trim().min(4).max(900),
  dynamic: z.string().trim().min(6).max(900),
  context: z.string().trim().max(900).optional().default(""),
  boundaries: z.string().trim().max(600).optional().default(""),
  adultConfirmed: z.boolean(),
  locale: z.enum(["en", "zh"]).optional().default("en"),
});

const guestSceneModelResponseSchema = z.object({
  sceneTitle: z.string().trim().min(1).max(120),
  sceneText: z.string().trim().min(80).max(5000),
  memory: z.object({
    oc: z.string().trim().min(1).max(400),
    dynamic: z.string().trim().min(1).max(400),
    context: z.string().trim().min(1).max(400),
    boundaries: z.string().trim().min(1).max(400),
  }),
});

const blockedPatternChecks = [
  {
    code: "MINOR_CODED_PROMPT",
    pattern:
      /\b(minor|underage|child|children|kid|teen|teenager|schoolgirl|schoolboy|14|15|16|17)\b/i,
    message:
      "Mature romance prompts must involve adult characters. Please revise the prompt to keep all involved characters clearly 18+.",
  },
  {
    code: "EXPLICIT_CONTENT",
    pattern:
      /\b(explicit sex|porn|non[- ]?consensual sex|rape fantasy|sexual assault)\b/i,
    message:
      "This preview supports mature romantic tension, not explicit erotica. Please revise toward suggestive or fade-to-black tension.",
  },
  {
    code: "REAL_PERSON_PROMPT",
    pattern:
      /\b(real person|celebrity|actor|actress|singer|idol|rpf)\b/i,
    message:
      "The MVP does not support real-person intimate fantasy. Please use fictional, original, or generic fandom-adjacent characters.",
  },
] as const;

export type GuestScenePrompt = z.infer<typeof guestScenePromptSchema>;
export type GuestSceneErrorCode =
  | "REQUIRED_FIELDS"
  | "ADULT_CONFIRMATION_REQUIRED"
  | (typeof blockedPatternChecks)[number]["code"];

export type GuestSceneResult = z.infer<typeof guestSceneModelResponseSchema> & {
  provider: "local-fallback" | "evolink";
};

export type GuestSceneValidationResult =
  | {
      ok: true;
      prompt: GuestScenePrompt;
    }
  | {
      ok: false;
      code: GuestSceneErrorCode;
      error: string;
    };

type GenerateGuestSceneOptions = {
  env?: NodeJS.ProcessEnv;
  fetcher?: typeof fetch;
};

type EvolinkChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export class GuestSceneInputError extends Error {
  readonly code: GuestSceneErrorCode;

  constructor(code: GuestSceneErrorCode, message: string) {
    super(message);
    this.name = "GuestSceneInputError";
    this.code = code;
  }
}

export function validateGuestScenePrompt(
  input: unknown
): GuestSceneValidationResult {
  const parsed = guestScenePromptSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      code: "REQUIRED_FIELDS",
      error:
        "Please complete the required OC, connection, and dynamic fields before generating a preview.",
    };
  }

  if (!parsed.data.adultConfirmed) {
    return {
      ok: false,
      code: "ADULT_CONFIRMATION_REQUIRED",
      error:
        "Please confirm the mature romance prompt involves adult characters and should remain non-explicit.",
    };
  }

  const combinedPrompt = [
    parsed.data.oc,
    parsed.data.connection,
    parsed.data.dynamic,
    parsed.data.context,
    parsed.data.boundaries,
  ].join("\n");

  const blockedCheck = blockedPatternChecks.find((check) =>
    check.pattern.test(combinedPrompt)
  );

  if (blockedCheck) {
    return {
      ok: false,
      code: blockedCheck.code,
      error: blockedCheck.message,
    };
  }

  return {
    ok: true,
    prompt: parsed.data,
  };
}

export async function generateGuestScene(
  input: unknown,
  options: GenerateGuestSceneOptions = {}
): Promise<GuestSceneResult> {
  const validation = validateGuestScenePrompt(input);

  if (!validation.ok) {
    throw new GuestSceneInputError(validation.code, validation.error);
  }

  const env = options.env ?? process.env;
  const fetcher = options.fetcher ?? fetch;
  const apiKey = env.TEXT_API_KEY?.trim();

  if (!apiKey) {
    return createFallbackGuestScene(validation.prompt);
  }

  try {
    const modelResult = await generateWithEvolink(validation.prompt, {
      apiKey,
      baseUrl: env.TEXT_API_BASE_URL || "https://direct.evolink.ai/v1",
      model: env.TEXT_MODEL || "deepseek-v4-flash",
      fetcher,
    });

    return {
      ...modelResult,
      provider: "evolink",
    };
  } catch {
    return createFallbackGuestScene(validation.prompt);
  }
}

function createFallbackGuestScene(prompt: GuestScenePrompt): GuestSceneResult {
  const ocName = extractReadableName(prompt.oc);
  const counterpartName = extractReadableName(prompt.connection);
  const contextLine =
    prompt.context ||
    "a private fandom-adjacent setting shaped by the user's notes";
  const boundaryLine =
    prompt.boundaries || "mature romantic tension, no explicit scenes";

  if (prompt.locale === "zh") {
    return {
      provider: "local-fallback",
      sceneTitle: `${ocName} 与第一个谨慎选择`,
      sceneText: `${ocName} 总是比别人更早察觉变化。房间安静得不自然，连纸页边缘的水痕都像在替某个秘密屏住呼吸。桌子另一侧，${counterpartName} 停下翻看笔记的动作，也看向了同一个不可能存在的细节。\n\n他们谁都没有急着解释。这反而是 ${ocName} 第一次愿意相信的部分：不是确定性，而是克制。\n\n“如果我们把它写下两遍，”${ocName} 说，把纸页留在两人之间，“那就不必由一个人独自记住全部真相。”\n\n${counterpartName} 接过第二支笔。两人的手指没有碰到，但那一瞬间差点触碰的停顿已经足够改变空气。刚才还像竞争的东西，变成了更精准的关系：两个人谨慎地选择同一份危险，却还不要求对方把它命名。\n\n场景会保持在“${boundaryLine}”的边界里，把张力留在目光、共同证据，以及选择留下来的动作之中。`,
      memory: {
        oc: `OC 档案：${ocName} 被理解为敏锐、谨慎，更相信证据而不是轻易信任。`,
        dynamic: `关系动态：${prompt.dynamic}`,
        context: `故事背景：${contextLine}`,
        boundaries: `偏好与边界：${boundaryLine}`,
      },
    };
  }

  return {
    provider: "local-fallback",
    sceneTitle: `${ocName} and the first careful choice`,
    sceneText: `${ocName} noticed the change before anyone said it aloud. The room had gone too quiet, the kind of quiet that made every small movement feel like a confession. Across the table, ${counterpartName} stopped pretending to study the notes and looked at the same impossible detail.\n\nNeither of them reached for an easy explanation. That was the first thing ${ocName} trusted: not certainty, but restraint.\n\n\"If we write it down twice,\" ${ocName} said, keeping the page between them, \"then neither of us has to carry the whole truth alone.\"\n\n${counterpartName} took the second pen. Their fingers did not touch, but the pause before they almost did was enough to change the air. Whatever had been rivalry a moment ago became something more precise: two people choosing the same danger, carefully, without asking the other to name it yet.\n\nThe scene stayed within the boundary ${boundaryLine.toLowerCase()}, leaving the tension in the glance, the shared evidence, and the decision to stay.`,
    memory: {
      oc: `OC Profile: ${ocName} is inferred as observant, guarded, and motivated by proof rather than easy trust.`,
      dynamic: `Relationship Dynamic: ${prompt.dynamic}`,
      context: `Story Context: ${contextLine}`,
      boundaries: `Preferences & Boundaries: ${boundaryLine}`,
    },
  };
}

async function generateWithEvolink(
  prompt: GuestScenePrompt,
  options: {
    apiKey: string;
    baseUrl: string;
    model: string;
    fetcher: typeof fetch;
  }
) {
  const response = await options.fetcher(
    `${options.baseUrl.replace(/\/$/, "")}/chat/completions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: options.model,
        temperature: 0.8,
        max_tokens: 1400,
        messages: [
          {
            role: "system",
            content:
              "You write private fandom-adjacent OC scene previews. Return only valid JSON. Do not use real IP names, canon characters, real people, explicit erotica, or public posting framing. Keep mature romance non-explicit.",
          },
          {
            role: "user",
            content: buildGuestSceneInstruction(prompt),
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Guest scene model request failed");
  }

  const payload = (await response.json()) as EvolinkChatResponse;
  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Guest scene model returned no content");
  }

  return parseGuestSceneModelContent(content);
}

function buildGuestSceneInstruction(prompt: GuestScenePrompt) {
  return [
    "Generate one 250-400 word scene snippet and a mini memory card.",
    `Output language: ${prompt.locale === "zh" ? "Simplified Chinese" : "English"}.`,
    "Return JSON with sceneTitle, sceneText, and memory { oc, dynamic, context, boundaries }.",
    "",
    `OC / protagonist: ${prompt.oc}`,
    `Connection: ${prompt.connection}`,
    `Dynamic or trope: ${prompt.dynamic}`,
    `Context: ${prompt.context || "No extra context provided."}`,
    `Boundaries: ${prompt.boundaries || "Mature but non-explicit."}`,
  ].join("\n");
}

function parseGuestSceneModelContent(content: string) {
  const parsed = JSON.parse(stripJsonCodeFence(content));
  return guestSceneModelResponseSchema.parse(parsed);
}

function stripJsonCodeFence(content: string) {
  return content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
}

function extractReadableName(text: string) {
  const beforeComma = text.trim().split(/[,，\n]/)[0]?.trim();

  if (beforeComma && beforeComma.length <= 40) {
    return beforeComma;
  }

  return "the OC";
}
