import { DeviceMockup } from "@/components/homepage/device-mockup";
import { EcosystemStats } from "@/components/homepage/ecosystem-stats";
import { HomepageDownloads } from "@/components/homepage/homepage-downloads";
import { HomepageFeatures } from "@/components/homepage/homepage-features";
import { NetworkMapBackground } from "@/components/homepage/network-map-background";
import { Devices } from "@/components/homepage/devices";
import { Sponsors } from "@/components/homepage/sponsors";
import { Button } from "@/components/ui/button";
import links from "@/data/links.json";
import Link from "@docusaurus/Link";
import { ArrowRight, Download, FileText, Radio, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SocialSidebar } from "./social-sidebar";

export function HomePageContent() {
  const [showDevices, setShowDevices] = useState(false);

  useEffect(() => {
    if (showDevices) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setShowDevices(false);
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEscape);
      };
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDevices]);

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

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start flex-wrap">
                <Link to={links.getStarted}>
                  <Button
                    size="lg"
                    variant={"default"}
                    className="w-full border-0 bg-[hsl(var(--btn-primary))] p-5 font-mono text-base text-white dark:text-black shadow-none transition-colors hover:bg-[hsl(var(--btn-primary-hover))] sm:w-auto"
                  >
                    <Download className="mr-2 size-6" />
                    Get Started
                    <ArrowRight className="ml-2 size-6" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => setShowDevices(true)}
                  className="w-full border-0 bg-transparent p-5 font-mono text-base text-foreground !shadow-none transition-colors hover:bg-[hsl(var(--btn-primary)/0.2)] hover:text-[hsl(var(--btn-primary))] sm:w-auto"
                >
                  <Radio className="mr-2 size-6" />
                  Need Hardware?
                </Button>
                <Link to={links.docs}>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full border-0 bg-transparent p-5 font-mono text-base text-foreground !shadow-none transition-colors hover:bg-[hsl(var(--btn-primary)/0.2)] hover:text-[hsl(var(--btn-primary))] sm:w-auto"
                  >
                    <FileText className="mr-2 size-6" />
                    Read the Docs
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

      {/* Devices Overlay */}
      {showDevices && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Devices"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-20"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div
            role="document"
            className="relative z-10 max-h-[calc(90vh-4rem)] w-full max-w-5xl overflow-y-auto rounded-2xl border border-border/50 bg-card/95 p-6 pt-12 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setShowDevices(false)}
              className="absolute right-4 top-4 z-20 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-6" />
            </button>
            <Devices />
          </div>
        </div>
      )}
    </div>
  );
}
