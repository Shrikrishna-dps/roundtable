import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { statStrip } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

// Reveals the key product metrics with a small count-up effect
function StatStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    // Animate each metric once when the strip enters the viewport
    const ctx = gsap.context(() => {
      valuesRef.current.forEach((element, index) => {
        if (!element) {
          return;
        }

        const target = statStrip.stats[index].value;
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            element.textContent =
              target % 1 === 0
                ? Math.round(counter.value).toLocaleString()
                : counter.value.toFixed(1);
          },
        });
      });
    }, sectionRef.current ?? undefined);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="rt-proof" id="proof" ref={sectionRef}>
      <div className="rt-container">
        <div className="rt-proof__grid">
          {statStrip.stats.map((stat, index) => (
            <article className="rt-proof__stat" key={stat.label}>
              <div className="rt-proof__value">
                <span
                  ref={(element) => {
                    valuesRef.current[index] = element;
                  }}
                >
                  0
                </span>
                <b>{stat.suffix}</b>
              </div>

              <p>{stat.label}</p>
            </article>
          ))}
        </div>

        <p className="rt-proof__footnote">{statStrip.footnote}</p>
      </div>
    </section>
  );
}

export default StatStrip;