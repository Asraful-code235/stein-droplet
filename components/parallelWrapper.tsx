// components/ParallaxWrapper.tsx
'use client';

import { ParallaxProvider } from 'react-scroll-parallax';
import { ReactNode } from 'react';

export default function ParallaxWrapper({ children }: { children: any }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}