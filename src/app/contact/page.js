// src/app/contact/page.js

import ContactComponent from '@/components/ContactComponent';

// SEO config for Contact page (replace domain/og image with real values)
const SEO = {
  title: "Contact Minervasutra: Book a Demo for AI HR Management Software",
  description:
    "Questions about Minervasutra? Contact our expert team for support, pricing inquiries, or schedule a personalized live demo of our AI-powered HR platform.",
  canonical: "https://minervasutra.com/contact",
  ogImage: "https://minervasutra.com/images/contact-og.png",
  keywords: [
    "Contact Minervasutra",
    "book a demo",
    "Minervasutra support",
    "HR software demo",
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

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: "Minervasutra",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-555-0123",
        contactType: "customer service",
        email: "support@minervasutra.com",
        availableLanguage: "en",
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
        <ContactComponent />
      </main>
    </>
  );
}