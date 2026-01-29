import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Philosophy() {
  const sections = [
    {
      title: "On Curiosity",
      content: "Deep understanding comes from the willingness to deconstruct the magical into the mechanical. In AI engineering, this means looking beyond the API call to understand the attention mechanism, the loss landscape, and the architectural constraints."
    },
    {
      title: "On Discipline",
      content: "Code is a liability, not an asset. The most elegant systems are those that achieve maximum utility with minimum complexity. Rigor in testing, clarity in documentation, and restraint in implementation are the hallmarks of mature engineering."
    },
    {
      title: "On Architecture",
      content: "Systems mirror the thought processes that created them. Building resilient, scalable software requires not just technical skill, but structural clarity. Every module should have a single responsibility; every interface should be an explicit contract."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-white/10 select-none">
              MANIFESTO
            </h1>
            <h2 className="text-3xl font-light text-white tracking-wide border-l-2 border-white/20 pl-6 py-2">
              Engineering is not merely about building;<br />
              it is about <span className="text-zinc-500">understanding</span>.
            </h2>
          </motion.div>

          <div className="space-y-24">
            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex flex-col md:flex-row gap-8 items-baseline">
                  <h3 className="text-xl font-mono text-zinc-500 uppercase tracking-widest w-full md:w-1/3 group-hover:text-white transition-colors duration-300">
                    {section.title}
                  </h3>
                  <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed w-full md:w-2/3">
                    {section.content}
                  </p>
                </div>
              </motion.section>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 pt-12 border-t border-white/5 text-center"
          >
            <p className="font-mono text-zinc-600 text-sm">
              ADITYA PRAKASH — {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
