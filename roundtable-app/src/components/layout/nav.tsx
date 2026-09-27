import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { nav } from "../../data/content";
import { useLenis } from "./LenisProvider";

import LogoMark from "./LogoMark";

// Sticky navigation gains stronger glass treatment after the page is scrolled
function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { lenis, scrollToTop } = useLenis();

  const handleNavClick = (targetPath: string) => {
    if (location.pathname === targetPath) {
      scrollToTop();
    }
  };

  const handlePricingClick = (e: React.MouseEvent) => {
    if (location.pathname === "/" || location.pathname === "") {
      e.preventDefault();
      const elem = document.querySelector("#pricing");
      if (elem) {
        if (lenis) {
          lenis.scrollTo(elem as HTMLElement, { offset: -40, duration: 1.2 });
        } else {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`site-nav ${isScrolled ? "site-nav--scrolled" : ""}`}>
      <div className="site-nav__inner">
        {/* Brand wordmark links back to the homepage */}
        <Link
          className="site-nav__brand"
          to={nav.homeHref}
          onClick={() => handleNavClick(nav.homeHref)}
        >
          <LogoMark size={28} />
          <span>{nav.wordmark}</span>
        </Link>

        <nav className="site-nav__actions" aria-label="Main navigation">
          {/* Primary navigation link opens the product walkthrough */}
          <Link
            className="site-nav__link"
            to={nav.linkHref}
            onClick={() => handleNavClick(nav.linkHref)}
          >
            {nav.linkLabel}
          </Link>

          {/* Pricing navigation link */}
          <Link
            className="site-nav__link"
            to={nav.pricingHref}
            onClick={handlePricingClick}
          >
            {nav.pricingLabel}
          </Link>

          {/* Main CTA points to the product walkthrough */}
          <Link
            className="rt-button rt-button--primary site-nav__cta"
            to={nav.ctaHref}
            onClick={() => handleNavClick(nav.ctaHref)}
          >
            {nav.ctaLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;