"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { getProfile } from "@/lib/profile";
import { Profile } from "@/lib/types";

export default function PresentationSection() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error);
  }, []);

  return (
    <section className="py-32 relative bg-[#080810]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/5 to-pink-500/10 rounded-3xl blur-[60px]" />

              <div className="relative w-full h-full rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden p-1">
                <div className="w-full h-full rounded-3xl bg-[#0a0a0f] overflow-hidden relative">
                  {profile?.avatarUrl ? (
                    <Image src={profile.avatarUrl} alt="Avatar" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 via-purple-500/10 to-pink-500/10 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent via-purple-500 to-pink-500 flex items-center justify-center text-5xl font-black text-white shadow-2xl">
                        {(profile?.name || "D").charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
              About Me
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                {profile?.presentation || "Developpeur full stack passionne, je transforme les idees en experiences numeriques modernes et performantes. Du frontend au backend, chaque detail compte."}
              </p>
              {profile?.bio && <p>{profile.bio}</p>}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </a>
              )}
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
