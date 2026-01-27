import React from "react";
import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import type { NavbarItem } from "@docusaurus/theme-common/lib/utils/useThemeConfig";
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from "@docusaurus/theme-common/internal";

export default function PrimaryMenu(): React.ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const secondaryMenu = useNavbarSecondaryMenu();
  const { navbar } = useThemeConfig();

  const linkItems = navbar.items.filter(
    (item: NavbarItem) =>
      item.type !== "localeDropdown" && item.type !== "search",
  );

  return (
    <>
      {secondaryMenu.content}
      <div className="mt-2 border-t border-[var(--ifm-toc-border-color)] px-[var(--ifm-menu-link-padding-horizontal)] pt-3 text-md font-bold uppercase tracking-wide text-[var(--ifm-color-emphasis-600)]">
        Navigation
      </div>
      <ul className="menu__list">
        {linkItems.map((item) => (
          <li key={item.label} className="menu__list-item">
            <Link
              className="menu__link"
              href={String(item.href ?? item.to)}
              onClick={() => mobileSidebar.toggle()}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
