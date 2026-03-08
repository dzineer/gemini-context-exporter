import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import PinIcon from '../icons/PinIcon';

export default function PinButton() {
  const { state, dispatch } = useApp();
  const [hovered, setHovered] = useState(false);

  const handlePin = () => {
    chrome.storage.local.set({ sidebarPinned: true });
    dispatch({ type: 'SET_UI_MODE', payload: 'sidebar' });
  };

  return (
    <button
      onClick={handlePin}
      title="Pin to Sidebar"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '8px 0',
        border: '1px dashed',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        background: 'none',
        transition: 'all 0.2s ease',
        width: '100%',
        borderColor: hovered ? 'var(--accent-primary)' : 'rgba(71, 85, 105, 0.38)',
        color: hovered ? 'var(--accent-primary)' : 'var(--text-secondary)',
      }}
    >
      <PinIcon />
      <span>Pin to Sidebar</span>
    </button>
  );
}
