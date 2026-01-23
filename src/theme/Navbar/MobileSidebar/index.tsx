import navData from "@/data/nav.json";
import Link from "@docusaurus/Link";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import { ChevronDown, Github, Heart, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

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

function MobileNavLink({
  to,
  children,
  onClick,
  className,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block py-3 text-lg text-foreground transition-colors hover:text-primary ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}

function MobileDropdownItem({
  item,
  onClose,
}: {
  item: NavItem;
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
              to={subItem.to ?? subItem.href ?? "#"}
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

  const navItems = navData.items as NavItem[];
  const navActions = navData.actions as NavAction[];
  const donateAction = navActions.find((a) => a.icon === "heart");
  const githubAction = navActions.find((a) => a.icon === "github");

  const handleClose = () => mobileSidebar.toggle();

  return (
    <>
      <div
        className={`fixed inset-0 z-[200] backdrop-blur-sm transition-colors duration-300 ${isAnimating ? "bg-black/60" : "bg-black/0"
          }`}
        onClick={handleClose}
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
      />

      <div
        className={`fixed inset-y-0 left-0 z-[201] w-[80vw] max-w-[320px] overflow-y-auto bg-background p-6 transition-transform duration-300 ease-out ${isAnimating ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-lg font-semibold text-foreground">
            Navigation
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
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

            return (
              <MobileNavLink key={item.label} to={href} onClick={handleClose}>
                {item.label}
              </MobileNavLink>
            );
          })}
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
          {donateAction && (
            <Link
              to={donateAction.href}
              onClick={handleClose}
              className="flex items-center gap-2 rounded-lg bg-primary/15 px-4 py-3 text-primary transition-colors hover:bg-primary/20"
            >
              <Heart className="h-5 w-5" />
              {donateAction.label}
            </Link>
          )}

          {githubAction && (
            <Link
              to={githubAction.href}
              onClick={handleClose}
              className="flex items-center gap-2 rounded-lg bg-primary/15 px-4 py-3 text-primary transition-colors hover:bg-primary/20"
            >
              <Github className="h-5 w-5" />
              {githubAction.label}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
