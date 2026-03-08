export default function StopIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
