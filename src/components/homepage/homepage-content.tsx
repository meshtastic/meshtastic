import { DeviceMockup } from "@/components/homepage/device-mockup";
import { EcosystemStats } from "@/components/homepage/ecosystem-stats";
import { HomepageDownloads } from "@/components/homepage/homepage-downloads";
import { HomepageFeatures } from "@/components/homepage/homepage-features";
import { HomepageFooter } from "@/components/homepage/homepage-footer";
import { HomepageHeader } from "@/components/homepage/homepage-header";
import { NetworkMapBackground } from "@/components/homepage/network-map-background";
import { SocialSidebar } from "@/components/homepage/social-sidebar";
import { Sponsors } from "@/components/homepage/sponsors";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import links from "@/data/links.json";
import { ArrowRight, Download, FileText } from "lucide-react";

export function HomePageContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true">
        <NetworkMapBackground />
      </div>

      <aside aria-label="Social links">
        <SocialSidebar />
      </aside>

      <div className="relative z-10 flex min-h-screen flex-col">
        <HomepageHeader />
        <main className="mx-auto max-w-7xl flex-1 px-6 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <h2 className="[text-wrap:balance] font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Off-Grid
                <br />
                <span className="text-primary">Communication</span>
                <br />
                For Everyone
              </h2>

              <div className="mt-6 rounded-xl border border-border/50 bg-card/95 p-6 backdrop-blur-xl">
                <p className="max-w-lg text-lg m-auto text-center lg:text-left text-foreground lg:max-w-none">
                  An open source, off-grid, decentralized mesh network built to
                  run on affordable, low-power devices. No cell towers. No
                  internet. Just pure peer-to-peer connectivity.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link href={links.getStarted}>
                  <Button
                    size="lg"
                    variant={"default"}
                    className="w-full border-0 bg-primary p-5 font-mono text-base shadow-none transition-all hover:brightness-110 sm:w-auto"
                  >
                    <Download className="mr-2 size-6" />
                    Get Started
                    <ArrowRight className="ml-2 size-6" />
                  </Button>
                </Link>
                <Link href={links.docs}>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full border-0 bg-transparent p-5 font-mono text-base text-white !shadow-none transition-colors hover:bg-primary/20 hover:text-primary sm:w-auto"
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

            <div className="hidden lg:flex lg:justify-end">
              <DeviceMockup />
            </div>
          </div>
          <HomepageFeatures />

          <HomepageDownloads />

          <section aria-label="Sponsors" className="mt-16">
            <Sponsors />
          </section>
        </main>

        <HomepageFooter />
      </div>
    </div>
  );
}
