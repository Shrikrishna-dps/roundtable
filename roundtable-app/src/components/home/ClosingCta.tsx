import { Link } from "react-router-dom";
import { useLenis } from "../layout/LenisProvider";

// Final conversion section gives the homepage a clear next step
function ClosingCta({ data }: { data: any }) {
  const { scrollToTop } = useLenis();

  return (
    <section className="rt-closing">
      <div className="rt-narrow rt-closing__inner">
        <p className="rt-eyebrow">{data.eyebrow}</p>

        <h2>{data.headline}</h2>

        <p className="rt-closing__body">{data.body}</p>

        {/* CTAs offer both product walkthrough and direct pricing access */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginTop: "24px" }}>
          <Link
            className="rt-button rt-button--primary"
            to={data.ctaHref}
            onClick={() => {
              scrollToTop({ immediate: true });
            }}
          >
            {data.cta}
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