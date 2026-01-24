import type React from "react";
import type { JSX } from "react";
import { FiExternalLink } from "react-icons/fi";

export interface SocialCardProps {
  children: React.ReactNode;
  color: string;
  link: string;
  isMeLink?: boolean;
}

export const SocialCard = ({
  children,
  color,
  link,
  isMeLink = false,
}: SocialCardProps): JSX.Element => {
  return (
    <div
      className={`group relative flex h-20 w-28 flex-shrink-0 rounded-lg shadow-lg ${color} m-1`}
    >
      {children}
      <a
        className="absolute inset-0 hidden rounded-lg border border-accent bg-secondary bg-opacity-95 text-2xl shadow-xl group-hover:flex"
        href={link}
        rel={isMeLink ? "me noreferrer" : "noreferrer"}
        target="_blank"
      >
        <FiExternalLink className="m-auto" />
      </a>
    </div>
  );
};
