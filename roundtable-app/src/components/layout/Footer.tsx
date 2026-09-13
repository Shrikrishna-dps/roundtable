import { Link, useLocation } from "react-router-dom";
import { footer } from "../../data/content";
import { useLenis } from "./LenisProvider";

import LogoMark from "./LogoMark";

// Static footer keeps the brand message and secondary navigation consistent across pages
function Footer() {
  const location = useLocation();
  const { scrollToTop } = useLenis();

  const handleLinkClick = () => {
    if (location.pathname === footer.linkHref) {
      scrollToTop();
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          {/* Footer wordmark reinforces the primary brand identity */}
          <div className="site-footer__wordmark">
            <LogoMark size={32} />
            <span>{footer.wordmark}</span>
          </div>
          <p className="site-footer__tagline">{footer.tagline}</p>
        </div>

        {/* Footer navigation links */}
        <div className="site-footer__links">
          <Link
            className="site-footer__footer-link"
            to={footer.pricingHref}
            onClick={() => {
              if (location.pathname === "/" || location.pathname === "") {
                const elem = document.querySelector("#pricing");
                if (elem) elem.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {footer.pricingLabel}
          </Link>
          <Link
            className="site-footer__footer-link"
            to={footer.linkHref}
            onClick={handleLinkClick}
          >
            {footer.linkLabel}
          </Link>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>{footer.copyright}</span>
        <span>{footer.descriptor}</span>
      </div>
    </footer>
  );
}

export default Footer;