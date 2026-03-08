export default function HexIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
      <line x1="12" y1="22" x2="12" y2="15.5"/>
      <line x1="22" y1="8.5" x2="12" y2="15.5"/>
      <line x1="2" y1="8.5" x2="12" y2="15.5"/>
    </svg>
  );
}
