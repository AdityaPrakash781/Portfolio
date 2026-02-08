import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Loader2 } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <StarryBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl font-bold tracking-tighter mb-6">Selected Work</h1>
            <p className="text-zinc-400 max-w-xl text-lg font-light leading-relaxed">
              A collection of engineering problems solved through code, architecture, and systems thinking.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-zinc-600 animate-spin" />
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {projects?.map((project) => (
                <motion.div key={project.id} variants={item} className="h-full">
                  <ProjectCard project={project} />
                </motion.div>
              ))}

              {!projects?.length && (
                <div className="col-span-full py-20 text-center text-zinc-500 font-mono">
                  No projects found. Check back soon.
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
