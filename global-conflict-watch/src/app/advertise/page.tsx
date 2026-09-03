import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Advertise & sponsorship",
  description:
    "Sponsorship placements on Global Conflict Watch, the editorial-independence rules that govern them, and the advertisers GCW will not accept.",
};

const AUDIENCE = [
  "Readers who need a daily, sourced view of cyber threats, the private-security market and defence-industry technology in one place — typically because their work touches more than one of those domains.",
  "Practitioner-weighted rather than general-interest: security and threat-intelligence teams, risk and resilience functions, defence and government-facing analysts, procurement and market researchers, journalists and academics working the same beats.",
  "Attentive rather than incidental. The product is a single briefing per day read deliberately, not a feed skimmed in passing, which tends to favour sponsors with something specific to say to a technical reader.",
];

const METRICS = [
  { label: "Newsletter subscribers", value: "To be confirmed" },
  { label: "Monthly site visitors", value: "To be confirmed" },
  { label: "Email open rate", value: "To be confirmed" },
  { label: "Reader seniority and sector mix", value: "To be confirmed" },
];

const PLACEMENTS = [
  {
    name: "Newsletter sponsor slot",
    format: "One sponsor per send, placed after the top line.",
    description:
      "A short labelled block inside the daily email. Copy is supplied by the sponsor and published as written, subject to the standards below; it is never woven into an editorial entry.",
  },
  {
    name: "Briefing sponsor",
    format: "One sponsor per edition, named in the edition header and footer.",
    description:
      "Supports the production of a single day's briefing. The sponsor is disclosed on the edition itself and has no visibility of the contents before publication.",
  },
  {
    name: "Site display",
    format: "Fixed slots on the homepage, archive and category pages.",
    description:
      "Static, self-hosted creative. No third-party ad networks, no behavioural targeting, no tracking pixels, and no scripts supplied by an advertiser.",
  },
  {
    name: "Regional sponsorship",
    format: "One sponsor per region page, for an agreed term.",
    description:
      "Association with a single tracked region — the Middle East, Eastern Europe, Asia-Pacific, Africa or the Americas. Sponsorship carries no influence over which stories are filed to that region.",
  },
];

const INDEPENDENCE = [
  "Sponsors never influence briefing content. They do not see editions before publication, do not receive advance notice of what is being covered, and cannot request the inclusion, exclusion, framing or timing of any entry. There is no arrangement under which a sponsor could.",
  "Sponsored items are always labelled as sponsored, in the same position and typography every time, and are visually distinct from editorial. Native advertising that reads as a briefing entry is not offered at any price.",
  "Sponsorship of a region, category or edition confers no editorial standing over it. If a sponsor becomes the subject of a story, the story runs on its ordinary merits, the sponsorship is disclosed in the entry, and the sponsor is offered no right of reply beyond the correction process available to anyone.",
  "Commercial arrangements are recorded and disclosed. Where a briefing covers an organisation with a current or recent commercial relationship with GCW, that relationship is stated in the entry.",
];

const UNACCEPTABLE = [
  "Weapons and munitions brokerage, arms dealing, or intermediary services in the transfer of lethal equipment.",
  "Surveillance-for-hire: commercial spyware, intrusion-as-a-service, deanonymisation and covert-tracking offerings.",
  "State propaganda, and outlets or agencies acting on behalf of a government to place messaging.",
  "Providers of offensive cyber capability, exploit brokerage, or credential and breach-data marketplaces.",
  "Recruitment for combat or paramilitary deployment, and intermediaries in the movement of contracted personnel into conflicts.",
  "Anything requiring undisclosed placement, editorial approval rights, or copy written to read as a briefing entry.",
];

