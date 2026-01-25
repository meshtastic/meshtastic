import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import type React from "react";

interface ColorModeToggleProps {
  value: "light" | "dark";
  onChange: (colorMode: "light" | "dark") => void;
  className?: string;
}

export default function ColorModeToggle({
  value,
  onChange,
  className,
}: ColorModeToggleProps): React.ReactElement {
  const isDark = value === "dark";

  return (
    <button
      type="button"
      onClick={() => onChange(isDark ? "light" : "dark")}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted shadow-none",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
