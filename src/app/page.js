// src/app/page.js

import HomePageComponent from '@/components/HomePage'; // Ensure your path alias is configured, or use a relative path

// SEO config for Home page (replace domain/logo/og image with real values)
const SEO = {
  title: "Minervasutra: The All-in-One AI Powered HR Management Software",
  description:
    "Automate your entire workforce with Minervasutra. Our AI HR platform streamlines hiring, payroll, and employee management to scale your business faster.",
  canonical: "https://minervasutra.com",
  ogImage: "https://minervasutra.com/images/home-og.png",
  logo: "https://minervasutra.com/logo.png",
  keywords: [
    "Minervasutra",
    "AI HR software",
    "HR management software",
    "payroll automation",
    "recruitment automation",
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

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://yourdomain.com/#organization",
        name: "Minervasutra",
        url: "https://yourdomain.com",
        logo: {
          "@type": "ImageObject",
          url: SEO.logo,
        },
        sameAs: [
          "https://linkedin.com/company/minervasutra",
          "https://twitter.com/minervasutra",
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "Minervasutra AI HR",
        operatingSystem: "Web",
        applicationCategory: "BusinessApplication",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "85",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          description: "Free trial available",
        },
      },
    ],
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
        <HomePageComponent />
      </main>
    </>
  );
}