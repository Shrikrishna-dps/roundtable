import AskDemo from "../components/home/AskDemo";
import Hero from "../components/home/Hero";
import Problem from "../components/home/Problem";
import StatStrip from "../components/home/StatStrip";
import Transformation from "../components/home/Transformation";
import Pricing from "../components/home/Pricing";
import ClosingCta from "../components/home/ClosingCta";

// Homepage moves from the core problem into transformation, memory, pricing and closing CTA
function HomePage() {
  return (
    <main>
      <Hero />
      <Problem />
      <Transformation />
      <AskDemo />
      <StatStrip />
      <Pricing />
      <ClosingCta />
    </main>
  );
}

export default HomePage;