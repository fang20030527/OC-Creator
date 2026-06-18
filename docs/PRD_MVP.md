# AI Fandom OC Creator MVP PRD

Last updated: 2026-06-18

## Problem Statement

English fandom users often have strong OC, reader-insert, AU, ship dynamic, trope, and relationship-fantasy ideas, but they struggle to turn private imagination into sustained drafts. Existing general AI chat tools can generate one-off prose, but they do not reliably preserve OC details, relationship dynamics, canon-aware constraints, boundaries, revision history, or project memory across repeated writing sessions.

The product must validate whether users will trust an AI writing tool with private fandom-adjacent creative material, save an OC project, revise it, and return to continue the same project.

## Solution

Build a private AI creative sandbox for mature but non-explicit fandom romance drafting. The MVP is a writing tool with interactive scene snippets, not a public community, AI companion, character chat room, or bulk publishing tool.

The core loop is:

1. A visitor enters a short OC/protagonist premise, connection, and desired dynamic/trope.
2. The system generates one real 250-400 word scene snippet.
3. The system extracts a mini memory card from the scene.
4. The visitor signs up to save the project and continue.
5. Logged-in users continue, rewrite, save versions, edit project memory, import limited URL notes, and optionally generate an OC-only preview portrait.

The MVP North Star metric is `D1 same-project continuation`: a user who saved their first scene returns within 24-48 hours to the same project and performs at least one meaningful creation action: continue, rewrite, save, or memory action.

## Target Users

1. English fandom users with strong OC, reader-insert, AU, trope, or relationship-dynamic ideas.
2. Users familiar with AO3, Wattpad, Tumblr, Discord, TikTok, or similar fandom ecosystems.
3. Users who care more about "the AI understands my OC and dynamic" than pure literary quality.
4. Users who want private drafting and asset continuity, not public posting or community distribution.
5. Default product audience is 18+.

## Product Positioning

The product is a private creative sandbox and fandom-savvy drafting companion. It is not:

1. A public fanfiction community.
2. A character chat or AI companion app.
3. A bulk AI publishing tool.
4. A canon/IP content library.
5. A tool for replicating official works, living authors, or living artists.
6. A tool for explicit erotica or sexualized visual generation.

## MVP Scope

### Core Functional Scope

1. Landing page with generic fandom-coded examples, not real IP names.
2. Visitor one-shot scene generation.
3. Signup after generated preview, not before.
4. Project Library for saved OC projects.
5. Draft Studio for scene generation, continue, rewrite, selected-text rewrite, and save version.
6. Project Memory with four editable areas:
   - OC Profile
   - Relationship Dynamic
   - Story Context
   - Preferences & Boundaries
7. Suggested memory extraction after generation or rewrite, requiring user confirmation before permanent save.
8. Linear version history with restore.
9. URL note import, limited and user-confirmed.
10. OC-only preview portrait generation after visual notes confirmation.
11. Basic export: copy text, `.txt`, `.md`, OC image download, suggested title/summary/tags.
12. Privacy controls: delete project, delete memory, delete URL notes, delete generated image, request account deletion.
13. Basic feedback channel: support email plus simple in-product feedback tags.

### MVP Non-Goals

1. No public community.
2. No one-click publish to AO3, Wattpad, Tumblr, or other platforms.
3. No official IP library.
4. No fandom/canon character autocomplete.
5. No popular ship templates.
6. No active web search agent.
7. No bulk crawling.
8. No full text import from chapters, books, scripts, or subtitles.
9. No file upload for PDF, DOCX, or TXT.
10. No image reference upload.
11. No canon character image generation.
12. No real person/RPF intimate fantasy.
13. No explicit erotica.
14. No rich text editor, comments, collaboration, or chapter management.
15. No PDF character card in MVP.
16. No advanced visual workflow: three-view sheets, expression sheets, outfit variants, interaction illustrations, comics, seed locking, or local image editing.
17. No points/credits system as a core MVP billing model.
18. No live chat widget or community support until after MVP.

## User Stories

