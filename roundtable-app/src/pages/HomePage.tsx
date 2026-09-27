import { useEffect, useState } from "react";
import AskDemo from "../components/home/AskDemo";
import Hero from "../components/home/Hero";
import Problem from "../components/home/Problem";
import StatStrip from "../components/home/StatStrip";
import Transformation from "../components/home/Transformation";
import Pricing from "../components/home/Pricing";
import ClosingCta from "../components/home/ClosingCta";
import AdBanner from "../components/shared/AdBanner";
import { fetchHomepageContent } from "../services/api";

// Homepage fetches all its dynamic data and passes it down
function HomePage() {
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchHomepageContent();
      setHomeData(data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.5rem', color: '#888' }}>Loading Dynamic Homepage...</p>
      </main>
    );
  }

  if (!homeData) {
    return <main><p>Error loading content.</p></main>;
  }

  return (
    <main>
      <Hero data={homeData.hero} />
      <Problem data={homeData.problem} />
      <Transformation data={homeData.transformation} />
      
      {/* Strategic Ad Placement 1 */}
      <AdBanner />

      <AskDemo data={homeData.askDemo} />
      <StatStrip data={homeData.statStrip} />

      {/* Strategic Ad Placement 2 */}
      <AdBanner />

      <Pricing data={homeData.pricing} />
      <ClosingCta data={homeData.closingCta} />
    </main>
  );
}

export default HomePage;