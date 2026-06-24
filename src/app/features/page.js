import React from 'react';
import AllFeaturesComponent from '@/components/AllFeaturesComponent'; // Adjust path if necessary

// SEO config for Features page (replace domain/og image with real values)
const SEO = {
  title: "Advanced AI HR Features: Recruitment, Payroll & Smart Analytics",
  description:
    "Discover Minervasutra’s powerful AI tools. From automated resume screening to real-time employee analytics, our smart features handle your heavy HR tasks.",
  canonical: "https://minervasutra.com/features",
  ogImage: "https://minervasutra.com/images/features-og.png",
  keywords: [
    "Minervasutra features",
    "AI HR features",
    "recruitment automation",
    "payroll automation",
    "employee analytics",
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

export default function FeaturesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Minervasutra AI HR Features",
    serviceType: "Human Resources Software",
    provider: {
      "@type": "Organization",
      name: "Minervasutra",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Minervasutra HR Modules",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI-Driven Recruitment & Applicant Tracking",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automated Payroll & Compliance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Smart Employee Performance Analytics",
          },
        },
      ],
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
        <AllFeaturesComponent />
      </main>
    </>
  );
}