1. As a visitor, I want to try one scene without signing up, so that I can judge whether the AI understands my idea.
2. As a visitor, I want to enter only a few fields, so that I do not have to fill a long character sheet before getting value.
3. As a visitor, I want to see a real generated snippet, so that the product does not feel like a fake demo.
4. As a visitor, I want to see a mini memory card after generation, so that I understand how the product will remember my OC and dynamic.
5. As a visitor, I want to sign up after seeing a useful result, so that creating an account feels worth it.
6. As a logged-in user, I want my guest scene to become a saved project, so that I do not lose the first idea.
7. As a logged-in user, I want to continue a scene, so that I can build momentum.
8. As a logged-in user, I want to rewrite a whole scene, so that I can adjust the emotional beat.
9. As a logged-in user, I want to rewrite selected text, so that I can fix one weak section without regenerating everything.
10. As a logged-in user, I want to save meaningful versions, so that I can return to a draft I liked.
11. As a logged-in user, I want autosave for the current draft, so that private writing is not lost.
12. As a logged-in user, I want to restore a prior version, so that experimentation feels safe.
13. As a logged-in user, I want the AI to suggest memory updates, so that my project becomes more consistent over time.
14. As a logged-in user, I want to approve memory changes before they are permanent, so that one-off requests do not pollute the project.
15. As a logged-in user, I want editable OC Profile fields, so that I can correct what the AI inferred.
16. As a logged-in user, I want editable Relationship Dynamic fields, so that the AI preserves the tension and affection style I want.
17. As a logged-in user, I want editable Story Context, so that AU and canon anchors are visible and controllable.
18. As a logged-in user, I want editable Preferences & Boundaries, so that content stays within my comfort limits.
19. As a user, I want to paste a URL as reference, so that I do not have to manually type every canon detail.
20. As a user, I want URL import to produce short notes for review, so that I control what becomes project context.
21. As a user, I want imported sources to show their origin, so that I can delete or revise them later.
22. As a user, I want the product to avoid claiming canon-perfect accuracy, so that expectations are clear.
23. As a user, I want consistency suggestions, so that obvious canon drift or relationship drift can be noticed without blocking my AU.
24. As a user, I want suggestions for 2-3 continuation directions, so that I can keep writing when I am stuck.
25. As a user, I want default third-person drafting, so that the output feels like fanfic writing rather than a companion chat.
26. As a reader-insert user, I want second-person POV as an option, so that x-reader style drafts are possible.
27. As a user, I want mature but non-explicit romance support, so that emotional tension and suggestive content are allowed without becoming explicit erotica.
28. As a user, I want adult-character confirmation for mature themes, so that the product keeps a clear age boundary.
29. As a user, I want non-judgmental safety refusals with alternatives, so that blocked requests can still become acceptable drafts.
30. As a user, I want OC-only preview portrait generation, so that I can visualize my OC without turning the product into an IP image generator.
31. As a user, I want to confirm visual notes before image generation, so that the first image is less likely to be wrong.
32. As a free user, I want one portrait retry with failure reasons, so that I can correct obvious visual mismatch.
33. As a user, I want private generated images, so that my OC visuals are not publicly exposed.
34. As a user, I want text and Markdown export, so that I can move drafts to other writing tools.
35. As a user, I want basic title, summary, and tag suggestions, so that I can prepare a draft for fandom writing workflows without one-click publishing.
36. As a user, I want to delete projects, memory, sources, and images, so that private content remains under my control.
37. As a user, I want assurance that private projects are not used for model training by default, so that I can trust the product.
38. As a product owner, I want analytics events without full private text, so that I can measure the core loop without creating unnecessary privacy risk.
39. As a product owner, I want D1 same-project continuation tracking, so that MVP validation is fast and tied to project retention.
40. As a product owner, I want payment triggers after activation, so that monetization does not kill the first creative loop.

## User Flow

### Landing Page

The landing page shows generic fandom-coded examples. It must not use real IP names, real canon characters, living artist styles, or official branding. The primary CTA is `Try your first scene`.

### Visitor Flow

Required fields:

1. Who is your OC/protagonist?
2. Who are they connected to?
3. What dynamic or trope do you want?

Optional fields:

1. Any canon/AU context the AI should know?
2. Any boundaries or hard no's?

Visitor output:

1. One 250-400 word scene snippet.
2. One mini memory card.
3. Signup CTA: save this OC and continue.

Visitor limits:

1. One generation per device/IP/session bucket.
2. No URL import.
3. No image generation.
4. No save unless signed in.

### Logged-In Flow

1. Guest scene becomes a saved project after signup.
2. User lands in Draft Studio.
3. User can continue, rewrite, selected-text rewrite, save version, restore version, accept/edit memory suggestions, import URL notes, and generate an OC portrait.
4. Project Library shows saved projects.

## Feature Requirements

### Draft Studio

1. Core generation unit is `scene snippet`, not full story, chapter, or chat session.
2. Logged-in generation length target is 300-800 words for MVP.
3. Actions:
   - generate first scene
   - continue
   - rewrite
   - selected-text rewrite
   - adjust POV/tone/intensity
   - save version
   - restore version
