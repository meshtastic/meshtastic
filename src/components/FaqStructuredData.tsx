export const FaqStructuredData = ({ faqs }) => {
  const allFaqs = Object.values(faqs).flat();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.content,
      },
    })),
  };

  return (
    <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
  );
};
