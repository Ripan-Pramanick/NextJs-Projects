// src/app/about/page.js

import AboutUsComponent from '@/components/AboutUsComponent';

// SEO config for About page (replace domain/og image and founder name with real values)
const SEO = {
  title: "About Minervasutra: Pioneering the Future of AI-Driven HR Tech",
  description:
    "Minervasutra is redefining the workplace through intelligent automation. Learn about our mission to build smarter cultures with data-driven HR technology.",
  canonical: "https://minervasutra.com/about",
  ogImage: "https://minervasutra.com/images/about-og.png",
  keywords: [
    "About Minervasutra",
    "AI HR technology",
    "Minervasutra mission",
    "HR automation",
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

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Minervasutra",
      description:
        "Minervasutra is an AI-first HR technology company redefining the workplace with intelligent automation.",
      founder: {
        "@type": "Person",
        name: "Founder Name",
      },
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
        <AboutUsComponent />
      </main>
    </>
  );
}