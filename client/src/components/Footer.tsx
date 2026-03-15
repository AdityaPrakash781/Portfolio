import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full py-8 sm:py-12 px-4 border-t border-white/5 bg-black/20 backdrop-blur-sm mt-auto relative z-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-500 text-sm font-mono">
          © {new Date().getFullYear()} Aditya Prakash. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors relative z-10"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-prakash-206341293"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors relative z-10"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <Link
            href="/contact"
            className="text-zinc-500 hover:text-white transition-colors relative z-10 cursor-pointer"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
