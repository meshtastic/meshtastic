import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import links from "@/data/links.json";
import { GithubIcon, Heart, LinkIcon } from "lucide-react";

export function HomepageHeader() {
  return (
    <header className="border-b border-border/50 bg-overlay backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img
            src="/img/logo.svg"
            alt="Meshtastic"
            className="h-11 w-auto rounded-lg"
          />
          <h1 className="font-semibold text-lg font-mono text-foreground leading-none m-0">
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
            asChild={true}
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
            asChild={true}
          >
            <Link href={links.github}>
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
