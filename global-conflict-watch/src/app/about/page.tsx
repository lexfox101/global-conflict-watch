import type { Metadata } from "next";
import Link from "next/link";
import { FREE_ARCHIVE_DAYS, allBriefings, allStoryRefs } from "@/data/briefings";
import { CONFIDENCE_LEVELS } from "@/types/briefing";
import { Prose } from "@/components/site/Prose";
import { SectionHeading } from "@/components/site/SectionHeading";
import { confidenceDescription } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "About & editorial standards",
  description:
    "What Global Conflict Watch is, how each briefing is produced, the sourcing and verification standards behind every entry, and how corrections, independence and reader privacy are handled.",
};

const WHAT_IT_IS = [
  "Global Conflict Watch is a daily open-source intelligence briefing. One edition is published each day across three domains that are usually covered separately: cyber threats, the private-security market, and defence-industry technology. The premise is that a reader whose work touches more than one of those areas should not have to assemble the picture from three different products.",
  "It is a publication, not an intelligence service. Everything in it is drawn from material anyone can reach: reporting, official advisories, filings, and published research. It holds no classified material, runs no collection of its own, and has no privileged access to any government or company.",
];

const MISSION = [
  "The editorial mission is narrow and deliberately unglamorous: report what is known, show where it came from, and make the difference between a confirmed fact and an interested party's claim impossible to miss.",
  "That means preserving hedging language rather than smoothing it away. If reporting says a development is alleged, reported, or claimed, the briefing says the same. Figures that come from an attacker, a belligerent or a manufacturer are labelled as such. Where a story rests on one outlet alone, the entry says so instead of implying broader corroboration.",
  "It also means recording absence. Each section carries a coverage note describing what was searched without result, so a quiet day reads as a quiet day rather than as a gap in collection.",
];

const PRODUCTION = [
  "Each cycle begins with a sweep of open sources across the three domains: national-authority advisories and vulnerability catalogues, vendor security bulletins, court and regulatory filings, procurement and contract announcements, human-rights and research-organisation output, and general reporting.",
  "Candidate items are then assessed for consequence rather than novelty. An entry earns a place if it changes what a practitioner should do, watch or expect — not because it is the loudest headline of the morning.",
  "Every entry that survives is written with a threat level, a confidence rating, one or more region tags, a threat category, and links to the publications it draws on. The edition's top line names the single most consequential development and explains why it matters across domains, and the global threat level is derived from the most severe story in the edition rather than set by hand.",
  "Source links point to publication homepages rather than individual articles, because homepages persist and article URLs decay. Illustrative sample editions, which exist to demonstrate the format, are labelled as samples and carry no source attributions at all.",
];

const VERIFICATION = [
  "Corroboration is graded on every story using four ratings, shown on the story itself. The rating describes the evidence, not the importance of the item — a Critical story can carry a low confidence rating, and frequently does.",
  "The line that matters most is between confirmed and claimed. Confirmed means the responsible organisation, or an official advisory, has stated it directly. Claimed or unverified means an involved party has asserted it and nobody independent has confirmed it. GCW will publish a significant claim while it is still only a claim, but it will not present it as anything else.",
];

const CORRECTIONS = [
  "Errors are corrected in place, and the correction is described rather than quietly applied. Where a later development overturns an earlier entry, the newer edition says so and points back to what it supersedes; entries are not deleted to tidy the record.",
  "A correction request is most useful when it identifies the specific claim, what is wrong with it, and a primary source. Requests of that kind are acted on first. Complaints about framing or emphasis are read and answered, but they are handled separately from factual corrections and do not result in an entry being removed.",
  "There is no editorial complaints board. Complaints are handled by the operator directly, and the process above is the whole of it — described plainly rather than dressed up as something more formal than it is.",
];

const INDEPENDENCE = [
  "Global Conflict Watch is independent. It is not affiliated with, endorsed by, or funded by any government, military, intelligence service, political organisation, or defence contractor, and it accepts no funding conditioned on coverage.",
  "Funding is currently limited to the operator's own resources. No revenue is being collected: subscriptions are not billable because no payment system is connected, and no sponsorship has been sold. If and when that changes, the intended sources are reader subscriptions and clearly labelled sponsorship, on the terms set out on the advertise page.",
  "Sponsors will never influence briefing content. Sponsored items are always labelled, and where a briefing covers an organisation with a current or recent commercial relationship with GCW, that relationship is stated in the entry.",
];

const PRIVACY = [
  "The newsletter signup on this site is a front-end demonstration. There is no mailing backend connected: an address entered into it is held in browser memory for the life of the page and is not transmitted, stored or shared anywhere.",
  "The intended standing policy for when delivery is connected: an address is used to send the briefing and nothing else. It is not sold, rented, or passed to sponsors or any third party beyond the email delivery provider needed to send the mail. No profiling and no behavioural tracking of readers.",
  "Unsubscribing will remove the address from the sending list rather than flag it as inactive. Correction and enquiry correspondence is kept only as long as needed to deal with it.",
];

