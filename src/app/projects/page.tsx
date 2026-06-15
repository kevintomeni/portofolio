"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProject } from "@/lib/projects";
import { Project } from "@/lib/types";

export default function ProjectsPage() {
  const projectId = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("id");
  }, []);

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    getProject(projectId)
      .then((p) => { if (!cancelled) setProject(p); })
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
              <div className="h-8 bg-card-border rounded w-1/3" />
              <div className="aspect-video bg-card-border rounded-2xl" />
              <div className="space-y-3">
                <div className="h-4 bg-card-border rounded w-full" />
                <div className="h-4 bg-card-border rounded w-5/6" />
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
            <h1 className="text-2xl font-bold mb-4">Projet non trouve</h1>
            <Link href="/" className="text-accent hover:underline">
              Retour a l&apos;accueil
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-6">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux projets
          </Link>

          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-muted mb-8">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-accent/10 text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.imageUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-card-border mb-8">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {project.videoUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-card-border mb-8">
              <iframe
                src={project.videoUrl}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          <div className="text-muted leading-relaxed whitespace-pre-wrap">
            {project.content}
          </div>

          <div className="flex gap-4 mt-12 pt-8 border-t border-card-border">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-hover transition-colors inline-flex items-center gap-2"
              >
                Voir le projet
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
                className="px-6 py-3 rounded-xl border border-card-border text-foreground font-medium hover:bg-card-bg transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Code source
              </a>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
