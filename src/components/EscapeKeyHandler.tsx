import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import { useEffect } from "react";

export function EscapeKeyHandler(): null {
  const mobileSidebar = useNavbarMobileSidebar();

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && mobileSidebar.shown) {
        mobileSidebar.toggle();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileSidebar]);

  return null;
}
