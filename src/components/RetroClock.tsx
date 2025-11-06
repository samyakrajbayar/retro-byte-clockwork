import { useEffect, useState } from "react";

export const RetroClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-card pixel-border animate-slide-down">
      <h2 className="text-xs text-primary neon-glow">SYSTEM TIME</h2>
      <div className="flex gap-2 text-3xl md:text-5xl font-pixel">
        <span className="text-primary neon-glow">{hours}</span>
        <span className="text-secondary neon-glow animate-blink">:</span>
        <span className="text-accent neon-glow">{minutes}</span>
        <span className="text-secondary neon-glow animate-blink">:</span>
        <span className="text-primary neon-glow">{seconds}</span>
      </div>
      <div className="text-[8px] text-muted-foreground">
        {time.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).toUpperCase()}
      </div>
    </div>
  );
};
