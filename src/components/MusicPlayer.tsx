import { useState } from "react";
import { Music, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export const MusicPlayer = () => {
  const [embedUrl, setEmbedUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  const loadMusic = () => {
    if (embedUrl.trim()) {
      // Convert regular Spotify/YouTube URLs to embed format
      let processedUrl = embedUrl;
      
      if (embedUrl.includes("spotify.com/track/")) {
        const trackId = embedUrl.split("track/")[1]?.split("?")[0];
        processedUrl = `https://open.spotify.com/embed/track/${trackId}`;
      } else if (embedUrl.includes("spotify.com/playlist/")) {
        const playlistId = embedUrl.split("playlist/")[1]?.split("?")[0];
        processedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;
      } else if (embedUrl.includes("youtube.com/watch")) {
        const videoId = embedUrl.split("v=")[1]?.split("&")[0];
        processedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (embedUrl.includes("youtu.be/")) {
        const videoId = embedUrl.split("youtu.be/")[1]?.split("?")[0];
        processedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      
      setCurrentUrl(processedUrl);
      toast("LOADING MUSIC!", {
        description: "Syncing audio data...",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      loadMusic();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="p-6 bg-card pixel-border animate-slide-up">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Music className="w-5 h-5 text-secondary neon-glow" />
          <h2 className="text-sm text-secondary neon-glow">MUSIC PLAYER</h2>
          <Music className="w-5 h-5 text-secondary neon-glow" />
        </div>

        <div className="flex gap-2 mb-4">
          <Input
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="PASTE SPOTIFY/YOUTUBE URL..."
            className="bg-input border-2 border-secondary text-secondary placeholder:text-muted-foreground font-pixel text-xs pixel-border-sm"
          />
          <Button
            onClick={loadMusic}
            className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground arcade-shadow-magenta hover:arcade-shadow-yellow transition-all active:translate-y-1 active:shadow-none"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {currentUrl ? (
          <div className="aspect-video w-full pixel-border-sm overflow-hidden bg-muted animate-pixel-pop">
            <iframe
              src={currentUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-video w-full pixel-border-sm bg-muted flex flex-col items-center justify-center gap-4 p-8">
            <Music className="w-12 h-12 text-muted-foreground animate-pulse" />
            <div className="text-center text-muted-foreground text-xs">
              NO AUDIO LOADED
              <br />
              <br />
              PASTE A SPOTIFY OR
              <br />
              YOUTUBE URL ABOVE
            </div>
          </div>
        )}

        <div className="mt-4 text-[8px] text-muted-foreground text-center">
          SUPPORTS: SPOTIFY TRACKS/PLAYLISTS • YOUTUBE VIDEOS
        </div>
      </div>
    </div>
  );
};
