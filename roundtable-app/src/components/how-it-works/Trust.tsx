import { Link } from "react-router-dom";
import { trust } from "../../data/content";

// Trust section explains how meeting context stays controlled and traceable
function Trust() {
  return (
    <section className="rt-trust">
      <div className="rt-container">
        <div className="rt-trust__header">
          <p className="rt-eyebrow">{trust.eyebrow}</p>
          <h2>{trust.headline}</h2>
        </div>

        <div className="rt-trust__pillars">
          {trust.pillars.map((pillar, index) => (
            <article className="rt-trust__pillar" key={pillar}>
              <span>0{index + 1}</span>
              <p>{pillar}</p>
            </article>
          ))}
        </div>

        {/* Disclaimer keeps illustrative security language separate from production claims */}
        <p className="rt-trust__disclaimer">{trust.disclaimer}</p>

        {/* Walkthrough closing conversion CTA leading to pricing */}
        <div style={{ marginTop: "64px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <p style={{ color: "var(--rt-muted)", fontSize: "18px" }}>Ready to give your meetings accountable follow-up?</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link className="rt-button rt-button--primary" to="/#pricing">
              View Plans & Start Free
            </Link>
            <Link className="rt-button rt-button--ghost" to="/">
              ← Back to Overview
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trust;