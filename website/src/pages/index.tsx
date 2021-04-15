import React from 'react';

import clsx from 'clsx';

import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './styles.module.css';

const features = [
  {
    title: "Diverse Software Ecosystem",
    imageUrl: "img/software.svg",
    description: (
      <>
        With an ever-growing array of applications, plugins and interface options, Meshtastic can be used with a variety of different devices to create a network that suits your requirements.
      </>
    ),
  },
  {
    title: "Extremely Versatile",
    imageUrl: "img/versatility.svg",
    description: (
      <>
        Create a highly scalable mesh with hardware on a multitude of platforms to fit your unique requirements: Create an environment monitoring mesh and produce real-time heatmaps, or maybe decentralised, encrypted messaging network, your imagination is the limit.
      </>
    ),
  },
  {
    title: "Peak Efficiency",
    imageUrl: "img/efficiency.svg",
    description: (
      <>
        Go for days on end and on a single battery, or extend it infinitely with a solar cell, communicate with tens kilometres between nodes on inexpensive beginner friendly hardware.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title=""
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">
            <img
              style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
              alt="Meshtastic Logo"
              className="header__logo"
              src={useBaseUrl("img/meshtastic-design/typelogo/typelogo.svg")}
            />
          </h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        <section style={{ paddingTop: "2rem" }}>
            <div className="container">
              <h2>What is Meshtastic?</h2>
              <p>Meshtastic® is a project that lets you use inexpensive LORA radios as an extensible, long battery life, secure, mesh GPS communicator. These radios are great for hiking, skiing, paragliding - essentially any hobby where you don’t have reliable internet access. Each member of your private mesh can always see the location and distance of all other members and any text messages sent to your group chat.</p>
              <p>The radios automatically create a mesh to forward packets as needed, so everyone in the group can receive messages from even the furthest member. The radios will optionally work with your phone, but no phone is required.</p>
            </div>
          </section>
          <section style={{ paddingBottom: "2rem" }}>
            <div className="container">
              <h2>Features</h2>
              <ul>
                <li>Secure - Communications encrypted with AES256</li>
                <li>Long Range - Miles between nodes with line of sight</li>
                <li>Low Power - Up to eight days of a battery life</li>
                <li>Open Source - Growing community of contributors</li>
                <li>GPS coordination - Share your location with other nodes</li>
              </ul>
            </div>
          </section>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
