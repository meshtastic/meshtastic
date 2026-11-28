import { HomePageContent } from "@/components/homepage/homepage-content";
import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import React from "react";

export default function Home() {
  return (
    <Layout
      title={translate({
        id: "homepage.title",
        message: "Off-Grid Communication For Everyone",
      })}
      description={translate({
        id: "homepage.description",
        message:
          "An open source, off-grid, decentralized mesh network built to run on affordable, low-power devices",
      })}
    >
      <Head>
        <meta property="og:title" content="Meshtastic" />
      </Head>
      <HomePageContent />
    </Layout>
  );
}
