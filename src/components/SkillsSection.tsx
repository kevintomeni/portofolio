"use client";

import { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { getProfile } from "@/lib/profile";
import { StackCategory } from "@/lib/types";
import { useLang } from "@/lib/lang-context";

const DEFAULT_STACKS: StackCategory[] = [
  { title: "Mobile Development", icon: "📱", skills: [
    { name: "React Native", level: 90, icon: "⚛" },
    { name: "Flutter", level: 85, icon: "🎯" },
    { name: "iOS / Swift", level: 78, icon: "🍎" },
    { name: "Android / Kotlin", level: 80, icon: "🤖" },
  ]},
  { title: "UI/UX Design", icon: "🎨", skills: [
    { name: "Figma", level: 95, icon: "✏" },
    { name: "Design System", level: 90, icon: "🧩" },
    { name: "Prototyping", level: 88, icon: "🔄" },
    { name: "User Research", level: 82, icon: "🔍" },
  ]},
  { title: "Web & Backend", icon: "💻", skills: [
    { name: "React & Next.js", level: 88, icon: "⚛" },
    { name: "TypeScript", level: 85, icon: "🔷" },
    { name: "Node.js", level: 80, icon: "🟢" },
    { name: "Firebase", level: 82, icon: "🔥" },
  ]},
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm text-gray-300 font-medium">{name}</span>
        <span className="text-xs sm:text-sm text-gray-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent to-purple-400 rounded-full transition-all duration-[1500ms] ease-out" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [stacks, setStacks] = useState<StackCategory[]>(DEFAULT_STACKS);
  const { t } = useLang();

  useEffect(() => {
    getProfile().then((profile) => {
      if (profile?.stacks && profile.stacks.length > 0) setStacks(profile.stacks);
    }).catch(console.error);
  }, []);

  return (
    <section id="skills" className="py-20 sm:py-24 md:py-32 relative bg-[#080810] section-glow">
      <div className="absolute inset-0 mesh-gradient opacity-50 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <AnimatedSection className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 text-glow">
            {t("Expertise Technique", "Technical Expertise")}
          </h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {stacks.map((category, catIndex) => (
            <AnimatedSection key={category.title} delay={catIndex * 150} animation="animate-scale-in">
              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 sm:p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-500 h-full card-shine tilt-hover group">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform duration-500">{category.icon}</span>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={catIndex * 200 + skillIndex * 150 + 500} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
