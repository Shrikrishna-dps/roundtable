import { useState } from "react";
import { Link } from "react-router-dom";
import { pricing } from "../../data/content";

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="rt-pricing" id="pricing">
      <div className="rt-container">
        {/* Header */}
        <div className="rt-pricing__header">
          <p className="rt-eyebrow">
            <i className="rt-dot rt-dot--pulse" />
            {pricing.eyebrow}
          </p>
          <h2>{pricing.headline}</h2>
          <p className="rt-pricing__subhead">{pricing.subhead}</p>

          {/* Billing Toggle */}
          <div className="rt-pricing__toggle-wrap">
            <div className="rt-pricing__toggle" role="group" aria-label="Billing frequency">
              <button
                type="button"
                className={`rt-pricing__toggle-btn ${!isAnnual ? "is-active" : ""}`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`rt-pricing__toggle-btn ${isAnnual ? "is-active" : ""}`}
                onClick={() => setIsAnnual(true)}
              >
                Annual
                <span className="rt-pricing__discount-pill">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="rt-pricing__grid">
          {pricing.tiers.map((tier) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
            const isCustom = typeof price !== "number";

            return (
              <div
                key={tier.id}
                className={`rt-pricing__card ${tier.featured ? "rt-pricing__card--featured" : ""}`}
              >
                {tier.badge && (
                  <div className="rt-pricing__badge">
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div className="rt-pricing__card-head">
                  <h3 className="rt-pricing__tier-name">{tier.name}</h3>
                  <p className="rt-pricing__tier-desc">{tier.description}</p>
                </div>

                <div className="rt-pricing__price-wrap">
                  {isCustom ? (
                    <div className="rt-pricing__price-custom">
                      <span className="rt-pricing__price-num">Custom</span>
                    </div>
                  ) : (
                    <div className="rt-pricing__price">
                      <span className="rt-pricing__currency">$</span>
                      <span className="rt-pricing__price-num">{price}</span>
                      <span className="rt-pricing__period">/{tier.period}</span>
                    </div>
                  )}
                  <p className="rt-pricing__billing-note">
                    {isCustom
                      ? "Custom contract & invoicing"
                      : price === 0
                      ? "Free with no card required"
                      : isAnnual
                      ? "Billed annually ($228/yr)"
                      : "Billed monthly"}
                  </p>
                </div>

                <div className="rt-pricing__cta-wrap">
                  {tier.ctaHref.startsWith("mailto:") ? (
                    <a
                      href={tier.ctaHref}
                      className={`rt-button ${
                        tier.featured ? "rt-button--primary" : "rt-button--ghost"
                      } rt-pricing__card-btn`}
                    >
                      {tier.ctaText}
                    </a>
                  ) : (
                    <Link
                      to={tier.ctaHref}
                      className={`rt-button ${
                        tier.featured ? "rt-button--primary" : "rt-button--ghost"
                      } rt-pricing__card-btn`}
                    >
                      {tier.ctaText}
                    </Link>
                  )}
                </div>

                <div className="rt-pricing__features-wrap">
                  <span className="rt-pricing__features-title">What's included:</span>
                  <ul className="rt-pricing__features">
                    {tier.features.map((feat) => (
                      <li key={feat} className="rt-pricing__feature-item">
                        <svg
                          className="rt-pricing__check-icon"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.25" />
                          <path
                            d="M5 8.2L7 10.2L11.2 6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee footnote */}
        <div className="rt-pricing__footnote">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>{pricing.guaranteeNote}</span>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