export default function AdvertisePage() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10 lg:px-6 lg:py-14">
      <SectionHeading
        eyebrow="Sponsorship"
        title="Advertise on Global Conflict Watch"
        as="h1"
        description="A small number of clearly labelled placements, sold directly, on terms that keep the briefing independent. This page sets out what is available, what governs it, and what will not be accepted."
      />

      <div className="soft-panel mt-6 border-amber-300/25 bg-amber-400/[0.06] p-5 sm:p-6" role="note">
        <p className="eyebrow text-amber-200/80">Audience figures are not published yet</p>
        <p className="mt-2 max-w-[76ch] text-[14px] leading-relaxed text-slate-300">
          GCW does not publish subscriber counts, traffic figures or open rates it cannot yet substantiate. Every quantitative field
          on this page is marked to be confirmed and will be filled in from measured data, with the measurement period stated. Treat
          the audience description below as qualitative only.
        </p>
      </div>

      <section className="mt-12" aria-labelledby="audience">
        <SectionHeading eyebrow="Audience" title="Who reads GCW" id="audience" />
        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div className="soft-panel p-6 sm:p-8">
            <ul className="flex flex-col gap-4 text-[14px] leading-relaxed text-slate-400">
              {AUDIENCE.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="soft-panel p-6">
            <h3 className="text-[14px] font-semibold text-slate-100">Audience metrics</h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
              Placeholders. No figure below has been measured or verified.
            </p>
            <dl className="mt-5 flex flex-col gap-3">
              {METRICS.map((metric) => (
                <div key={metric.label} className="flex flex-wrap items-baseline justify-between gap-2">
                  <dt className="text-[13px] text-slate-300">{metric.label}</dt>
                  <dd className="pill pill-elevated">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="placements">
        <SectionHeading
          eyebrow="Placements"
          title="What is available"
          id="placements"
          description="Rates are set per placement and per term, and are not published. All placements are sold directly — GCW runs no ad network and serves no third-party creative."
        />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {PLACEMENTS.map((placement) => (
            <li key={placement.name}>
              <article className="soft-panel flex h-full flex-col gap-3 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill pill-muted">Rate to be confirmed</span>
                </div>
                <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-slate-50">{placement.name}</h3>
                <p className="text-[13px] font-medium text-cyan-200/80">{placement.format}</p>
                <p className="text-[14px] leading-relaxed text-slate-400">{placement.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="independence">
        <SectionHeading eyebrow="Policy" title="Editorial independence" id="independence" />
        <div className="soft-panel mt-6 p-6 sm:p-8">
          <ol className="flex flex-col gap-4 text-[14px] leading-relaxed text-slate-400">
            {INDEPENDENCE.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-0.5 font-mono text-[13px] text-cyan-300/50">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="unacceptable">
        <SectionHeading
          eyebrow="Policy"
          title="Advertisers GCW will not accept"
          id="unacceptable"
          description="Some categories are refused outright, because carrying them would compromise the beat GCW reports on. This list is not exhaustive and the decision rests with the publication."
        />
        <div className="soft-panel mt-6 p-6 sm:p-8">
          <ul className="flex flex-col gap-3 text-[14px] leading-relaxed text-slate-400">
            {UNACCEPTABLE.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-red-400/60" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="sponsor-contact">
        <SectionHeading eyebrow="Contact" title="Enquiries" id="sponsor-contact" />
        <div className="soft-panel mt-6 p-6 sm:p-8">
          <p className="max-w-[68ch] text-[14px] leading-relaxed text-slate-400">
            Sponsorship enquiries go to the address below. Include the placement you are interested in, the term, and the copy or
            creative you have in mind. Requests for editorial input, pre-publication review, or unlabelled placement will be declined
            without a rate being quoted.
          </p>
          <p className="mt-5 font-mono text-[16px] text-cyan-100">sponsors@example.com</p>
          <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
            Placeholder address — the live sponsorship mailbox has not been set up yet. Do not send anything to it.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-[13px]">
            <Link href="/about" className="text-cyan-200 hover:text-cyan-100">
              Editorial standards →
            </Link>
            <Link href="/data#methodology" className="text-cyan-200 hover:text-cyan-100">
              Methodology →
            </Link>
            <Link href="/pricing" className="text-cyan-200 hover:text-cyan-100">
              Reader access tiers →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
