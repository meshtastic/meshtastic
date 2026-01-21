import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useColorMode } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import LocaleDropdownNavbarItem from "@theme/NavbarItem/LocaleDropdownNavbarItem";
import SearchBar from "@theme/SearchBar";
import { ChevronDown, GithubIcon, Heart, LinkIcon, Menu } from "lucide-react";
import type React from "react";

interface NavbarItem {
  label?: string;
  to?: string;
  href?: string;
  type?: string;
  className?: string;
  items?: NavbarItem[];
}

interface NavbarLogo {
  alt?: string;
  src: string;
  srcDark?: string;
}

function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={cn(
        "text-base text-muted-foreground transition-opacity hover:opacity-80",
        className,
      )}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}

function DropdownNavItem({ item }: { item: NavbarItem }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 text-base text-muted-foreground transition-opacity hover:opacity-80"
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      {item.items && (
        <div className="absolute top-full left-0 z-[1] mt-1 hidden min-w-[160px] rounded-md border border-border bg-background py-1 shadow-lg group-hover:block group-focus-within:block">
          {item.items.map((subItem) => (
            <a
              key={subItem.label}
              href={subItem.to ?? subItem.href}
              className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              {...(subItem.href?.startsWith("http") && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {subItem.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileMenuButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      className="flex rounded-lg shadow-none border-none h-9 w-9 items-center justify-center p-2 text-muted-foreground md:hidden"
      onClick={() => mobileSidebar.toggle()}
      aria-label="Toggle mobile menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}

export default function Navbar(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();

  const themeConfig = siteConfig.themeConfig as {
    navbar?: { items?: NavbarItem[]; logo?: NavbarLogo };
  };
  const navbarItems = themeConfig.navbar?.items ?? [];
  const logo = themeConfig.navbar?.logo;
  const { colorMode } = useColorMode();
  const logoSrc =
    colorMode === "dark" && logo?.srcDark ? logo.srcDark : logo?.src;

  const leftItems = navbarItems.filter(
    (item) =>
      item.type !== "localeDropdown" &&
      !item.className?.includes("header-github-link"),
  );

  const githubItem = navbarItems.find((item) =>
    item.className?.includes("header-github-link"),
  );

  console.log(leftItems);

  return (
    <>
      <header
        className="sticky top-0 border-b border-border/50 backdrop-blur-xl"
        style={{ backgroundColor: "lch(3% 3% 267deg / 0.8)" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              {logoSrc && (
                <img
                  src={`/${logoSrc}`}
                  alt={logo?.alt ?? siteConfig.title}
                  className="h-11 w-auto rounded-lg"
                />
              )}
              <span className="font-semibold text-lg font-mono text-foreground leading-none">
                {siteConfig.title}
              </span>
            </a>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {leftItems.map((item) => {
              if (item.items && item.items.length > 0) {
                return <DropdownNavItem key={item.label} item={item} />;
              }

              const href = item.to ?? item.href ?? "#";
              const isFlasher = item.className?.includes("flasher");

              return (
                <NavLink
                  key={item.label}
                  href={href}
                  className={isFlasher ? "flex items-center gap-2" : undefined}
                >
                  {isFlasher && <LinkIcon className="h-4 w-4" />}
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="navbar-locale-dropdown hidden sm:block">
              <LocaleDropdownNavbarItem
                dropdownItemsBefore={[]}
                dropdownItemsAfter={[]}
                mobile={false}
              />
            </div>

            <div className="navbar-search">
              <SearchBar />
            </div>

            <Button
              variant="default"
              size="sm"
              className="hidden border-primary/50 bg-primary/15 p-5 text-primary shadow-none transition-colors hover:bg-primary/20 hover:text-primary lg:inline-flex"
              asChild
            >
              <a
                href="https://opencollective.com/meshtastic"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Heart className="mr-2 h-4 w-4" />
                Donate
              </a>
            </Button>

            {githubItem && (
              <Button
                variant="default"
                size="sm"
                className="hidden border-primary/50 bg-primary/15 p-5 text-primary shadow-none transition-colors hover:bg-primary/20 hover:text-primary lg:inline-flex"
                asChild
              >
                <a
                  href={githubItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}

            <MobileMenuButton />
          </div>
        </nav>
      </header>
      <NavbarMobileSidebar />
    </>
  );
}
