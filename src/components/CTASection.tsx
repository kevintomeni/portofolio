"use client";

import { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { getProfile } from "@/lib/profile";
import { Profile } from "@/lib/types";
import { useLang } from "@/lib/lang-context";

export default function CTASection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { t } = useLang();

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error);
  }, []);

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-32 relative bg-[#080810]">
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3 sm:mb-4 text-glow-strong">
            {t("Construisons Quelque Chose d'Incroyable", "Let's Build Something Amazing")}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            {t("Vous cherchez un developpeur pour creer des experiences performantes et interactives ?", "Looking for a developer who can create high-performance, interactive experiences?")}
          </p>
          {profile?.location && (
            <p className="text-gray-500 mt-3 sm:mt-4 flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.location}
            </p>
          )}
        </AnimatedSection>

        <AnimatedSection delay={200} animation="animate-scale-in">
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 sm:p-6 md:p-8 lg:p-12 card-shine">
            <form className="space-y-4 sm:space-y-5 md:space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get("name");
              const message = formData.get("message");
              window.location.href = `mailto:${profile?.email || "contact@example.com"}?subject=Portfolio Contact from ${name}&body=${message}`;
            }}>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="group">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 group-focus-within:text-accent transition-colors">{t("Nom", "Name")}</label>
                  <input type="text" name="name" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.08] transition-all duration-300 text-sm" placeholder={t("Votre nom", "Your name")} />
                </div>
                <div className="group">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 group-focus-within:text-accent transition-colors">Email</label>
                  <input type="email" name="email" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.08] transition-all duration-300 text-sm" placeholder="your@email.com" />
                </div>
              </div>
              <div className="group">
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2 group-focus-within:text-accent transition-colors">{t("Message", "Message")}</label>
                <textarea name="message" rows={4} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.08] transition-all duration-300 resize-none text-sm" placeholder={t("Parlez-moi de votre projet...", "Tell me about your project...")} />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button type="submit" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 magnetic-hover text-sm sm:text-base">
                  {t("Envoyer le message", "Send Message")}
                </button>
                <a href="#" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 text-center magnetic-hover text-sm sm:text-base">
                  {t("Voir mon CV", "View Resume")}
                </a>
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
