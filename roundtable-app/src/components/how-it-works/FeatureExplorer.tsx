import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featureExplorer } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

// Interactive tabs reveal one part of the Roundtable system at a time.
// On the first downward scroll through the section the tabs auto-advance 1→2→3→4.
// After the section has been scrolled past once (or on any scroll back up)
// the auto-drive is removed and tabs become purely click-driven.
function FeatureExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = featureExplorer.tabs[activeIndex];

  const sectionRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const hasCompletedRef = useRef(false);

  const handleTabClick = (index: number) => {
    // User interacted manually — disable auto-drive permanently
    hasCompletedRef.current = true;
    if (stRef.current) {
      stRef.current.kill();
      stRef.current = null;
    }
    setActiveIndex(index);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // On mobile or reduced-motion just keep manual tabs — no auto-drive
    if (prefersReduced || window.innerWidth <= 760) return;
    if (hasCompletedRef.current) return;

    let lastDrivenIndex = -1;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 25%",
      end: "bottom bottom",
      onUpdate(self) {
        if (hasCompletedRef.current) {
          self.kill();
          return;
        }

        // When scrolling upwards, immediately yield to manual click mode
        if (self.direction === -1) {
          hasCompletedRef.current = true;
          self.kill();
          return;
        }

        const p = self.progress; // 0 → 1
        const driven =
          p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;

        if (driven !== lastDrivenIndex) {
          lastDrivenIndex = driven;
          setActiveIndex(driven);
        }

        // Reached the final tab on the first pass
        if (driven === 3 && p >= 0.9) {
          hasCompletedRef.current = true;
          self.kill();
        }
      },
      onLeave(self) {
        hasCompletedRef.current = true;
        self.kill();
      },
    });

    stRef.current = st;

    return () => {
      st.kill();
      stRef.current = null;
    };
  }, []);

  return (
    <section className="rt-features" ref={sectionRef}>
      <div className="rt-container">
        <div className="rt-features__header">
          <p className="rt-eyebrow">{featureExplorer.eyebrow}</p>
          <h2>{featureExplorer.headline}</h2>
        </div>

        <div className="rt-features__layout">
          <div className="rt-features__tabs">
            {featureExplorer.tabs.map((tab, index) => (
              <button
                className={`rt-features__tab ${
                  activeIndex === index ? "is-active" : ""
                }`}
                key={tab.label}
                onClick={() => handleTabClick(index)}
              >
                <span>0{index + 1}</span>
                <b>{tab.label}</b>
              </button>
            ))}
          </div>

          <div className="rt-features__content" key={activeIndex}>
            <span className="rt-chip rt-chip--cyan">
              {activeTab.label.toUpperCase()}
            </span>

            <p>{activeTab.content}</p>

            {/* Active indicator connects the selected capability to its explanation */}
            <div className="rt-features__indicator">
              <i />
              Roundtable system active
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureExplorer;