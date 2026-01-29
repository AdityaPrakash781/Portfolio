import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group relative w-full h-full glass-card rounded-xl overflow-hidden p-8 cursor-pointer flex flex-col hover:-translate-y-1 transition-transform duration-300">
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-6 h-6 text-white" />
        </div>
        
        <div className="mt-2 mb-8">
          <div className="flex gap-2 mb-4 flex-wrap">
            {project.tags?.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-zinc-200 transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-400 font-medium">{project.subtitle}</p>
        </div>

        <div className="mt-auto">
          <p className="text-zinc-500 text-sm line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </Link>
  );
}
