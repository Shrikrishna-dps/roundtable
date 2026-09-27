import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Stat } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

// Reveals the key product metrics with a small count-up effect
function StatStrip({ data }: { data: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Animate when component mounts and enters viewport
  useEffect(() => {
    if (!sectionRef.current || !data || !data.stats) {
      return;
    }

    const ctx = gsap.context(() => {
      valuesRef.current.forEach((element, index) => {
        if (!element) {
          return;
        }

        const target = data.stats[index].value;
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
  }, [data]);

  if (!data || !data.stats) return null;

  return (
    <section className="rt-proof" id="proof" ref={sectionRef}>
      <div className="rt-container">
        <div className="rt-proof__grid">
          {data.stats.map((stat: Stat, index: number) => (
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
        <p className="rt-proof__footnote">{data.footnote}</p>
      </div>
    </section>
  );
}

export default StatStrip;