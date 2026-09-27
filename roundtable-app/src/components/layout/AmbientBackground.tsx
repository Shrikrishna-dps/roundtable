import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Creates the fixed atmospheric layer behind the site's content
function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep the background static when reduced motion is enabled
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Scope orb animations to this component for reliable cleanup
    const ctx = gsap.context(() => {
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: "random(-60, 60)",
          y: "random(-40, 40)",
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: "random(-50, 50)",
          y: "random(-50, 50)",
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: "random(-40, 40)",
          y: "random(-30, 30)",
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });
      }
    }, containerRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <div className="ambient-background" ref={containerRef} aria-hidden="true">
      {/* Coordinate grid provides the site's subtle telemetry backdrop */}
      <div className="ambient-background__grid" />

      {/* Large blurred orbs create the drifting ambient light */}
      <div
        className="ambient-background__orb ambient-background__orb--cyan"
        ref={orb1Ref}
      />
      <div
        className="ambient-background__orb ambient-background__orb--amber"
        ref={orb2Ref}
      />
      <div
        className="ambient-background__orb ambient-background__orb--green"
        ref={orb3Ref}
      />

      {/* Fine noise texture prevents large dark areas from feeling flat */}
      <div className="ambient-background__noise" />
    </div>
  );
}

export default AmbientBackground;