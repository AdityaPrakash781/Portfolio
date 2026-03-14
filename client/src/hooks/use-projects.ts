import { projects, type Project } from "@/lib/data";

export function useProjects() {
  return {
    data: projects,
    isLoading: false,
    error: null,
  };
}

export function useProject(id: number) {
  const project = projects.find((p) => p.id === id) ?? null;
  return {
    data: project,
    isLoading: false,
    error: null,
  };
}
