import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Cinematic 4-stage product story: Conversation → Extraction → Calendar → Slack
// Each stage is scroll-driven on desktop; vertical stack on mobile / reduced motion.
function WorkflowDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Stage panel refs
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);

  // Sub-animation element refs
  const scanRef = useRef<HTMLDivElement>(null);
  const calEventRef = useRef<HTMLDivElement>(null);
  const slackDotsRef = useRef<HTMLDivElement>(null);
  const slackMsgRef = useRef<HTMLDivElement>(null);

  // Stage indicator dot refs (must be declared at top level — no hooks in loops)
  const dot0Ref = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);

  // Set initial hidden states synchronously before first paint to prevent FOUC on desktop
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth <= 760;
    if (prefersReduced || isMobile) return;

    // Overlay stages start invisible
    gsap.set([stage2Ref.current, stage3Ref.current, stage4Ref.current], {
      autoAlpha: 0,
      y: 40,
    });
    // Scan line starts at zero width
    gsap.set(scanRef.current, { scaleX: 0, transformOrigin: "left center" });
    // Calendar event starts collapsed
    gsap.set(calEventRef.current, { scaleY: 0, autoAlpha: 0, transformOrigin: "top center" });
    // Slack sub-elements start hidden
    gsap.set(slackDotsRef.current, { autoAlpha: 0 });
    gsap.set(slackMsgRef.current, { autoAlpha: 0, y: 16 });
  }, []);

  // Scroll-driven animation — desktop only
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth <= 760;
    if (prefersReduced || isMobile) return;

    const dotRefs = [dot0Ref, dot1Ref, dot2Ref, dot3Ref];
    let currentDot = 0;

    const activateDot = (index: number) => {
      if (index === currentDot) return;
      currentDot = index;
      dotRefs.forEach((r, i) =>
        r.current?.classList.toggle("is-active", i === index)
      );
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
          pin: stickyRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Rough quarter-division reflects the four narrative stages
            activateDot(p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3);
          },
        },
      });

      tl
        // ── Hold at Stage 1: Conversation ──────────────────────────────────
        .to({}, { duration: 0.4 })

        // ── Stage 2: Extraction slides in with scan animation ─────────────
        .to(stage2Ref.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(scanRef.current, { scaleX: 1, duration: 0.9, ease: "power1.inOut" }, "<0.2")

        // ── Hold at Extraction ────────────────────────────────────────────
        .to({}, { duration: 0.5 })

        // ── Stage 3: Calendar — stages 1 & 2 fade, calendar rises ─────────
        .to(stage1Ref.current, { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" })
        .to(stage2Ref.current, { autoAlpha: 0, duration: 0.4 }, "<0.15")
        .to(stage3Ref.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.25")
        // Calendar event materialises like a card being placed
        .to(
          calEventRef.current,
          { scaleY: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(1.3)" },
          "<0.35"
        )

        // ── Hold at Calendar ──────────────────────────────────────────────
        .to({}, { duration: 0.5 })

        // ── Stage 4: Slack — calendar fades, Slack channel rises ──────────
        .to(stage3Ref.current, { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" })
        .to(stage4Ref.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.25")
        // Typing indicator appears first, then message replaces it
        .to(slackDotsRef.current, { autoAlpha: 1, duration: 0.35 }, "<0.3")
        .to(slackMsgRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "+=0.45")
        .to(slackDotsRef.current, { autoAlpha: 0, duration: 0.25 }, "<")

        // ── Hold at Slack ─────────────────────────────────────────────────
        .to({}, { duration: 0.45 });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  const days = ["Mon 15", "Tue 16", "Wed 17", "Thu 18", "Fri 19"];
  const times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM"];

  const dotItems = [
    { label: "Conversation", ref: dot0Ref },
    { label: "Extraction", ref: dot1Ref },
    { label: "Calendar", ref: dot2Ref },
    { label: "Slack", ref: dot3Ref },
  ];

  return (
    <section className="rt-wfdemo" ref={sectionRef}>
      <div className="rt-wfdemo__sticky" ref={stickyRef}>

        {/* Section header */}
        <div className="rt-container rt-wfdemo__header-wrap">
          <div className="rt-wfdemo__header">
            <p className="rt-eyebrow">
              <i className="rt-dot rt-dot--pulse" />
              IN ACTION
            </p>
            <h2>Watch the moment it clicks.</h2>
            <p className="rt-wfdemo__sub">
              Something said in a meeting becomes accountable work — inside
              the tools your team already uses.
            </p>
          </div>
        </div>

        {/* Stage arena — fixed-height on desktop, flex column on mobile */}
        <div className="rt-wfdemo__arena">

          {/* ── Stage 1: Conversation ──────────────────────────────────── */}
          <div className="rt-wfdemo__stage" ref={stage1Ref}>
            <div className="rt-wfdemo__win">

              {/* Window chrome mimics a minimal desktop app bar */}
              <div className="rt-wfdemo__chrome">
                <span className="rt-dots"><i /><i /><i /></span>
                <span className="rt-wfdemo__chrome-title">
                  Q3 Launch · Live Transcript
                </span>
                <span className="rt-chip rt-chip--cyan rt-wfdemo__chrome-badge">
                  <i className="rt-dot rt-dot--pulse" />LIVE
                </span>
              </div>

              {/* Chat transcript — Maya's final line is the extracted commitment */}
              <div className="rt-wfdemo__chat">
                <div className="rt-wfdemo__msg">
                  <span className="rt-wfdemo__avatar rt-wfdemo__avatar--s">S</span>
                  <div>
                    <span className="rt-wfdemo__sender">Sarah</span>
                    <p>"Let's get the launch campaign ready by Friday."</p>
                  </div>
                </div>
                <div className="rt-wfdemo__msg">
                  <span className="rt-wfdemo__avatar rt-wfdemo__avatar--j">J</span>
                  <div>
                    <span className="rt-wfdemo__sender">John</span>
                    <p>"I'll get the numbers updated before then."</p>
                  </div>
                </div>
                {/* Key utterance that Roundtable extracts — visually highlighted */}
                <div className="rt-wfdemo__msg rt-wfdemo__msg--key">
                  <span className="rt-wfdemo__avatar rt-wfdemo__avatar--m">M</span>
                  <div>
                    <span className="rt-wfdemo__sender">Maya</span>
                    <p>"I can take the campaign — no problem."</p>
                  </div>
                </div>
              </div>

              <div className="rt-wfdemo__chrome-foot">
                <span className="rt-wfdemo__signal">
                  <i className="rt-dot rt-dot--pulse" />
                  Roundtable listening
                </span>
                <span>Q3 Launch · Sep 13, 2026</span>
              </div>
            </div>
          </div>

          {/* ── Stage 2: Extraction ────────────────────────────────────── */}
          <div
            className="rt-wfdemo__stage rt-wfdemo__stage--overlay"
            ref={stage2Ref}
          >
            <div className="rt-wfdemo__extract">
              {/* Scan line sweeps across the card as Roundtable "reads" the transcript */}
              <div className="rt-wfdemo__scan-wrap">
                <div className="rt-wfdemo__scan-line" ref={scanRef} />
              </div>

              <div className="rt-wfdemo__extract-inner">
                <p className="rt-eyebrow rt-wfdemo__extract-eyebrow">
                  <i className="rt-dot" />
                  ROUNDTABLE FOUND IT
                </p>

                <h3 className="rt-wfdemo__extract-task">Launch campaign</h3>

                <div className="rt-wfdemo__extract-meta">
                  <div className="rt-wfdemo__extract-field">
                    <span>OWNER</span>
                    <b>Maya</b>
                  </div>
                  <div className="rt-wfdemo__extract-field">
                    <span>DUE</span>
                    <b>Friday, Sep 18</b>
                  </div>
                  <div className="rt-wfdemo__extract-field">
                    <span>TYPE</span>
                    <b>Action item</b>
                  </div>
                </div>

                {/* Source quote shows traceability back to the transcript */}
                <div className="rt-wfdemo__extract-source">
                  <span>SOURCE</span>
                  <q>I can take the campaign — no problem.</q>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stage 3: Calendar ──────────────────────────────────────── */}
          <div
            className="rt-wfdemo__stage rt-wfdemo__stage--overlay"
            ref={stage3Ref}
          >
            <div className="rt-wfdemo__win">
              <div className="rt-wfdemo__chrome">
                <span className="rt-dots"><i /><i /><i /></span>
                <span className="rt-wfdemo__chrome-title">
                  Calendar · Week of Sep 15
                </span>
                <span className="rt-chip rt-wfdemo__chrome-badge">
                  September 2026
                </span>
              </div>

              {/* Simplified week-view calendar grid */}
              <div className="rt-wfdemo__cal">
                <div className="rt-wfdemo__cal-header">
                  <div className="rt-wfdemo__cal-time-col" />
                  {days.map((d, i) => (
                    <div
                      key={d}
                      className={`rt-wfdemo__cal-day-header${
                        i === 3 ? " is-target" : ""
                      }`}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {times.map((t, row) => (
                  <div key={t} className="rt-wfdemo__cal-row">
                    <div className="rt-wfdemo__cal-time">{t}</div>
                    {[0, 1, 2, 3, 4].map((col) => (
                      <div
                        key={col}
                        className={`rt-wfdemo__cal-cell${
                          col === 3 ? " is-target-col" : ""
                        }`}
                      >
                        {/* The commitment materialises in the Thu 18 / 10 AM slot */}
                        {col === 3 && row === 1 && (
                          <div
                            className="rt-wfdemo__cal-event"
                            ref={calEventRef}
                          >
                            <span>Launch campaign</span>
                            <small>Maya · All day</small>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="rt-wfdemo__chrome-foot rt-wfdemo__chrome-foot--green">
                <span className="rt-wfdemo__signal rt-wfdemo__signal--green">
                  <i className="rt-wfdemo__dot-green" />
                  Added by Roundtable
                </span>
                <span>Sep 18 · Launch campaign → Maya</span>
              </div>
            </div>
          </div>

          {/* ── Stage 4: Slack ─────────────────────────────────────────── */}
          <div
            className="rt-wfdemo__stage rt-wfdemo__stage--overlay"
            ref={stage4Ref}
          >
            <div className="rt-wfdemo__win">
              <div className="rt-wfdemo__chrome">
                <span className="rt-dots"><i /><i /><i /></span>
                <span className="rt-wfdemo__chrome-title"># launch-team</span>
                <span className="rt-wfdemo__slack-badge">Roundtable</span>
              </div>

              <div className="rt-wfdemo__slack">
                {/* Minimal channel sidebar for context */}
                <div className="rt-wfdemo__slack-sidebar">
                  <p className="rt-wfdemo__slack-sidebar-heading">Channels</p>
                  <ul>
                    <li># general</li>
                    <li className="is-active"># launch-team</li>
                    <li># design</li>
                    <li># eng</li>
                  </ul>
                </div>

                <div className="rt-wfdemo__slack-main">
                  {/* Typing indicator appears first, then is replaced by the message */}
                  <div className="rt-wfdemo__typing" ref={slackDotsRef}>
                    <div className="rt-wfdemo__slack-bot-icon">RT</div>
                    <div className="rt-wfdemo__typing-dots">
                      <span /><span /><span />
                    </div>
                  </div>

                  {/* Assignment message — initially hidden, revealed after dots */}
                  <div className="rt-wfdemo__slack-msg" ref={slackMsgRef}>
                    <div className="rt-wfdemo__slack-bot-icon">RT</div>
                    <div className="rt-wfdemo__slack-msg-body">
                      <div className="rt-wfdemo__slack-bot-name">
                        Roundtable
                        <span className="rt-wfdemo__slack-app-tag">APP</span>
                        <time>Today at 3:41 PM</time>
                      </div>

                      {/* Attachment card communicates the actionable assignment */}
                      <div className="rt-wfdemo__slack-card">
                        <div className="rt-wfdemo__slack-card-bar" />
                        <div>
                          <p className="rt-wfdemo__slack-card-title">
                            Assignment confirmed
                          </p>
                          <p className="rt-wfdemo__slack-card-body">
                            <b>Maya</b> was assigned:
                          </p>
                          <p className="rt-wfdemo__slack-card-task">
                            Launch campaign
                          </p>
                          <p className="rt-wfdemo__slack-card-due">
                            Due <b>Friday, Sep 18</b>
                          </p>
                        </div>
                      </div>

                      <p className="rt-wfdemo__slack-caption">
                        From <em>Q3 Launch</em> · Sep 13, 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* /arena */}

        {/* Stage progress indicators — desktop only */}
        <nav className="rt-wfdemo__nav" aria-label="Demo stages">
          {dotItems.map(({ label, ref }, i) => (
            <div
              key={label}
              className={`rt-wfdemo__dot${i === 0 ? " is-active" : ""}`}
              ref={ref}
              role="presentation"
            >
              <span className="rt-wfdemo__dot-pip" />
              <span className="rt-wfdemo__dot-label">{label}</span>
            </div>
          ))}
        </nav>

      </div>
    </section>
  );
}

export default WorkflowDemo;
