"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

/**
 * Lenis keeps its own target scroll position, separate from the window's.
 * When Next.js swaps the page it resets the window to the top, but Lenis then
 * keeps easing toward the old position from the previous (longer) page — which
 * on a shorter page like /coffin-boxes clamps to the bottom and dumps the
 * reader on the footer. So on every route change, snap Lenis to the top too.
 * Links with a hash (/#services) are left alone; Lenis handles those anchors.
 */
function ResetScrollOnRouteChange() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis || window.location.hash) return;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
}

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
    >
      <ResetScrollOnRouteChange />
    </ReactLenis>
  );
}
