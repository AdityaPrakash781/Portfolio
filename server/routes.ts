import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data
  try {
    const existingProjects = await storage.getProjects();

    // Check for VytalCare
    if (!existingProjects.some(p => p.title === "VytalCare")) {
      await storage.createProject({
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
        githubLink: "https://github.com/AdityaPrakash781"
      });
      console.log("Database seeded with VytalCare project");
    }

    // Check for ProVytal-Marketing-Site
    if (!existingProjects.some(p => p.title === "ProVytal-Marketing-Site")) {
      await storage.createProject({
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
        githubLink: "https://github.com/AdityaPrakash781"
      });
      console.log("Database seeded with ProVytal-Marketing-Site project");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }

  return httpServer;
}