4. Default AI mode is `direct co-writer`: direct, low-explanation, non-judgmental, boundary-aware.
5. Optional `co-create mode` may provide more suggestions.

### Project Memory

MVP uses a semi-structured schema, not a graph database or canon ontology.

```json
{
  "oc_profile": {
    "name": "",
    "appearance": [],
    "personality": [],
    "desires": [],
    "weaknesses": [],
    "voice": [],
    "hard_no": []
  },
  "relationship_dynamic": {
    "counterpart": "",
    "current_status": "",
    "tension_sources": [],
    "affection_style": [],
    "conflict_rules": []
  },
  "story_context": {
    "fandom_or_setting": "",
    "au_or_timeline": "",
    "canon_anchors": [],
    "user_headcanon": [],
    "source_notes": []
  },
  "preferences_boundaries": {
    "tone": [],
    "pacing": "",
    "pov": "",
    "rating_boundary": "mature_non_explicit",
    "squicks": [],
    "must_include": [],
    "avoid": []
  }
}
```

Memory write rules:

1. Confirmed memory can be used in generation context.
2. Suggested memory cannot become permanent until user confirms.
3. User can edit or delete memory.
4. Project-level memory only. No cross-project global user memory in MVP.
5. One-off instructions do not automatically change memory.

### Version History

1. Current draft autosaves.
2. AI rewrite/continue automatically snapshots the previous draft.
3. User can manually save a version.
4. Free users can keep up to 10 saved versions.
5. Users can restore a version as current draft.
6. No diff, branching, merging, or complex version tree in MVP.

### URL Note Import

URL import is `user-provided URL note import`, not active search.

Requirements:

1. Free users can import up to 3 URLs per project.
2. Only publicly accessible pages are eligible.
3. No paid content, full chapters, copied books, scripts, subtitle pages, protected galleries, or obvious piracy sources.
4. The system extracts 5-10 short notes, not full text.
5. Notes enter a review state.
6. User confirms, edits, or deletes notes before they become Story Context.
7. Original page full text is not stored long term.
8. Source URL remains visible and deletable.
9. Product promise is `canon-aware, user-guided drafting`, not canon-perfect simulation.

### OC Preview Portrait

1. Login required.
2. OC only.
3. No canon characters.
4. No real person likeness.
5. No explicit or sexualized image.
6. No exact living artist style.
7. No interaction scene in MVP.
8. User must confirm visual notes before generation:
   - apparent adult age
   - hair
   - eyes/facial features
   - style or vibe
   - outfit/silhouette
   - key distinguishing element
9. Free user receives 1 generation plus 1 retry.
10. Retry requires a failure reason and allows visual note edits.
11. No seed locking, local editing, inpainting, or consistency workflow in MVP.

### Export

MVP supports:

1. Copy text.
2. Download `.txt`.
3. Download `.md`.
4. Download OC image.
5. Suggested title, summary, and tags.

MVP does not support:

1. PDF character card.
2. One-click publishing.
3. Fancy templates.

## Safety and Policy Requirements

### Content Boundary

MVP is `mature but non-explicit fandom romance sandbox`.

Allowed:

1. Romantic tension.
2. Suggestive implication.
3. Emotional intimacy.
4. Jealousy.
5. Yearning.
6. Angst.
7. Hurt/comfort.
8. Dark emotional themes.
9. Non-graphic violence.
10. Fade-to-black.

Not allowed:

1. Explicit sexual content.
2. Sexual content involving minors or minor-coded characters.
3. Non-consensual explicit sexual content.
4. Real person/RPF intimate fantasy.
5. Sexualized images.
6. Deepfake image, voice, or likeness requests.
7. Exact living artist or living author style imitation.
8. Long copyrighted text continuation or close imitation.
9. Automated spam publishing.

### Age Handling

1. Mature/romance flows require confirmation that involved characters are 18+.
2. Adult AU/post-canon adult versions are allowed only when explicitly adult.
3. Minor context, childlike traits, or original underage setting cannot be mixed with mature romantic/sexual framing.

### Safety Checks

1. Input pre-check before generation/import/image creation.
2. Output post-check before showing final generated content.
3. Prefer de-escalation when possible:
   - explicit to suggestive/fade-to-black
   - dark romance to emotional tension without explicit coercion
   - graphic violence to less graphic description
4. Refusal style: short reason plus safe alternative, no moral lecture.

## Privacy Requirements

