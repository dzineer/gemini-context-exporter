import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useDrag } from '../../hooks/useDrag';
import Header from './Header';
import StatusCard from './StatusCard';
import ButtonRow from './ButtonRow';
import PinButton from './PinButton';
import GlowBar from './GlowBar';

export default function Panel() {
  const { state, dispatch, monitorRef } = useApp();
  const panelRef = useRef(null);
  const headerRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const isDark = state.theme === 'dark';

  const { onMouseDown } = useDrag(panelRef, headerRef);

  const handleToggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
    chrome.storage.local.set({ theme: state.theme === 'dark' ? 'light' : 'dark' });
  };

  const handleCollapse = () => setCollapsed(c => !c);

  const handleClose = () => {
    if (monitorRef.current) {
      clearInterval(monitorRef.current);
      monitorRef.current = null;
    }
    dispatch({ type: 'CLOSE_PANEL' });
  };

  return (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        width: '270px',
        borderRadius: '14px',
        fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-panel)',
      }}
    >
      <Header
        headerRef={headerRef}
        onMouseDown={onMouseDown}
        onToggleTheme={handleToggleTheme}
        onCollapse={handleCollapse}
        onClose={handleClose}
      />

      {/* Divider */}
      <div style={{
        height: '1px',
        margin: '0 16px',
        background: 'var(--divider)',
      }} />

      {/* Body */}
      {!collapsed && (
        <div style={{
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <StatusCard />
          <ButtonRow />
          <PinButton />
        </div>
      )}

      <GlowBar visible={!collapsed} />
    </div>
  );
}
