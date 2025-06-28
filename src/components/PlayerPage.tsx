import React, { useEffect, useState, useMemo } from 'react';
import { YouTubePlayer } from './YouTubePlayer';
import { extractVideoId } from '../utils/youtube';
import { PlayerSettings } from '../types/youtube';

export const PlayerPage: React.FC = () => {
  const [settings, setSettings] = useState<PlayerSettings | null>(null);

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');
    
    if (!videoId) {
      // Redirect to main app if no video ID
      window.location.href = '/';
      return;
    }

    const parsedSettings: PlayerSettings = {
      url: `https://www.youtube.com/watch?v=${videoId}`,
      autoplay: urlParams.get('autoplay') === '1',
      controls: urlParams.get('controls') === '1',
      showInfo: false,
      disableKeyboard: true,
      playButtonColor: decodeURIComponent(urlParams.get('playColor') || '#3B82F6'),
      playButtonSize: parseInt(urlParams.get('playSize') || '64'),
      brandName: decodeURIComponent(urlParams.get('brand') || 'Your Brand'),
      brandColor: decodeURIComponent(urlParams.get('brandColor') || '#3B82F6')
    };

    setSettings(parsedSettings);
  }, []);

  const playerConfig = useMemo(() => {
    if (!settings) return null;
    
    const videoId = extractVideoId(settings.url);
    if (!videoId) return null;

    return {
      videoId,
      autoplay: settings.autoplay,
      controls: settings.controls,
      showInfo: settings.showInfo,
      disableKeyboard: settings.disableKeyboard,
      playButtonColor: settings.playButtonColor,
      playButtonSize: settings.playButtonSize,
      brandName: settings.brandName,
      brandColor: settings.brandColor
    };
  }, [settings]);

  if (!settings || !playerConfig) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading your video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl relative">
        <YouTubePlayer config={playerConfig} />
        
        {/* Subtle watermark in bottom right - only this one */}
        <div className="absolute bottom-6 right-6 z-40">
          <div 
            className="px-3 py-1.5 rounded-lg text-white text-xs font-medium opacity-80 backdrop-blur-sm"
            style={{ backgroundColor: `${settings.brandColor}80` }}
          >
            Powered by {settings.brandName}
          </div>
        </div>
      </div>
    </div>
  );
};