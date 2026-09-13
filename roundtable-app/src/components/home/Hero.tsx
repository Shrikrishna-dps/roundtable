import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { hero } from "../../data/content";
import { useLenis } from "../layout/LenisProvider";

// Hero demonstrates the core Roundtable transformation from conversation to owned work
function Hero() {
  const transcriptRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { scrollToTop } = useLenis();

  useEffect(() => {
    if (!transcriptRef.current || !resultRef.current) {
      return;
    }

    // Alternate between the live transcript and the captured commitment
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.8,
    });

    timeline
      .set(resultRef.current, { autoAlpha: 0, y: 18 })
      .to(transcriptRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
      .to({}, { duration: 2.2 })
      .to(transcriptRef.current, {
        autoAlpha: 0,
        y: -18,
        duration: 0.45,
        ease: "power2.in",
      })
      .to(resultRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
      .to({}, { duration: 2.2 })
      .to(resultRef.current, {
        autoAlpha: 0,
        y: 18,
        duration: 0.45,
        ease: "power2.in",
      });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className="rt-hero">
      <div className="rt-container rt-hero__grid">
        <div className="rt-hero__copy">
          <p className="rt-eyebrow">
            <span className="rt-dot rt-dot--pulse" />
            {hero.eyebrow}
          </p>

          <h1>{hero.headline}</h1>

          <p className="rt-hero__lede">{hero.subhead}</p>

          <div className="rt-hero__actions">
            <Link
              className="rt-button rt-button--primary"
              to={hero.ctaHref}
              onClick={() => {
                if (location.pathname === hero.ctaHref) {
                  scrollToTop();
                }
              }}
            >
              {hero.cta}
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
              View Pricing
            </a>
          </div>

          <p className="rt-hero__trust">
            Works quietly across the meetings your team already has.
          </p>
        </div>

        <div
          className="product-window hero-demo"
          aria-label="Roundtable live capture demo"
        >
          <div className="hero-demo__top">
            {/* Browser-style chrome establishes the simulated product window */}
            <span className="rt-dots">
              <i />
              <i />
              <i />
            </span>

            <span>ROUNDTABLE / LIVE CAPTURE</span>

            <b>
              <i />
              ACTIVE
            </b>
          </div>

          <div className="hero-demo__body">
            <div className="hero-demo__transcript" ref={transcriptRef}>
              <span className="rt-chip rt-chip--cyan">
                PRODUCT LAUNCH MEETING
              </span>

              <p>
                <b>Sarah</b> 14:32
              </p>

              <strong>Let&apos;s aim to launch next Tuesday.</strong>

              <p>
                <b>John</b> 14:33
              </p>

              <strong>I can update the deck before then.</strong>

              <div className="hero-demo__signal">
                <i />
                Listening for the moment that becomes work
              </div>
            </div>

            <div className="hero-demo__result" ref={resultRef}>
              <span className="rt-chip rt-chip--green">
                COMMITMENT CAPTURED
              </span>

              <h2>Update launch deck</h2>

              <div className="hero-demo__row">
                <small>OWNER</small>
                <b>John</b>
              </div>

              <div className="hero-demo__row">
                <small>DUE</small>
                <b>Tuesday</b>
              </div>

              <div className="hero-demo__row">
                <small>SOURCE</small>
                <b>Product Launch Meeting</b>
              </div>

              <div className="hero-demo__resolved">
                <i />
                Ready to move forward
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;