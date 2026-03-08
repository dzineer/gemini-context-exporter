import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';

import tokensCSS from './styles/tokens.css?inline';
import animationsCSS from './styles/animations.css?inline';
import resetCSS from './styles/reset.css?inline';

function mount() {
  const host = document.createElement('div');
  host.id = 'gemini-exporter-root';
  host.style.cssText = 'all:initial; position:fixed; z-index:2147483647; top:0; left:0; width:0; height:0;';
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = [resetCSS, tokensCSS, animationsCSS].join('\n');
  shadow.appendChild(style);

  const reactRoot = document.createElement('div');
  reactRoot.id = 'gemini-exporter-app';
  shadow.appendChild(reactRoot);

  const root = createRoot(reactRoot);
  root.render(
    <AppProvider shadowRoot={shadow}>
      <App />
    </AppProvider>
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
