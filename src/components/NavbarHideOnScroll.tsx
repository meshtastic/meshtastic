import { useEffect, useRef } from "react";

const SCROLL_THRESHOLD = 10;

export function NavbarHideOnScroll(): null {
  const lastScrollY = useRef(0);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (Math.abs(scrollDelta) >= SCROLL_THRESHOLD) {
        navbar.classList.toggle(
          "navbar--hidden",
          scrollDelta > 0 && currentScrollY > 100,
        );
        lastScrollY.current = currentScrollY;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
