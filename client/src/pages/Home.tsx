import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Github } from "lucide-react";
import heroBg from "@assets/abstract-mesh.png"; // Assuming placeholder, will fallback if missing
import { StarryBackground } from "@/components/StarryBackground";
import { CatConstellation } from "@/components/CatConstellation";
import { TaurusConstellation } from "@/components/TaurusConstellation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-white/20">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center relative overflow-hidden pt-20">
        {/* Background Atmosphere */}
        <StarryBackground />

        {/* Cat Constellation Layer */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <CatConstellation className="w-full h-full" />
        </div>

        {/* Taurus Constellation Layer */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <TaurusConstellation className="w-full h-full" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.03),_transparent_40%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-zinc-500 font-mono text-sm mb-6 tracking-widest uppercase">
              AI Engineer & Architect
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50">
              Aditya Prakash
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed font-light mb-12">
              Engineering intelligent systems as architecture. Bridging the gap between
              <span className="text-white font-medium ml-1">theoretical AI</span> and
              <span className="text-white font-medium ml-1">production reality</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/projects">
                <button className="group relative px-8 py-4 bg-white text-black font-medium rounded-full overflow-hidden transition-transform active:scale-95">
                  <span className="relative z-10 flex items-center gap-2">
                    View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 glass text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>


      </main>

      <Footer />
    </div>
  );
}
