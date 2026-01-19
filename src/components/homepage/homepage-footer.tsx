import React from "react";
import { Link } from "@/components/ui/link";
import links from "@/data/links.json";

export function HomepageFooter() {
  return (
    <footer className="mb-20 border-t border-border/50 bg-card/80 backdrop-blur-sm lg:mb-0">
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
  );
}
