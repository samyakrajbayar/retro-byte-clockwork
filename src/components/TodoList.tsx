import { useState } from "react";
import { Plus, Trash2, Square, CheckSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      toast("TASK ADDED!", {
        description: "New mission logged",
      });
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    toast("STATUS UPDATED!", {
      description: "Mission progress saved",
    });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast("TASK DELETED!", {
      description: "Mission removed from log",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="p-6 bg-card pixel-border animate-slide-up">
        <h1 className="text-xl md:text-2xl mb-6 text-primary neon-glow text-center">
          RETRO TODO
        </h1>
        
        <div className="flex gap-2 mb-6">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="ENTER NEW TASK..."
            className="bg-input border-2 border-primary text-primary placeholder:text-muted-foreground font-pixel text-xs pixel-border-sm"
          />
          <Button
            onClick={addTodo}
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground arcade-shadow-cyan hover:arcade-shadow-yellow transition-all active:translate-y-1 active:shadow-none"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {todos.length === 0 ? (
            <div className="text-center text-muted-foreground text-xs p-8">
              NO TASKS LOGGED
              <br />
              START YOUR MISSION!
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className="flex items-center gap-2 p-3 bg-muted pixel-border-sm animate-pixel-pop hover:bg-accent/10 transition-colors"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-primary hover:text-accent transition-colors"
                >
                  {todo.completed ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>
                <span
                  className={`flex-1 text-xs ${
                    todo.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {todo.text}
                </span>
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-border flex justify-between text-[10px] text-muted-foreground">
          <span>TOTAL: {todos.length}</span>
          <span>DONE: {todos.filter((t) => t.completed).length}</span>
          <span>PENDING: {todos.filter((t) => !t.completed).length}</span>
        </div>
      </div>
    </div>
  );
};
