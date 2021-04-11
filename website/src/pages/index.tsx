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
        Having an ever-growing, vibrant software ecosystem, there's almost
        certainly, a capable solution ready to go for your project. With
        libraries for Typescript and Python, apps for all major platforms and a
        whole suite of native integrations, there's something for everyone.
      </>
    ),
  },
  {
    title: "Extremely Versatile",
    imageUrl: "img/versatility.svg",
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
    title: "Peak Efficiency",
    imageUrl: "img/efficiency.svg",
    description: (
      <>
        Go for days on end and on a single battery, or extend it infinitely with
        a solar cell, communicate with tens kilometres between nodes on
        inexpensive beginner friendly hardware.
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
