// src/app/pricing/page.js

import PricingComponent from '@/components/PricingComponent';

// SEO config for the Pricing page (replace domain/og image with real values)
const SEO = {
  title: "Simple & Scalable Pricing Plans for Minervasutra AI HR Software",
  description:
    "Find the perfect Minervasutra plan for your team. From startups to enterprise, get transparent pricing on the world's most advanced AI HR management suite.",
  canonical: "https://minervasutra.com/pricing",
  ogImage: "https://minervasutra.com/images/pricing-og.png",
  keywords: [
    "Minervasutra pricing",
    "pricing plans",
    "transparent pricing",
    "Minervasutra pricing plans",
  ],
};

export async function generateMetadata() {
  return {
    title: SEO.title,
    description: SEO.description,
    keywords: SEO.keywords,
    alternates: { canonical: SEO.canonical },
    openGraph: {
      title: SEO.title,
      description: SEO.description,
      images: [SEO.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Minervasutra AI HR Subscription",
    description: "Flexible pricing plans for Minervasutra AI HR Software",
    offers: {
      "@type": "AggregateOffer",
      offerCount: "3",
      lowPrice: "29",
      highPrice: "199",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main>
        {/* <h1>{SEO.title}</h1>
        <p>{SEO.description}</p> */}
        <PricingComponent />
      </main>
    </>
  );
}