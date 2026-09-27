import { BrowserRouter, Route, Routes } from "react-router-dom";
import AmbientBackground from "./components/layout/AmbientBackground";
import Footer from "./components/layout/Footer";
import LenisProvider from "./components/layout/LenisProvider";
import Nav from "./components/layout/nav";
import ScrollToTop from "./components/layout/ScrollToTop";
import HomePage from "./pages/HomePage";
import HowItWorksPage from "./pages/HowItWorksPage";

// Global shell keeps navigation, atmosphere, scrolling, and page content in one hierarchy
function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <ScrollToTop />
        <AmbientBackground />

        {/* Navigation stays visible while the active route changes */}
        <Nav />

        <div className="site-shell">
          <Routes>
            {/* "/" renders the main Roundtable homepage */}
            <Route path="/" element={<HomePage />} />

            {/* "/how-it-works" renders the product walkthrough */}
            <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Routes>

          {/* Footer is shared across both primary routes */}
          <Footer />
        </div>
      </LenisProvider>
    </BrowserRouter>
  );
}

export default App;