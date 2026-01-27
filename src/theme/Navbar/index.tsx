import { Button } from "@/components/ui/button";
import navData from "@/data/nav.json";
import { cn } from "@/lib/utils";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ColorModeToggle from "@theme/ColorModeToggle";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import LocaleDropdownNavbarItem from "@theme/NavbarItem/LocaleDropdownNavbarItem";
import SearchBar from "@theme/SearchBar";
import { ChevronDown, GithubIcon, Heart, Menu } from "lucide-react";
import type React from "react";

interface NavItem {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
  items?: NavItem[];
}

interface NavAction {
  label: string;
  href: string;
  icon: string;
}

interface NavbarLogo {
  alt?: string;
  src: string;
  srcDark?: string;
}

function NavLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "text-base text-muted-foreground transition-opacity hover:opacity-80",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function DropdownNavItem({ item }: { item: NavItem }) {
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
            <Link
              key={subItem.label}
              to={subItem.to ?? subItem.href ?? "#"}
              className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {subItem.label}
            </Link>
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
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted shadow-none md:hidden"
      onClick={() => mobileSidebar.toggle()}
      aria-label="Toggle mobile menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

export default function Navbar(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();

  const themeConfig = siteConfig.themeConfig as {
    navbar?: { logo?: NavbarLogo };
  };
  const logo = themeConfig.navbar?.logo;
  const { colorMode, setColorMode } = useColorMode();
  const logoSrc =
    colorMode === "dark" && logo?.srcDark ? logo.srcDark : logo?.src;

  const navItems = navData.items as NavItem[];
  const navActions = navData.actions as NavAction[];
  const donateAction = navActions.find((a) => a.icon === "heart");
  const githubAction = navActions.find((a) => a.icon === "github");

  return (
    <>
      <header className="sticky top-0 border-b border-border/50 bg-[hsl(var(--navbar-bg))] backdrop-blur-xl z-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              {logoSrc && (
                <img
                  src={`/${logoSrc}`}
                  alt={logo?.alt ?? siteConfig.title}
                  className="h-11 w-auto"
                />
              )}
              <span className="font-semibold text-lg font-mono text-foreground leading-none">
                {siteConfig.title}
              </span>
            </Link>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              if (item.items && item.items.length > 0) {
                return <DropdownNavItem key={item.label} item={item} />;
              }

              const href = item.to ?? item.href ?? "#";

              return (
                <NavLink key={item.label} to={href}>
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

            <ColorModeToggle value={colorMode} onChange={setColorMode} />

            {donateAction && (
              <Button
                variant="default"
                size="sm"
                className="hidden bg-[hsl(var(--btn-primary))] p-5 text-[hsl(var(--btn-primary-foreground))] shadow-none transition-colors hover:bg-[hsl(var(--btn-primary-hover))] hover:text-[hsl(var(--btn-primary-foreground))] lg:inline-flex"
                asChild
              >
                <a
                  href={donateAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  {donateAction.label}
                </a>
              </Button>
            )}

            {githubAction && (
              <Button
                variant="default"
                size="sm"
                className="hidden bg-[hsl(var(--btn-primary))] p-5 text-[hsl(var(--btn-primary-foreground))] shadow-none transition-colors hover:bg-[hsl(var(--btn-primary-hover))] hover:text-[hsl(var(--btn-primary-foreground))] lg:inline-flex"
                asChild
              >
                <a
                  href={githubAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  {githubAction.label}
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
