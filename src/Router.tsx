import React from 'react';
import App from './App';
import { PlayerPage } from './components/PlayerPage';

export const Router: React.FC = () => {
  const path = window.location.pathname;
  
  if (path === '/player') {
    return <PlayerPage />;
  }
  
  return <App />;
};