// components/NavigationWrapper.tsx
"use client"
import { usePathname } from 'next/navigation';
import { Navebar } from './Navebar';
import { useEffect, useState } from 'react';

export default function NavigationWrapper() {
  const pathname = usePathname();
  const [forceRebuild, setForceRebuild] = useState(0);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // لو الصفحة راجعة من الكاش (زرار الباك)، اجبر المكون يعيد بناء نفسه
        setForceRebuild(prev => prev + 1);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return <Navebar key={`${pathname}-${forceRebuild}`} />;
}