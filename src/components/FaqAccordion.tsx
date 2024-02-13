import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import ReactMarkdown from "react-markdown";

export interface Faq {
  title: string;
  content: string;
}

/**
 * Gets the query parameter `openFaqItems` which is an array of
 * faq items that should be pre-opened
 * @type {Function}
 */
const getOpenFaqItemsFromUrl = (slug: string): string[] => {
  if (typeof window !== 'undefined') {
    // Use URLSearchParams to parse the query parameters from the current URL
    const searchParams = new URLSearchParams(window.location.search);

    // Get the 'openFaqItems' parameter as a comma-separated string
    const openFaqItemsString = searchParams.get(`openFaqItems-${slug}`);

    // If the parameter exists, split it by commas into an array; otherwise, return an empty array
    console.log(slug, openFaqItemsString ? openFaqItemsString.split(",") : []);
    return openFaqItemsString ? openFaqItemsString.split(",") : [];
  }
};

/**
* Updates query parameters in the url when items are opened
* so that a link can be shared with the faq item already opened
*/
const handleChange = (
  openFaqItems: (string | number)[],
  slug: string
): void => {
  // Get current url params
  const searchParams = new URLSearchParams(window.location.search);

  if (openFaqItems.length > 0) {
    // Convert openFaqItems to a comma-separated string and update/add the parameter
    searchParams.set(
      `openFaqItems-${slug}`,
      openFaqItems.map(String).join(","),
    );
  } else {
    // If openFaqItems is empty, remove the parameter from the URL
    searchParams.delete(`openFaqItems-${slug}`);
  }

  // Construct the new URL, preserve existing parameters
  const newUrl = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }?${searchParams.toString()}`;

  // Use history.pushState to change the URL without reloading the page
  window.history.pushState({ path: newUrl }, "", newUrl);
};

/**
 * We need to get the query params using docusaurus' router
 * because `window` isn't available server side
 * @return {[type]} [description]
 */
const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const FaqAccordion = ({
  rows,
  slug,
}: { rows: Faq[]; slug: string }): JSX.Element => {
  // Set the faq structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: rows.map((row) => ({
      "@type": "Question",
      name: row.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: row.content,
      },
    })),
  };

  return (
    <BrowserOnly fallback={<div>Loading FAQ's...</div>}>
      {() => {
        return (
          <>
            <script
              type="application/ld+json"
              // biome-ignore lint: we need dangerouslySetInnerHTML here, and since we're the ones setting the content it's should be safe
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
            <Accordion
              allowMultipleExpanded={true}
              allowZeroExpanded={true}
              onChange={(itemUuids) => {
                handleChange(itemUuids, slug)
              }}
              preExpanded={getOpenFaqItemsFromUrl(slug)}
            >
              {rows.map((row, index) => (
                <AccordionItem key={index}>
                  <AccordionItemHeading aria-level="2">
                    <AccordionItemButton>{row.title}</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ReactMarkdown>{row.content}</ReactMarkdown>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </>
        );
      }}
    </BrowserOnly>
  );
};
