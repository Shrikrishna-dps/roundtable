import { useState, useEffect } from "react";
import { fetchAd } from "../../services/api";

export default function AdBanner() {
  const [currentAd, setCurrentAd] = useState("");
  // Keep track of which ad we need to fetch next using only the setter
  const [, setNextIndexToFetch] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // This function actually reaches out to your backend server!
    const loadAdFromBackend = async (index: number) => {
      setIsLoading(true);
      try {
        const data = await fetchAd(index);
        if (isMounted) {
          setCurrentAd(data.ad);
          setNextIndexToFetch(data.nextIndex); // Backend tells us what the next ad index should be
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching ad from backend:", error);
        if (isMounted) setIsLoading(false);
      }
    };

    // 1. Fetch the very first ad as soon as the component loads
    loadAdFromBackend(0);

    // 2. Set up the 9 second timer to fetch the next ad
    const interval = setInterval(() => {
      setNextIndexToFetch((latestNextIndex) => {
        loadAdFromBackend(latestNextIndex);
        return latestNextIndex; // Return it so state doesn't break
      });
    }, 9000); // Exactly 9 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "728px",
        height: "90px",
        margin: "4rem auto",
        backgroundColor: "#05080e", 
        border: "1px dashed #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        color: "#a1a1aa",
        fontSize: "0.875rem",
        letterSpacing: "0.05em",
        position: "relative",
        borderRadius: "8px",
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)"
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "-20px",
          left: "0",
          fontSize: "0.75rem",
          color: "#555",
          textTransform: "uppercase",
        }}
      >
        Advertisement
      </span>
      <span style={{ 
        opacity: isLoading ? 0.2 : 1, 
        transition: "opacity 0.3s ease-in-out",
        fontWeight: 500,
        flex: 1,
        textAlign: "center"
      }}>
        {isLoading ? "Loading Ad via API..." : currentAd}
      </span>
      
      {/* Redirect Button */}
      <a 
        href="/ad-redirect"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#34d399",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
          opacity: isLoading ? 0.5 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        Learn More
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  );
}
