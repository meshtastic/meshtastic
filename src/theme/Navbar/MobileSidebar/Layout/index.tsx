import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
}: {
  header: React.ReactNode;
  primaryMenu: React.ReactNode;
  secondaryMenu: React.ReactNode;
}): React.ReactNode {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.container,
        "navbar-sidebar",
      )}
    >
      {header}
      <div className="navbar-sidebar__items">
        <div
          className={clsx(
            ThemeClassNames.layout.navbar.mobileSidebar.panel,
            "navbar-sidebar__item menu",
          )}
        >
          {primaryMenu}
        </div>
      </div>
    </div>
  );
}