1. Private by default.
2. No public sharing pages in MVP.
3. Private projects are not used to train or fine-tune models by default.
4. User can delete projects, memory, sources, and images.
5. User can request account deletion.
6. Analytics must not store full prompts or generated scenes.
7. Logs should avoid full private text and should have retention limits.
8. Admin/support access to private content must be minimized and auditable.
9. Third-party model and storage provider usage must be disclosed.

## Monetization

MVP primarily uses subscription, not a core points system.

### Free

1. 1 active project.
2. Daily limited text generation/rewrite/continue.
3. 300-800 word logged-in scene snippets.
4. Up to 10 saved versions.
5. Up to 3 URL imports per project.
6. Editable project memory.
7. 1 OC preview portrait plus 1 retry.
8. Text and Markdown export.
9. Watermarked or limited image export if needed.

### Plus

1. More projects.
2. Higher daily text limit.
3. Longer snippets.
4. More version history.
5. Deeper context/memory.
6. More URL imports.
7. HD no-watermark portrait.
8. More portrait retries/monthly image allowance.

Do not paywall:

1. First project save.
2. First rewrite.
3. First memory edit.
4. Basic text export.

## Metrics

### North Star

`D1 same-project continuation`: a user who saved their first scene returns within 24-48 hours to the same project and performs at least one meaningful creation action.

Meaningful actions:

1. Continue.
2. Rewrite.
3. Save new version.
4. Accept/edit memory.

### Core Funnel Events

1. Landing viewed.
2. Guest prompt started.
3. Guest snippet generated.
4. Mini memory shown.
5. Signup started.
6. Signup completed.
7. Project created.
8. First logged-in generation.
9. Rewrite clicked.
10. Continue clicked.
11. Save version clicked.
12. Memory suggestion shown.
13. Memory suggestion accepted.
14. D1 same-project continuation.
15. Export clicked.
16. Visual portrait generated.
17. Paid conversion started.
18. Paid conversion completed.

### Quality Feedback Events

1. Rated in-character.
2. Rated relationship dynamic right.
3. Rated preserved OC.
4. Marked too explicit.
5. Marked boundary crossed.
6. Marked canon/context wrong.
7. Marked source summary wrong.
8. Refusal appealed.

### Cost and Risk Events

1. Token usage bucket.
2. Image generation attempted/succeeded/failed.
3. Image task polling completed/failed.
4. URL import attempted/succeeded/rejected.
5. Safety refusal category.
6. Rate limit triggered.

## Technical Stack

### Chosen Stack

1. Next.js App Router.
2. Better Auth.
3. Prisma 7.
4. Neon Postgres.
5. Cloudflare R2.
6. Evolink DeepSeek text API.
7. Evolink GPT Image 2 image API.
8. Resend for magic link email.
9. Stripe for Plus subscription.
10. PostHog for product analytics.
11. Sentry for error monitoring.
12. Cloudflare Turnstile plus Redis/Upstash for anti-abuse if needed.

### Authentication

1. Better Auth with Google OAuth and email magic link.
2. No email/password login in MVP.
3. Better Auth Prisma adapter.
4. Next.js route handler at `/api/auth/[...all]`.

### Database

1. Neon Postgres.
2. Prisma 7 ORM.
3. Application runtime uses pooled `DATABASE_URL`.
4. Migration/schema tooling uses direct `DIRECT_URL`.
5. Do not put secrets in source control.

### Object Storage

1. Cloudflare R2 stores generated OC images.
2. Do not rely on Evolink temporary image URLs because they expire.
3. Evolink temporary result URL is downloaded by backend.
4. Backend uploads image bytes to R2.
5. Neon stores image metadata and R2 object key.
6. Private user images should be served through backend authorization, not public `r2.dev` URLs.
7. Public R2 URLs can be used only for marketing/demo assets.

### Evolink Text API

Endpoint:

```text
POST https://direct.evolink.ai/v1/chat/completions
```

Model:

```text
deepseek-v4-flash
```

Used for:

1. Scene generation.
2. Continue.
3. Rewrite.
4. Selected-text rewrite.
5. Memory suggestion extraction.
6. Title/summary/tags.
7. URL note extraction.

### Evolink Image API

Create task:

```text
POST https://api.evolink.ai/v1/images/generations
```

Model:

```text
gpt-image-2
```

Poll task:

```text
GET https://api.evolink.ai/v1/tasks/{task_id}
```

Expected flow:

1. Create image task.
2. Store task id.
3. Poll every 3-5 seconds.
4. On `completed`, read `results[0]`.
5. Download result immediately.
6. Upload to R2.
7. Store R2 key and metadata in Neon.
8. On failure, show task error message and retry affordance if available.

## Environment Variables

