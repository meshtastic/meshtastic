import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { NetworkMapBackground } from "@/components/homepage/network-map-background";
import { DeviceMockup } from "@/components/homepage/device-mockup";
import { EcosystemStats } from "@/components/homepage/ecosystem-stats";
import { HomepageDownloads } from "@/components/homepage/homepage-downloads";
import { HomepageFeatures } from "@/components/homepage/homepage-features";
import { Sponsors } from "@/components/homepage/sponsors";
import { SocialSidebar } from "@/components/homepage/social-sidebar";
import { LanguageSelector } from "@/components/homepage/language-selector";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import {
  ArrowRight,
  Download,
  FileText,
  Heart,
  LinkIcon,
  GithubIcon,
} from "lucide-react";
import links from "@/data/links.json";

export function HomePageContent() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20 lg:pb-0">
      <div aria-hidden="true">
        <NetworkMapBackground />
      </div>

      <aside aria-label="Social links">
        <SocialSidebar />
      </aside>

      <div className="relative z-10">
        <header className="border-b border-border/50 bg-overlay backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <img
                src={useBaseUrl("design/logo/svg/Mesh_Logo_Green.svg")}
                alt="Meshtastic"
                className="h-11 rounded-lg w-auto"
              />
              <h1 className="font-semibold text-lg font-mono text-foreground">
                Meshtastic
              </h1>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <Link href={links.docs}>Documentation</Link>
              <Link href={links.downloads}>Downloads</Link>
              <Link href={links.webFlasher} className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Web Flasher
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {/* <LanguageSelector /> */}
              <Button
                variant="default"
                size="sm"
                className="border-primary/50 bg-primary/15 p-5 text-primary shadow-none transition-colors hover:bg-primary/20 hover:text-primary"
                asChild
              >
                <Link href={links.donate}>
                  <Heart className="mr-2 h-4 w-4" />
                  Donate
                </Link>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="border-primary/50 bg-primary/15 p-5 text-primary shadow-none transition-colors hover:bg-primary/20 hover:text-primary"
                asChild
              >
                <Link href={links.github}>
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
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

        <footer className="border-t border-border/50 bg-card/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="flex flex-col items-center justify-center gap-2 text-center text-base text-muted-foreground md:flex-row md:gap-1">
              <Link href={links.vercel} className="flex items-center gap-2">
                Powered by
                <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <title>Vercel Logo</title>
                    <path d="M12 0L24 24H0L12 0z" />
                  </svg>
                  Vercel
                </span>
              </Link>
              <span className="hidden md:inline">|</span>
              <span>
                Meshtastic® is a registered trademark of Meshtastic LLC.
              </span>
              <span className="hidden md:inline">|</span>
              <Link
                href={links.legal}
                className="text-muted-foreground hover:opacity-80 transition-opacity"
              >
                Legal Information
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
