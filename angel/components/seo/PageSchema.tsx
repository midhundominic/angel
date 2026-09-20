import { siteConfig } from "@/data/site";

type JsonValue = Record<string, unknown>;

/**
 * Emits a JSON-LD @graph for an inner page. The homepage keeps its own, larger
 * graph in StructuredData.tsx; this is the small per-page one that carries the
 * breadcrumb trail and whatever the page itself is (a CollectionPage of coffins,
 * a Blog, a BlogPosting).
 *
 * Everything passed here is author-written content from data/, never user input.
 */
export function PageSchema({ nodes }: { nodes: JsonValue[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }),
      }}
    />
  );
}

/** BreadcrumbList node. `items` mirrors the visible breadcrumb in PageHero. */
export function breadcrumbNode(items: { label: string; path: string }[]): JsonValue {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}${items[items.length - 1].path}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/** FAQPage node. Google requires every question here to be visible on the page. */
export function faqNode(
  path: string,
  faqs: { question: string; answer: string }[],
): JsonValue {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
