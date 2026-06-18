# Landing Page Design Spec

Date: 2026-06-18

## Approved Direction

Build the first landing page for **AI Fandom OC Creator** using the approved **Editorial Workshop** direction.

The page should feel like a private, warm, literary writing studio rather than a generic AI SaaS page. It should earn trust quickly, explain the generate-first onboarding loop, and invite visitors to try one scene before signing up.

## PRD Requirements Preserved

The landing page must follow the MVP PRD:

1. Position the product as a private AI creative sandbox for mature but non-explicit fandom-adjacent romance drafting.
2. Use generic fandom-coded fictional examples only.
3. Do not use real IP names, real canon character names, official branding, living artist styles, or real person/RPF intimate fantasy framing.
4. Make the primary CTA exactly: `Try your first scene`.
5. Communicate that visitors can generate one real 250-400 word scene snippet before signup.
6. Show that the product extracts a mini memory card from the generated scene.
7. Keep the product distinct from public fanfiction communities, character chat apps, AI companion apps, and bulk publishing tools.
8. Reinforce privacy: projects are private by default, user-controlled, and not used for model training by default.
9. Preserve the content boundary: mature romantic tension is allowed, explicit erotica and sexualized visual generation are not.

## Page Goal

The page should optimize for the PRD funnel:

1. Landing viewed.
2. Guest prompt started.
3. Guest snippet generated.
4. Mini memory shown.
5. Signup started after value is visible.

The first page does not need to implement real generation yet, but the visual and copy should clearly prepare the user for that flow.

## Visual Direction

Use a restrained editorial palette:

1. Warm parchment or soft paper background.
2. Dark ink text.
3. Muted amber, clay, or aged-gold accents.
4. Subtle ruled lines, paper texture, or manuscript-inspired dividers.
5. Cards with small radii, crisp borders, and writing-tool density.

Avoid:

1. Purple-blue AI gradients.
2. Generic glassmorphism SaaS sections.
3. Fake company logos.
4. Public community/social proof styling.
5. Anime/IP-specific imagery or references.

The first viewport should immediately show the product name, the writing promise, the primary CTA, and a preview of the actual input-to-scene experience.

## Content Architecture

### Hero

Hero content:

1. Product name: **AI Fandom OC Creator**.
2. Headline direction: turn a private OC idea into a real first scene.
3. Supporting copy: a private co-writing sandbox for OC, reader-insert, AU, trope, and relationship-dynamic drafting.
4. Primary CTA: `Try your first scene`.
5. Secondary reassurance: private by default, 18+, mature but non-explicit.

Hero visual:

1. A compact prompt card with three required fields:
   - Who is your OC/protagonist?
   - Who are they connected to?
   - What dynamic or trope do you want?
2. Optional fields can be hinted but not dominate:
   - Canon/AU context.
   - Boundaries or hard no's.
3. A fictional generated scene preview using invented names and no real IP.
4. A mini memory card teaser below or beside the scene preview.

### How It Works

Show the generate-first loop in four steps:

1. Enter a short premise.
2. Generate one real 250-400 word scene snippet.
3. Review the mini memory card.
4. Sign up only if the scene is worth saving.

This section should reduce anxiety about long setup forms.

### Memory Value

Explain that the product remembers project-level context through four editable areas:

1. OC Profile.
2. Relationship Dynamic.
3. Story Context.
4. Preferences & Boundaries.

This section should make memory feel user-controlled, not mysterious.

### Privacy And Boundaries

Show a concise trust section:

1. Private projects by default.
2. Delete project, memory, sources, and images.
3. No public sharing pages in MVP.
4. No training/fine-tuning on private projects by default.
5. Mature romantic tension supported; explicit erotica and unsafe requests are de-escalated or refused.

### Final CTA

Repeat the core invitation:

1. `Try your first scene`.
2. Small supporting line: no signup required until after the preview.

## Component Plan

When implementation begins, borrow these Starter Kit patterns:

1. Next.js App Router route structure.
2. Locale-aware routing and `next-intl` message files if the project keeps bilingual support.
3. Existing navigation shell, button component, container component, metadata helper, and theme provider where useful.
4. Existing auth entry points only as navigation targets, not as forced first-step signup.

Replace these Starter Kit defaults:

1. SaaS starter copy.
2. Generic testimonials.
3. Company logos.
4. Docs-first CTA.
5. Demo pages that imply chat/image/video as the core product.
6. Credits-first monetization language.

## Interaction Behavior

The first landing version may be static or semi-static:

1. CTA can link to a future guest scene route or anchor to a preview form section.
2. The prompt preview can be non-functional if backend generation is not ready.
3. If a form is shown, it should collect only the PRD visitor fields and avoid saving private text until the actual generation flow is implemented.
4. Signup prompts should appear after preview value, not before.

## Error And Safety Copy

The landing page should avoid long policy explanations. It can use short trust notes:

1. "Private by default."
2. "Mature tension, not explicit erotica."
3. "You approve what becomes memory."
4. "No public posting or canon library."

If sample copy mentions refusal behavior, phrase it as a safe alternative path, not a moral lecture.

## Testing And Verification

Implementation should be verified with:

1. Build or lint command available in the adopted Starter Kit.
2. Desktop and mobile visual inspection.
3. CTA text check: primary CTA remains `Try your first scene`.
4. Content scan for forbidden references:
   - real IP names
   - canon character names
   - official branding
   - real person/RPF intimate framing
   - living artist style prompts
5. Text overflow check on mobile.

## Out Of Scope For This Page

Do not add these while building the landing page:

1. Public community features.
2. Character chat positioning.
3. One-click publishing.
4. Canon/IP libraries.
5. Real generation backend unless explicitly included in the next implementation plan.
6. OC portrait generation workflow.
7. Pricing table as a first-page priority.
8. Testimonials from fake users.

## Implementation Defaults

1. Scaffold the current workspace from the Starter Kit first, excluding `.git`, `node_modules`, local environment files, and generated build output.
2. Treat English landing copy as the source of truth because the PRD targets English fandom users.
3. Preserve the Starter Kit's locale-ready structure if it is copied, but do not let localization work expand the landing-page scope.
4. Point `Try your first scene` to an on-page `#try-first-scene` preview section until the real guest generation route exists.
