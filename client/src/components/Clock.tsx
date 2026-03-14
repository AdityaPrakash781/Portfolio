import { useState, useEffect } from "react";
import { format } from "date-fns";

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden md:flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-2xl shadow-xl transition-transform hover:scale-105 group">
      
      <div className="flex flex-col items-start font-mono tracking-tight">
        {/* Time */}
        <div className="flex items-baseline gap-1.5 text-white/90 group-hover:text-white transition-colors">
          <span className="text-base font-semibold">{format(time, "hh:mm:ss")}</span>
          <span className="text-[10px] font-medium text-white/50">{format(time, "a")} IST</span>
        </div>
        
        {/* Date */}
        <span className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
          {format(time, "MMM do, yyyy")}
        </span>
      </div>
    </div>
  );
}
