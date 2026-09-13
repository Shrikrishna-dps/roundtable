import { Link } from "react-router-dom";
import { howItWorksIntro } from "../data/content";
import { useLenis } from "../components/layout/LenisProvider";
import FeatureExplorer from "../components/how-it-works/FeatureExplorer";
import Lifecycle from "../components/how-it-works/Lifecycle";
import Integrations from "../components/how-it-works/Integrations";
import WorkflowDemo from "../components/how-it-works/WorkflowDemo";
import Trust from "../components/how-it-works/Trust";

// Introduces the system as a simple pipeline from conversation to follow-up
function HowItWorksPage() {
  const { scrollToTop } = useLenis();

  return (
    <main className="rt-how">
      <section className="rt-how-hero">
        <div className="rt-narrow rt-how-hero__inner">
          <p className="rt-eyebrow">{howItWorksIntro.eyebrow}</p>

          <h1>{howItWorksIntro.headline}</h1>

          <p className="rt-how-hero__subhead">
            {howItWorksIntro.subhead}
          </p>

          {/* Pipeline makes the five-step product flow immediately scannable */}
          <div className="rt-pipeline">
            {howItWorksIntro.pipeline.map((step, index) => (
              <div className="rt-pipeline__step" key={step}>
                <span>0{index + 1}</span>
                <b>{step}</b>
              </div>
            ))}
          </div>

          {/* Secondary CTA returns visitors to the homepage story */}
          <Link
            className="rt-text-link"
            to="/"
            onClick={() => {
              scrollToTop({ immediate: true });
            }}
          >
            ← Back to overview
          </Link>
        </div>
      </section>
      <FeatureExplorer />
      <Lifecycle />
      <Integrations />
      {/* Cinematic demo immediately below FIT YOUR WORKFLOW — shows the tools in action */}
      <WorkflowDemo />
      <Trust />
    </main>
  );
}

export default HowItWorksPage;