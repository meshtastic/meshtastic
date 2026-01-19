import { useState, useEffect } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/components/ui/tooltip";
import { Link } from "@/components/ui/link";
import {
	DiscordIcon,
	XIcon,
	FacebookIcon,
	InstagramIcon,
	YouTubeIcon,
	RedditIcon,
	MastodonIcon,
	TelegramIcon,
} from "@/components/icons/socials";
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
		setIsTouchDevice(
			"ontouchstart" in window || navigator.maxTouchPoints > 0,
		);
	}, []);

	const SocialLink = ({ social }: { social: Social }) => {
		const Icon = social.icon;
		return (
			<Link
				href={social.href}
				className="group flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground [&_svg]:h-6 [&_svg]:w-6"
				aria-label={social.name}
			>
				<Icon />
			</Link>
		);
	};

	return (
		<TooltipProvider>
			<div className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2 lg:hidden">
				<div className="flex flex-row gap-1 rounded-xl border border-border/50 bg-card/60 p-2 backdrop-blur-md">
					{socials.map((social) => (
						<SocialLink key={social.name} social={social} />
					))}
				</div>
			</div>

			<div
				className="fixed top-1/2 z-20 hidden -translate-y-1/2 -translate-x-full lg:block"
				style={{
					left: "max(1rem, calc((100vw - min(80rem, 100vw - 3rem)) / 2 - 1rem))",
				}}
			>
				<div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/60 p-3 backdrop-blur-md">
					{socials.map((social) =>
						isTouchDevice ? (
							<SocialLink key={social.name} social={social} />
						) : (
							<Tooltip key={social.name}>
								<TooltipTrigger asChild>
									<SocialLink social={social} />
								</TooltipTrigger>
								<TooltipContent side="right" sideOffset={12}>
									{social.name}
								</TooltipContent>
							</Tooltip>
						),
					)}
				</div>
			</div>
		</TooltipProvider>
	);
}
