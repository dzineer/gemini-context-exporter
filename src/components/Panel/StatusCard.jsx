import React from 'react';
import { useApp } from '../../context/AppContext';

export default function StatusCard() {
  const { state } = useApp();
  const scanning = state.status === 'scanning';
  const hasSegments = state.segments.length > 0;
  const isDark = state.theme === 'dark';

  const statusText = scanning
    ? `SCANNING · ${state.segments.length}`
    : state.status === 'paused'
    ? `PAUSED · ${state.segments.length}`
    : 'STANDBY';

  const dotColor = scanning ? 'var(--accent-success)' : '#F59E0B';
  const dotGlow = scanning ? '0 0 8px var(--accent-success)' : '0 0 6px #F59E0B';
  const pct = Math.min((state.segments.length / 50) * 100, 100);

  return (
    <div style={{
      borderRadius: '10px',
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      border: '1px solid',
      borderColor: scanning ? 'var(--accent-success)' : 'var(--border-subtle)',
      background: 'var(--bg-card)',
      boxShadow: scanning && isDark ? '0 0 12px rgba(34, 197, 94, 0.19)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Status row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: dotColor,
          boxShadow: dotGlow,
          flexShrink: 0,
          transition: 'all 0.3s',
        }} />
        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: scanning ? 'var(--accent-success)' : 'var(--text-accent)',
        }}>
          {statusText}
        </span>
      </div>
      {/* Segment row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.5px',
          color: 'var(--text-primary)',
        }}>
          {state.segments.length} segments
        </span>
        <span style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          padding: '2px 8px',
          borderRadius: '4px',
          border: '1px solid',
          textTransform: 'uppercase',
          color: scanning ? 'var(--accent-success)' : 'var(--text-primary)',
          borderColor: scanning ? 'rgba(34, 197, 94, 0.38)' : 'rgba(71, 85, 105, 0.25)',
          background: scanning ? 'rgba(34, 197, 94, 0.08)' : 'transparent',
        }}>
          {scanning ? 'LIVE' : 'IDLE'}
        </span>
      </div>
      {/* Progress bar */}
      <div style={{
        width: '100%',
        height: '3px',
        borderRadius: '2px',
        overflow: 'hidden',
        background: 'var(--border-subtle)',
      }}>
        <div style={{
          width: pct + '%',
          height: '100%',
          borderRadius: '2px',
          background: 'var(--accent-primary)',
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
}
