import { useState } from "react";
import { Link } from "react-router-dom";
import type { PricingContent } from "../../data/content";
import { createOrder, verifyPayment } from "../../services/api";

function Pricing({ data }: { data: PricingContent }) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (amountInDollars: number, isAnnualPlan: boolean) => {
    setLoadingPayment(true);
    try {
      // Razorpay expects amount in paise (1 INR = 100 paise)
      // Since our pricing is in USD, we convert it:
      // If annual, multiply by 12. Then convert to INR (assume 1 USD = 83 INR).
      const totalDollars = isAnnualPlan ? amountInDollars * 12 : amountInDollars;
      const conversionRate = 83;
      const amountInPaise = totalDollars * conversionRate * 100;
      
      const order = await createOrder(amountInPaise);
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: order.amount, 
        currency: order.currency,
        name: "Roundtable App",
        description: "Please enter your subscription email.",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            // Show our custom success modal instead of a boring alert
            setPaymentSuccess(true);
          } catch (err) {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#05080e"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Error initiating payment. Make sure backend is running.");
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <section className="rt-pricing" id="pricing">
      <div className="rt-container">
        {/* Header */}
        <div className="rt-pricing__header">
          <p className="rt-eyebrow">
            <i className="rt-dot rt-dot--pulse" />
            {data.eyebrow}
          </p>
          <h2>{data.headline}</h2>
          <p className="rt-pricing__subhead">{data.subhead}</p>

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
                <span className="rt-pricing__discount-pill">{data.annualDiscountBadge}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="rt-pricing__grid">
          {data.tiers.map((tier) => {
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
                  ) : typeof price === "number" && price > 0 ? (
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <button
                        onClick={() => handlePayment(price as number, isAnnual)}
                        disabled={loadingPayment}
                        className={`rt-button ${
                          tier.featured ? "rt-button--primary" : "rt-button--ghost"
                        } rt-pricing__card-btn`}
                        style={{ width: "100%", cursor: loadingPayment ? "wait" : "pointer" }}
                      >
                        {loadingPayment ? "Processing..." : tier.ctaText}
                      </button>
                      <span style={{ fontSize: "0.75rem", color: "#a1a1aa", textAlign: "center" }}>
                        *Please use your subscription email at checkout.
                      </span>
                    </div>
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
          <span>{data.guaranteeNote}</span>
        </div>
      </div>

      {/* Payment Success Download Modal */}
      {paymentSuccess && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.8)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)"
        }}>
          <div style={{
            backgroundColor: "#05080e",
            border: "1px solid #1f2937",
            padding: "2rem",
            borderRadius: "16px",
            maxWidth: "500px",
            width: "90%",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}>
            <div style={{
              width: "60px", height: "60px", backgroundColor: "rgba(52, 211, 153, 0.1)",
              color: "#34d399", borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem"
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#fff" }}>Payment Successful!</h3>
            <p style={{ color: "#a1a1aa", marginBottom: "2rem", lineHeight: 1.5 }}>
              Welcome to Pro. You can now download the Roundtable app. Please register inside the app using the same email you used for payment.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <button className="rt-button rt-button--primary" onClick={() => alert("Downloading Windows 64-bit...")}>Windows 64-bit</button>
              <button className="rt-button rt-button--ghost" onClick={() => alert("Downloading Windows ARM...")}>Windows ARM</button>
              <button className="rt-button rt-button--ghost" onClick={() => alert("Downloading macOS...")}>macOS</button>
              <button className="rt-button rt-button--ghost" onClick={() => alert("Downloading Linux...")}>Linux</button>
            </div>
            <button 
              onClick={() => setPaymentSuccess(false)}
              style={{ marginTop: "2rem", background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", textDecoration: "underline" }}
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Pricing;
