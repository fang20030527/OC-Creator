import {
  ArrowRight,
  BookOpenText,
  Check,
  Feather,
  FileText,
  LockKeyhole,
  PenLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/button";

const promptFields = [
  {
    label: "Who is your OC/protagonist?",
    value: "Mara, a guarded archive runner with a reckless streak",
  },
  {
    label: "Who are they connected to?",
    value: "A rival investigator who keeps noticing her blind spots",
  },
  {
    label: "What dynamic or trope do you want?",
    value: "Reluctant allies, slow-burn trust, almost-confessions",
  },
];

const memoryCards = [
  {
    title: "OC Profile",
    body: "Guarded, clever, easily baited by mysteries, avoids asking for help.",
  },
  {
    title: "Relationship Dynamic",
    body: "Suspicion turning into precise care; tension rises when either one protects the other.",
  },
  {
    title: "Story Context",
    body: "A rain-heavy archive city, missing records, and a case neither side can solve alone.",
  },
  {
    title: "Preferences & Boundaries",
    body: "Third-person, intimate tension, fade-to-black, no explicit scenes.",
  },
];

const steps = [
  {
    title: "Enter a short premise",
    body: "Start with only your OC, their connection, and the dynamic you want.",
  },
  {
    title: "Generate one real snippet",
    body: "Get a 250-400 word scene preview before creating an account.",
  },
  {
    title: "Review the memory card",
    body: "See what the system inferred about your OC, relationship, context, and boundaries.",
  },
  {
    title: "Save only if it works",
    body: "Signup appears after the preview, so saving feels earned instead of forced.",
  },
];

const trustItems = [
  "Private projects by default",
  "You approve what becomes memory",
  "Delete projects, memory, sources, and images",
  "Mature romantic tension, not explicit erotica",
  "No public posting or canon library",
  "Private projects are not used for model training by default",
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e5c3d]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-3xl font-semibold tracking-normal text-[#211713] md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[#67544a] md:text-lg">
        {description}
      </p>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="relative border border-[#d7c5b7] bg-[#fffaf4] p-4 shadow-[12px_12px_0_#d8b28e]">
      <div className="flex items-center justify-between border-b border-[#e4d7cc] pb-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8e5c3d]">
            Guest scene draft
          </p>
          <p className="mt-1 font-serif text-xl font-semibold text-[#241812]">
            Try before signup
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center border border-[#d7c5b7] bg-[#f4eadf] text-[#6f432e]">
          <Feather className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {promptFields.map((field) => (
          <div
            key={field.label}
            className="border border-[#eadccd] bg-[#fffdf8] p-3"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8e5c3d]">
              {field.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#43332b]">
              {field.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 border border-[#2f211b] bg-[#241812] p-4 text-[#f8efe5]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#e0b274]">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Scene snippet
        </div>
        <p className="mt-3 text-sm leading-7">
          Rain silvered the archive windows while Mara pretended not to notice
          how close Vale stood. He had found the missing ledger first, of
          course. He always found the thing she needed a second before she did.
          But this time he did not smile. He only turned the book toward her,
          one gloved finger resting beside a name they both recognized.
        </p>
      </div>

      <div className="mt-4 border border-[#d7c5b7] bg-[#f5ecdf] p-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#7b5037]">
          <BookOpenText className="h-4 w-4" aria-hidden="true" />
          Mini memory card
        </div>
        <div className="mt-3 grid gap-2 text-sm text-[#43332b] sm:grid-cols-2">
          <span>OC: guarded archive runner</span>
          <span>Dynamic: rival care</span>
          <span>Tone: intimate tension</span>
          <span>Boundary: non-explicit</span>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f3eadf] px-5 pb-16 pt-32 md:pb-20 md:pt-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "url(/noise.webp)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-[#d7c5b7]" />
      <div className="pointer-events-none absolute inset-y-0 left-[9%] w-px bg-[#e1d0c2]" />
      <div className="pointer-events-none absolute inset-y-0 right-[9%] w-px bg-[#e1d0c2]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex items-center gap-2 border border-[#d7c5b7] bg-[#fff8ee] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7b5037]">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Private by default
          </div>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-normal text-[#211713] md:text-7xl">
            Turn a private OC idea into a real first scene.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f4c43] md:text-xl">
            AI Fandom OC Creator is a private co-writing sandbox for OC,
            reader-insert, AU, trope, and relationship-dynamic drafts. Try one
            scene before signup, then save only if the result feels worth
            continuing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              as="a"
              href="#try-first-scene"
              size="lg"
              className="bg-[#241812] text-[#fff8ee] hover:bg-[#3a291f]"
            >
              <span>Try your first scene</span>
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              as="a"
              href="#privacy"
              variant="outline"
              size="lg"
              className="border-[#cdb9a8] bg-[#fff8ee] text-[#2b1d17] hover:bg-[#f2e3d2] hover:text-[#2b1d17]"
            >
              <ShieldCheck className="mr-2 h-4 w-4" aria-hidden="true" />
              Privacy and boundaries
            </Button>
          </div>
          <div className="mt-7 grid max-w-xl gap-3 text-sm text-[#6b574d] sm:grid-cols-3">
            <span>18+ audience</span>
            <span>Mature, non-explicit</span>
            <span>No public posting</span>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function TryFirstSceneSection() {
  return (
    <section
      id="try-first-scene"
      className="border-y border-[#d7c5b7] bg-[#fffaf4] px-5 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e5c3d]">
            Preview form
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#211713] md:text-5xl">
            Start small. Keep control.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#67544a]">
            This first version is a landing-page preview. It shows the exact
            guest fields from the PRD without saving private text or calling the
            generation backend yet.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {promptFields.map((field) => (
            <label
              key={field.label}
              className="flex min-h-44 flex-col border border-[#d7c5b7] bg-[#fffdf8] p-4"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8e5c3d]">
                {field.label}
              </span>
              <textarea
                className="mt-4 min-h-24 flex-1 resize-none border border-[#e6d7c8] bg-[#fffaf4] p-3 text-sm leading-6 text-[#43332b] outline-none transition focus:border-[#8e5c3d]"
                defaultValue={field.value}
                aria-label={field.label}
              />
            </label>
          ))}
          <label className="flex min-h-36 flex-col border border-[#d7c5b7] bg-[#fffdf8] p-4 md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8e5c3d]">
              Any canon/AU context the AI should know?
            </span>
            <textarea
              className="mt-4 min-h-20 flex-1 resize-none border border-[#e6d7c8] bg-[#fffaf4] p-3 text-sm leading-6 text-[#43332b] outline-none transition focus:border-[#8e5c3d]"
              defaultValue="A city where records can disappear from memory unless someone writes them twice."
              aria-label="Any canon or AU context the AI should know?"
            />
          </label>
          <label className="flex min-h-36 flex-col border border-[#d7c5b7] bg-[#fffdf8] p-4">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8e5c3d]">
              Boundaries or hard nos?
            </span>
            <textarea
              className="mt-4 min-h-20 flex-1 resize-none border border-[#e6d7c8] bg-[#fffaf4] p-3 text-sm leading-6 text-[#43332b] outline-none transition focus:border-[#8e5c3d]"
              defaultValue="Keep it romantic but non-explicit."
              aria-label="Boundaries or hard no's?"
            />
          </label>
          <div className="flex flex-col justify-between border border-[#241812] bg-[#241812] p-4 text-[#fff8ee] md:col-span-3 md:flex-row md:items-center">
            <div>
              <p className="font-serif text-2xl font-semibold">
                Generate a 250-400 word scene preview
              </p>
              <p className="mt-2 text-sm leading-6 text-[#e8d5c4]">
                Backend generation comes next. Signup stays after preview value.
              </p>
            </div>
            <Button
              as="button"
              size="lg"
              className="mt-5 bg-[#e0b274] text-[#211713] hover:bg-[#f0c384] md:mt-0"
            >
              <PenLine className="mr-2 h-4 w-4" aria-hidden="true" />
              Try your first scene
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#f7efe5] px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="How it works"
        title="A first scene before the account wall."
        description="The landing page sets up the PRD funnel: create momentum first, then ask the visitor to save the project."
      />

      <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="min-h-64 border border-[#d7c5b7] bg-[#fffaf4] p-5"
          >
            <div className="flex h-9 w-9 items-center justify-center border border-[#c7aa91] bg-[#f2dfc9] font-mono text-sm font-semibold text-[#6c402b]">
              {index + 1}
            </div>
            <h3 className="mt-6 font-serif text-2xl font-semibold text-[#211713]">
              {step.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#67544a]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MemorySection() {
  return (
    <section id="memory" className="bg-[#ecefe8] px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#3f7368]">
            Project memory
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#17211e] md:text-5xl">
            It remembers the dynamic, not just the last prompt.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#4d635d]">
            Each project keeps editable memory in four plain areas. Suggested
            updates stay suggestions until the user accepts or edits them.
          </p>
          <div className="mt-8 border border-[#b9cbc4] bg-[#f8fbf7] p-5 text-sm leading-7 text-[#435b55]">
            <p className="font-semibold text-[#17211e]">
              One-off instructions do not automatically become permanent memory.
            </p>
            <p className="mt-2">
              That keeps experiments safe and prevents a single rewrite request
              from polluting the project.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {memoryCards.map((card) => (
            <div
              key={card.title}
              className="min-h-56 border border-[#b9cbc4] bg-[#f8fbf7] p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center border border-[#9bb5ad] bg-[#e1ebe6] text-[#2e635a]">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#17211e]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#4d635d]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section id="privacy" className="bg-[#211713] px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#e0b274]">
            Privacy and boundaries
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#fff8ee] md:text-5xl">
            Private fandom-adjacent drafting, with clear edges.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#decbbb]">
            The page avoids real IP names, official characters, living artist
            styles, and public community promises. It frames the product as a
            private writing tool for mature but non-explicit romance tension.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {trustItems.map((item) => (
            <div
              key={item}
              className="flex min-h-24 items-start gap-3 border border-[#574238] bg-[#2b1d17] p-4 text-[#f5eadf]"
            >
              <Check
                className="mt-1 h-4 w-4 flex-none text-[#e0b274]"
                aria-hidden="true"
              />
              <span className="text-sm leading-6">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="bg-[#f3eadf] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e5c3d]">
          No signup until preview
        </p>
        <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#211713] md:text-6xl">
          Give the idea one honest scene.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#67544a]">
          If the first snippet understands the OC and the dynamic, the next step
          is saving the project and continuing in Draft Studio.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            as="a"
            href="#try-first-scene"
            size="lg"
            className="bg-[#241812] text-[#fff8ee] hover:bg-[#3a291f]"
          >
            <PenLine className="mr-2 h-4 w-4" aria-hidden="true" />
            Try your first scene
          </Button>
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#211713]">
      <HeroSection />
      <TryFirstSceneSection />
      <HowItWorksSection />
      <MemorySection />
      <PrivacySection />
      <FinalCtaSection />
    </div>
  );
}
