import React, { useState } from 'react';
import { Copy, Code, Check, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { generateEmbedCode, generatePlayerUrl } from '../utils/youtube';

interface CodeGeneratorProps {
  videoId: string;
  settings: any;
}

export const CodeGenerator: React.FC<CodeGeneratorProps> = ({ videoId, settings }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 560, height: 315 });
  const [embedType, setEmbedType] = useState<'iframe' | 'url'>('iframe');

  const playerUrl = generatePlayerUrl(videoId, settings);
  const embedCode = generateEmbedCode(playerUrl, dimensions.width, dimensions.height);

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
            <Code className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Embed White-Label</h3>
            <p className="text-sm text-gray-400">Solução profissional de hospedagem de vídeo</p>
          </div>
        </div>
        <a
          href={playerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white text-sm font-medium"
        >
          <Globe size={16} />
          <span>Visualizar Player</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Embed Type Selector */}
      <div className="flex space-x-2 bg-gray-700/50 rounded-xl p-1.5">
        <button
          onClick={() => setEmbedType('iframe')}
          className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
            embedType === 'iframe'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
          }`}
        >
          <Code size={16} />
          <span>Código Embed</span>
        </button>
        <button
          onClick={() => setEmbedType('url')}
          className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
            embedType === 'url'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
          }`}
        >
          <Globe size={16} />
          <span>URL Direta</span>
        </button>
      </div>

      {embedType === 'iframe' && (
        <>
          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Largura (px)
              </label>
              <input
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                min="200"
                max="1920"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Altura (px)
              </label>
              <input
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                min="150"
                max="1080"
              />
            </div>
          </div>

          {/* Quick Size Presets */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setDimensions({ width: 560, height: 315 })}
              className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-md text-xs text-gray-300 transition-colors"
            >
              560×315 (16:9)
            </button>
            <button
              onClick={() => setDimensions({ width: 640, height: 360 })}
              className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-md text-xs text-gray-300 transition-colors"
            >
              640×360 (16:9)
            </button>
            <button
              onClick={() => setDimensions({ width: 854, height: 480 })}
              className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-md text-xs text-gray-300 transition-colors"
            >
              854×480 (16:9)
            </button>
            <button
              onClick={() => setDimensions({ width: 1280, height: 720 })}
              className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-md text-xs text-gray-300 transition-colors"
            >
              1280×720 (HD)
            </button>
          </div>

          {/* Embed Code Display */}
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400 font-medium">Código Embed Profissional</span>
              <button
                onClick={() => handleCopy(embedCode, 'embed')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors text-sm font-medium"
              >
                {copied === 'embed' ? (
                  <>
                    <Check className="text-green-400" size={16} />
                    <span className="text-green-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="text-gray-400" size={16} />
                    <span className="text-gray-300">Copiar Código</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
              <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                <code>{embedCode}</code>
              </pre>
            </div>
          </div>
        </>
      )}

      {embedType === 'url' && (
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400 font-medium">URL Direta do Player</span>
            <button
              onClick={() => handleCopy(playerUrl, 'url')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors text-sm font-medium"
            >
              {copied === 'url' ? (
                <>
                  <Check className="text-green-400" size={16} />
                  <span className="text-green-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="text-gray-400" size={16} />
                  <span className="text-gray-300">Copiar URL</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
            <code className="text-sm text-blue-400 break-all font-mono">{playerUrl}</code>
          </div>
        </div>
      )}

      {/* Enhanced Features List */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="text-blue-400" size={20} />
          <h4 className="text-lg font-semibold text-blue-300">Recursos Profissionais</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Remoção completa da marca YouTube</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Overlay personalizado da sua marca</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Seu domínio em todas as URLs</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Controles profissionais de vídeo</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Responsivo mobile & desktop</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Recursos avançados de reprodução</span>
          </div>
        </div>
      </div>
    </div>
  );
};