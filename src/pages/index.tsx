import React from 'react';

import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { HeaderText } from './downloads/_components/HeaderText';

const features = [
  {
    title: "Radio Mesh Text Messaging",
    imageUrl: "img/homepage/messages.svg",
    description: (
      <>
        Off-grid messaging using inexpensive hardware to create your personal
        mesh. Radios forward messages to the next to flood the network.
        Communicate kilometers/miles between nodes. Internet-connected relay
        nodes enable the conversation to move online too.
      </>
    ),
  },
  {
    title: "Encryption",
    imageUrl: "img/homepage/encryption.svg",
    description: (
      <>
        Messages are AES256 encrypted. Only radios supplied with your channel
        settings (which includes the key) should be able to read your messages.
        Using multichannel settings you can send encrypted messages on one
        channel and still participate in a default Meshtastic mesh.
      </>
    ),
  },
  {
    title: "Conserve Battery",
    imageUrl: "img/homepage/battery.svg",
    description: (
      <>
        Go for days on end and on a single battery or extend it infinitely with
        a solar cell. Power management ensures the device will last the duration
        of your use.
      </>
    ),
  },
  {
    title: "Extendable",
    imageUrl: "img/homepage/extendable.svg",
    description: (
      <>
        Create a highly scalable mesh with hardware on a multitude of platforms
        to fit your unique requirements: Create an environment monitoring mesh
        and produce real-time heatmaps, or maybe decentralised, encrypted
        messaging network, your imagination is the limit.
      </>
    ),
  },
  {
    title: "Platform Agnostic",
    imageUrl: "img/homepage/platforms.svg",
    description: (
      <>
        Meshtastic clients are built or being built for all major desktop and
        mobile platforms. Linux, Windows, Mac, Android, and iOS are all
        supported or well on their way to being supported.
      </>
    ),
  },
  {
    title: "Open Source",
    imageUrl: "img/homepage/opensource.svg",
    description: (
      <>
        All Meshtastic software is open source. If you want an improvement,
        submit a pull request or file an issue on Github. Happy coding!
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="col col--4">
      {imgUrl && (
        <div className="text--center">
          <img width={200} height={200} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig } = context;
  return (
    <Layout>
      <Head>
        <meta property="og:title" content="Meshtastic" />
        <meta
          property="og:image"
          content={useBaseUrl("design/web/social-preview-1200x630.png")}
        />
        <meta
          property="og:description"
          content="Open Source hiking, pilot, skiing and secure LoRa mesh communicator"
        />
        <meta property="og:url" content="https://meshtastic.org/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header style={{ textAlign: "center" }} className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">
            <img
              style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
              alt="Meshtastic Logo"
              className="header__logo"
              src={useBaseUrl("design/typelogo/typelogo.svg")}
            />
          </h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className="indexCtas">
            <Link className="button button--lg" to="/docs/about">
            Learn More
            </Link>
            <Link className="button button--lg" to="/docs/getting-started">
            Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section
            style={{ display: "flex", alignItems: "center", padding: "2rem" }}
          >
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <div className="container">
          <HeaderText
            type="h1"
            text="Getting Started"
            link="getting-started"
          />
          <p>
            Getting started with Meshtastic is as easy as 1, 2, 3!
          </p>
          <ul
            style={{
              position: "relative",
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              paddingLeft: "0",
            }}
          >
            <div className="card">
              <div
                className="card__header"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h3>
                  1. Purchase Supported Hardware
                </h3>
              </div>
              <div
                className="card__body"
                style={{ display: "flex", justifyContent: "center"}}
              >
                <p>
                  Hardware you will want to consider:
                  <ul>
                    <li>
                      Radio
                    </li>
                    <li>
                      Battery
                    </li>
                    <li>
                      Case
                    </li>
                    <li>
                      Antenna (most devices include an antenna, but it is a bit of a mixed bag from some suppliers)
                    </li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="card">
              <div
                className="card__header"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h3>
                  2. Flash & Configure Node
                </h3>
              </div>
              <div
                className="card__body"
                style={{ display: "flex", justifyContent: "center"}}
              >
                <p>
                  The Meshtastic Flasher application can assist you in flashing the firmware and configuring settings.
                </p>
              </div>
            </div>
            <div className="card">
              <div
                className="card__header"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h3>
                  3. Connect to Node
                </h3>
              </div>
              <div
                className="card__body"
                style={{ display: "flex", justifyContent: "center"}}
              >
              <p>
                Applications are available for the following systems:
                <ul>
                  <li>
                    Android
                  </li>
                  <li>
                    iOS
                  </li>
                  <li>
                    Mac
                  </li>
                  <li>
                    Web Browser
                  </li>
                </ul>
              </p>
              </div>
            </div>
          </ul>
          <div className="indexCtasBody">
            <Link
            className="button button--outline button--lg cta--button" to="/docs/getting-started"
            >
            Getting Started
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
