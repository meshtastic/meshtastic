import React from "react";
import { FiExternalLink } from "react-icons/fi";

export interface SocialCardProps {
  children: React.ReactNode;
  color: string;
  link: string;
}

export const SocialCard = ({
  children,
  color,
  link,
}: SocialCardProps): JSX.Element => {
  return (
    <div
      className={`relative group flex rounded-xl h-24 flex-shrink-0 min-w-max w-36 shadow-xl bg-[#${color}] m-2`}
    >
      {children}
      <a
        className="group-hover:flex text-2xl hidden absolute top-0 left-0 right-0 bottom-0 bg-secondaryDark rounded-xl shadow-xl border border-accent bg-opacity-95"
        href={link}
        target="_blank"
      >
        <FiExternalLink className="m-auto" />
      </a>
    </div>
  );
};
