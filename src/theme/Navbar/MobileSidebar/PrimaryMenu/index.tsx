import React from "react";
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from "@docusaurus/theme-common/internal";

const extraLinks = [
  { label: "Blog", href: "/blog/" },
  { label: "Downloads", href: "/downloads/" },
  { label: "Flasher", href: "https://flasher.meshtastic.org" },
  { label: "Donate", href: "https://opencollective.com/meshtastic" },
  { label: "GitHub", href: "https://github.com/meshtastic" },
];

export default function PrimaryMenu(): React.ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const secondaryMenu = useNavbarSecondaryMenu();

  return (
    <>
      {secondaryMenu.content}
      <ul
        className="menu__list"
        style={{
          borderTop: "1px solid var(--ifm-toc-border-color)",
          marginTop: "0.5rem",
          paddingTop: "0.5rem",
        }}
      >
        {extraLinks.map(({ label, href }) => {
          const isExternal = href.startsWith("http");
          return (
            <li key={label} className="menu__list-item">
              <a
                className="menu__link"
                href={href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() => mobileSidebar.toggle()}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
