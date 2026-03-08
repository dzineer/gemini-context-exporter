import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export function useChromeStorage() {
  const { dispatch } = useApp();

  useEffect(() => {
    chrome.storage.local.get(['sidebarPinned', 'theme'], (result) => {
      if (result.theme) {
        dispatch({ type: 'SET_THEME', payload: result.theme });
      }
      if (result.sidebarPinned) {
        dispatch({ type: 'SET_UI_MODE', payload: 'sidebar' });
      }
    });
  }, [dispatch]);
}
