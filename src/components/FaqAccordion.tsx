import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import ReactMarkdown from "react-markdown";

import "../css/faq.css";

export interface Faq {
  title: string;
  content: string;
}

/**
 * Finds the nearest heading to an element
 * @param  {Element} null The element to find the nearest heading to
 * @return {Element|null} The heading or null
 */
const findNearestHeading = (element: Element): Element | null => {
  const isHeading = (element: Element): boolean =>
    /^H[1-6]$/.test(element.tagName);
  let currentElement: Element | null = element;

  while (currentElement !== null) {
    // Check previous siblings
    let prevSibling: Element | null = currentElement.previousElementSibling;
    while (prevSibling) {
      if (isHeading(prevSibling)) {
        return prevSibling;
      }
      prevSibling = prevSibling.previousElementSibling;
    }

    // If no heading is found among siblings, move to the parent node
    currentElement = currentElement.parentElement;
  }

  return null;
};

/**
 * Takes in uuids from react-accessible-accordion onchange event
 * and updates the browser url with the nearest heading's id
 * @param  {[type]} void [description]
 * @return {[type]}      [description]
 */
const updateUrlWithNearestHeadingId = (targetElementUuid: string): void => {
  const targetElement: HTMLElement | null = document.getElementById(
    `accordion__heading-${targetElementUuid[0]}`,
  );

  const nearestHeading: Element | null = targetElement
    ? findNearestHeading(targetElement)
    : null;

  // Add the hash without scrolling the page
  if (nearestHeading?.id) {
    window.history.pushState({}, "", `#${nearestHeading.id}`);
  }

  // If they're all collapsed, remove the hash
  if (!targetElement) {
    window.location.hash = "";
  }
};

export const FaqAccordion = ({ rows }: { rows: Faq[] }): JSX.Element => {
  return (
    <Accordion
      allowMultipleExpanded={true}
      allowZeroExpanded={true}
      onChange={(itemUuids) => {
        updateUrlWithNearestHeadingId(itemUuids);
      }}
    >
      {rows.map((row, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: React complains if there is no key
        <AccordionItem key={index}>
          <AccordionItemHeading aria-level="3">
            <AccordionItemButton>{row.title}</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ReactMarkdown>{row.content}</ReactMarkdown>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
