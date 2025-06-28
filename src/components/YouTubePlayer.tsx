import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { YouTubePlayerConfig } from '../types/youtube';

interface YouTubePlayerProps {
  config: YouTubePlayerConfig;
  onReady?: () => void;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ config, onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(config.autoplay);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    const initializePlayer = () => {
      if (!window.YT || !window.YT.Player || !playerRef.current) {
        console.log('YouTube API not ready yet');
        return;
      }

      try {
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: '100%',
          width: '100%',
          videoId: config.videoId,
          playerVars: {
            autoplay: config.autoplay ? 1 : 0,
            controls: 0,
            showinfo: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            iv_load_policy: 3,
            cc_load_policy: 0,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              console.log('Player ready');
              setIsReady(true);
              try {
                setDuration(event.target.getDuration());
                setVolume(event.target.getVolume());
                
                if (config.autoplay) {
                  event.target.mute();
                  setIsMuted(true);
                  setShowOverlay(false);
                  setIsPlaying(true);
                }
              } catch (e) {
                console.log('Error in onReady:', e);
              }
              onReady?.();
            },
            onStateChange: (event: any) => {
              const state = event.data;
              console.log('Player state changed:', state);
              
              if (state === window.YT.PlayerState.PLAYING) {
                setShowOverlay(false);
                setIsPlaying(true);
                setIsBuffering(false);
              } else if (state === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
                setIsBuffering(false);
              } else if (state === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
                setShowOverlay(true);
                setIsBuffering(false);
              } else if (state === window.YT.PlayerState.BUFFERING) {
                setIsBuffering(true);
              } else if (state === window.YT.PlayerState.CUED) {
                setIsBuffering(false);
              }
            },
            onError: (event: any) => {
              console.error('YouTube Player Error:', event.data);
              setIsBuffering(false);
            }
          }
        });

        setPlayer(newPlayer);
      } catch (error) {
        console.error('Error creating YouTube player:', error);
      }
    };

    // Check if YouTube API is loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Set up the callback for when the API loads
      window.onYouTubeIframeAPIReady = initializePlayer;
      
      // If the script isn't loaded yet, load it
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy();
        } catch (e) {
          console.log('Error destroying player:', e);
        }
      }
    };
  }, [config.videoId]);

  // Update progress
  useEffect(() => {
    if (!player || !isPlaying) return;

    const interval = setInterval(() => {
      try {
        if (player.getCurrentTime && player.getDuration) {
          const current = player.getCurrentTime();
          const total = player.getDuration();
          setCurrentTime(current);
          setDuration(total);
          setProgress((current / total) * 100);
          
          if (player.getVolume) {
            setVolume(player.getVolume());
          }
        }
      } catch (e) {
        // Silently handle errors
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, isPlaying]);

  const handlePlayPause = () => {
    if (!player) return;
    
    try {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
        setShowOverlay(false);
      }
    } catch (e) {
      console.log('Play/pause error:', e);
    }
  };

  const handleMuteToggle = () => {
    if (!player) return;
    
    try {
      if (isMuted) {
        player.unMute();
        if (volume === 0) {
          player.setVolume(50);
          setVolume(50);
        }
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    } catch (e) {
      console.log('Mute toggle error:', e);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (!player) return;
    
    try {
      player.setVolume(newVolume);
      setVolume(newVolume);
      
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        player.unMute();
        setIsMuted(false);
      }
    } catch (e) {
      console.log('Volume change error:', e);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!player || !duration) return;
    
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      
      player.seekTo(newTime, true);
      setCurrentTime(newTime);
      setProgress(percentage * 100);
    } catch (e) {
      console.log('Seek error:', e);
    }
  };

  const handleRestart = () => {
    if (!player) return;
    
    try {
      player.seekTo(0, true);
      player.playVideo();
      setCurrentTime(0);
      setProgress(0);
      setShowOverlay(false);
    } catch (e) {
      console.log('Restart error:', e);
    }
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    
    try {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      } else if ((container as any).msRequestFullscreen) {
        (container as any).msRequestFullscreen();
      }
    } catch (e) {
      console.log('Fullscreen error:', e);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* YouTube Player */}
      <div 
        ref={playerRef} 
        className="w-full h-full"
      />

      {/* Loading Indicator */}
      {(isBuffering || !isReady) && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-white text-sm">Loading...</p>
          </div>
        </div>
      )}

      {/* Custom Play Button Overlay */}
      {showOverlay && isReady && !isBuffering && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
          <button
            onClick={handlePlayPause}
            className="group/play relative transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30 rounded-full"
            style={{ color: config.playButtonColor }}
          >
            <div 
              className="absolute inset-0 rounded-full blur-2xl opacity-40 group-hover/play:opacity-60 transition-opacity"
              style={{ backgroundColor: config.playButtonColor }}
            />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Play 
                size={config.playButtonSize} 
                className="relative fill-current drop-shadow-2xl"
              />
            </div>
          </button>
        </div>
      )}

      {/* Custom Controls */}
      {isReady && !showOverlay && !isBuffering && (
        <div className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Center Play/Pause */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={handlePlayPause}
              className="pointer-events-auto bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {isPlaying ? (
                <Pause size={24} className="text-white" />
              ) : (
                <Play size={24} className="text-white fill-current" />
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
            {/* Progress Bar */}
            <div 
              className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3 hover:h-1.5 transition-all duration-200"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full rounded-full transition-all duration-200"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: config.brandColor 
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-current" />}
                </button>
                
                <button
                  onClick={handleRestart}
                  className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                >
                  <RotateCcw size={16} />
                </button>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleMuteToggle}
                    className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  
                  <div className="w-16 h-1 bg-white/20 rounded-full cursor-pointer relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className="h-full rounded-full pointer-events-none"
                      style={{ 
                        width: `${isMuted ? 0 : volume}%`,
                        backgroundColor: config.brandColor 
                      }}
                    />
                  </div>
                </div>
                
                <span className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button
                onClick={handleFullscreen}
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};