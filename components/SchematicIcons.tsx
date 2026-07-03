export function SchematicStack({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="8" y="6" width="32" height="10" rx="1" stroke="currentColor" strokeWidth="0.75" />
      <rect x="8" y="19" width="32" height="10" rx="1" stroke="currentColor" strokeWidth="0.75" />
      <rect x="8" y="32" width="32" height="10" rx="1" stroke="currentColor" strokeWidth="0.75" />
      <line x1="24" y1="16" x2="24" y2="19" stroke="currentColor" strokeWidth="0.5" />
      <line x1="24" y1="29" x2="24" y2="32" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="24" cy="10" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="24" cy="37" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SchematicFlow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="4" y="14" width="14" height="20" rx="1" stroke="currentColor" strokeWidth="0.75" />
      <rect x="30" y="14" width="14" height="20" rx="1" stroke="currentColor" strokeWidth="0.75" />
      <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="0.5" />
      <polygon points="28,20 28,28 32,24" fill="currentColor" opacity="0.5" />
      <circle cx="24" cy="24" r="1" fill="currentColor" />
      <circle cx="11" cy="24" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="37" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SchematicZap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M 26 6 L 14 24 L 22 24 L 18 42 L 34 22 L 26 22 Z" stroke="currentColor" strokeWidth="0.75" fill="none" strokeLinejoin="round" />
      <circle cx="26" cy="16" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="22" cy="30" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function SchematicBox({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="14" width="32" height="24" rx="1" stroke="currentColor" strokeWidth="0.75" />
      <line x1="8" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="16" y1="14" x2="16" y2="38" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <line x1="32" y1="14" x2="32" y2="38" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <circle cx="14" cy="18" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="20" cy="18" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="26" cy="18" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="14" cy="28" r="0.75" fill="currentColor" opacity="0.15" />
      <circle cx="20" cy="28" r="0.75" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

export function SchematicGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="0.75" />
      <ellipse cx="24" cy="24" rx="14" ry="5" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <line x1="10" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <path d="M 14 14 A 14 14 0 0 0 14 34" stroke="currentColor" strokeWidth="0.3" opacity="0.15" fill="none" />
      <path d="M 34 14 A 14 14 0 0 1 34 34" stroke="currentColor" strokeWidth="0.3" opacity="0.15" fill="none" />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="24" cy="18" r="0.75" fill="currentColor" opacity="0.15" />
      <circle cx="24" cy="30" r="0.75" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

export function SchematicNodes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="16" r="5" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="36" cy="16" r="5" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="24" cy="36" r="5" stroke="currentColor" strokeWidth="0.75" />
      <line x1="17" y1="16" x2="31" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="17" y1="20" x2="20" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="31" y1="20" x2="28" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      <circle cx="36" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="24" cy="36" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function SchematicPipeline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="10" cy="16" r="4" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="24" cy="16" r="4" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="38" cy="16" r="4" stroke="currentColor" strokeWidth="0.75" />
      <line x1="14" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="0.5" />
      <line x1="28" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="0.5" />
      <line x1="14" y1="20" x2="18" y2="30" stroke="currentColor" strokeWidth="0.5" />
      <line x1="34" y1="20" x2="30" y2="30" stroke="currentColor" strokeWidth="0.5" />
      <rect x="16" y="30" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="10" cy="16" r="1" fill="currentColor" />
      <circle cx="24" cy="16" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="38" cy="16" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
