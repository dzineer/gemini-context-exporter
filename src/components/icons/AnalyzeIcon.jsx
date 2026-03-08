export default function AnalyzeIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6" opacity="0.4"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
      <line x1="12" y1="12" x2="12" y2="3" className="gce-sweep-arm"/>
    </svg>
  );
}
