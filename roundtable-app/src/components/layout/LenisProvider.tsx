import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisContextValue {
  lenis: Lenis | null;
  scrollToTop: (options?: { immediate?: boolean }) => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollToTop: () => {},
});

let externalLenis: Lenis | null = null;
const lenisListeners = new Set<() => void>();

function subscribeLenis(listener: () => void) {
  lenisListeners.add(listener);
  return () => {
    lenisListeners.delete(listener);
  };
}

function getLenisSnapshot() {
  return externalLenis;
}

function getServerSnapshot() {
  return null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLenis = () => useContext(LenisContext);

// Synchronizes Lenis scrolling with GSAP's animation ticker and resets scroll on navigation
function LenisProvider({ children }: { children: ReactNode }) {
  const lenis = useSyncExternalStore(subscribeLenis, getLenisSnapshot, getServerSnapshot);
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Keep native scrolling when reduced motion is enabled
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis();
    externalLenis = instance;
    lenisListeners.forEach((cb) => cb());

    instance.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
      externalLenis = null;
      lenisListeners.forEach((cb) => cb());
    };
  }, []);

  const scrollToTop = useCallback((options?: { immediate?: boolean }) => {
    const immediate = options?.immediate ?? false;
    if (externalLenis) {
      externalLenis.scrollTo(0, { immediate });
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: immediate ? "instant" : "smooth",
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Reset scroll to top on route / pathname changes
  useLayoutEffect(() => {
    if (location.hash) {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        if (externalLenis) {
          externalLenis.scrollTo(targetElement as HTMLElement, {
            immediate: true,
          });
        } else {
          targetElement.scrollIntoView();
        }
        return;
      }
    }

    // Synchronously reset scroll to top before next paint
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (externalLenis) {
      externalLenis.scrollTo(0, { immediate: true });
    }

    // Next frame: guarantee position and refresh ScrollTrigger coordinates
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (externalLenis) {
        externalLenis.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(rafId);
  }, [location.pathname, location.search, location.hash]);

  const contextValue = useMemo(
    () => ({ lenis, scrollToTop }),
    [lenis, scrollToTop]
  );

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}

export default LenisProvider;