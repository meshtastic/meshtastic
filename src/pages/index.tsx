import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  CheckCircleIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Layout from "@theme/Layout";

import {
  SocialCard,
  type SocialCardProps,
} from "../components/homepage/SocialCard";

const SocialCards: SocialCardProps[] = [
  {
    color: "bg-[#5865F2]",
    link: "https://discord.com/invite/ktMAKGBnBs",
    children: (
      <img
        alt="discord"
        className="m-auto h-10"
        src="/img/homepage/Discord-Logo-White.svg"
      />
    ),
  },
  {
    color: "bg-[#4A99E9]",
    link: "https://twitter.com/TheMeshtastic",
    children: (
      <img
        alt="twitter"
        className="m-auto h-10"
        src="/img/homepage/Twitter-Logo-White.svg"
      />
    ),
  },
  {
    color: "bg-[#3875EA]",
    link: "https://facebook.com/themeshtastic",
    children: (
      <img
        alt="facebook"
        className="m-auto h-10"
        src="/img/homepage/f_logo_RGB-White_1024.webp"
      />
    ),
  },
  {
    color: "bg-[#ffffff]",
    link: "https://www.instagram.com/themeshtastic/",
    children: (
      <img
        alt="instagram"
        className="m-auto h-10"
        src="/img/homepage/Instagram_Glyph_Gradient.svg"
      />
    ),
  },
  {
    color: "bg-[#FF0000]",
    link: "https://www.youtube.com/meshtastic",
    children: (
      <img
        alt="youtube"
        className="m-auto h-12"
        src="/img/homepage/YouTube-Logo-White.svg"
      />
    ),
  },
  {
    color: "bg-[#FF4500]",
    link: "https://reddit.com/r/meshtastic",
    children: (
      <img
        alt="reddit"
        className="m-auto h-14"
        src="/img/homepage/Reddit-Logo-White.svg"
      />
    ),
  },
  {
    color: "bg-[#563ACC]",
    link: "https://mastodon.social/@meshtastic",
    isMeLink: true,
    children: (
      <img
        alt="mastodon"
        className="m-auto h-10"
        src="/img/homepage/mastodon-logo-white.svg"
      />
    ),
  },
  {
    color: "bg-[#24A1DE]",
    link: "https://t.me/+hmKN0xOR73ExOTU6",
    children: (
      <img
        alt="telegram"
        className="m-auto h-10"
        src="/img/homepage/telegram-single-path-240px.svg"
      />
    ),
  },
];

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
          content="An open source, off-grid, decentralized, mesh network built to run on affordable, low-power devices"
        />
        <meta property="og:url" content="https://meshtastic.org/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="hero hero--primary text-center">
        <div className="container">
          <h1 className="hero__title">
            <img
              alt="Meshtastic Logo"
              className="header__logo py-8"
              src={useBaseUrl("design/typelogo/typelogo.svg")}
            />
          </h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className="indexCtas">
            <Link className="button button--lg" to="/docs/introduction">
              Learn More
            </Link>
            <Link className="button button--lg" to="/docs/getting-started">
              Get Started
            </Link>
            <Link
              className="button button--lg"
              to="/docs/contributing/#supporting-and-contributing-to-meshtastic"
            >
              Donate
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-8">
        <div className="bg-primaryDark mx-auto flex w-full lg:w-auto flex-col gap-4 p-4 shadow-inner">
          <h3 className="text-xl font-bold">Join the Conversation</h3>
          <div className="flex w-full overflow-x-auto gap-2 flex-wrap justify-center">
            {SocialCards.map((card) => (
              <SocialCard
                key={card.link}
                color={card.color}
                link={card.link}
                isMeLink={card.isMeLink}
              >
                {card.children}
              </SocialCard>
            ))}
          </div>
        </div>
        <div className="container mx-auto flex w-auto flex-col gap-8">
          <h3 className="text-xl font-bold">Getting Started</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <CheckCircleIcon
                  className="h-8 w-8"
                  style={{ color: "var(--ifm-color-primary)" }}
                />
                <h4 className="text-lg font-bold">Step 1</h4>
              </div>
              <Link to="/docs/hardware/devices/">
                <h5 className="font-semibold mt-1">Choose a Device &rarr;</h5>
              </Link>
              <p className="text-center max-w-xs">
                Meshtastic devices are available in a variety of configurations
                to suit your needs.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <CheckCircleIcon
                  className="h-8 w-8"
                  style={{ color: "var(--ifm-color-primary)" }}
                />
                <h4 className="text-lg font-bold">Step 2</h4>
              </div>
              <Link to="/docs/getting-started/">
                <h5 className="font-semibold mt-1">
                  Flash and Configure your Device &rarr;
                </h5>
              </Link>
              <p className="text-center max-w-xs">
                Flash your device with the latest version of Meshtastic and
                configure it to your liking.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <CheckCircleIcon
                  className="h-8 w-8"
                  style={{ color: "var(--ifm-color-primary)" }}
                />
                <h4 className="text-lg font-bold">Step 3</h4>
              </div>
              <Link to="/docs/getting-started/initial-config/">
                <h5 className="font-semibold mt-1">
                  Connect to your Device &rarr;
                </h5>
              </Link>
              <p className="text-center max-w-xs">
                Connect to your device via any of our clients to start sending
                and receiving messages!
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex w-auto flex-col gap-4">
          <h3 className="text-xl font-bold">Get Connected</h3>
          <p>
            Connect and control your Meshtastic devices through various
            platforms. Choose the client that best fits your needs and device
            ecosystem.
          </p>
        </div>
        <div className="container mx-auto flex w-auto flex-wrap justify-center gap-6">
          <div className="card w-[calc(100%-1rem)] sm:w-1/3 md:w-1/4 lg:w-1/4">
            <div className="card__header flex justify-between">
              <h4 className="text-lg font-bold">iOS App</h4>
              <DevicePhoneMobileIcon
                className="h-8 w-8"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            </div>
            <div className="card__body flex justify-center">
              <p>
                Manage your Meshtastic network on-the-go with our iOS
                application.
              </p>
            </div>
            <div className="card__footer flex justify-center mt-4">
              <Link to="/docs/software/apple/installation/">
                Try it out &rarr;
              </Link>
            </div>
          </div>
          <div className="card w-[calc(100%-1rem)] sm:w-1/3 md:w-1/4 lg:w-1/4">
            <div className="card__header flex justify-between">
              <h4 className="text-lg font-bold">Android App</h4>
              <DevicePhoneMobileIcon
                className="h-8 w-8"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            </div>
            <div className="card__body flex justify-center">
              <p>
                Connect and control your Meshtastic devices using our Android
                application.
              </p>
            </div>
            <div className="card__footer flex justify-center mt-4">
              <Link to="/docs/software/android/installation/">
                Try it out &rarr;
              </Link>
            </div>
          </div>
          <div className="card w-[calc(100%-1rem)] sm:w-1/3 md:w-1/4 lg:w-1/4">
            <div className="card__header flex justify-between">
              <h4 className="text-lg font-bold">Web Client</h4>
              <GlobeAltIcon
                className="h-8 w-8"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            </div>
            <div className="card__body flex justify-center">
              <p>
                Access your Meshtastic network from any device with our
                web-based client.
              </p>
            </div>
            <div className="card__footer flex justify-center mt-4">
              <Link to="https://client.meshtastic.org">Try it out &rarr;</Link>
            </div>
          </div>
          <div className="card w-[calc(100%-1rem)] sm:w-1/3 md:w-1/4 lg:w-1/4">
            <div className="card__header flex justify-between">
              <h4 className="text-lg font-bold">Python CLI/SDK</h4>
              <CommandLineIcon
                className="h-8 w-8"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            </div>
            <div className="card__body flex justify-center">
              <p>
                Command-line interface and software development kit for Python
                developers and power users.
              </p>
            </div>
            <div className="card__footer flex justify-center mt-4">
              <Link to="/docs/software/python/cli/installation/">
                Try it out &rarr;
              </Link>
            </div>
          </div>
        </div>
        <br />
      </main>
    </Layout>
  );
}

export default Home;
