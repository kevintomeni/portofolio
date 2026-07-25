"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getProfile } from "@/lib/profile";
import { Profile } from "@/lib/types";
import { useLang } from "@/lib/lang-context";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { t } = useLang();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      getProfile().then(setProfile).catch(console.error);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#080810]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] lg:w-[1000px] h-[400px] sm:h-[500px] lg:h-[600px] bg-accent/5 rounded-full blur-[120px] sm:blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] bg-pink-500/5 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />

      <div className="absolute top-16 sm:top-20 left-6 sm:left-10 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-accent/30 animate-float" />
      <div className="absolute top-32 sm:top-40 right-10 sm:right-20 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-purple-400/30 animate-float-delayed" />
      <div className="absolute bottom-32 sm:bottom-40 left-10 sm:left-20 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-pink-400/30 animate-float-reverse" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div
          className={`transition-all duration-[1200ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 sm:translate-y-12"
          }`}
        >
          <div
            className={`flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 transition-all duration-700 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {["📱", "🎨", "💻", "🚀"].map((icon, i) => (
              <span key={i} className="text-xl sm:text-2xl inline-block" style={{ animation: `float ${3 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}>
                {icon}
              </span>
            ))}
          </div>

          <h1
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-4 sm:mb-6 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 sm:translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <span className="text-white">{profile?.name?.split(" ")[0] || "John"}</span>{" "}
            <span className="bg-gradient-to-r from-accent via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {profile?.name?.split(" ").slice(1).join(" ") || "Doe"}
            </span>
          </h1>

          <h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-medium mb-4 sm:mb-6 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {profile?.title || t("Mobile Developer & UI/UX Designer", "Mobile Developer & UI/UX Designer")}
          </h2>

          <p
            className={`text-sm sm:text-base md:text-lg text-gray-500 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            {profile?.presentation || t(
              "Je cree des experiences mobiles magnifiques et des interfaces intuitives que les utilisateurs adorent",
              "Crafting beautiful mobile experiences and intuitive interfaces that users love"
            )}
          </p>

          <div
            className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            {(profile?.stacks?.flatMap((s) => s.skills.map((sk) => sk.name)).slice(0, 5) || ["React Native", "Flutter", "Figma", "UI/UX", "Mobile App"]).map((tag, i) => (
              <span
                key={tag}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300 font-medium inline-block"
                style={{ animation: mounted ? `elastic-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards` : "none", animationDelay: `${1100 + i * 100}ms`, opacity: 0 }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <Link href="/#work" className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white text-black font-semibold text-sm sm:text-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 magnetic-hover">
              {t("Voir mes projets", "View My Work")}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/#contact" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm sm:text-lg hover:bg-white/10 transition-all duration-300 magnetic-hover text-center">
              {t("Me contacter", "Get in Touch")}
            </Link>
          </div>

          <div
            className={`flex items-center justify-center gap-4 sm:gap-6 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1400ms" }}
          >
            {(profile?.github ? [{ href: profile.github, icon: "🐙" }] : []).concat(
              profile?.linkedin ? [{ href: profile.linkedin, icon: "💼" }] : [],
              profile?.twitter ? [{ href: profile.twitter, icon: "🐦" }] : [],
            ).map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg sm:text-xl hover:bg-white/10 transition-all duration-300 magnetic-hover border-glow">
                {social.icon}
              </a>
            ))}
            {(!profile?.github && !profile?.linkedin && !profile?.twitter) && (
              <>
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg sm:text-xl hover:bg-white/10 transition-all duration-300 magnetic-hover border-glow">🐙</a>
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg sm:text-xl hover:bg-white/10 transition-all duration-300 magnetic-hover border-glow">💼</a>
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg sm:text-xl hover:bg-white/10 transition-all duration-300 magnetic-hover border-glow">🐦</a>
              </>
            )}
          </div>
        </div>

        <div
          className={`absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1600ms" }}
        >
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em]">{t("Defiler", "Scroll")}</span>
            <div className="w-5 h-7 sm:h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
              <div className="w-1 h-1.5 sm:h-2 rounded-full bg-white/30 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
