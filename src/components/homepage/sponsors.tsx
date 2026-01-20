import type React from "react";
import { type ReactNode, useEffect, useState } from "react";

import bqConsulting from "@/components/sponsors/BQ Consulting";
import Datadog from "@/components/sponsors/Datadog";
import Elecrow from "@/components/sponsors/Elecrow";
import Heltec from "@/components/sponsors/Heltec";
import Hexaspot from "@/components/sponsors/Hexaspot";
import LilyGo from "@/components/sponsors/LilyGo";
import M5Stack from "@/components/sponsors/M5Stack";
import MuziWorks from "@/components/sponsors/MuziWorks";
import NomadStar from "@/components/sponsors/NomadStar";
import OpenCollective from "@/components/sponsors/OpenCollective";
import rakWireless from "@/components/sponsors/RAK Wireless";
import SeeedStudio from "@/components/sponsors/SeeedStudio";
import Vercel from "@/components/sponsors/Vercel";
import sponsorsData from "@/data/sponsors.json";
import { shuffle } from "@/lib/utils";

const logoComponents: Record<string, React.FC> = {
  "BQ Consulting": bqConsulting,
  Heltec: Heltec,
  "RAK Wireless": rakWireless,
  "Seeed Studio": SeeedStudio,
  Elecrow: Elecrow,
  LilyGo: LilyGo,
  M5Stack: M5Stack,
  MuziWorks: MuziWorks,
  NomadStar: NomadStar,
  Hexaspot: Hexaspot,
  "Open Collective": OpenCollective,
  Vercel: Vercel,
  Datadog: Datadog,
};

interface Sponsor {
  component: React.FC;
  name: string;
  url: string;
}

const LOGO_COLOR = "#9da3af";
const MARQUEE_DURATION = "35s";

const initialSupporters: Sponsor[] = sponsorsData.supporters.map((s) => ({
  component: logoComponents[s.name],
  name: s.name,
  url: s.url,
}));

const sponsors: Sponsor[] = sponsorsData.sponsors.map((s) => ({
  component: logoComponents[s.name],
  name: s.name,
  url: s.url,
}));

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
}

function Marquee({ children, reverse }: MarqueeProps) {
  return (
    <div className="relative mt-6 md:mt-8 w-full overflow-hidden py-4 md:py-8">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 md:w-24 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 md:w-24 bg-gradient-to-l from-card to-transparent" />

      <div
        className="marquee-track flex w-max items-center"
        style={{ "--duration": MARQUEE_DURATION } as React.CSSProperties}
        data-reverse={reverse || undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

export function Sponsors() {
  const [supporters, setSupporters] = useState(initialSupporters);

  useEffect(() => {
    setSupporters(shuffle(initialSupporters));
  }, []);

  return (
    <div className="relative max-w-full overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-4 md:p-8 backdrop-blur-sm [contain:inline-size]">
      <div>
        <h4 className="[text-wrap:balance] font-mono text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Supported By
        </h4>

        <Marquee>
          {supporters.map((supporter) => {
            const Logo = supporter.component;
            return (
              <a
                key={supporter.name}
                href={supporter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 shrink-0 items-center px-4 transition-transform hover:scale-110 md:h-12 md:px-8"
                style={{ color: LOGO_COLOR }}
              >
                <Logo />
              </a>
            );
          })}
        </Marquee>
      </div>

      <div className="my-4 border-t border-border/30" />

      <div>
        <h4 className="[text-wrap:balance] font-mono text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Sponsored By
        </h4>

        <Marquee reverse={true}>
          {sponsors.map((sponsor) => {
            const Logo = sponsor.component;
            return (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 shrink-0 items-center px-6 transition-transform hover:scale-110 md:h-10 md:px-12"
                style={{ color: LOGO_COLOR }}
              >
                <Logo />
              </a>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