Do not commit real values. Use placeholders in `.env.example`.

```bash
# App
NEXT_PUBLIC_APP_URL=

# Neon / Prisma 7
DATABASE_URL=
DIRECT_URL=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email
RESEND_API_KEY=
EMAIL_FROM=
SUPPORT_EMAIL=

# Evolink Text
TEXT_API_BASE_URL=https://direct.evolink.ai/v1
TEXT_API_KEY=
TEXT_MODEL=deepseek-v4-flash

# Evolink Image
IMAGE_API_BASE_URL=https://api.evolink.ai/v1
IMAGE_API_KEY=
IMAGE_MODEL=gpt-image-2

# Cloudflare R2
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_ENDPOINT=
R2_REGION=auto
R2_PUBLIC_URL=

# Billing
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_PLUS_MONTHLY=

# Analytics / Monitoring
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
SENTRY_DSN=

# Anti-abuse
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Data Model Draft

Key entities:

1. User
2. Account/Session/Verification tables from Better Auth
3. Project
4. Draft
5. DraftVersion
6. ProjectMemory
7. MemorySuggestion
8. SourceNote
9. ImageAsset
10. GenerationEvent
11. FeedbackEvent
12. Subscription

Minimum relationships:

1. User has many Projects.
2. Project has one current Draft.
3. Project has many DraftVersions.
4. Project has one ProjectMemory document.
5. Project has many SourceNotes.
6. Project has many ImageAssets.
7. GenerationEvent belongs to User and Project.
8. FeedbackEvent belongs to User, Project, and optionally GenerationEvent.

## Implementation Decisions

1. MVP is a writing tool with interactive snippets, not character chat.
2. Generate-first onboarding is preferred over profile-first onboarding.
3. Landing page uses fandom-coded fictional examples, not real IP.
4. Canon character can be user-entered as text context, but is not a platform asset.
5. No canon character image generation.
6. Default POV is third person.
7. Reader-insert second person is supported.
8. Self-insert is soft-supported as private context but not used as primary marketing.
9. AI voice is direct co-writer, not therapist or fandom bestie.
10. Project memory is project-level only.
11. Context sent to the model must be layered:
    - system policy
    - confirmed Project Memory
    - current draft context
    - current user instruction
12. URL notes are short, user-confirmed notes, not stored webpage full text.
13. Visual generation is an emotional reward and login/retention feature, not the core loop.
14. R2 private storage is required for generated user images.
15. Prisma 7 plus Neon uses pooled runtime URL and direct migration URL.
16. Better Auth handles Google OAuth and magic link.
17. Stripe subscription comes after activation, not before first save.

## Testing Decisions

Tests should focus on external behavior, not implementation details.

Priority test areas:

1. Auth and resource ownership:
   - user cannot access another user's project
   - user cannot fetch another user's private image
2. Project lifecycle:
   - guest draft converts to saved project after signup
   - project deletion removes/deactivates memory, sources, and images
3. Draft actions:
   - continue creates a new draft state
   - rewrite preserves previous snapshot
   - restore sets selected version as current draft
4. Memory:
   - suggested memory is not used until confirmed
   - confirmed memory can be edited/deleted
5. URL import:
   - allowed public reference produces review notes
   - restricted/full-text-like content is rejected
   - confirmed notes enter Story Context
6. Image workflow:
   - image task is created
   - polling handles pending/completed/failed states
   - completed result is downloaded and stored to R2
   - private image endpoint enforces ownership
7. Safety:
   - explicit content is de-escalated or refused
   - minor sexual content is refused
   - real person intimate fantasy is refused
   - allowed mature non-explicit romance is not overblocked
8. Analytics:
   - funnel events are emitted
   - full private prompt/scene text is not sent to analytics

## Open Questions

1. Exact free daily text generation quota.
2. Plus pricing and monthly image allowance.
3. Whether to support Apple login in addition to Google OAuth and magic link.
4. Whether to use PostHog Cloud or self-hosted PostHog.
5. Whether to serve private R2 images by streaming through Next.js or generating short-lived signed URLs.
6. Whether to add Turnstile at launch or only after abuse appears.
7. Exact support email domain.
8. Whether to create a separate public R2 bucket for landing page demo assets.

## Further Notes

1. Secrets pasted during planning should be rotated before production or public deployment.
2. No issue tracker was configured in this workspace, so this PRD is published as a Markdown document instead of an issue.
3. If using Vercel, confirm Prisma 7, Neon adapter, and image streaming behavior in the target runtime before launch.
4. If using Server Actions, every mutation must validate session and resource ownership because Server Functions can be directly invoked.
