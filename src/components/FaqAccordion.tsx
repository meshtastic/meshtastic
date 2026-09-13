import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import ReactMarkdown from "react-markdown";
import useBaseUrl from "@docusaurus/useBaseUrl";

import "../css/faq.css";

export interface Faq {
  title: string;
  content: string;
}

/**
 * Answers are Markdown strings rendered by react-markdown, so Docusaurus never sees
 * their links and cannot apply baseUrl to them. Only root-absolute paths are resolved:
 * useBaseUrl would join a relative one onto baseUrl and turn "../x" into "/../x".
 * react-markdown also passes the hast node down, which must not reach the DOM.
 */
const FaqLink = ({
  href,
  children,
  node: _node,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { node?: unknown }) => {
  const resolved = useBaseUrl(href ?? "");
  const isRootAbsolute = href?.startsWith("/") && !href.startsWith("//");
  return (
    <a href={isRootAbsolute ? resolved : href} {...props}>
      {children}
    </a>
  );
};

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
    history.pushState(
      null,
      null,
      window.location.origin +
        window.location.pathname +
        window.location.search,
    );
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
            <ReactMarkdown components={{ a: FaqLink }}>
              {row.content}
            </ReactMarkdown>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
