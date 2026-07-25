"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const PresentationSection = dynamic(() => import("@/components/PresentationSection"), { ssr: false });
const SkillsSection = dynamic(() => import("@/components/SkillsSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: false });
const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PresentationSection />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
