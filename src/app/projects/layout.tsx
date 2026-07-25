import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Decouvrez mes projets en developpement mobile, web et UI/UX design.",
  openGraph: {
    title: "Projets | Portfolio",
    description:
      "Decouvrez mes projets en developpement mobile, web et UI/UX design.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
