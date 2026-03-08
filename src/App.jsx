import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { useCollector } from './hooks/useCollector';
import { useChromeStorage } from './hooks/useChromeStorage';
import Panel from './components/Panel/Panel';
import SidebarMode from './components/Sidebar/SidebarMode';

export default function App() {
  const { state } = useApp();
  useChromeStorage();
  useCollector();

  // Persist theme changes
  useEffect(() => {
    chrome.storage.local.set({ theme: state.theme });
  }, [state.theme]);

  return (
    <div className="gce-app" data-theme={state.theme}>
      {state.uiMode === 'panel' && state.panelVisible && <Panel />}
      {state.uiMode === 'sidebar' && <SidebarMode />}
    </div>
  );
}
