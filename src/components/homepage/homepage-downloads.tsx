import apps from "@/data/apps.json";
import links from "@/data/links.json";
import Link from "@docusaurus/Link";
import {
  ArrowRight,
  Globe,
  type LucideIcon,
  Smartphone,
  Terminal,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  globe: Globe,
  terminal: Terminal,
};

interface DownloadItemData {
  title: string;
  description: string;
  linkKey?: string;
  href?: string;
  icon: string;
}

function DownloadCard({
  title,
  description,
  linkKey,
  href,
  icon,
}: DownloadItemData) {
  const Icon = iconMap[icon];
  const url = linkKey ? links[linkKey as keyof typeof links] : href;

  return (
    <div className="group rounded-2xl border border-border/50 border-l-4 border-l-primary bg-card/95 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:opacity-90 sm:p-6 lg:p-8">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-mono text-xl font-bold text-foreground sm:text-2xl">
          {title}
        </h3>
        <div className="rounded-lg border-2 border-primary/50 bg-primary/10 p-3">
          <Icon className="size-6 text-primary" />
        </div>
      </div>
      <p className="mb-6 leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Link
        to={url ?? "#"}
        className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80 group-hover:gap-3"
      >
        Try it out
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export function HomepageDownloads() {
  return (
    <section aria-label="Download clients" className="mt-16">
      <div className="mb-12 text-left">
        <h2 className="font-mono text-3xl font-bold text-foreground [text-wrap:balance] md:text-4xl">
          Get Connected
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Connect and control your Meshtastic devices through various platforms.
          Choose the client that best fits your needs and device ecosystem.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {apps.items.map((item) => (
          <DownloadCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
