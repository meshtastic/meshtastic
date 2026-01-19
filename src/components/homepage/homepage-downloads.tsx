import React from "react";
import { ArrowRight, Smartphone, Globe, Terminal } from "lucide-react";
import { Link } from "@/components/ui/link";
import links from "@/data/links.json";

export function HomepageDownloads() {
  return (
    <section aria-label="Download clients" className="mt-16">
      <div className="text-left mb-12">
        <h2 className="[text-wrap:balance] font-mono text-3xl font-bold text-foreground md:text-4xl">
          Get Connected
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          Connect and control your Meshtastic devices through various
          platforms. Choose the client that best fits your needs and
          device ecosystem.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-2xl border border-border/50 border-l-4 border-l-primary bg-card/95 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:opacity-90">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-mono text-2xl font-bold text-foreground">
              iOS App
            </h3>
            <div className="rounded-lg border-2 border-primary/50 bg-primary/10 p-3">
              <Smartphone className="size-6 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Manage your Meshtastic network on-the-go with our iOS
            application.
          </p>
          <Link
            href={links.ios}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group-hover:gap-3"
          >
            Try it out
            <ArrowRight className="size-6" />
          </Link>
        </div>

        <div className="group rounded-2xl border border-border/50 border-l-4 border-l-primary bg-card/95 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:opacity-90">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-mono text-2xl font-bold text-foreground">
              Android App
            </h3>
            <div className="rounded-lg border-2 border-primary/50 bg-primary/10 p-3">
              <Smartphone className="size-6 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Connect and control your Meshtastic devices using our Android
            application.
          </p>
          <Link
            href={links.android}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group-hover:gap-3"
          >
            Try it out
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="group rounded-2xl border border-border/50 border-l-4 border-l-primary bg-card/95 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:opacity-90">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-mono text-2xl font-bold text-foreground">
              Web Client
            </h3>
            <div className="rounded-lg border-2 border-primary/50 bg-primary/10 p-3">
              <Globe className="size-6 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Access your Meshtastic network from any device with our
            web-based client.
          </p>
          <a
            href="https://client.meshtastic.org/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group-hover:gap-3"
          >
            Try it out
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="group rounded-2xl border border-border/50 border-l-4 border-l-primary bg-card/95 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:opacity-90">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-mono text-2xl font-bold text-foreground">
              Python CLI/SDK
            </h3>
            <div className="rounded-lg border-2 border-primary/50 bg-primary/10 p-3">
              <Terminal className="size-6 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Command-line interface and SDK for Python developers.
          </p>
          <a
            href="https://meshtastic.org/docs/software/python/cli/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group-hover:gap-3"
          >
            Try it out
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
