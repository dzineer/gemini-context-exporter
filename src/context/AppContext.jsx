import React, { createContext, useContext, useReducer, useRef } from 'react';
import { reducer, initialState } from './reducer';

const AppContext = createContext(null);

export function AppProvider({ children, shadowRoot }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const monitorRef = useRef(null);
  const shadowRootRef = useRef(shadowRoot);

  const value = {
    state,
    dispatch,
    monitorRef,
    shadowRoot: shadowRootRef.current,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
