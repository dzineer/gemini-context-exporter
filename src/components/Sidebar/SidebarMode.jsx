import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { doExport } from '../../utils/exporter';
import { cloneSidebarButton } from './cloneSidebarButton';
import { SIDEBAR_ICONS } from './sidebarIcons';
import { SELECTORS } from '../../utils/selectors';

export default function SidebarMode() {
  const { state, dispatch } = useApp();
  const analyzeRef = useRef(null);
  const exportRef = useRef(null);
  const counterRef = useRef(null);
  const fabRef = useRef(null);
  const styleRef = useRef(null);
  const mounted = useRef(false);
  const segmentsRef = useRef(state.segments);

  useEffect(() => { segmentsRef.current = state.segments; }, [state.segments]);

  // Inject animation CSS into host page head (for sidebar elements)
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gce-sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes gce-pulse-red { 0% { opacity: 1; stroke: #ff3b3b; } 50% { opacity: 0.3; stroke: #ff6b6b; } 100% { opacity: 1; stroke: #ff3b3b; } }
      .gce-sweep-arm { transform-origin: 12px 12px; stroke: currentColor; }
      .gce-scanning .gce-sweep-arm { stroke: #ff3b3b; animation: gce-sweep 1.5s linear infinite, gce-pulse-red 0.8s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => { if (styleRef.current) styleRef.current.remove(); };
  }, []);

  // Mount: inject buttons into Gemini's sidebar
  useEffect(() => {
    if (mounted.current) return;

    let retries = 0;
    let timer = null;

    const tryInject = () => {
      const originalList = document.querySelector(SELECTORS.sidebarList);
      if (originalList) {
        mounted.current = true;
        injectButtons(originalList);
      } else if (retries++ < 20) {
        timer = setTimeout(tryInject, 500);
      } else {
        // Sidebar not found, fall back to panel
        dispatch({ type: 'SET_UI_MODE', payload: 'panel' });
      }
    };

    const injectButtons = (originalList) => {
      // Clean up any stale injected elements first (prevents duplicates)
      document.querySelectorAll('.gemini-exporter-injected').forEach(el => el.remove());
      document.querySelectorAll('.gemini-exporter-eject-fab').forEach(el => el.remove());

      // Analyze button
      const analyzeList = cloneSidebarButton(
        originalList, SIDEBAR_ICONS.analyzeLg, 'Analyze conversation',
        () => dispatch({ type: 'TOGGLE_ANALYZE' })
      );
      analyzeRef.current = analyzeList;

      // Export button
      const exportList = cloneSidebarButton(
        originalList, SIDEBAR_ICONS.exportLg, 'Export conversation',
        () => doExport(segmentsRef.current)
      );
      exportRef.current = exportList;
      exportList.style.display = 'none';

      // Counter
      const wrap = document.createElement('div');
      wrap.classList.add('gemini-exporter-injected');
      wrap.style.cssText = 'display:none;align-items:center;justify-content:center;padding:8px 0;';
      const counter = document.createElement('span');
      counter.style.cssText = "font-family:'SF Mono','Fira Code',monospace;font-size:11px;font-weight:700;color:#00FFFF;letter-spacing:1px;text-align:center;";
      counter.textContent = '0';
      wrap.appendChild(counter);
      counterRef.current = counter;

      originalList.after(analyzeList, exportList, wrap);

      // Eject FAB
      const fab = document.createElement('button');
      fab.classList.add('gemini-exporter-eject-fab');
      fab.innerHTML = SIDEBAR_ICONS.eject;
      fab.title = 'Unpin from sidebar';
      fab.style.cssText = `
        position:fixed;top:80px;right:20px;z-index:9999;
        width:36px;height:36px;display:flex;align-items:center;justify-content:center;
        background:#020617;border:1px solid #1E293B;border-radius:50%;cursor:pointer;
        color:#00FFFF;box-shadow:0 4px 16px rgba(0,10,30,0.5);transition:all 0.2s ease;
      `;
      fab.onmouseover = () => { fab.style.borderColor = '#00FFFF'; fab.style.boxShadow = '0 0 12px rgba(0,255,255,0.3)'; };
      fab.onmouseout  = () => { fab.style.borderColor = '#1E293B'; fab.style.boxShadow = '0 4px 16px rgba(0,10,30,0.5)'; };
      fab.onclick = () => {
        chrome.storage.local.set({ sidebarPinned: false });
        dispatch({ type: 'SET_UI_MODE', payload: 'panel' });
      };
      document.body.appendChild(fab);
      fabRef.current = fab;
    };

    tryInject();

    return () => {
      if (timer) clearTimeout(timer);
      // Cleanup injected elements
      document.querySelectorAll('.gemini-exporter-injected').forEach(el => el.remove());
      document.querySelectorAll('.gemini-exporter-eject-fab').forEach(el => el.remove());
      mounted.current = false;
    };
  }, [dispatch]);

  // Sync React state to imperative DOM elements
  useEffect(() => {
    const scanning = state.status === 'scanning';
    const hasSegments = state.segments.length > 0;

    if (analyzeRef.current) {
      if (scanning) analyzeRef.current.classList.add('gce-scanning');
      else analyzeRef.current.classList.remove('gce-scanning');
    }
    if (exportRef.current) {
      exportRef.current.style.display = hasSegments ? '' : 'none';
    }
    if (counterRef.current) {
      counterRef.current.textContent = state.segments.length;
      counterRef.current.parentElement.style.display = hasSegments ? 'flex' : 'none';
    }
  }, [state.status, state.segments.length]);

  return null;
}
