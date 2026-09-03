import type { Metadata } from "next";
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
    <div className="mx-auto w-full max-w-[900px] px-4 py-14 lg:px-6 lg:py-20">
      <SectionHeading
        title="Advertise on Global Conflict Watch"
        as="h1"
        description="A small number of clearly labelled placements, sold directly, on terms that keep the briefing independent. Sponsorship enquiries go to sponsors@example.com."
      />

      <div className="soft-panel panel-note mt-10 p-6" role="note">
        <p className="type-meta text-flag">Audience figures are not published yet</p>
        <p className="type-body mt-2 max-w-[76ch] text-ink-body">
          GCW does not publish subscriber counts, traffic figures or open rates it cannot yet substantiate. Every quantitative field
          on this page is marked to be confirmed and will be filled in from measured data, with the measurement period stated. Treat
          the audience description below as qualitative only.
        </p>
      </div>

      <section className="mt-20" aria-labelledby="audience">
        <h2 id="audience" className="type-heading border-b border-rule pb-4">
          Who reads GCW
        </h2>
        <ul className="type-body mt-6 flex flex-col gap-4 text-muted">
          {AUDIENCE.map((item) => (
            <li key={item} className="max-w-[74ch]">
              {item}
            </li>
          ))}
        </ul>

        <dl className="mt-8 flex flex-col">
          {METRICS.map((metric) => (
            <div key={metric.label} className="flex flex-wrap items-baseline justify-between gap-2 border-t border-rule py-3">
              <dt className="type-body text-muted">{metric.label}</dt>
              <dd className="type-meta text-flag">{metric.value}</dd>
            </div>
          ))}
        </dl>
        <p className="type-body mt-3 text-muted">Placeholders. No figure above has been measured or verified.</p>
      </section>

      <section className="mt-20" aria-labelledby="placements">
        <h2 id="placements" className="type-heading border-b border-rule pb-4">
          What is available
        </h2>
        <p className="type-body mt-4 max-w-[74ch] text-muted">
          Rates are set per placement and per term, and are not published. All placements are sold directly — GCW runs no ad network
          and serves no third-party creative.
        </p>
        <ul className="ruled-list mt-8">
          {PLACEMENTS.map((placement) => (
            <li key={placement.name}>
              <article>
                <h3 className="type-standfirst is-heading">{placement.name}</h3>
                <p className="type-body mt-2 max-w-[74ch] text-muted">{placement.description}</p>
                <p className="type-meta meta-line mt-3">
                  <span>{placement.format}</span>
                  <span>Rate to be confirmed</span>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="independence">
        <h2 id="independence" className="type-heading border-b border-rule pb-4">
          Editorial independence
        </h2>
        <ol className="type-body mt-6 flex flex-col gap-4 text-muted">
          {INDEPENDENCE.map((item) => (
            <li key={item} className="max-w-[74ch]">
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20" aria-labelledby="unacceptable">
        <h2 id="unacceptable" className="type-heading border-b border-rule pb-4">
          Advertisers GCW will not accept
        </h2>
        <p className="type-body mt-4 max-w-[74ch] text-muted">
          Some categories are refused outright, because carrying them would compromise the beat GCW reports on. This list is not
          exhaustive and the decision rests with the publication.
        </p>
        <ul className="type-body mt-6 flex flex-col gap-3 text-muted">
          {UNACCEPTABLE.map((item) => (
            <li key={item} className="max-w-[74ch]">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="sponsor-contact">
        <h2 id="sponsor-contact" className="type-heading border-b border-rule pb-4">
          Enquiries
        </h2>
        <p className="type-body mt-6 max-w-[68ch] text-muted">
          Sponsorship enquiries go to the address below. Include the placement you are interested in, the term, and the copy or
          creative you have in mind. Requests for editorial input, pre-publication review, or unlabelled placement will be declined
          without a rate being quoted.
        </p>
        <p className="type-standfirst is-heading mt-5 font-mono">sponsors@example.com</p>
        <p className="type-body mt-2 max-w-[68ch] text-muted">
          Placeholder address — the live sponsorship mailbox has not been set up yet. Do not send anything to it.
        </p>
      </section>
    </div>
  );
}
