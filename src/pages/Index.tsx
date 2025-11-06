import { RetroClock } from "@/components/RetroClock";
import { TodoList } from "@/components/TodoList";
import { MusicPlayer } from "@/components/MusicPlayer";

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-6">
      <div className="w-full max-w-2xl animate-slide-down">
        <h1 className="text-2xl md:text-4xl text-center mb-2 text-primary neon-glow animate-glitch">
          8-BIT TASK MANAGER
        </h1>
        <p className="text-[10px] text-center text-muted-foreground">
          POWERED BY RETRO SYSTEMS v1.0
        </p>
      </div>

      <RetroClock />
      <TodoList />
      <MusicPlayer />

      <div className="text-[8px] text-muted-foreground text-center mt-8 opacity-50">
        © 2025 RETRO SOFTWARE • ALL PIXELS RESERVED
      </div>
    </div>
  );
};

export default Index;
