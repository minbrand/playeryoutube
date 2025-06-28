import React from 'react';
import { Settings, Palette, Play, Code, Sparkles } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { Toggle } from './Toggle';
import { RangeSlider } from './RangeSlider';
import { PlayerSettings } from '../types/youtube';

interface CustomizationPanelProps {
  settings: PlayerSettings;
  onSettingsChange: (settings: PlayerSettings) => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  settings,
  onSettingsChange
}) => {
  const handleUrlChange = (url: string) => {
    onSettingsChange({ ...settings, url });
  };

  const handleSettingChange = (key: keyof PlayerSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 p-4 sm:p-6 space-y-6 sm:space-y-8 overflow-y-auto h-full">
      <div className="flex items-center space-x-3">
        <Settings className="text-blue-400" size={24} />
        <h2 className="text-xl font-bold text-white">Configurações do Player</h2>
      </div>

      {/* URL Input */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          URL do YouTube
        </label>
        <input
          type="text"
          value={settings.url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
        />
      </div>

      {/* Brand Settings */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-purple-400" size={20} />
          <h3 className="text-lg font-semibold text-white">Marca</h3>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Nome da Marca
          </label>
          <input
            type="text"
            value={settings.brandName}
            onChange={(e) => handleSettingChange('brandName', e.target.value)}
            placeholder="Sua Marca"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
          />
        </div>
        
        <ColorPicker
          label="Cor da Marca"
          value={settings.brandColor}
          onChange={(color) => handleSettingChange('brandColor', color)}
        />
      </div>

      {/* Playback Controls */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Play className="text-green-400" size={20} />
          <h3 className="text-lg font-semibold text-white">Reprodução</h3>
        </div>
        
        <Toggle
          label="Reprodução Automática"
          checked={settings.autoplay}
          onChange={(checked) => handleSettingChange('autoplay', checked)}
          description="Vídeo inicia automaticamente (sem som)"
        />
        
        <Toggle
          label="Mostrar Controles Personalizados"
          checked={settings.controls}
          onChange={(checked) => handleSettingChange('controls', checked)}
          description="Exibir controles personalizados do player"
        />
      </div>

      {/* Appearance */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Palette className="text-purple-400" size={20} />
          <h3 className="text-lg font-semibold text-white">Botão Play</h3>
        </div>
        
        <ColorPicker
          label="Cor do Botão Play"
          value={settings.playButtonColor}
          onChange={(color) => handleSettingChange('playButtonColor', color)}
        />
        
        <RangeSlider
          label="Tamanho do Botão Play"
          value={settings.playButtonSize}
          onChange={(size) => handleSettingChange('playButtonSize', size)}
          min={32}
          max={128}
          step={4}
          unit="px"
        />
      </div>

      {/* White-Label Info */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/30 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-300 mb-2">Benefícios White-Label</h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• Sem marca do YouTube visível</li>
          <li>• Overlay da sua marca</li>
          <li>• Embeds com domínio personalizado</li>
          <li>• Aparência profissional</li>
        </ul>
      </div>
    </div>
  );
};