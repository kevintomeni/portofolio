"use client";

import { useEffect, useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: string;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "animate-slide-up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.animationDelay = `${delay}ms`;
            el.classList.add(animation);
            el.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      ref.current.style.opacity = "0";
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, animation]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
