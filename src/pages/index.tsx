import { HomePageContent } from "@/components/homepage/homepage-content";
import Head from "@docusaurus/Head";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import React from "react";

export default function Home() {
  return (
    <Layout
      title="Off-Grid Communication For Everyone"
      description="An open source, off-grid, decentralized mesh network built to run on affordable, low-power devices"
    >
      <Head>
        <meta property="og:title" content="Meshtastic" />
        <meta
          property="og:image"
          content={useBaseUrl("design/web/social-preview-1200x630.png")}
        />
        <meta property="og:url" content="https://meshtastic.org/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HomePageContent />
    </Layout>
  );
}
