"use client";

import { useState, useEffect, ReactNode } from "react";

interface ScreenTransitionProps {
  children: ReactNode;
  screenKey: string;
}

export function ScreenTransition({ children, screenKey }: ScreenTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentKey, setCurrentKey] = useState(screenKey);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    if (screenKey !== currentKey) {
      // Fade out
      setIsVisible(false);

      // After fade out, update content and fade in
      const timeout = setTimeout(() => {
        setCurrentKey(screenKey);
        setCurrentChildren(children);
        setIsVisible(true);
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      // Initial mount - fade in
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [screenKey, currentKey, children]);

  // Update children when they change (but key stays the same)
  useEffect(() => {
    if (screenKey === currentKey) {
      setCurrentChildren(children);
    }
  }, [children, screenKey, currentKey]);

  return (
    <div
      className={`h-full w-full transition-all duration-300 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {currentChildren}
    </div>
  );
}
