import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Check, Languages } from "lucide-react";
import React from "react";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  "cs-CZ": "Čeština",
  de: "Deutsch",
  "pl-PL": "Polski",
  "sk-SK": "Slovenčina",
  "tr-TR": "Türkçe",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

export function LanguageSelector() {
  const {
    i18n: { currentLocale, locales, defaultLocale },
  } = useDocusaurusContext();
  const { pathname } = useLocation();

  const getLocalizedPath = (locale: string): string => {
    // Remove current locale prefix from path if present
    let path = pathname;
    for (const loc of locales) {
      if (loc !== defaultLocale && pathname.startsWith(`/${loc}/`)) {
        path = pathname.slice(`/${loc}`.length);
        break;
      }
      if (loc !== defaultLocale && pathname === `/${loc}`) {
        path = "/";
        break;
      }
    }

    // Add new locale prefix (except for default locale)
    if (locale === defaultLocale) {
      return path;
    }
    return `/${locale}${path}`;
  };

  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild={true}>
        <Button
          variant="ghost"
          size="sm"
          className="border-0 bg-transparent p-5 text-foreground !shadow-none ring-0 outline-none transition-colors hover:bg-transparent hover:text-foreground/80 focus-visible:ring-0"
          aria-label="Select language"
        >
          <Languages className="mr-2 h-4 w-4" />
          {LOCALE_LABELS[currentLocale] ?? currentLocale}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <nav aria-label="Language selection">
          <ul className="list-none flex flex-col gap-1 m-0 p-0">
            {locales.map((locale) => (
              <li key={locale}>
                <a
                  href={getLocalizedPath(locale)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary/10",
                    locale === currentLocale
                      ? "bg-primary/15 text-primary"
                      : "text-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {LOCALE_LABELS[locale] ?? locale}
                  {locale === currentLocale && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
