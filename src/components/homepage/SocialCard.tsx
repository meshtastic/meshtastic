import type React from "react";
import type { JSX } from "react";
import { FiExternalLink } from "react-icons/fi";

export interface SocialCardProps {
  children: React.ReactNode;
  color: string;
  link: string;
  isMeLink?: boolean;
  ariaLabel?: string;
}

export const SocialCard = ({
  children,
  color,
  link,
  isMeLink = false,
  ariaLabel = "Open link",
}: SocialCardProps): JSX.Element => {
  return (
    <div
      className={`group relative flex h-20 w-28 flex-shrink-0 rounded-lg shadow-lg ${color} m-1`}
    >
      {children}
      <a
        className="absolute inset-0 flex rounded-lg border border-accent bg-secondary bg-opacity-95 text-2xl opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100"
        aria-label={ariaLabel}
        href={link}
        rel={isMeLink ? "me noreferrer" : "noreferrer"}
        target="_blank"
      >
        <FiExternalLink className="m-auto" />
      </a>
    </div>
  );
};
