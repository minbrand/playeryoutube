import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <p className="text-gray-400 text-sm">
              Solução profissional de hospedagem de vídeo white-label
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Transforme vídeos do YouTube em sua experiência personalizada
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Desenvolvido por</span>
            <a
              href="https://minbrand.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              <span>MinBrand</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700/30">
          <p className="text-center text-xs text-gray-500">
            © 2025 Player de Vídeo White-Label. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
