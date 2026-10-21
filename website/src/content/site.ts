export type SiteConfig = {
  companyName: string;
  email: string | null;
  url: string | null;
};

type SectionCopy = {
  heading: string;
  description: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  id: string;
  order: number;
  label: string;
};

export type SiteContent = {
  hero: SectionCopy & {
    buttonLabel: string;
    buttonHref: `#${string}`;
  };
  services: readonly Service[];
  approach: SectionCopy;
  processSteps: readonly ProcessStep[];
  contact: SectionCopy & {
    buttonLabel: string;
  };
};

// Public, build-time settings only. Replace null when real details are supplied.
export const siteConfig: SiteConfig = {
  companyName: "BDBMego Technologies",
  email: "bdbmego@gmail.com",
  url: "https://bdbmego.com",
};

// Approved wording from PAGE_DESIGN.md; keep this as the shared content source.
export const siteContent: SiteContent = {
  hero: {
    heading: "Big ideas. Lean budgets. Built well.",
    description:
      "Custom websites, mobile apps, and software built around your business. We combine AI-powered development with hands-on expertise to help bring your ideas to life at a price that makes sense.",
    buttonLabel: "Let’s talk about your idea",
    buttonHref: "#contact",
  },
  services: [
    {
      id: "websites",
      title: "Websites",
      description:
        "Make your business stand out with a fast, responsive website designed around your brand and goals.",
    },
    {
      id: "mobile-apps",
      title: "Mobile apps",
      description:
        "Bring your idea to your customers’ fingertips with apps for iOS and Android.",
    },
    {
      id: "custom-software",
      title: "Custom software",
      description:
        "Simplify everyday work with tools, dashboards, and applications built for the way your business operates.",
    },
  ],
  approach: {
    heading: "Powered by AI. Guided by people.",
    description:
      "We use multiple AI agents to accelerate development and reduce repetitive work. Every project is guided, reviewed, and tested by a developer—keeping your requirements at the center and development costs under control.",
  },
  processSteps: [
    {
      id: "share-idea",
      order: 1,
      label: "Tell us your idea",
    },
    {
      id: "agree-scope",
      order: 2,
      label: "Agree on the scope and quote",
    },
    {
      id: "design-build-test",
      order: 3,
      label: "We design, build, and test",
    },
  ],
  contact: {
    heading: "What would you like to build?",
    description:
      "Tell us a little about your idea, the problem you want to solve, and any timeline or budget you have in mind. It’s okay if you’re still figuring things out.",
    buttonLabel: "Email us about your project",
  },
};
