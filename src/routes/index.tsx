import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { EducationCerts } from "@/components/portfolio/EducationCerts";
import { Skills } from "@/components/portfolio/Skills";
import { ProjectsAchievements } from "@/components/portfolio/ProjectsAchievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vivek Vishal | MBA Finance | Assistant Manager at DSP Asset Managers" },
      {
        name: "description",
        content:
          "Personal website of Vivek Vishal featuring professional experience, certifications, projects, and contact information.",
      },
      { property: "og:title", content: "Vivek Vishal | MBA Finance | Assistant Manager at DSP Asset Managers" },
      {
        property: "og:description",
        content:
          "Personal website of Vivek Vishal featuring professional experience, certifications, projects, and contact information.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vivek Vishal | MBA Finance | DSP Asset Managers" },
      {
        name: "twitter:description",
        content: "MBA (Finance) · Assistant Manager, DSP Asset Managers · Investment & Capital Markets Professional.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Vivek Vishal",
          jobTitle: "Assistant Manager",
          worksFor: { "@type": "Organization", name: "DSP Asset Managers" },
          address: { "@type": "PostalAddress", addressLocality: "Nagpur", addressCountry: "IN" },
          description:
            "MBA (Finance), Assistant Manager at DSP Asset Managers — investment and capital markets professional.",
          knowsAbout: [
            "Finance",
            "Capital Markets",
            "Mutual Funds",
            "Investment Products",
            "Financial Analysis",
            "Relationship Management",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <EducationCerts />
      <Skills />
      <ProjectsAchievements />
      <Contact />
      <Footer />
    </main>
  );
}
