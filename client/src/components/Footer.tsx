import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 border-t border-white/5 bg-black/20 backdrop-blur-sm mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-500 text-sm font-mono">
          © {new Date().getFullYear()} Aditya Prakash. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="mailto:adiprakash35@gmail.com" 
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
