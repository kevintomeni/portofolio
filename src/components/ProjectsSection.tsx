"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProjects } from "@/lib/projects";
import { Project } from "@/lib/types";
import AnimatedSection from "./AnimatedSection";
import { useLang } from "@/lib/lang-context";

const CATEGORIES = [
  { id: "all", fr: "Tous", en: "All", icon: "📁" },
  { id: "mobile", fr: "App Mobile", en: "Mobile App", icon: "📱" },
  { id: "web", fr: "Site Web", en: "Website", icon: "🌐" },
  { id: "ui", fr: "UI Design", en: "UI Design", icon: "🎨" },
  { id: "other", fr: "Autre", en: "Other", icon: "💡" },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { lang, t } = useLang();

  useEffect(() => {
    getProjects().then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filteredProjects = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);
  const categoryCount = (catId: string) => catId === "all" ? projects.length : projects.filter((p) => p.category === catId).length;

  return (
    <section id="work" className="py-20 sm:py-24 md:py-32 relative bg-[#080810] section-glow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 text-glow">
            {t("Projets Recents", "Featured Projects")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            {t("Une selection de mes meilleurs travaux et realisations", "A selection of my recent work and achievements")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100} animation="animate-scale-in">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-16">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-500 magnetic-hover ${
                  activeCategory === cat.id ? "bg-white text-black shadow-lg shadow-white/10" : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                style={{ animation: `elastic-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`, animationDelay: `${200 + i * 80}ms`, opacity: 0 }}
              >
                <span>{cat.icon}</span>
                <span>{lang === "fr" ? cat.fr : cat.en}</span>
                <span className={`text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded-md ${activeCategory === cat.id ? "bg-black/10" : "bg-white/10"}`}>{categoryCount(cat.id)}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 sm:p-8 skeleton">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4"><div className="h-8 bg-white/5 rounded w-3/4" /><div className="h-4 bg-white/5 rounded w-full" /><div className="h-4 bg-white/5 rounded w-2/3" /></div>
                  <div className="aspect-video bg-white/5 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <AnimatedSection animation="animate-scale-in">
            <div className="text-center py-16 sm:py-20 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-gray-500 text-base sm:text-lg">{t("Aucun projet dans cette categorie", "No projects in this category")}</p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 150} animation="animate-slide-up">
                <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:bg-white/[0.04] transition-all duration-500 card-shine group">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className={`p-5 sm:p-6 md:p-8 lg:p-12 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="px-2 sm:px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] sm:text-xs font-medium border border-accent/20">
                          {CATEGORIES.find((c) => c.id === project.category)?.icon}{" "}
                          {lang === "fr" ? CATEGORIES.find((c) => c.id === project.category)?.fr : CATEGORIES.find((c) => c.id === project.category)?.en}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                      <p className="text-gray-400 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{project.description}</p>
                      <div className="mb-4 sm:mb-6">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3 uppercase tracking-wider">{t("Realisation Technique", "Technical Implementation")}</h4>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {project.tags.slice(0, 5).map((tag) => (
                            <li key={tag} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                              <span className="text-accent">▹</span>{tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer"
                            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 magnetic-hover">
                            {t("Demo Live", "Live Demo")} →
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 magnetic-hover">
                            {t("Code Source", "Source Code")} →
                          </a>
                        )}
                      </div>
                    </div>
                    <div className={`relative overflow-hidden ${index % 2 === 1 ? "md:order-1" : ""}`}>
                      {project.imageUrl ? (
                        <div className="relative aspect-video md:aspect-auto md:h-full min-h-[200px] sm:min-h-[250px]">
                          <Image src={project.imageUrl} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#080810] via-transparent to-transparent md:block hidden" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent md:hidden" />
                        </div>
                      ) : (
                        <div className="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] bg-gradient-to-br from-accent/10 via-purple-500/5 to-pink-500/10 flex items-center justify-center">
                          <span className="text-4xl sm:text-5xl md:text-6xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">💻</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
