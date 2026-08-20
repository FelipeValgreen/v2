"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionController() {
  const pathname = usePathname();
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    nodes.forEach((node) => node.classList.remove("is-visible"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
