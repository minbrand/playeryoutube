export interface YouTubePlayerConfig {
  videoId: string;
  autoplay: boolean;
  controls: boolean;
  showInfo: boolean;
  disableKeyboard: boolean;
  playButtonColor: string;
  playButtonSize: number;
  brandName: string;
  brandColor: string;
}

export interface PlayerSettings {
  url: string;
  autoplay: boolean;
  controls: boolean;
  showInfo: boolean;
  disableKeyboard: boolean;
  playButtonColor: string;
  playButtonSize: number;
  brandName: string;
  brandColor: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}