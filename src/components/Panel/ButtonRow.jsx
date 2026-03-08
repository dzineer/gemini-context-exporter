import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { doExport } from '../../utils/exporter';
import AnalyzeIcon from '../icons/AnalyzeIcon';
import StopIcon from '../icons/StopIcon';
import ExportIcon from '../icons/ExportIcon';

export default function ButtonRow() {
  const { state, dispatch } = useApp();
  const scanning = state.status === 'scanning';
  const hasSegments = state.segments.length > 0;
  const isDark = state.theme === 'dark';
  const [flash, setFlash] = useState(null);

  const handleAnalyze = () => dispatch({ type: 'TOGGLE_ANALYZE' });
  const handleExport = () => {
    doExport(state.segments);
    setFlash('EXPORTED');
    setTimeout(() => setFlash(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Analyze / Stop button */}
      <ActionButton
        onClick={handleAnalyze}
        style={{
          background: scanning ? 'var(--accent-success)' : 'var(--btn-primary)',
          color: 'var(--btn-primary-text)',
          boxShadow: isDark
            ? `0 0 15px ${scanning ? 'rgba(34,197,94,0.19)' : 'rgba(0,255,255,0.19)'}`
            : 'none',
        }}
        className={scanning ? 'gce-scanning' : ''}
      >
        {scanning ? (
          <>
            <span style={{ color: '#FF3B3B' }}><StopIcon /></span>
            <span style={{ flex: 1, textAlign: 'left', color: '#F8FAFC' }}>Stop</span>
          </>
        ) : (
          <>
            <AnalyzeIcon />
            <span style={{ flex: 1, textAlign: 'left' }}>Analyze</span>
          </>
        )}
      </ActionButton>

      {/* Export button */}
      <ActionButton
        onClick={handleExport}
        disabled={!hasSegments}
        style={{
          background: 'transparent',
          border: `1px solid ${hasSegments ? 'var(--btn-outline)' : 'rgba(0,255,255,0.25)'}`,
          color: hasSegments ? 'var(--accent-primary)' : 'var(--text-muted)',
          opacity: hasSegments ? 1 : 0.4,
          cursor: hasSegments ? 'pointer' : 'not-allowed',
          pointerEvents: hasSegments ? 'auto' : 'none',
        }}
      >
        <ExportIcon />
        <span style={{ flex: 1, textAlign: 'left' }}>{flash || 'Export'}</span>
      </ActionButton>
    </div>
  );
}

function ActionButton({ children, onClick, disabled, style = {}, className = '' }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        width: '100%',
        height: '42px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '0 14px',
        fontFamily: 'inherit',
        fontSize: '12px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: 'all 0.2s ease',
        filter: hovered && !disabled ? 'brightness(1.15)' : 'brightness(1)',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
