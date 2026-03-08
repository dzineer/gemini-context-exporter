import React from 'react';
import { useApp } from '../../context/AppContext';

export default function GlowBar({ visible = true }) {
  const { state } = useApp();
  const scanning = state.status === 'scanning';
  const isDark = state.theme === 'dark';

  if (!visible) return null;

  return (
    <div style={{
      height: '3px',
      borderRadius: '0 0 14px 14px',
      backgroundImage: 'var(--glow-bar)',
      backgroundSize: '200% 100%',
      animation: scanning ? 'gce-wave 2s linear infinite' : 'none',
      boxShadow: isDark ? '0 0 8px rgba(0, 255, 255, 0.25)' : 'none',
    }} />
  );
}
