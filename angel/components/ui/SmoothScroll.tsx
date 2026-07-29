"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const updatePreference = () => setEnabled(!mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  if (!enabled) return null;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.085,
        wheelMultiplier: 0.9,
        anchors: {
          offset: -96,
          lerp: 0.075,
        },
      }}
    />
  );
}
