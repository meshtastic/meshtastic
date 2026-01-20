import { Link } from "@/components/ui/link";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ChevronDown, Github, Heart, LinkIcon, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface NavbarItem {
  label?: string;
  to?: string;
  href?: string;
  position?: "left" | "right";
  type?: string;
  className?: string;
  items?: NavbarItem[];
}

function MobileNavLink({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-3 text-lg text-foreground transition-colors hover:text-primary ${className ?? ""}`}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

function MobileDropdownItem({
  item,
  onClose,
}: {
  item: NavbarItem;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-lg text-foreground"
      >
        {item.label}
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && item.items && (
        <div className="ml-4 border-l border-border pl-4">
          {item.items.map((subItem) => (
            <MobileNavLink
              key={subItem.label}
              href={subItem.to ?? subItem.href ?? "#"}
              onClick={onClose}
              className="py-2 text-base text-muted-foreground"
            >
              {subItem.label}
            </MobileNavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NavbarMobileSidebar(): React.ReactElement | null {
  const mobileSidebar = useNavbarMobileSidebar();
  const { siteConfig } = useDocusaurusContext();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (mobileSidebar.shown) {
      requestAnimationFrame(() => setIsAnimating(true));
    } else {
      setIsAnimating(false);
    }
  }, [mobileSidebar.shown]);

  if (!mobileSidebar.shown) {
    return null;
  }

  const themeConfig = siteConfig.themeConfig as {
    navbar?: { items?: NavbarItem[] };
  };
  const navbarItems = themeConfig.navbar?.items ?? [];

  const leftItems = navbarItems.filter(
    (item) =>
      item.position !== "right" &&
      item.type !== "localeDropdown" &&
      !item.className?.includes("header-github-link"),
  );

  const githubItem = navbarItems.find((item) =>
    item.className?.includes("header-github-link"),
  );

  const handleClose = () => mobileSidebar.toggle();

  return (
    <>
      <div
        className={`fixed inset-0 z-[200] backdrop-blur-sm transition-colors duration-300 ${
          isAnimating ? "bg-black/60" : "bg-black/0"
        }`}
        onClick={handleClose}
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
      />

      <div
        className={`fixed inset-y-0 left-0 z-[201] w-[80vw] max-w-[320px] overflow-y-auto bg-background p-6 transition-transform duration-300 ease-out ${
          isAnimating ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-lg font-semibold text-foreground">
            Menu
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {leftItems.map((item) => {
            if (item.items && item.items.length > 0) {
              return (
                <MobileDropdownItem
                  key={item.label}
                  item={item}
                  onClose={handleClose}
                />
              );
            }

            const href = item.to ?? item.href ?? "#";
            const isFlasher = item.className?.includes("flasher");

            return (
              <MobileNavLink key={item.label} href={href} onClick={handleClose}>
                {isFlasher && <LinkIcon className="mr-2 inline h-4 w-4" />}
                {item.label}
              </MobileNavLink>
            );
          })}
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
          <Link
            href="https://opencollective.com/meshtastic"
            onClick={handleClose}
            className="flex items-center gap-2 rounded-lg bg-primary/15 px-4 py-3 text-primary transition-colors hover:bg-primary/20"
          >
            <Heart className="h-5 w-5" />
            Donate
          </Link>

          {githubItem?.href && (
            <Link
              href={githubItem.href}
              onClick={handleClose}
              className="flex items-center gap-2 rounded-lg bg-primary/15 px-4 py-3 text-primary transition-colors hover:bg-primary/20"
            >
              <Github className="h-5 w-5" />
              GitHub
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
