// Shared content contracts keep presentation components independent from copy.

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta: string;
  ctaHref: string;
  transcript: string[];
}

export interface AskQuestion {
  question: string;
  answer: string;
  source: string;
  meeting: string;
  when: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureTab {
  label: string;
  content: string;
}

export interface LifecycleStep {
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceMonthly: number | "Custom";
  priceAnnual: number | "Custom";
  period: string;
  ctaText: string;
  ctaHref: string;
  featured?: boolean;
  features: string[];
}

export interface PricingContent {
  eyebrow: string;
  headline: string;
  subhead: string;
  annualDiscountBadge: string;
  tiers: PricingTier[];
  guaranteeNote: string;
}

export const hero: HeroContent = {
  eyebrow: "AI MEETING COPILOT",
  headline: "Your meeting ended. The work begins now.",
  subhead:
    "Roundtable listens for decisions, commitments, and open questions, then turns them into work with a name and a date attached.",
  cta: "See how it works",
  ctaHref: "/how-it-works",
  transcript: [
    "Let's aim to launch next Tuesday.",
    "I can update the deck before then.",
  ],
};

export const problem = {
  eyebrow: "THE FOLLOW-UP GAP",
  headline: "Meetings make decisions. Decisions get lost.",
  body:
    "Someone says they will handle it. Someone else assumes they heard. The call ends, the transcript remains, and the work quietly becomes everyone's problem.",
  questions: [
    "What did we decide?",
    "Who owns it?",
    "When is it due?",
    "What is still open?",
  ],
};

export const transformation = {
  eyebrow: "THE SHIFT",
  headline: "From conversation to accountable work.",
  fragments: [
    "someone should update the deck",
    "legal needs the redline first",
    "book the venue walkthrough",
  ],
  cards: [
    {
      chip: "COMMITMENT",
      task: "Update launch deck",
      owner: "John",
      date: "Sep 22",
    },
    {
      chip: "COMMITMENT",
      task: "Send revised numbers",
      owner: "Priya",
      date: "Sep 19",
    },
    {
      chip: "DONE",
      task: "Confirm new pricing",
      owner: "Sarah",
      date: "Sep 22",
    },
  ],
};

export const askDemo = {
  eyebrow: "MEETING MEMORY",
  headline: "Your meetings become searchable.",
  body:
    "Ask a question in plain language. Roundtable finds the answer and shows you where it came from.",
  questions: [
    {
      question: "What did we decide about the launch?",
      answer: "Launch moves to October 14.",
      source: "Let's move the launch to October 14.",
      meeting: "Product Launch Meeting",
      when: "September 15 · 14:32",
    },
    {
      question: "Who owns the launch deck?",
      answer: "John. Update launch deck before Tuesday.",
      source: "I can update the deck before then.",
      meeting: "Product Launch Meeting",
      when: "September 15 · 14:33",
    },
    {
      question: "What's still open from the call?",
      answer: "Priya still owes revised numbers by Friday.",
      source: "I'll get the revised numbers over Friday.",
      meeting: "Product Launch Meeting",
      when: "September 15 · 14:34",
    },
  ] satisfies AskQuestion[],
};

export const statStrip = {
  stats: [
    {
      value: 12400,
      suffix: "+",
      label: "Commitments tracked",
    },
    {
      value: 94,
      suffix: "%",
      label: "Assigned an owner within the call",
    },
    {
      value: 3.5,
      suffix: " hrs",
      label: "Saved per team, per week",
    },
  ] satisfies Stat[],
  footnote: "Illustrative figures",
};

export const closingCta = {
  eyebrow: "START WITH ROUNDTABLE",
  headline: "Make the next meeting easier to act on.",
  body: "Give every important conversation a next step.",
  cta: "See how it works",
  ctaHref: "/how-it-works",
};

export const howItWorksIntro = {
  eyebrow: "THE SYSTEM",
  headline: "From conversation to commitment.",
  subhead:
    "Roundtable listens in the background, recognizes what matters, and carries the work forward after the meeting ends.",
  pipeline: ["LISTEN", "CAPTURE", "ASSIGN", "FOLLOW UP"],
};

export const featureExplorer = {
  eyebrow: "SEE THE SYSTEM",
  headline: "Quiet while you talk. Clear when you leave.",
  tabs: [
    {
      label: "Listens",
      content:
        "Joins any call — Zoom, Meet, or Teams — and transcribes in real time. No bot avatar, no interruption.",
    },
    {
      label: "Extracts",
      content:
        "Identifies decisions and commitments as they're spoken, separating them from general discussion.",
    },
    {
      label: "Assigns",
      content:
        "Matches each commitment to the person who said they'd own it — by name, not by guesswork.",
    },
    {
      label: "Follows up",
      content:
        "Pushes tasks and dates into your calendar and task tools automatically, so nothing depends on someone checking notes later.",
    },
  ] satisfies FeatureTab[],
};

export const lifecycle = {
  eyebrow: "THE LIFECYCLE",
  headline: "A quiet system for the moments that matter.",
  body: "Every stage keeps the context attached to the work it creates.",
  steps: [
    {
      title: "Join the call",
      description:
        "Roundtable connects to your calendar and joins automatically at meeting time.",
    },
    {
      title: "Transcribe & listen",
      description:
        "Real-time transcription runs in the background as the conversation happens.",
    },
    {
      title: "Extract decisions",
      description:
        "Commitments and decisions are separated from general discussion as they're spoken.",
    },
    {
      title: "Assign owners",
      description:
        "Each commitment is matched to the person who said they'd handle it.",
    },
    {
      title: "Sync to your tools",
      description:
        "Tasks and dates are pushed to your calendar and task manager — no copy-pasting notes.",
    },
  ] satisfies LifecycleStep[],
};

export const integrations = {
  eyebrow: "FIT YOUR WORKFLOW",
  headline: "Roundtable fits where your work already lives.",
  meetings: ["Google Meet", "Zoom", "Microsoft Teams"],
  engine: {
    label: "ROUNDTABLE",
    subhead: "Meeting memory",
    caption: "Decisions · Owners · Dates",
  },
  work: ["Slack", "Notion", "Linear", "Google Calendar"],
};

export const trust = {
  eyebrow: "TRUST BY DESIGN",
  headline: "Your meetings stay yours.",
  pillars: [
    "You control which meetings Roundtable joins.",
    "Every answer stays linked to its source conversation.",
    "Workspace permissions keep context in the right hands.",
  ],
  disclaimer:
    "Verify security, retention, and training claims against your production posture before publishing.",
};

export const pricing: PricingContent = {
  eyebrow: "TRANSPARENT PRICING",
  headline: "Start free. Scale with your team's momentum.",
  subhead:
    "No hidden seats or surprise fees. Every plan includes real-time listening, automated commitment tracking, and native tool integrations.",
  annualDiscountBadge: "Save 20% on annual billing",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      description: "For individuals and founders wanting zero-friction meeting accountability.",
      priceMonthly: 0,
      priceAnnual: 0,
      period: "forever",
      ctaText: "Start Free",
      ctaHref: "/how-it-works",
      features: [
        "Up to 10 meetings / month",
        "Real-time live transcription",
        "Automatic commitment & action item extraction",
        "Google Calendar & Zoom integration",
        "14-day searchable meeting history",
        "Community support",
      ],
    },
    {
      id: "pro",
      name: "Pro Team",
      badge: "MOST POPULAR",
      featured: true,
      description: "For high-tempo product, engineering, and operations teams turning talk into momentum.",
      priceMonthly: 24,
      priceAnnual: 19,
      period: "per user / month",
      ctaText: "Start 14-Day Free Trial",
      ctaHref: "/how-it-works",
      features: [
        "Unlimited meetings & duration",
        "Multi-speaker intelligent owner assignment",
        "Direct two-way sync: Slack, Notion, Linear & Asana",
        "Full meeting memory: natural language search across all calls",
        "Automated post-meeting Slack digest & calendar blocker",
        "Unlimited history & decision audit trails",
        "Priority email & Slack support",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      badge: "SCALE & SECURITY",
      description: "For organizations requiring custom data residency, SSO, compliance, and dedicated onboarding.",
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      period: "tailored billing",
      ctaText: "Talk to Sales",
      ctaHref: "mailto:sales@roundtable.ai",
      features: [
        "Everything in Pro Team",
        "Custom SOC2 Type II, HIPAA & GDPR compliance",
        "Zero data retention model for AI training",
        "SAML 2.0 / Okta SSO & SCIM user provisioning",
        "Role-based access & granular workspace permissions",
        "Dedicated Customer Success Manager & SLA guarantees",
        "Custom webhook & CRM pipeline integrations",
      ],
    },
  ],
  guaranteeNote: "14-day money-back guarantee · Cancel or change plans anytime with one click.",
};

export const nav = {
  wordmark: "Roundtable",
  homeHref: "/",
  linkLabel: "How it works",
  linkHref: "/how-it-works",
  pricingLabel: "Pricing",
  pricingHref: "/#pricing",
  ctaLabel: "Start free",
  ctaHref: "/how-it-works",
};

export const footer = {
  wordmark: "Roundtable",
  tagline: "Ends with an owner, not a maybe.",
  linkLabel: "See how it works ↗",
  linkHref: "/how-it-works",
  pricingLabel: "Pricing & Plans",
  pricingHref: "/#pricing",
  copyright: "© 2026 Roundtable",
  descriptor: "Roundtable AI · Meetings that move.",
};