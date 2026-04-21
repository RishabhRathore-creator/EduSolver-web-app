
// app/components/AnimatedSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// This component exists for one reason: to add scroll-triggered animations
// to sections of the landing page WITHOUT making the entire page a Client
// Component.
//
// The problem it solves:
// IntersectionObserver is a browser API — it doesn't exist on the server.
// If we used it directly in page.tsx (a Server Component), Next.js would
// crash during server-side rendering because the server has no browser.
//
// The solution:
// We isolate all browser-dependent code in this tiny 'use client' component.
// The landing page (page.tsx) stays a Server Component and just wraps sections
// in <AnimatedSection>. The boundary is clean — server renders the shell,
// the browser handles the animation.
//
// How IntersectionObserver works:
// It's a browser API that watches whether a DOM element is visible in the
// viewport (the visible part of the browser window). You give it a callback
// and a threshold (how much of the element must be visible to trigger).
// When the element enters the viewport past that threshold, the callback fires.
// We use that callback to add a 'visible' CSS class, which triggers the
// CSS transition defined in page.tsx's <style> block.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useEffect, useRef } from 'react';

type AnimatedSectionProps = {
  children: React.ReactNode;
  // React.ReactNode means "anything React can render" — JSX, strings,
  // arrays of elements, null, etc. This is the standard type for the
  // 'children' prop when you want to wrap arbitrary content.
};

export default function AnimatedSection({ children }: AnimatedSectionProps) {
  // useRef gives us a reference to the actual DOM element that renders.
  // Unlike useState, changing a ref does NOT trigger a re-render —
  // it's just a pointer to the real HTML element in the browser.
  // We type it as HTMLDivElement because the element we attach it to is a <div>.
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // useEffect runs after the component mounts in the browser.
    // At this point, ref.current is the real <div> in the DOM.
    // We can safely use browser APIs here.

    const element = ref.current;
    if (!element) return; // guard: if ref isn't attached yet, do nothing

    // Create the observer.
    // The callback receives an array of "entries" — one per observed element.
    // Each entry tells us whether that element is currently intersecting
    // (visible) in the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // The section is now visible! Find all .fade-up elements inside it
            // and add the 'visible' class. The CSS transition in page.tsx
            // then animates them from opacity:0 + translateY(24px)
            // to opacity:1 + translateY(0).
            element.querySelectorAll('.fade-up').forEach((el) => {
              el.classList.add('visible');
            });

            // Once visible, we stop observing — we only want to animate in
            // once, not every time the user scrolls up and down.
            observer.unobserve(element);
          }
        });
      },
      {
        // threshold: 0.1 means "trigger when at least 10% of the element
        // is visible". A lower value (like 0.05) triggers earlier,
        // a higher value (like 0.3) triggers later when more is visible.
        // 0.1 feels natural — the animation starts just as the section
        // peeks above the bottom of the screen.
        threshold: 0.1,
      }
    );

    // Tell the observer to start watching our div.
    observer.observe(element);

    // Cleanup function: returned from useEffect, runs when the component
    // unmounts (removed from the DOM). Always disconnect observers and
    // event listeners in cleanup to prevent memory leaks.
    return () => observer.disconnect();
  }, []);
  // The empty dependency array [] means this effect runs ONCE — when the
  // component first mounts. We don't need to re-run it because the observer
  // handles all future events itself.

  return (
    <div ref={ref}>
      {/* ref={ref} attaches our useRef to this DOM element.
          After mount, ref.current === this <div> in the real DOM.
          children is whatever the landing page passes in — the feature
          cards grid, the pipeline steps grid, etc. */}
      {children}
    </div>
  );
}
