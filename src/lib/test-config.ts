import type { SiteConfig } from "@/types/site-config";
import { THEME_PRESETS } from "@/lib/themes/presets";

const preset = THEME_PRESETS["dark-copper"];

export const TEST_CONFIG: SiteConfig = {
  id: "test-001",
  version: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  company: {
    name: "AceTech Solutions",
    tagline: "Engineering Tomorrow's Infrastructure",
    industry: "Technology Consulting",
    description:
      "We help businesses modernize their technology stack with expert consulting, cloud migration, and custom software development.",
    foundedYear: 2015,
    location: {
      address: "123 Innovation Drive",
      city: "Austin",
      state: "Texas",
      country: "USA",
    },
    contact: {
      phone: "+1 (512) 555-0142",
      email: "hello@acetech.com",
      whatsapp: "+15125550142",
    },
    social: {
      linkedin: "https://linkedin.com/company/acetech",
      twitter: "https://twitter.com/acetech",
    },
  },

  theme: {
    preset: "dark-copper",
    mode: preset.mode,
    colors: preset.colors,
    fontPairing: "playfair-inter",
    borderRadius: "soft",
    spacing: "normal",
    buttonStyle: "solid",
    cardStyle: "bordered",
  },

  navbar: {
    variant: "standard",
    showCta: true,
    ctaText: "Get Started",
    ctaLink: "/contact",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "Admin", href: "/admin" },
    ],
    transparent: true,
  },

  footer: {
    variant: "standard",
    columns: [
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Cloud Migration", href: "/services" },
          { label: "Custom Software", href: "/services" },
          { label: "DevOps", href: "/services" },
        ],
      },
    ],
    showContact: true,
    showSocial: true,
    bottomText: "© {year} AceTech Solutions. All rights reserved.",
  },

  pages: [
    {
      id: "home",
      slug: "",
      title: "AceTech Solutions — Engineering Tomorrow",
      description: "Expert technology consulting for modern businesses.",
      sections: [
        {
          id: "hero-1",
          type: "hero",
          variant: 0,
          background: "primary",
          paddingSize: "lg",
          badge: "Trusted Technology Partner",
          headline: "Build Better.",
          headlineAccent: "Scale Faster.",
          description:
            "We help companies modernize infrastructure, migrate to the cloud, and ship software that scales — with a team that's been doing it for a decade.",
          cta: {
            primary: { text: "Start a Project", href: "/contact" },
            secondary: { text: "Our Services", href: "/services" },
          },
          showContactInfo: true,
          visualCard: {
            title: "Recent Projects",
            items: [
              { icon: "CheckCircle", text: "Cloud migration — FinServ Corp" },
              { icon: "CheckCircle", text: "API platform — RetailMax" },
              { icon: "CheckCircle", text: "DevOps pipeline — HealthFirst" },
              { icon: "CheckCircle", text: "Data platform — EduTech Inc" },
            ],
          },
        },
        {
          id: "trust-1",
          type: "trustStrip",
          variant: 0,
          background: "secondary",
          paddingSize: "sm",
          items: [
            { icon: "ShieldCheck", title: "Enterprise Security", description: "SOC 2 compliant" },
            { icon: "Award", title: "AWS Partner", description: "Advanced tier" },
            { icon: "Globe", title: "Global Reach", description: "12 countries" },
            { icon: "Lock", title: "Data Privacy", description: "GDPR ready" },
          ],
        },
        {
          id: "stats-1",
          type: "stats",
          variant: 0,
          background: "primary",
          paddingSize: "md",
          items: [
            { value: "10+", label: "Years Experience" },
            { value: "200+", label: "Projects Delivered" },
            { value: "50+", label: "Enterprise Clients" },
            { value: "99%", label: "Client Retention" },
          ],
          animated: true,
        },
        {
          id: "services-1",
          type: "services",
          variant: 0,
          background: "primary",
          paddingSize: "lg",
          label: "What We Do",
          heading: "Services Built for Scale",
          description:
            "From strategy to execution, we cover every phase of your technology journey.",
          items: [
            {
              icon: "Cloud",
              title: "Cloud Migration",
              description:
                "Move your infrastructure to AWS, Azure, or GCP with zero downtime and full data integrity.",
            },
            {
              icon: "Code",
              title: "Custom Software",
              description:
                "Purpose-built applications designed for your specific workflows and business logic.",
            },
            {
              icon: "GitBranch",
              title: "DevOps & CI/CD",
              description:
                "Automated pipelines, infrastructure as code, and monitoring that scales.",
            },
            {
              icon: "BarChart3",
              title: "Data & Analytics",
              description:
                "Data lakes, real-time dashboards, and ML pipelines to turn data into decisions.",
            },
          ],
          ctaText: "View All Services",
          ctaLink: "/services",
        },
        {
          id: "process-1",
          type: "processSteps",
          variant: 0,
          background: "secondary",
          paddingSize: "lg",
          label: "Our Process",
          heading: "How We Work",
          description: "A proven methodology that delivers results on time and on budget.",
          steps: [
            {
              number: "01",
              title: "Discovery",
              description:
                "We audit your current stack, understand your goals, and map out a strategy.",
            },
            {
              number: "02",
              title: "Build & Iterate",
              description:
                "Agile sprints with weekly demos — you see progress from day one.",
            },
            {
              number: "03",
              title: "Launch & Support",
              description:
                "We deploy, monitor, and provide ongoing support to keep things running smoothly.",
            },
          ],
        },
        {
          id: "testimonials-1",
          type: "testimonials",
          variant: 0,
          background: "primary",
          paddingSize: "lg",
          label: "Client Feedback",
          heading: "What Our Clients Say",
          items: [
            {
              quote:
                "AceTech migrated our entire infrastructure to AWS in 6 weeks. Zero downtime, zero data loss. Their team was exceptional.",
              name: "Sarah Chen",
              role: "CTO",
              company: "FinServ Corp",
              location: "New York",
            },
            {
              quote:
                "The custom API platform they built handles 10M requests per day without breaking a sweat. Worth every penny.",
              name: "Marcus Rivera",
              role: "VP Engineering",
              company: "RetailMax",
              location: "Chicago",
            },
            {
              quote:
                "Finally a consulting firm that actually delivers. They understood our healthcare compliance needs from day one.",
              name: "Dr. Priya Sharma",
              role: "Director of IT",
              company: "HealthFirst",
              location: "Boston",
            },
          ],
        },
        {
          id: "faq-1",
          type: "faq",
          variant: 0,
          background: "secondary",
          paddingSize: "lg",
          label: "Common Questions",
          heading: "Frequently Asked Questions",
          description: "Everything you need to know about working with AceTech.",
          items: [
            {
              question: "How long does a typical project take?",
              answer:
                "Most projects run 8-16 weeks depending on scope. We start with a 2-week discovery phase and deliver in 2-week sprints after that. You'll see working software from the first sprint.",
            },
            {
              question: "Do you work with startups or just enterprises?",
              answer:
                "Both. We've helped seed-stage startups build their first product and Fortune 500 companies modernize legacy systems. Our process adapts to your scale.",
            },
            {
              question: "What technologies do you specialize in?",
              answer:
                "We're strong in TypeScript, React, Node.js, Python, AWS, Kubernetes, and Terraform. But we're technology-agnostic — we pick the right tools for your problem.",
            },
            {
              question: "How does pricing work?",
              answer:
                "We offer both project-based fixed pricing and dedicated team models. Most clients start with a fixed-price discovery phase before committing to a larger engagement.",
            },
          ],
        },
        {
          id: "cta-1",
          type: "cta",
          variant: 0,
          background: "accent",
          paddingSize: "lg",
          heading: "Ready to Build Something Great?",
          description:
            "Let's talk about your next project. No sales pitch — just an honest conversation about what's possible.",
          buttons: [
            { text: "Start a Conversation", href: "/contact", style: "primary" },
            { text: "View Our Work", href: "/services", style: "secondary" },
          ],
        },
      ],
    },
    // ===== About Page =====
    {
      id: "about",
      slug: "about",
      title: "About AceTech Solutions",
      description: "Our story, values, and the team behind AceTech.",
      sections: [
        {
          id: "about-hero",
          type: "hero",
          variant: 1,
          background: "primary",
          paddingSize: "lg",
          headline: "Our Story",
          headlineAccent: "A Decade of Delivery",
          description:
            "Founded in 2015 with a simple belief: technology consulting should be about results, not billable hours. We've grown from a two-person team to a 40-person operation — but we still run like a startup.",
          cta: {
            primary: { text: "Work With Us", href: "/contact" },
          },
          showContactInfo: false,
        },
        {
          id: "about-content",
          type: "content",
          variant: 0,
          background: "secondary",
          paddingSize: "lg",
          label: "Who We Are",
          heading: "Built by Engineers, for Engineers",
          paragraphs: [
            "AceTech started when our founders got tired of watching consulting firms deliver slide decks instead of working software. We decided to build a firm where every consultant writes code, every project has measurable outcomes, and every client gets honest advice.",
            "Today we serve clients across fintech, healthcare, retail, and education — from seed-stage startups to Fortune 500 enterprises. Our secret? We hire people who love building things, and we stay out of their way.",
          ],
          sideCard: {
            heading: "AceTech at a Glance",
            subtitle: "Austin, TX — Founded 2015",
            stats: [
              { value: "40+", label: "Team Members" },
              { value: "200+", label: "Projects Shipped" },
            ],
            icon: "Building2",
          },
        },
        {
          id: "about-values",
          type: "featureGrid",
          variant: 0,
          background: "primary",
          paddingSize: "lg",
          label: "Our Values",
          heading: "What We Stand For",
          items: [
            { icon: "Target", title: "Results First", description: "We measure success by outcomes, not hours billed. If it doesn't ship, it doesn't count." },
            { icon: "Users", title: "Radical Candor", description: "We tell you what you need to hear, not what you want to hear. Honest advice saves everyone time." },
            { icon: "Zap", title: "Move Fast", description: "Two-week sprints, weekly demos, real feedback loops. You see progress from day one." },
            { icon: "Heart", title: "Own the Outcome", description: "We don't disappear after launch. If it breaks at 2am, we're already on it." },
          ],
        },
        {
          id: "about-cta",
          type: "cta",
          variant: 0,
          background: "accent",
          paddingSize: "lg",
          heading: "Let's Build Together",
          description: "We're always looking for interesting problems to solve.",
          buttons: [
            { text: "Start a Project", href: "/contact", style: "primary" },
          ],
        },
      ],
    },
    // ===== Services Page =====
    {
      id: "services",
      slug: "services",
      title: "Services — AceTech Solutions",
      description: "Cloud migration, custom software, DevOps, and data engineering.",
      sections: [
        {
          id: "services-hero",
          type: "hero",
          variant: 2,
          background: "primary",
          paddingSize: "lg",
          headline: "What We Do",
          description:
            "Full-stack technology services — from cloud infrastructure to custom applications. We help companies build, scale, and modernize.",
          cta: {
            primary: { text: "Get a Quote", href: "/contact" },
          },
          showContactInfo: false,
        },
        {
          id: "services-detail",
          type: "services",
          variant: 1,
          background: "secondary",
          paddingSize: "lg",
          label: "Our Capabilities",
          heading: "End-to-End Engineering",
          items: [
            {
              icon: "Cloud",
              title: "Cloud Migration",
              description: "Move your infrastructure to AWS, Azure, or GCP with zero downtime.",
              features: ["Infrastructure assessment", "Migration roadmap", "Zero-downtime cutover", "Cost optimization"],
            },
            {
              icon: "Code",
              title: "Custom Software",
              description: "Purpose-built applications designed for your workflows.",
              features: ["Full-stack development", "API design", "Mobile apps", "System integration"],
            },
            {
              icon: "GitBranch",
              title: "DevOps & CI/CD",
              description: "Automated pipelines and infrastructure as code.",
              features: ["CI/CD pipelines", "Kubernetes", "Terraform", "Monitoring & alerting"],
            },
          ],
        },
        {
          id: "services-process",
          type: "processSteps",
          variant: 0,
          background: "primary",
          paddingSize: "lg",
          label: "How We Deliver",
          heading: "A Proven Process",
          steps: [
            { number: "01", title: "Discovery", description: "2-week deep dive into your stack, goals, and constraints." },
            { number: "02", title: "Build", description: "Agile sprints with weekly demos and continuous feedback." },
            { number: "03", title: "Launch & Scale", description: "Deploy, monitor, optimize, and hand off with full documentation." },
          ],
        },
        {
          id: "services-cta",
          type: "cta",
          variant: 1,
          background: "secondary",
          paddingSize: "lg",
          heading: "Have a Project in Mind?",
          description: "Let's talk about what you need and how we can help.",
          buttons: [
            { text: "Contact Us", href: "/contact", style: "primary" },
          ],
        },
      ],
    },
    // ===== Contact Page =====
    {
      id: "contact",
      slug: "contact",
      title: "Contact — AceTech Solutions",
      description: "Get in touch with our team.",
      sections: [
        {
          id: "contact-hero",
          type: "hero",
          variant: 1,
          background: "primary",
          paddingSize: "md",
          headline: "Get in Touch",
          description: "Whether you have a project in mind or just want to say hello, we'd love to hear from you.",
          cta: {
            primary: { text: "Scroll Down", href: "#contact-form" },
          },
          showContactInfo: true,
        },
        {
          id: "contact-form",
          type: "contact",
          variant: 0,
          background: "secondary",
          paddingSize: "lg",
          heading: "Send Us a Message",
          description: "Fill out the form and we'll get back to you within 24 hours.",
          formFields: [
            { name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
            { name: "email", label: "Email", type: "email", required: true, placeholder: "john@company.com" },
            { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "+1 (555) 000-0000" },
            { name: "message", label: "Tell Us About Your Project", type: "textarea", required: true, placeholder: "Describe your project..." },
          ],
          formTypes: [
            {
              id: "client",
              label: "I Need a Project",
              fields: [
                { name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
                { name: "email", label: "Email", type: "email", required: true, placeholder: "john@company.com" },
                { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "+1 (555) 000-0000" },
                { name: "company", label: "Company", type: "text", required: false, placeholder: "Your company" },
                { name: "service", label: "Service Needed", type: "select", required: true, options: ["Cloud Migration", "Custom Software", "DevOps", "Data & Analytics", "Other"] },
                { name: "budget", label: "Budget Range", type: "select", required: false, options: ["< $25K", "$25K - $50K", "$50K - $100K", "$100K+"] },
                { name: "message", label: "Project Details", type: "textarea", required: true, placeholder: "Describe your project, timeline, and requirements..." },
              ],
            },
            {
              id: "partner",
              label: "Partnership",
              fields: [
                { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Jane Smith" },
                { name: "email", label: "Email", type: "email", required: true, placeholder: "jane@partner.com" },
                { name: "company", label: "Company", type: "text", required: true, placeholder: "Partner Co." },
                { name: "message", label: "How Can We Collaborate?", type: "textarea", required: true, placeholder: "Tell us about your partnership idea..." },
              ],
            },
            {
              id: "general",
              label: "General",
              fields: [
                { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your name" },
                { name: "email", label: "Email", type: "email", required: true, placeholder: "your@email.com" },
                { name: "message", label: "Message", type: "textarea", required: true, placeholder: "How can we help?" },
              ],
            },
          ],
          showContactInfo: true,
          showWhatsApp: true,
        },
      ],
    },
  ],

  seo: {
    siteName: "AceTech Solutions",
    defaultTitle: "AceTech Solutions — Engineering Tomorrow",
    titleTemplate: "%s | AceTech Solutions",
    defaultDescription:
      "Expert technology consulting for cloud migration, custom software, and DevOps.",
    keywords: [
      "technology consulting",
      "cloud migration",
      "custom software",
      "DevOps",
      "AWS",
    ],
  },

  integrations: {
    whatsapp: {
      enabled: true,
      number: "+15125550142",
      message: "Hi AceTech, I'd like to discuss a project.",
    },
  },
};
