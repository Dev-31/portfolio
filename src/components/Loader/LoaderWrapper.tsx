'use client';

import { useState } from 'react';
import SiteLoader from './SiteLoader';

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <SiteLoader onLoadComplete={() => setLoadingComplete(true)} />
      <div style={{ display: loadingComplete ? 'block' : 'none' }}>
        {children}
      </div>
    </>
  );
}