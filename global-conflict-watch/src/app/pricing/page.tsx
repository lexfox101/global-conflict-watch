import type { Metadata } from "next";
import Link from "next/link";
import { FREE_ARCHIVE_DAYS, allBriefings, latestBriefing } from "@/data/briefings";
import { REGION_KEYS, THREAT_CATEGORIES } from "@/types/briefing";
import { SectionHeading } from "@/components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "What is free to read on Global Conflict Watch and what a subscription would add. Billing is not enabled: this page describes the intended tiers only.",
};

interface FeatureRow {
  feature: string;
  detail: string;
  free: boolean;
  subscriber: boolean;
}

const FEATURES: FeatureRow[] = [
  {
    feature: "Homepage and today's top threats",
    detail: "The current edition's most severe entries, with threat level and confidence on each.",
    free: true,
    subscriber: true,
  },
  {
    feature: `Most recent ${FREE_ARCHIVE_DAYS} editions in full`,
    detail: "Complete briefings — every story, every source link, every coverage note.",
    free: true,
    subscriber: true,
  },
  {
    feature: "Region pages",
    detail: `Standing context and current feeds for all ${REGION_KEYS.length} tracked regions.`,
    free: true,
    subscriber: true,
  },
  {
    feature: "Threat category pages",
    detail: `Definitions, inclusion criteria and current feeds for all ${THREAT_CATEGORIES.length} categories.`,
    free: true,
    subscriber: true,
  },
  {
    feature: "Interactive map",
    detail: "The demonstration dashboard, which carries fictional generalised data only.",
    free: true,
    subscriber: true,
  },
  {
    feature: "Full archive, searchable",
    detail: "Every edition ever published, beyond the free window, with search across headlines and body text.",
    free: false,
    subscriber: true,
  },
  {
    feature: "Archive depth on regions and categories",
    detail: "Region and category feeds extended across the whole archive rather than the free window.",
    free: false,
    subscriber: true,
  },
  {
    feature: "Early alerts",
    detail: "Breaking items sent as they are written, ahead of the next morning's edition.",
    free: false,
    subscriber: true,
  },
  {
    feature: "Export and citation",
    detail: "Formatted citations for individual stories, and export of a filtered set for internal reporting.",
    free: false,
    subscriber: true,
  },
  {
    feature: "Priority email",
    detail: "Correction requests and coverage questions answered ahead of the general queue.",
    free: false,
    subscriber: true,
  },
];

const FAQ = [
  {
    question: "What do I actually get for a subscription?",
    answer:
      "The same editorial product, without the archive window. A subscription opens every edition published to date, extends the region and category feeds across the whole archive, adds early alerts between editions, and provides citation and export output for internal reporting. It does not buy different or better intelligence: subscribers and free readers see the same stories, sourcing and confidence ratings on the day of publication.",
  },
  {
    question: "How would cancellation work?",
    answer:
      "The intended model is a self-service cancellation that takes effect at the end of the paid period, with no cancellation fee and no requirement to contact anyone first. Access to the free window would continue afterwards. None of this is implemented yet — there is no billing system to cancel from.",
  },
  {
    question: "Is there institutional or team access?",
    answer:
      "Team and institutional arrangements are planned rather than priced. The intent is seat-based access for a named organisation, with a single billing contact and the option of an internal redistribution allowance for briefings circulated inside that organisation. Terms would be agreed directly; enquiries can go through the contact routes on the About page.",
  },
  {
    question: "Where does the underlying reporting come from?",
    answer:
      "Open-source reporting only: publications, national-authority and vendor advisories, court and regulatory filings, and published research. Every story carries a confidence rating and the publications it draws on. Claims by an involved party stay labelled as claims. The methodology is set out in full on the data page.",
  },
];

function AvailabilityCell({ available }: { available: boolean }) {
  return (
    <>
      <span aria-hidden="true" className={available ? "text-signal" : "text-muted"}>
        {available ? "●" : "—"}
      </span>
      <span className="sr-only">{available ? "Included" : "Not included"}</span>
    </>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-14 lg:px-6 lg:py-20">
      <SectionHeading
        title="Free and subscriber access"
        as="h1"
        description="Global Conflict Watch keeps the current record open and puts the archive behind a subscription. This page describes the intended split — no payment system is connected, and nothing on it can charge you."
      />

      <div className="soft-panel panel-note mt-10 p-6" role="note">
        <p className="type-meta text-flag">Billing is not enabled in this demo</p>
        <p className="type-body mt-2 max-w-[76ch] text-ink-body">
          There is no payment processor, no checkout, no card handling and no stored billing data anywhere on this site. Prices are
          not set and are shown below as to be confirmed. The buttons in the subscriber column are deliberately inert: they cannot
          take a payment, start a trial, or create an account. Everything described as a subscriber feature is a statement of intent,
          not a live capability.
        </p>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <article>
          <h2 className="type-heading">Open access</h2>
          <p className="type-meta mt-2">Free · no charge, no sign-up</p>
          <p className="type-body mt-4 text-muted">
            The current record stays open: the homepage and today&apos;s top threats, the {FREE_ARCHIVE_DAYS} most recent editions in
            full, every region page, every threat category page, and the interactive map. That is {allBriefings.length} editions on
            the site today, of which the {FREE_ARCHIVE_DAYS} newest are readable in full.
          </p>
          <Link href={`/briefings/${latestBriefing.slug}`} className="btn btn-primary mt-6">
            Read today&apos;s briefing
          </Link>
        </article>

        <article>
          <h2 className="type-heading">Full archive</h2>
          <p className="type-meta mt-2 text-flag">Subscriber · price to be confirmed, not yet available</p>
          <p className="type-body mt-4 text-muted">
            Adds the searchable archive beyond the free window, region and category feeds across the whole archive, early alerts
            between editions, export and citation output, and priority handling of correction requests and coverage questions.
          </p>
          <button type="button" disabled aria-describedby="billing-disabled-note" className="btn mt-6">
            Checkout unavailable in this demo
          </button>
          <p id="billing-disabled-note" className="type-body mt-2 max-w-[56ch] text-muted">
            This control is disabled because no billing system exists. It will not charge you, start a trial, or collect any
            details.
          </p>
        </article>
      </div>

      <section className="mt-20" aria-labelledby="comparison">
        <h2 id="comparison" className="type-heading border-b border-rule pb-4">
          What sits on each side of the line
        </h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <caption className="sr-only">Feature comparison between free and subscriber access</caption>
            <thead>
              <tr className="type-meta border-b border-rule-strong">
                <th scope="col" className="py-3 pr-4 font-medium">
                  Feature
                </th>
                <th scope="col" className="w-24 py-3 text-center font-medium">
                  Free
                </th>
                <th scope="col" className="w-28 py-3 text-center font-medium">
                  Subscriber
                </th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((row) => (
                <tr key={row.feature} className="border-t border-rule align-top">
                  <th scope="row" className="py-5 pr-4 font-normal">
                    <span className="type-standfirst is-heading block">{row.feature}</span>
                    <span className="type-body mt-1 block max-w-[60ch] text-muted">{row.detail}</span>
                  </th>
                  <td className="py-5 text-center">
                    <AvailabilityCell available={row.free} />
                  </td>
                  <td className="py-5 text-center">
                    <AvailabilityCell available={row.subscriber} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="pricing-faq">
        <h2 id="pricing-faq" className="type-heading border-b border-rule pb-4">
          Questions worth answering up front
        </h2>
        <dl className="mt-8 flex flex-col gap-8">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="type-standfirst is-heading">{item.question}</dt>
              <dd className="type-body mt-2 max-w-[70ch] text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
