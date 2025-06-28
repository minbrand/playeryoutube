import React, { useState, useMemo } from 'react';
import { Play, Shield, Zap, Video } from 'lucide-react';
import { YouTubePlayer } from './components/YouTubePlayer';
import { CustomizationPanel } from './components/CustomizationPanel';
import { CodeGenerator } from './components/CodeGenerator';
import { Footer } from './components/Footer';
import { PromoSection } from './components/PromoBanner';
import { extractVideoId, isValidYouTubeUrl } from './utils/youtube';
import { PlayerSettings } from './types/youtube';

function App() {
  const [settings, setSettings] = useState<PlayerSettings>({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    autoplay: false,
    controls: false,
    showInfo: false,
    disableKeyboard: true,
    playButtonColor: '#3B82F6',
    playButtonSize: 64,
    brandName: 'Sua Marca',
    brandColor: '#3B82F6'
  });

  const videoId = useMemo(() => {
    return extractVideoId(settings.url);
  }, [settings.url]);

  const isValidUrl = useMemo(() => {
    return isValidYouTubeUrl(settings.url);
  }, [settings.url]);

  const playerConfig = useMemo(() => ({
    videoId: videoId || '',
    autoplay: settings.autoplay,
    controls: settings.controls,
    showInfo: settings.showInfo,
    disableKeyboard: settings.disableKeyboard,
    playButtonColor: settings.playButtonColor,
    playButtonSize: settings.playButtonSize,
    brandName: settings.brandName,
    brandColor: settings.brandColor
  }), [settings, videoId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Video className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Seu Player Personalizado
              </h1>
              <p className="text-sm text-gray-400 hidden sm:block">
                Sua marca, hospedagem YouTube
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-green-400">
              <Shield size={16} />
              <span>Totalmente Personalizado</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <Zap size={16} />
              <span>Zero Interface YouTube</span>
            </div>
          </div>
        </div>
      </header>

      {/* Promotional Banner - Top */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/30 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-center">
          <a 
            href="https://sl.minbrand.com/lado-negro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-purple-200 hover:text-purple-100 transition-colors font-medium"
          >
            🤖 Aprenda ganhar dinheiro na internet com IA
          </a>
          <span className="hidden sm:block text-purple-300">•</span>
          <a 
            href="https://minbrand.com/01" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-purple-200 hover:text-purple-100 transition-colors font-medium"
          >
            💰 Ganhe dinheiro com marketing digital
          </a>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full lg:w-80 lg:flex-shrink-0 order-2 lg:order-1">
          <div className="lg:hidden">
            <details className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
              <summary className="p-4 cursor-pointer text-lg font-semibold hover:bg-gray-700/30 transition-colors">
                Configurações do Player
              </summary>
              <div className="border-t border-gray-700/50">
                <CustomizationPanel
                  settings={settings}
                  onSettingsChange={setSettings}
                />
              </div>
            </details>
          </div>
          
          <div className="hidden lg:block h-full overflow-y-auto">
            <div className="space-y-6">
              <CustomizationPanel
                settings={settings}
                onSettingsChange={setSettings}
              />
              
              {/* Promotional Section */}
              <div className="px-4 sm:px-6">
                <PromoSection />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
              {/* Promotional Banners - Mobile */}
              <div className="lg:hidden">
                <PromoSection />
              </div>

              {/* Status Messages */}
              {!settings.url && (
                <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-yellow-300">Digite uma URL do YouTube para começar</p>
                </div>
              )}

              {settings.url && !isValidUrl && (
                <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-red-300">URL do YouTube inválida. Verifique sua URL e tente novamente.</p>
                </div>
              )}

              {/* Video Player */}
              {videoId && isValidUrl && (
                <div className="space-y-6 lg:space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Seu Player Personalizado
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Experiência de vídeo completamente white-label
                    </p>
                  </div>
                  
                  <div className="relative">
                    <YouTubePlayer config={playerConfig} />
                  </div>
                </div>
              )}

              {/* Code Generator */}
              {videoId && isValidUrl && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 sm:p-6">
                  <CodeGenerator videoId={videoId} settings={settings} />
                </div>
              )}

              {/* Bottom Promotional Section */}
              <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/30 rounded-xl p-4 sm:p-6">
                <h3 className="text-green-300 font-semibold text-lg sm:text-xl mb-3 text-center">
                  💎 Oportunidades de Renda Online
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <a 
                    href="https://sl.minbrand.com/lado-negro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-3 sm:p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="text-yellow-400" size={20} />
                      <span className="text-purple-200 font-semibold text-sm sm:text-base">IA & Renda</span>
                    </div>
                    <p className="text-purple-100 text-xs sm:text-sm">
                      Aprenda ganhar dinheiro na internet com inteligência artificial
                    </p>
                  </a>
                  
                  <a 
                    href="https://minbrand.com/01" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-3 sm:p-4 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Play className="text-green-400" size={20} />
                      <span className="text-green-200 font-semibold text-sm sm:text-base">Marketing Digital</span>
                    </div>
                    <p className="text-green-100 text-xs sm:text-sm">
                      Ganhe dinheiro com marketing digital
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
