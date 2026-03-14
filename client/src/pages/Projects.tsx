import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { ParticleNetwork } from "@/components/ParticleNetwork";
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
      <ParticleNetwork />
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 relative z-10 overflow-hidden">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-24 mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter mb-6 text-white/80">Currently Working On</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* IntentAware */}
              <motion.div variants={item} className="h-full">
                <div className="group relative w-full h-full glass-card rounded-xl overflow-hidden p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="mt-2 mb-8">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">Computer Vision</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">Gesture Control</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">HCI</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-zinc-200 transition-colors">
                      IntentAware
                    </h3>
                  </div>
                  <div className="mt-auto">
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Vision-Based Unified Touchless Interaction Framework for Gesture Control and Mid-Air Sketch Reconstruction. Jointly models user intent and trajectory dynamics to enable robust gesture control using a monocular camera, filtering noise and inferring interaction mode in real time.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>

              {/* Pipeline Integrity Digital Twin */}
              <motion.div variants={item} className="h-full">
                <div className="group relative w-full h-full glass-card rounded-xl overflow-hidden p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="mt-2 mb-8">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">Digital Twin</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">PINN</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">XAI</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">Three.js</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-zinc-200 transition-colors">
                      Pipeline Integrity Digital Twin
                    </h3>
                  </div>
                  <div className="mt-auto">
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      A comprehensive monitoring and diagnostic dashboard for industrial infrastructure. Integrates real-time 3D pipelines with Computer Vision (corrosion detection), Physics-Informed Neural Networks (predicting degradation via Fick's 2nd Law), and Explainable AI (SHAP analysis).
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>

              {/* UniNotes */}
              <motion.div variants={item} className="h-full">
                <div className="group relative w-full h-full glass-card rounded-xl overflow-hidden p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="mt-2 mb-8">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">Web App</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">Productivity</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">UI/UX</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-zinc-200 transition-colors">
                      UniNotes
                    </h3>
                  </div>
                  <div className="mt-auto">
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      A streamlined, intelligent note-taking application designed for academic and professional use, with a primary focus on supporting UTU/AKTU students. The platform emphasizes an elegant UI/UX, structured organization, and accessibility features to help students manage notes, subjects, and study material more efficiently, creating a seamless and distraction-free knowledge management experience.

                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>

              {/* Vidhan AI */}
              <motion.div variants={item} className="h-full">
                <div className="group relative w-full h-full glass-card rounded-xl overflow-hidden p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="mt-2 mb-8">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">Legal Tech</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">Multi-Agent AI</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">NLP</span>
                      <span className="px-2 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded-md bg-white/5">Automation</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-zinc-200 transition-colors">
                      Vidhan AI
                    </h3>
                  </div>
                  <div className="mt-auto">
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      An agentic legal workflow automation system in development that streamlines repetitive legal tasks using intelligent automation. Vidhan AI combines AI-assisted drafting, legal research, compliance tracking, and structured case management through NLP, document intelligence, and multi-agent orchestration to help legal professionals work more efficiently.

                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
