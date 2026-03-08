export const initialState = {
  status: 'idle',       // 'idle' | 'scanning' | 'paused'
  segments: [],         // { role, markdown } items
  theme: 'dark',        // 'dark' | 'light'
  uiMode: 'panel',     // 'panel' | 'sidebar'
  collapsed: false,
  panelVisible: true,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'START_SCAN':
      return { ...state, status: 'scanning' };
    case 'STOP_SCAN':
      return { ...state, status: state.segments.length > 0 ? 'paused' : 'idle' };
    case 'TOGGLE_ANALYZE':
      if (state.status === 'scanning') {
        return { ...state, status: state.segments.length > 0 ? 'paused' : 'idle' };
      }
      return { ...state, status: 'scanning' };
    case 'ADD_SEGMENTS':
      return { ...state, segments: [...state.segments, ...action.payload] };
    case 'SET_UI_MODE':
      return { ...state, uiMode: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_COLLAPSED':
      return { ...state, collapsed: action.payload };
    case 'CLOSE_PANEL':
      return { ...state, panelVisible: false, status: state.segments.length > 0 ? 'paused' : 'idle' };
    default:
      return state;
  }
}
