interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 26, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rt-logo-mark ${className}`}
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="rt-logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0e1522" />
          <stop offset="100%" stopColor="#05080e" />
        </linearGradient>
        <linearGradient id="rt-logo-flow" x1="15%" y1="20%" x2="85%" y2="80%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <filter id="rt-logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Dark modern squircle container */}
      <rect width="48" height="48" rx="11" fill="url(#rt-logo-bg)" stroke="#1e293b" strokeWidth="1.2" />

      {/* Flow Nodes: Conversation loop on left, Work commitment loop on right */}
      <path
        d="M17 16 C 10 16, 9 32, 17 32 C 22 32, 26 24, 31 24 C 36 24, 39 28, 39 31"
        fill="none"
        stroke="url(#rt-logo-flow)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#rt-logo-glow)"
      />
      <path
        d="M31 32 C 38 32, 39 16, 31 16 C 26 16, 22 24, 17 24 C 12 24, 9 20, 9 17"
        fill="none"
        stroke="url(#rt-logo-flow)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />

      {/* Live meeting pulse nodes */}
      <circle cx="17" cy="24" r="2.2" fill="#38bdf8" filter="url(#rt-logo-glow)" />
      <circle cx="31" cy="24" r="2.2" fill="#34d399" filter="url(#rt-logo-glow)" />
    </svg>
  );
}

export default LogoMark;
