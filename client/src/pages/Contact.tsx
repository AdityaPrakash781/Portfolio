import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";
import { Linkedin } from "lucide-react";

export default function Contact() {

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <StarryBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 flex items-center relative z-10">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold tracking-tighter mb-6 text-white">Get in Touch</h1>
            <p className="text-xl text-zinc-400 font-light mb-8 leading-relaxed">
              Interested in collaborating or discussing AI architecture?
              I'm always open to interesting conversations and technical challenges.
            </p>

            <div className="space-y-4 mb-12">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">Email</h3>
                <a href="mailto:adiprakash35@gmail.com" className="text-xl text-white hover:text-zinc-300 transition-colors">
                  adiprakash35@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-10 rounded-2xl relative overflow-hidden flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Linkedin className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Let's Connect</h2>
              <p className="text-zinc-400 text-lg mb-10 max-w-sm leading-relaxed">
                I prefer connecting through LinkedIn for professional inquiries and architectural discussions.
              </p>

              <a
                href="https://www.linkedin.com/in/aditya-prakash-206341293"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 text-lg"
              >
                Connect on LinkedIn
              </a>

              <p className="mt-8 text-sm font-mono text-zinc-500 uppercase tracking-widest">
                Usually responds within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
