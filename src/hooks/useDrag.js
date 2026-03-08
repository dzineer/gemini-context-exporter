import { useRef, useEffect, useCallback } from 'react';

export function useDrag(panelRef, headerRef) {
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    dragging.current = true;
    const rect = panelRef.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    headerRef.current.style.cursor = 'grabbing';
    panelRef.current.style.transition = 'none';
    e.preventDefault();
  }, [panelRef, headerRef]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      panelRef.current.style.left = (e.clientX - offset.current.x) + 'px';
      panelRef.current.style.top = (e.clientY - offset.current.y) + 'px';
      panelRef.current.style.right = 'auto';
    };
    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      if (headerRef.current) headerRef.current.style.cursor = 'grab';
      if (panelRef.current) panelRef.current.style.transition = 'all 0.3s ease';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [panelRef, headerRef]);

  return { onMouseDown };
}
