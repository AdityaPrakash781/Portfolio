import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Work" },
    { href: "/philosophy", label: "Philosophy" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-1 shadow-xl shadow-black/20">
        {links.map((link) => {
          const isActive = location === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                isActive 
                  ? "text-white bg-white/10" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
