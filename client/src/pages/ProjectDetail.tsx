import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const { data: project, isLoading, error } = useProject(id);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-zinc-600 animate-spin" />
      </div>
    );
  }

  if (!project || error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400">Project not found</p>
        <Link href="/projects" className="text-white underline hover:text-zinc-300">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <Link href="/projects">
            <button className="group flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors font-mono text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Work
            </button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-2 mb-6 flex-wrap">
              {project.tags?.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm font-mono text-zinc-400 border border-white/10 rounded-full bg-white/5">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 font-light mb-8 leading-relaxed">
              {project.subtitle}
            </p>

            <div className="flex gap-4 mb-16 border-b border-white/5 pb-8">
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.githubLink && (
                <a 
                  href={project.githubLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-white prose-a:underline prose-code:font-mono prose-code:text-sm prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10">
              {/* This handles markdown content, including the case study sections */}
              <ReactMarkdown>{project.content}</ReactMarkdown>
            </div>
          </motion.div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
