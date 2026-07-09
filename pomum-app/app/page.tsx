"use client";

import { useEffect, useRef } from "react";
import { pageMarkup } from "./markup";

export default function Page() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Scroll-reveal animation for elements tagged with .reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    root.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Mobile burger menu toggle
    const burger = root.querySelector<HTMLElement>(".burger");
    const navLinks = root.querySelector<HTMLElement>(".nav-links");
    const onBurgerClick = () => {
      if (!navLinks) return;
      const open = navLinks.style.display === "flex";
      navLinks.style.display = open ? "none" : "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "64px";
      navLinks.style.left = "0";
      navLinks.style.right = "0";
      navLinks.style.background = "#FBF3E6";
      navLinks.style.padding = "20px 32px";
      navLinks.style.gap = "18px";
      navLinks.style.borderBottom = "1px solid rgba(39,27,18,0.12)";
    };
    burger?.addEventListener("click", onBurgerClick);

    return () => {
      io.disconnect();
      burger?.removeEventListener("click", onBurgerClick);
    };
  }, []);

  return (
    <div ref={rootRef} dangerouslySetInnerHTML={{ __html: pageMarkup }} />
  );
}
