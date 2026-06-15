"use client";

import AnimatedSection from "./AnimatedSection";
import { useLang } from "@/lib/lang-context";

export default function AboutSection() {
  const { t } = useLang();

  const capabilities = [
    { title: t("Apps Mobiles", "Mobile Apps"), icon: "📱", items: ["React Native", "Flutter", "iOS & Android", t("Multi-plateforme", "Cross-platform")] },
    { title: t("Design UI/UX", "UI/UX Design"), icon: "🎨", items: ["Figma", t("Systemes de Design", "Design Systems"), "Prototyping", t("Recherche Utilisateur", "User Research")] },
    { title: t("Developpement Web", "Web Development"), icon: "🌐", items: ["React & Next.js", "TypeScript", "Tailwind CSS", t("Design Responsive", "Responsive Design")] },
    { title: t("Backend & APIs", "Backend & APIs"), icon: "⚡", items: ["Node.js", "Firebase", "REST APIs", t("Donnees en temps reel", "Real-time Data")] },
    { title: t("Performance", "Performance"), icon: "🚀", items: [t("Optimisation", "Optimization"), "Lazy Loading", "Code Splitting", "Caching"] },
    { title: t("Outils & Workflow", "Tools & Workflow"), icon: "🔧", items: ["Git & GitHub", "CI/CD", "Testing", "Agile"] },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 md:py-32 relative bg-[#080810] section-glow">
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <AnimatedSection className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 text-glow">
            {t("Technologies & Outils", "Technologies & Tools")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            {t("Les technologies que je maitrise pour creer des experiences uniques", "The technologies I master to create unique experiences")}
          </p>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {capabilities.map((cap, index) => (
            <AnimatedSection key={cap.title} delay={index * 100} animation="animate-scale-in">
              <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 sm:p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-500 group h-full card-shine tilt-hover">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">{cap.icon}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-accent transition-colors duration-300">{cap.title}</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      <span className="text-accent group-hover:animate-pulse">▹</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
