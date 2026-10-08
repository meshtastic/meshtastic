import { Button } from "@/components/ui/button";
import devicesData from "@/data/devices.json";
import { shuffle } from "@/lib/utils";
import Link from "@docusaurus/Link";
import useIsBrowser from "@docusaurus/useIsBrowser";
import Translate, { translate } from "@docusaurus/Translate";
import { ArrowRight, Radio } from "lucide-react";
import React, { useMemo } from "react";

interface Device {
  name: string;
  vendor: string;
  image: string;
  url: string;
  tags: string[];
}

const { devices, imageBaseUrl, callToAction } = devicesData;

function DeviceCard({
  device,
  headingLevel: Heading,
}: {
  device: Device;
  headingLevel: "h2" | "h3" | "h4";
}) {
  const imageUrl = `${imageBaseUrl}${device.image}`;
  const isExternal = device.url.startsWith("http");

  return (
    <Link
      to={device.url}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className="group relative flex w-[calc(50%-0.5rem)] flex-col items-center rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 no-underline sm:w-[calc(33.333%-0.67rem)] md:w-[calc(25%-0.75rem)]"
    >
      <div className="relative h-32 w-32 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={device.name}
          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-4 text-center">
        <Heading className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {device.name}
        </Heading>
        <p className="text-xs text-muted-foreground">{device.vendor}</p>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {device.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

interface DevicesProps {
  // Where this list sits in the page outline. The call to action uses this
  // level; the cards sit one below it. A page that leads with this list passes
  // "h1", the homepage overlay keeps the default.
  headingLevel?: "h1" | "h2" | "h3";
}

export function Devices({ headingLevel: Heading = "h3" }: DevicesProps = {}) {
  // The card order is shuffled on every visit.
  //
  // Shuffling during render would make a server-rendered page disagree with its
  // own hydration, so the order is settled once the browser takes over:
  // useIsBrowser stays false through the first client render, matching the
  // server, then flips. The overlay only ever mounts after hydration, so it is
  // shuffled on its first paint as before.
  const isBrowser = useIsBrowser();
  // Cards sit one level below the call to action, so no placement skips a level.
  const cardHeadingLevel = { h1: "h2", h2: "h3", h3: "h4" }[Heading] as
    | "h2"
    | "h3"
    | "h4";
  const deviceList = useMemo(
    () => (isBrowser ? shuffle(devices as Device[]) : (devices as Device[])),
    [isBrowser],
  );

  return (
    <section
      aria-label={translate({
        id: "homepage.devices.partnerDevices",
        message: "Partner Devices",
      })}
    >
      <div className="mb-4 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
        <div>
          <Heading className="font-mono text-2xl font-bold text-foreground sm:text-3xl">
            {callToAction.title}
          </Heading>
          <p className="mt-2 max-w-xl text-muted-foreground">
            {callToAction.subtitle}
          </p>
        </div>
        <Link to={callToAction.buttonUrl} className="mt-4 md:mt-0">
          <Button
            variant="default"
            className="border-0 bg-[hsl(var(--btn-primary))] font-mono text-white dark:text-black hover:bg-[hsl(var(--btn-primary-hover))]"
          >
            <Radio className="mr-2 size-4" />
            {callToAction.buttonText}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {deviceList.map((device) => (
          <DeviceCard
            key={device.name}
            device={device}
            headingLevel={cardHeadingLevel}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Translate id="homepage.devices.viewAll">View all</Translate>{" "}
        <Link
          to="/docs/hardware/devices/"
          className="text-primary hover:underline"
        >
          <Translate id="homepage.devices.supportedDevices">
            supported devices
          </Translate>
        </Link>{" "}
        <Translate id="homepage.devices.orVisitPartners">
          or visit our partners directly
        </Translate>
      </p>
    </section>
  );
}
