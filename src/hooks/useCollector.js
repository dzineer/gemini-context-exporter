import { useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { patternProcessor } from '../utils/patternProcessor';
import { SELECTORS } from '../utils/selectors';

const MAX_SEGMENTS = 500;

export function useCollector() {
  const { state, dispatch, monitorRef } = useApp();
  const signaturesRef = useRef(new Set());
  const segmentCountRef = useRef(0);

  // Keep segment count in sync for closure
  useEffect(() => {
    segmentCountRef.current = state.segments.length;
  }, [state.segments.length]);

  const collect = useCallback(() => {
    if (segmentCountRef.current >= MAX_SEGMENTS) return;

    const newSegments = [];
    document.querySelectorAll(SELECTORS.messageTargets).forEach(el => {
      if (segmentCountRef.current + newSegments.length >= MAX_SEGMENTS) return;
      const sig = el.innerText.trim().substring(0, 500);
      if (sig && !signaturesRef.current.has(sig)) {
        signaturesRef.current.add(sig);
        const role = (el.classList.contains('query-text') || el.tagName === 'USER-QUERY')
          ? 'USER' : 'GEMINI';
        const markdown = patternProcessor(el);
        newSegments.push({ role, markdown });
      }
    });

    if (newSegments.length > 0) {
      dispatch({ type: 'ADD_SEGMENTS', payload: newSegments });
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.status === 'scanning') {
      monitorRef.current = setInterval(collect, 600);
      return () => {
        clearInterval(monitorRef.current);
        monitorRef.current = null;
      };
    }
  }, [state.status, collect, monitorRef]);
}
