"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "/#skills", label: t("Competences", "Skills") },
    { href: "/#work", label: t("Projets", "Work") },
    { href: "/#skills", label: t("Technologies", "Technologies") },
    { href: "/#contact", label: t("Contact", "Contact") },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#080810]/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/20"
            : "py-4 sm:py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 magnetic-hover group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <span className="text-black font-bold text-sm">{lang === "fr" ? "P" : "P"}</span>
            </div>
            <span className="text-white font-bold hidden sm:block group-hover:text-accent transition-colors duration-300">Portfolio</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {links.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="relative px-4 py-2 text-sm text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-300 group magnetic-hover"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full group-hover:w-6 transition-all duration-300" />
              </Link>
            ))}

            <div className="w-px h-6 bg-white/10 mx-2" />

            <button
              onClick={toggle}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-accent/30 transition-all duration-300 flex items-center gap-1.5 magnetic-hover group"
            >
              <span className="text-base group-hover:scale-110 transition-transform duration-300">{lang === "fr" ? "🇫🇷" : "🇬🇧"}</span>
              <span className="uppercase font-medium text-xs">{lang}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 hover:border-accent/30 transition-all duration-300 magnetic-hover"
            >
              {lang === "fr" ? "🇫🇷" : "🇬🇧"}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-accent/30 transition-all duration-300 magnetic-hover"
              aria-label="Menu"
            >
              <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute top-0 right-0 w-72 sm:w-80 h-full bg-[#0c0c14]/95 backdrop-blur-2xl border-l border-white/5 p-6 pt-24 animate-slide-in-right">
            <div className="flex flex-col gap-2">
              {links.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-xl hover:bg-white/5 text-lg magnetic-hover group"
                  style={{ animation: `slide-in-right 0.3s ease-out forwards`, animationDelay: `${i * 50}ms`, opacity: 0 }}
                >
                  <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
