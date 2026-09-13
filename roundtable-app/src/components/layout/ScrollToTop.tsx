import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./LenisProvider";

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const { lenis } = useLenis();

  useLayoutEffect(() => {
    // Dynamically update document title based on route & section
    if (hash === "#pricing") {
      document.title = "Pricing & Plans — Roundtable";
    } else if (pathname === "/how-it-works") {
      document.title = "How It Works — Roundtable";
    } else {
      document.title = "Roundtable — AI Meeting Copilot";
    }

    // If there is an anchor hash (like #pricing), scroll to that element
    if (hash) {
      const scrollTarget = () => {
        const element = document.querySelector(hash);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element as HTMLElement, { offset: -40, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      };

      // Slight delay allows components to measure and layout
      const timer = setTimeout(scrollTarget, 100);
      return () => clearTimeout(timer);
    }

    // Otherwise, ensure we land cleanly at the top (0, 0)
    const resetScroll = () => {
      if (lenis) {
        lenis.stop();
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.start();
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();

    // Secondary passes after child components & ScrollTrigger initialize
    const t1 = setTimeout(() => {
      resetScroll();
      ScrollTrigger.refresh();
    }, 40);

    const t2 = setTimeout(() => {
      if (window.scrollY > 10 && !window.location.hash) {
        resetScroll();
      }
    }, 150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, search, hash, lenis]);

  return null;
}

export default ScrollToTop;
