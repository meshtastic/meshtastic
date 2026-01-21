import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  MastodonIcon,
  RedditIcon,
  TelegramIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons/socials";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import socialsData from "@/data/socials.json";
import { cn } from "@/lib/utils";
import Link from "@docusaurus/Link";
import type React from "react";
import { useEffect, useState } from "react";

const iconComponents: Record<string, React.FC> = {
  Discord: DiscordIcon,
  X: XIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  Reddit: RedditIcon,
  Mastodon: MastodonIcon,
  Telegram: TelegramIcon,
};

interface Social {
  name: string;
  href: string;
  icon: React.FC;
}

const socials: Social[] = socialsData.socials.map((s) => ({
  name: s.name,
  href: s.href,
  icon: iconComponents[s.name],
}));

interface SocialSidebarProps {
  className?: string;
  variant?: "mobile" | "desktop" | "both";
}

export function SocialSidebar({
  className,
  variant = "both",
}: SocialSidebarProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const SocialLink = ({ social }: { social: Social }) => {
    const Icon = social.icon;
    return (
      <Link
        to={social.href}
        className="group flex h-11 w-11 xl:h-12 xl:w-12 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground [&_svg]:h-5 [&_svg]:w-5 xl:[&_svg]:h-6 xl:[&_svg]:w-6"
        aria-label={social.name}
      >
        <Icon />
      </Link>
    );
  };

  const SocialLinkWithTooltip = ({ social }: { social: Social }) => {
    if (isTouchDevice) {
      return <SocialLink social={social} />;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <SocialLink social={social} />
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={12}>
          {social.name}
        </TooltipContent>
      </Tooltip>
    );
  };

  const showMobile = variant === "mobile" || variant === "both";
  const showDesktop = variant === "desktop" || variant === "both";

  return (
    <TooltipProvider>
      {/* sidebar */}
      {showMobile && (
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 flex h-[var(--social-bar-height)] items-center justify-center bg-background/95 backdrop-blur-md border-t border-border/50 xl:hidden",
            className,
          )}
        >
          <div className="flex flex-row gap-6">
            {socials.map((social) => (
              <SocialLink key={social.name} social={social} />
            ))}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      {showDesktop && (
        <div
          className={cn(
            "fixed z-10 top-1/2 hidden -translate-y-1/2 -translate-x-full xl:block left-[max(1rem,calc((100vw-min(80rem,100vw-3rem))/2-1rem))]",
            className,
          )}
        >
          <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/60 p-2 backdrop-blur-md">
            {socials.map((social) => (
              <SocialLinkWithTooltip key={social.name} social={social} />
            ))}
          </div>
        </div>
      )}
    </TooltipProvider>
  );
}
