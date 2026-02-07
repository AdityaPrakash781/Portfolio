import { db } from "./db";
import { projects, messages, type Project, type InsertProject, type Message, type InsertMessage } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>; // For seeding
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    if (!db) throw new Error("Database not initialized");
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    if (!db) throw new Error("Database not initialized");
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private messages: Map<number, Message>;
  private projectId: number;
  private messageId: number;

  constructor() {
    this.projects = new Map();
    this.messages = new Map();
    this.projectId = 1;
    this.messageId = 1;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const project: Project = {
      id,
      title: insertProject.title,
      subtitle: insertProject.subtitle,
      description: insertProject.description,
      content: insertProject.content,
      tags: insertProject.tags ?? null,
      liveLink: insertProject.liveLink ?? null,
      githubLink: insertProject.githubLink ?? null,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }
}

export const storage = db ? new DatabaseStorage() : new MemStorage();
