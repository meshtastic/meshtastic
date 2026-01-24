import { useEffect, useState } from "react";

export function useDocusaurusTheme(): { resolvedTheme: "light" | "dark" } {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const getTheme = (): "light" | "dark" => {
      if (typeof document !== "undefined") {
        return document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";
      }
      return "dark";
    };

    setTheme(getTheme());

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          setTheme(getTheme());
        }
      }
    });

    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    }

    return () => observer.disconnect();
  }, []);

  return { resolvedTheme: theme };
}

// Re-export with the same API as next-themes for easy migration
export const useTheme = useDocusaurusTheme;
