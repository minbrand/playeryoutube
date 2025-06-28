export const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  // If it's already just a video ID
  if (url.match(/^[a-zA-Z0-9_-]{11}$/)) {
    return url;
  }
  
  return null;
};

export const isValidYouTubeUrl = (url: string): boolean => {
  return extractVideoId(url) !== null;
};

export const generatePlayerUrl = (videoId: string, settings: any): string => {
  const baseUrl = window.location.origin;
  const params = new URLSearchParams({
    v: videoId,
    autoplay: settings.autoplay ? '1' : '0',
    controls: settings.controls ? '1' : '0',
    brand: encodeURIComponent(settings.brandName || 'Your Brand'),
    brandColor: encodeURIComponent(settings.brandColor || '#3B82F6'),
    playColor: encodeURIComponent(settings.playButtonColor || '#3B82F6'),
    playSize: settings.playButtonSize?.toString() || '64'
  });

  return `${baseUrl}/player?${params.toString()}`;
};

export const generateEmbedCode = (
  playerUrl: string,
  width: number = 560,
  height: number = 315
): string => {
  return `<iframe 
  width="${width}" 
  height="${height}" 
  src="${playerUrl}"
  title="Video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  style="border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
</iframe>`;
};