import React from 'react';

const OctopusIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5 0.5 3 1.5 4.5L6 14c-1 0.5-2 1.5-2 3s1 2.5 2.5 2.5S9 18.5 9 17s-0.5-2-1.5-2.5l1-1.5c0.5 0.5 1 1 1.5 1.5l-1 2c-0.5 1-0.5 2 0.5 2.5s2 0 2.5-1l1-2c0.5 0 1 0 1.5 0l1 2c0.5 1 1.5 1.5 2.5 1s1-1.5 0.5-2.5l-1-2c0.5-0.5 1-1 1.5-1.5l1 1.5c-1 0.5-1.5 1-1.5 2.5s1 2.5 2.5 2.5S20 18.5 20 17s-1-2.5-2-3l-1.5-1.5c1-1.5 1.5-3 1.5-4.5C18 4.5 15.5 2 12 2zm0 4c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/>
  </svg>
);

export default OctopusIcon;
