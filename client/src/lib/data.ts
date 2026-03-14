// Static project data — replaces the server API for Vercel static deployment

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  tags: string[] | null;
  liveLink: string | null;
  githubLink: string | null;
  createdAt: Date;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "VytalCare",
    subtitle: "Agentic RAG Health System",
    description: "A comprehensive health navigation system built with agentic workflows.",
    content: `
# Problem
Healthcare systems are fragmented. Patients struggle to navigate between providers, insurance, and medical records. Information is siloed, leading to inefficiencies and poor patient outcomes.

# Architecture
VytalCare utilizes a multi-agent architecture:
- **Triage Agent**: Analyzes symptoms and directs users to appropriate care.
- **Records Agent**: Retrieval-Augmented Generation (RAG) system accessing vectorized medical history.
- **Scheduling Agent**: Interfaces with provider APIs to book appointments.

# System Philosophy
The system is built on the principle of *minimum friction*. Agents act autonomously to resolve ambiguity, only asking for user input when confidence thresholds are not met.

# Engineering Decisions
- **Vector Database**: Used pgvector for semantic search over medical documents.
- **Orchestration**: Custom state machine for agent coordination, ensuring deterministic flows in critical health scenarios.
- **Privacy**: Local-first processing for sensitive PII where possible.

# Lessons Learned
Balancing agent autonomy with safety guardrails is the critical challenge in healthcare AI.
    `,
    tags: ["AI", "RAG", "Healthcare", "Agents"],
    liveLink: "https://health-navigator-copy.vercel.app/",
    githubLink: "https://github.com/AdityaPrakash781",
    createdAt: new Date("2025-01-01"),
  },
  {
    id: 2,
    title: "ProVytal-Marketing-Site",
    subtitle: "Predictive Health Intelligence Layer",
    description: "A modern, proactive health marketing platform designed to turn biological data into actionable foresight.",
    content: `
# Problem
Modern healthcare is fundamentally reactive, designed for crisis management rather than health optimization. By the time symptoms appear, biological cascades have often been running for weeks.

# Mission
Health should be proactive, not reactive. We are building the intelligence layer for your body—giving you the time, clarity, and control to prevent tomorrow's health crises today.

# Architecture & Features
- **Early Detection**: Monitoring micromovements in HRV, RHR, and sleep to spot anomalies weeks before symptoms appear.
- **Decision Support**: Contextual AI that doesn't just show data, but explains what it means and what to do next.
- **Lifestyle Intelligence**: Personalized adjustments to daily routines that compound into long-term vitality.
- **Admin Waitlist System**: Robust lead management with an integrated admin dashboard.

# Engineering Decisions
- **Visual Excellence**: Built with a premium, dark-mode first aesthetic using Tailwind CSS and Framer Motion for smooth, organic transitions.
- **Tech Stack**: React 19, Vite, Express, Drizzle ORM, and PostgreSQL for a high-performance, full-stack architecture.
- **Component Systems**: Leveraged Shadcn UI for accessible, high-fidelity interactive elements including glassmorphism and subtle micro-animations.

# Values
Every membership creates impact, with a portion of revenue supporting preventative care digital infrastructure in underserved communities. Because proactive healthcare shouldn't be a privilege—it should be the global standard.
    `,
    tags: ["Predictive AI", "Health-Tech", "Full-Stack", "Modern UI", "React"],
    liveLink: "https://pro-vytal-marketing-site.vercel.app/",
    githubLink: "https://github.com/AdityaPrakash781",
    createdAt: new Date("2025-01-01"),
  },
];
