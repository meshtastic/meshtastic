import { cn } from "@/lib/utils";
import type * as React from "react";

export function Link(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { className?: string },
) {
  return (
    <a
      {...props}
      className={cn(
        "text-base text-muted-foreground transition-opacity hover:opacity-80 cursor-pointer",
        props.className,
      )}
      target={props.target ?? "_blank"}
      rel={props.rel ?? "noopener noreferrer"}
    >
      {props.children}
    </a>
  );
}
