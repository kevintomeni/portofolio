"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects?id=${project.id}`}
      className="group block rounded-3xl overflow-hidden hover-lift relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 rounded-3xl glass-card-strong transition-all duration-500 group-hover:border-accent/20" />

      <div className="relative">
        <div className="relative aspect-video overflow-hidden">
          {project.imageUrl ? (
            <>
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/30 via-purple-500/20 to-pink-500/20 relative">
              <div className="absolute inset-0 bg-dots opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-20 h-20 text-accent/20 transition-transform duration-700 group-hover:scale-125 group-hover:text-accent/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}

          {project.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm z-10">
              <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center animate-pulse-glow group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-white text-xs font-semibold">
              Voir le projet
            </div>
          </div>

          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg animate-bounce-in">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="relative p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <div className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent group-hover:animate-pulse transition-all duration-300 mt-2" />
          </div>
          <p className="text-sm text-muted line-clamp-2 mb-5 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted border border-white/5 group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted border border-white/5">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
