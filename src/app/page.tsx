import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PresentationSection from "@/components/PresentationSection";
import CTASection from "@/components/CTASection";

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
