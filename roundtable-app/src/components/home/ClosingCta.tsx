import { Link } from "react-router-dom";
import { closingCta } from "../../data/content";
import { useLenis } from "../layout/LenisProvider";

// Final conversion section gives the homepage a clear next step
function ClosingCta() {
  const { scrollToTop } = useLenis();

  return (
    <section className="rt-closing">
      <div className="rt-narrow rt-closing__inner">
        <p className="rt-eyebrow">{closingCta.eyebrow}</p>

        <h2>{closingCta.headline}</h2>

        <p className="rt-closing__body">{closingCta.body}</p>

        {/* CTAs offer both product walkthrough and direct pricing access */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginTop: "24px" }}>
          <Link
            className="rt-button rt-button--primary"
            to={closingCta.ctaHref}
            onClick={() => {
              scrollToTop({ immediate: true });
            }}
          >
            {closingCta.cta}
            <span>↗</span>
          </Link>

          <a
            className="rt-button rt-button--ghost"
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              const elem = document.querySelector("#pricing");
              if (elem) elem.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Plans & Pricing
          </a>
        </div>
      </div>
    </section>
  );
}

export default ClosingCta;