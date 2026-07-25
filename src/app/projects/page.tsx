"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { getProject, getProjects } from "@/lib/projects";
import { Project } from "@/lib/types";
import { useLang } from "@/lib/lang-context";

const CATEGORIES: Record<string, { fr: string; en: string; icon: string }> = {
  mobile: { fr: "App Mobile", en: "Mobile App", icon: "📱" },
  web: { fr: "Site Web", en: "Website", icon: "🌐" },
  ui: { fr: "UI Design", en: "UI Design", icon: "🎨" },
  other: { fr: "Autre", en: "Other", icon: "💡" },
};

export default function ProjectsPage() {
  const projectId = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("id");
  }, []);

  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const { lang, t } = useLang();

  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    getProject(projectId)
      .then((p) => {
        if (!cancelled) setProject(p);
        if (p) {
          getProjects().then((all) => {
            if (!cancelled) {
              setRelatedProjects(
                all.filter((r) => r.id !== p.id && r.category === p.category).slice(0, 3)
              );
            }
          });
        }
      })
      .catch(console.error);
    return () => { cancelled = true; };
  }, [projectId]);

  const loading = projectId !== null && project === null;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="animate-pulse space-y-6">
              <div className="h-4 bg-white/5 rounded w-48" />
              <div className="h-10 bg-white/5 rounded w-1/2" />
              <div className="aspect-video bg-white/5 rounded-2xl" />
              <div className="space-y-3">
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-5/6" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl mb-6 block">🔍</span>
            <h1 className="text-3xl font-bold text-white mb-4">{t("Projet non trouve", "Project not found")}</h1>
            <p className="text-gray-500 mb-8">{t("Ce projet n'existe pas ou a ete supprime.", "This project doesn't exist or has been removed.")}</p>
            <Link href="/" className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t("Retour a l'accueil", "Back to home")}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const cat = CATEGORIES[project.category] || CATEGORIES.other;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16 bg-[#080810]">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-white transition-colors">{t("Accueil", "Home")}</Link>
              <span>/</span>
              <Link href="/#work" className="hover:text-white transition-colors">{t("Projets", "Projects")}</Link>
              <span>/</span>
              <span className="text-gray-300">{project.title}</span>
            </nav>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                {cat.icon} {lang === "fr" ? cat.fr : cat.en}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium border border-yellow-500/20">
                  ⭐ {t("En vedette", "Featured")}
                </span>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              {project.title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">{project.description}</p>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {project.imageUrl && (
            <AnimatedSection delay={500}>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 mb-10 group">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent opacity-50" />
              </div>
            </AnimatedSection>
          )}

          {project.videoUrl && (
            <AnimatedSection delay={600}>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 mb-10">
                <iframe
                  src={project.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  title={`${project.title} - Video`}
                />
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection delay={700}>
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 sm:p-8 mb-10">
              <h2 className="text-xl font-bold text-white mb-4">{t("Details du projet", "Project Details")}</h2>
              <div className="text-gray-400 leading-relaxed whitespace-pre-wrap">{project.content}</div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={800}>
            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 inline-flex items-center gap-2 magnetic-hover"
                >
                  {t("Voir le projet", "View Project")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2 magnetic-hover"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {t("Code source", "Source Code")}
                </a>
              )}
              <Link
                href="/#work"
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2 magnetic-hover"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t("Tous les projets", "All Projects")}
              </Link>
            </div>
          </AnimatedSection>

          {relatedProjects.length > 0 && (
            <AnimatedSection delay={900}>
              <div className="mt-16 pt-12 border-t border-white/5">
                <h2 className="text-2xl font-bold text-white mb-8">{t("Projets similaires", "Related Projects")}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedProjects.map((rp) => (
                    <Link
                      key={rp.id}
                      href={`/projects?id=${rp.id}`}
                      className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 hover:bg-white/[0.04] transition-all duration-300 group card-shine"
                    >
                      {rp.imageUrl ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                          <Image src={rp.imageUrl} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-xl bg-gradient-to-br from-accent/10 to-purple-500/5 flex items-center justify-center mb-4">
                          <span className="text-3xl opacity-30">💻</span>
                        </div>
                      )}
                      <h3 className="font-bold text-white group-hover:text-accent transition-colors mb-2">{rp.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{rp.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
