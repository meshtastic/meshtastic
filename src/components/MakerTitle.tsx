import Heading from "@theme/Heading";
import { translate } from "@docusaurus/Translate";
import { Wrench } from "lucide-react";
import React from "react";

/**
 * The Maker hardware page title with the wrench mark that the clients and the
 * flasher use (meshtastic/design#160). Its color is the declared
 * `--tier-maker` token in src/css/variables.css, never a derivation of the
 * accent. The page sets `hide_title: true` and renders this in its place, so
 * the title text stays in the translation catalog rather than in MDX prose.
 * The mark is decorative: the heading beside it names the page.
 */
export function MakerTitle(): JSX.Element {
  const title = translate({
    id: "hardware.maker.title",
    message: "Maker Hardware",
    description: "Title of the Maker hardware page",
  });

  return (
    <header className="mt-3 mb-6 flex items-center gap-3">
      <Wrench
        className="shrink-0"
        style={{ color: "var(--tier-maker)" }}
        size={40}
        strokeWidth={2.25}
        aria-hidden="true"
        focusable="false"
      />
      <Heading as="h1" className="mb-0">
        {title}
      </Heading>
    </header>
  );
}
