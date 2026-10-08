import { Devices } from "@/components/homepage/devices";
import devicesData from "@/data/devices.json";
import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import type { JSX } from "react";
import React from "react";

export default function Hardware(): JSX.Element {
  // `absolute` matters: Open Graph requires a full URL, and unfurlers drop a
  // root-relative one.
  const previewImage = useBaseUrl("img/preview/hardware-1200x630.png", {
    absolute: true,
  });
  const previewAlt = translate({
    id: "hardware.previewAlt",
    message: "Various Meshtastic devices lined up side by side",
  });

  // The browser tab and search results keep the site suffix; the share card
  // drops it, because every client already shows the domain beside the title.
  const pageTitle = translate({ id: "hardware.title", message: "Hardware" });

  return (
    <Layout
      title={pageTitle}
      // This page exists to be linked, so the card text comes from the same
      // place as the heading shown on it. Editing devices.json updates both.
      description={devicesData.callToAction.subtitle}
    >
      <Head>
        <meta property="og:title" content={pageTitle} />
        {/* themeConfig.image sets og:image and twitter:image together, so
            overriding only og:image would leave this page still advertising the
            site-wide card to anything that prefers the twitter tag. */}
        <meta property="og:image" content={previewImage} />
        <meta name="twitter:image" content={previewImage} />
        <meta property="og:image:alt" content={previewAlt} />
        <meta name="twitter:image:alt" content={previewAlt} />
      </Head>
      <main className="container margin-vert--lg">
        <Devices headingLevel="h1" />
      </main>
    </Layout>
  );
}
