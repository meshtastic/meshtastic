import type React from "react";
import { useEffect, useState } from "react";
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
import { Link } from "@/components/ui/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import socialsData from "@/data/socials.json";

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

export function SocialSidebar() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const SocialLink = ({ social }: { social: Social }) => {
    const Icon = social.icon;
    return (
      <Link
        href={social.href}
        className="group flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground [&_svg]:h-5 [&_svg]:w-5"
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

  return (
    <TooltipProvider>
      <div className="fixed z-10 bottom-20 md:bottom-14  left-1/2 -translate-x-1/2 lg:hidden">
        <div className="flex flex-row gap-4 rounded-xl border border-border/50 bg-card/60 p-4 backdrop-blur-md">
          {socials.map((social) => (
            <SocialLink key={social.name} social={social} />
          ))}
        </div>
      </div>

      <div
        className="fixed  top-1/2 hidden -translate-y-1/2 -translate-x-full lg:block"
        style={{
          left: "max(1rem, calc((100vw - min(80rem, 100vw - 3rem)) / 2 - 1rem))",
        }}
      >
        <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/60 p-2 backdrop-blur-md">
          {socials.map((social) => (
            <SocialLinkWithTooltip key={social.name} social={social} />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