export default function AboutPage() {
  const storyCount = allStoryRefs().length;

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-10 lg:px-6 lg:py-14">
      <SectionHeading
        eyebrow="About"
        title="What Global Conflict Watch is, and how it works"
        as="h1"
        description="This page is the trust record: what the publication is, how each briefing is put together, what the confidence ratings mean, and how corrections, funding and reader data are handled."
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="pill pill-muted">{allBriefings.length} editions published</span>
        <span className="pill pill-muted">{storyCount} stories</span>
        <span className="pill pill-muted">{FREE_ARCHIVE_DAYS}-day free window</span>
      </div>

      <div className="mt-12 flex flex-col gap-14">
        <section aria-labelledby="what-it-is">
          <h2 id="what-it-is" className="text-[24px] font-semibold tracking-[-0.02em] text-slate-50">
            What it is
          </h2>
          <Prose paragraphs={WHAT_IT_IS} className="mt-4" />
        </section>

        <section aria-labelledby="mission">
          <h2 id="mission" className="text-[24px] font-semibold tracking-[-0.02em] text-slate-50">
            Editorial mission
          </h2>
          <Prose paragraphs={MISSION} className="mt-4" />
        </section>

        <section aria-labelledby="production">
          <h2 id="production" className="text-[24px] font-semibold tracking-[-0.02em] text-slate-50">
            How a briefing is produced
          </h2>
          <Prose paragraphs={PRODUCTION} className="mt-4" />
        </section>

        <section aria-labelledby="verification">
          <h2 id="verification" className="text-[24px] font-semibold tracking-[-0.02em] text-slate-50">
            Sourcing and verification standards
          </h2>
          <Prose paragraphs={VERIFICATION} className="mt-4" />

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {CONFIDENCE_LEVELS.map((confidence) => (
              <div key={confidence} className="soft-panel p-5">
                <dt className="text-[14px] font-semibold text-slate-100">{confidence}</dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{confidenceDescription[confidence]}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-[13px] text-slate-500">
            The full methodology, including the correction policy and the standing caveat on time-sensitive figures, is set out on the{" "}
            <Link href="/data#methodology" className="text-cyan-200 hover:text-cyan-100">
              data page
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="corrections">
          <h2 id="corrections" className="text-[24px] font-semibold tracking-[-0.02em] text-slate-50">
            Corrections and complaints
          </h2>
          <Prose paragraphs={CORRECTIONS} className="mt-4" />
        </section>

        <section aria-labelledby="independence">
          <h2 id="independence" className="text-[24px] font-semibold tracking-[-0.02em] text-slate-50">
            Independence and funding
          </h2>
          <Prose paragraphs={INDEPENDENCE} className="mt-4" />
        </section>

        <section aria-labelledby="privacy">
          <h2 id="privacy" className="text-[24px] font-semibold tracking-[-0.02em] text-slate-50">
            Newsletter data and privacy
          </h2>
          <Prose paragraphs={PRIVACY} className="mt-4" />
        </section>

        <section aria-labelledby="operator">
          <h2 id="operator" className="text-[24px] font-semibold tracking-[-0.02em] text-slate-50">
            Who produces it
          </h2>
          <div className="soft-panel mt-4 border-amber-300/25 bg-amber-400/[0.06] p-6 sm:p-7" role="note">
            <p className="eyebrow text-amber-200/80">Placeholder — to be written by the operator</p>
            <p className="mt-3 max-w-[68ch] text-[14px] leading-relaxed text-slate-300">
              This block is intentionally unwritten. Nothing about the operator&apos;s background, employment history, qualifications
              or clearances has been assumed or drafted on their behalf, because inventing any of it would undermine the point of this
              page.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5 text-[13px] leading-relaxed text-slate-400">
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-amber-300/60" />
                <span>TODO: name, or a stated decision to publish under the GCW masthead without a byline.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-amber-300/60" />
                <span>TODO: relevant professional background, in whatever detail you are willing to stand behind publicly.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-amber-300/60" />
                <span>TODO: why you started GCW, and what you are trying to be useful for.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-amber-300/60" />
                <span>TODO: declarable interests — current employment, consulting, holdings or affiliations a reader should know about.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-amber-300/60" />
                <span>TODO: whether anyone else contributes to editions, and in what capacity.</span>
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="contact">
          <h2 id="contact" className="text-[24px] font-semibold tracking-[-0.02em] text-slate-50">
            Contact
          </h2>
          <div className="soft-panel mt-4 p-6 sm:p-7">
            <dl className="grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-[13px] font-semibold text-slate-200">Corrections</dt>
                <dd className="mt-1 font-mono text-[14px] text-cyan-100">corrections@example.com</dd>
                <dd className="mt-1 text-[12px] leading-relaxed text-slate-500">
                  Identify the entry, the claim, and a primary source.
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-semibold text-slate-200">Editorial and general</dt>
                <dd className="mt-1 font-mono text-[14px] text-cyan-100">editor@example.com</dd>
                <dd className="mt-1 text-[12px] leading-relaxed text-slate-500">
                  Coverage questions, complaints, institutional access enquiries.
                </dd>
              </div>
            </dl>
            <p className="mt-5 text-[12px] leading-relaxed text-slate-500">
              Both addresses are placeholders. The live mailboxes have not been set up yet, so nothing sent to them will arrive.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-[13px]">
              <Link href="/data#methodology" className="text-cyan-200 hover:text-cyan-100">
                Methodology →
              </Link>
              <Link href="/pricing" className="text-cyan-200 hover:text-cyan-100">
                Access tiers →
              </Link>
              <Link href="/advertise" className="text-cyan-200 hover:text-cyan-100">
                Sponsorship policy →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
