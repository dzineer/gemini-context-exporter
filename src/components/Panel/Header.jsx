import React from 'react';
import { useApp } from '../../context/AppContext';
import HexIcon from '../icons/HexIcon';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

export default function Header({ headerRef, onMouseDown, onToggleTheme, onCollapse, onClose }) {
  const { state } = useApp();
  const isDark = state.theme === 'dark';

  return (
    <div
      ref={headerRef}
      onMouseDown={onMouseDown}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        cursor: 'grab',
        userSelect: 'none',
        background: 'var(--bg-secondary)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          color: 'var(--accent-primary)',
          filter: isDark ? 'drop-shadow(0 0 6px var(--accent-primary))' : 'none',
        }}>
          <HexIcon />
        </span>
        <span style={{
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'var(--text-primary)',
          textShadow: isDark ? '0 0 10px rgba(0, 255, 255, 0.25)' : 'none',
        }}>
          EXPORTER
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <HeaderButton onClick={onToggleTheme} title="Toggle theme">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </HeaderButton>
        <HeaderButton onClick={onCollapse} title="Collapse">
          ⌃
        </HeaderButton>
        <HeaderButton onClick={onClose} title="Close" style={{ fontWeight: 'bold' }}>
          ×
        </HeaderButton>
      </div>
    </div>
  );
}

function HeaderButton({ children, onClick, title, style = {} }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg-hover)' : 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        transition: 'all 0.2s',
        lineHeight: 1,
        color: hovered ? 'var(--accent-primary)' : 'var(--text-primary)',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
