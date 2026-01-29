import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import { useEffect, useEffectEvent } from "react";

export function EscapeKeyHandler(): null {
  const mobileSidebar = useNavbarMobileSidebar();

  const onEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape" && mobileSidebar.shown) {
      mobileSidebar.toggle();
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  return null;
}
