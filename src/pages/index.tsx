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
        class="m-auto h-10"
        src="/img/homepage/Discord-Logo-White.svg"
      />
    ),
  },
  {
    color: "bg-[#000000] dark:bg-[#ffffff]",
    link: "https://x.com/TheMeshtastic",
    children: (
      <>
        <img
          alt="x.com"
          class="m-auto h-10 dark:hidden"
          src="/img/homepage/X.com-White-Logo-light.svg"
        />
        <img
          alt="x.com"
          class="m-auto h-10 hidden dark:block"
          src="/img/homepage/X.com-White-Logo-dark.svg"
        />
      </>
    ),
  },
  {
    color: "bg-[#3875EA]",
    link: "https://facebook.com/themeshtastic",
    children: (
      <img
        alt="facebook"
        class="m-auto h-10"
        src="/img/homepage/f_logo_RGB-White_1024.webp"
      />
    ),
  },
  {
    color: "bg-[#ee2a7b] dark:bg-[#ffffff]",
    link: "https://www.instagram.com/themeshtastic/",
    children: (
      <>
        <img
          alt="instagram"
          class="m-auto h-10 dark:hidden"
          src="/img/homepage/Instagram_Glyph_White.svg"
        />
        <img
          alt="instagram"
          class="m-auto h-10 hidden dark:block"
          src="/img/homepage/Instagram_Glyph_Gradient.svg"
        />
      </>
    ),
  },
  {
    color: "bg-[#FF0000]",
    link: "https://www.youtube.com/meshtastic",
    children: (
      <img
        alt="youtube"
        class="m-auto h-12"
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
        class="m-auto h-14"
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
        class="m-auto h-10"
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
        class="m-auto h-10"
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
      <header class="hero hero--primary text-center p-2">
        <div class="container">
          <h1 class="hero__title">
            <img
              alt="Meshtastic Logo"
              class="header__logo py-8"
              src={useBaseUrl("design/typelogo/typelogo.svg")}
            />
          </h1>
          <p class="hero__subtitle">{siteConfig.tagline}</p>
          <div class="indexCtas">
            <Link class="button button--lg" to="/docs/introduction">
              Learn More
            </Link>
            <Link class="button button--lg" to="/docs/getting-started">
              Get Started
            </Link>
            <Link
              class="button button--lg"
              to="/docs/contributing/#supporting-and-contributing-to-meshtastic"
            >
              Donate
            </Link>
          </div>
        </div>
      </header>

      <main class="flex flex-col gap-8">
        <div class="bg-primaryDark mx-auto flex w-full lg:w-auto flex-col gap-4 p-4 shadow-inner">
          <div class="flex w-full overflow-x-auto gap-2 flex-wrap justify-center">
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
        <div class="container mx-auto flex w-auto flex-col gap-4">
          <h3 class="text-xl font-bold">Getting Started</h3>
          <div class="flex flex-wrap justify-center gap-6">
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-2">
                <CheckCircleIcon
                  class="h-8 w-8"
                  style={{ color: "var(--ifm-color-primary)" }}
                />
                <h4 class="text-lg font-bold">Step 1</h4>
              </div>
              <Link
                to="/docs/hardware/devices/"
                class="mt-1 underline hover:no-underline font-semibold"
              >
                Choose a Device &rarr;
              </Link>
              <p class="text-center max-w-xs">
                Meshtastic devices are available in a variety of configurations
                to suit your needs.
              </p>
            </div>
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-2">
                <CheckCircleIcon
                  class="h-8 w-8"
                  style={{ color: "var(--ifm-color-primary)" }}
                />
                <h4 class="text-lg font-bold">Step 2</h4>
              </div>
              <Link
                to="/docs/getting-started/"
                class="mt-1 underline hover:no-underline font-semibold"
              >
                Flash and Configure your Device &rarr;
              </Link>
              <p class="text-center max-w-xs">
                Flash your device with the latest version of Meshtastic and
                configure it to your liking.
              </p>
            </div>
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-2">
                <CheckCircleIcon
                  class="h-8 w-8"
                  style={{ color: "var(--ifm-color-primary)" }}
                />
                <h4 class="text-lg font-bold">Step 3</h4>
              </div>
              <a
                href="/#get-connected"
                class="mt-1 underline hover:no-underline font-semibold"
              >
                Connect to your Device &rarr;
              </a>
              <p class="text-center max-w-xs">
                Connect to your device via any of our clients to start sending
                and receiving messages!
              </p>
            </div>
          </div>
        </div>
        <div class="container mx-auto flex w-auto flex-col gap-4">
          <h3 id="get-connected" class="text-xl font-bold">
            Get Connected
          </h3>
          <p>
            Connect and control your Meshtastic devices through various
            platforms. Choose the client that best fits your needs and device
            ecosystem.
          </p>
        </div>
        <div class="container mx-auto flex w-auto flex-wrap justify-center gap-6">
          <div class="card w-[calc(100%-1rem)] sm:w-1/3 md:w-1/4 lg:w-1/4">
            <div class="card__header flex justify-between">
              <h4 class="text-lg font-bold">iOS App</h4>
              <DevicePhoneMobileIcon
                class="h-8 w-8"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            </div>
            <div class="card__body flex justify-center">
              <p>
                Manage your Meshtastic network on-the-go with our iOS
                application.
              </p>
            </div>
            <div class="card__footer flex justify-center mt-4">
              <Link
                to="/docs/software/apple/installation/"
                class="mt-1 underline hover:no-underline font-semibold"
              >
                Try it out &rarr;
              </Link>
            </div>
          </div>
          <div class="card w-[calc(100%-1rem)] sm:w-1/3 md:w-1/4 lg:w-1/4">
            <div class="card__header flex justify-between">
              <h4 class="text-lg font-bold">Android App</h4>
              <DevicePhoneMobileIcon
                class="h-8 w-8"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            </div>
            <div class="card__body flex justify-center">
              <p>
                Connect and control your Meshtastic devices using our Android
                application.
              </p>
            </div>
            <div class="card__footer flex justify-center mt-4">
              <Link
                to="/docs/software/android/installation/"
                class="mt-1 underline hover:no-underline font-semibold"
              >
                Try it out &rarr;
              </Link>
            </div>
          </div>
          <div class="card w-[calc(100%-1rem)] sm:w-1/3 md:w-1/4 lg:w-1/4">
            <div class="card__header flex justify-between">
              <h4 class="text-lg font-bold">Web Client</h4>
              <GlobeAltIcon
                class="h-8 w-8"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            </div>
            <div class="card__body flex justify-center">
              <p>
                Access your Meshtastic network from any device with our
                web-based client.
              </p>
            </div>
            <div class="card__footer flex justify-center mt-4">
              <Link
                to="https://client.meshtastic.org"
                class="mt-1 underline hover:no-underline font-semibold"
              >
                Try it out &rarr;
              </Link>
            </div>
          </div>
          <div class="card w-[calc(100%-1rem)] sm:w-1/3 md:w-1/4 lg:w-1/4">
            <div class="card__header flex justify-between">
              <h4 class="text-lg font-bold">Python CLI/SDK</h4>
              <CommandLineIcon
                class="h-8 w-8"
                style={{ color: "var(--ifm-color-primary)" }}
              />
            </div>
            <div class="card__body flex justify-center">
              <p>
                Command-line interface and software development kit for Python
                developers and power users.
              </p>
            </div>
            <div class="card__footer flex justify-center mt-4">
              <Link
                to="/docs/software/python/cli/installation/"
                class="mt-1 underline hover:no-underline font-semibold"
              >
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
