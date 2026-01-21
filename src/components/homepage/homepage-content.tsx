import { DeviceMockup } from "@/components/homepage/device-mockup";
import { EcosystemStats } from "@/components/homepage/ecosystem-stats";
import { HomepageDownloads } from "@/components/homepage/homepage-downloads";
import { HomepageFeatures } from "@/components/homepage/homepage-features";
import { NetworkMapBackground } from "@/components/homepage/network-map-background";
import { Sponsors } from "@/components/homepage/sponsors";
import { Button } from "@/components/ui/button";
import links from "@/data/links.json";
import Link from "@docusaurus/Link";
import { ArrowRight, Download, FileText } from "lucide-react";
import React from "react";
import { SocialSidebar } from "./social-sidebar";

export function HomePageContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true">
        <NetworkMapBackground />
      </div>

      <aside aria-label="Social links">
        <SocialSidebar variant="desktop" />
      </aside>

      <div className="relative flex min-h-screen flex-col">
        <main className="mx-auto max-w-7xl flex-1 px-4 sm:px-6 py-16 lg:py-24">
          <div className="flex flex-row gap-8 md:gap-8  lg:gap-16">
            <div className="">
              <h2 className="[text-wrap:balance] font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Off-Grid
                <br />
                <span className="text-primary dark:text-[hsl(var(--btn-primary))]">
                  Communication
                </span>
                <br />
                For Everyone
              </h2>

              <div className="mt-6 rounded-xl border border-border/50 bg-card/95 py-6 md:p-6 backdrop-blur-xl">
                <p className="max-w-lg text-lg m-auto text-foreground lg:max-w-none">
                  An open source, off-grid, decentralized mesh network built to
                  run on affordable, low-power devices. No cell towers. No
                  internet. Just pure peer-to-peer connectivity.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link to={links.getStarted}>
                  <Button
                    size="lg"
                    variant={"default"}
                    className="w-full border-0 bg-[hsl(var(--btn-primary))] p-5 font-mono text-base text-[hsl(var(--btn-primary-foreground))] shadow-none transition-colors hover:bg-[hsl(var(--btn-primary-hover))] sm:w-auto"
                  >
                    <Download className="mr-2 size-6" />
                    Get Started
                    <ArrowRight className="ml-2 size-6" />
                  </Button>
                </Link>
                <Link to={links.docs}>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full border-0 bg-transparent p-5 font-mono text-base text-foreground !shadow-none transition-colors hover:bg-[hsl(var(--btn-primary)/0.2)] hover:text-[hsl(var(--btn-primary))] sm:w-auto"
                  >
                    <FileText className="mr-2 size-6" />
                    Read Docs
                  </Button>
                </Link>
              </div>

              <div className="mt-12">
                <EcosystemStats />
              </div>
            </div>

            <div className="hidden md:flex shrink-0 justify-center lg:justify-end">
              <DeviceMockup />
            </div>
          </div>
          <HomepageFeatures />

          <HomepageDownloads />

          <section aria-label="Sponsors" className="mt-16">
            <Sponsors />
          </section>
        </main>
      </div>
    </div>
  );
}
