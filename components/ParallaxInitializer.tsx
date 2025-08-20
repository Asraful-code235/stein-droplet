"use client";
import React, { ReactNode } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

function ParallaxInitializer({ children }: { children: any }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}

export default ParallaxInitializer;
