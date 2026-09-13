import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { transformation } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

// Scroll-driven transformation turns loose conversation fragments into owned work
function Transformation() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fragmentsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !stageRef.current ||
      !fragmentsRef.current ||
      !cardsRef.current
    ) {
      return;
    }

    // Tie the visual transformation to the user's scroll position
    const ctx = gsap.context(() => {
      const fragments = fragmentsRef.current?.children;
      const cards = cardsRef.current?.children;

      if (!fragments || !cards) {
        return;
      }

      gsap.set(cards, {
        autoAlpha: 0,
        y: 30,
        scale: 0.96,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: stageRef.current,
          anticipatePin: 1,
        },
      });

      timeline
        .to(fragments[0], {
          x: -220,
          y: -90,
          rotation: -8,
          autoAlpha: 0,
          duration: 1,
        })
        .to(
          fragments[1],
          {
            x: 230,
            y: -40,
            rotation: 7,
            autoAlpha: 0,
            duration: 1,
          },
          "<",
        )
        .to(
          fragments[2],
          {
            x: -80,
            y: 130,
            rotation: 4,
            autoAlpha: 0,
            duration: 1,
          },
          "<",
        )
        .to(
          cards[0],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
          },
          "-=0.3",
        )
        .to(
          cards[1],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
          },
          "-=0.5",
        )
        .to(
          cards[2],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
          },
          "-=0.5",
        );
    }, sectionRef.current ?? undefined);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="rt-transform" ref={sectionRef}>
      <div className="rt-transform__sticky" ref={stageRef}>
        <div className="rt-transform__header">
          <p className="rt-eyebrow">{transformation.eyebrow}</p>
          <h2>{transformation.headline}</h2>
        </div>

        <div className="rt-transform__stage">
          <div className="rt-transform__fragments" ref={fragmentsRef}>
            {transformation.fragments.map((fragment) => (
              <span key={fragment}>{fragment}</span>
            ))}
          </div>

          <div className="rt-transform__cards" ref={cardsRef}>
            {transformation.cards.map((card) => (
  <article className="rt-transform__card" key={card.task}>
    {/* Commitment type identifies the kind of work captured from the meeting */}
    <span>{card.chip}</span>

    <h3>{card.task}</h3>

    <div>
      <small>OWNER</small>
      <b>{card.owner}</b>
    </div>

    <div>
      <small>DUE</small>
      <b>{card.date}</b>
    </div>
  </article>
))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transformation;