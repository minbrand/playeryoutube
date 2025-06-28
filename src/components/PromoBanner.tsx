import React from 'react';
import { ExternalLink, Zap, TrendingUp } from 'lucide-react';

interface PromoBannerProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  gradient: string;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ title, description, link, icon, gradient }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-3 sm:p-4 rounded-xl border border-opacity-30 hover:border-opacity-50 transition-all duration-300 hover:scale-105 hover:shadow-xl ${gradient}`}
    >
      <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
        <div className="flex-shrink-0 p-1.5 sm:p-2 bg-white/10 rounded-lg backdrop-blur-sm">
          {React.cloneElement(icon as React.ReactElement, { 
            size: window.innerWidth < 640 ? 16 : 20 
          })}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base leading-tight">
            {title}
          </h3>
          <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1 leading-tight">
            {description}
          </p>
        </div>
        <ExternalLink className="text-white/60 flex-shrink-0" size={14} />
      </div>
    </a>
  );
};

export const PromoSection: React.FC = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
          🚀 Oportunidades Exclusivas
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm">
          Descubra como monetizar na internet
        </p>
      </div>
      
      <div className="grid gap-3 sm:gap-4">
        <PromoBanner
          title="Aprenda ganhar dinheiro na internet com inteligência artificial"
          description="Descubra os segredos para monetizar com IA"
          link="https://sl.minbrand.com/lado-negro"
          icon={<Zap className="text-yellow-400" />}
          gradient="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500"
        />
        
        <PromoBanner
          title="Ganhe dinheiro com marketing digital"
          description="Estratégias comprovadas para lucrar online"
          link="https://minbrand.com/01"
          icon={<TrendingUp className="text-green-400" />}
          gradient="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500"
        />
      </div>
      
      {/* Additional promotional banners for better visibility */}
      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl">
        <h3 className="text-blue-300 font-semibold text-sm sm:text-base mb-2">💰 Transforme Conhecimento em Renda</h3>
        <div className="space-y-2">
          <a 
            href="https://sl.minbrand.com/lado-negro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-xs sm:text-sm text-blue-200 hover:text-blue-100 transition-colors"
          >
            → Aprenda ganhar dinheiro na internet com IA
          </a>
          <a 
            href="https://minbrand.com/01" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-xs sm:text-sm text-blue-200 hover:text-blue-100 transition-colors"
          >
            → Ganhe dinheiro com marketing digital
          </a>
        </div>
      </div>
    </div>
  );
};
