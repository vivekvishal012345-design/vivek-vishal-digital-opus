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
      { title: "Vivek Vishal — Finance Professional & Aspiring Civil Servant" },
      {
        name: "description",
        content:
          "Vivek Vishal — MBA (Finance), Assistant Manager at DSP Asset Managers. Building expertise in finance today while preparing to create impact through public service tomorrow.",
      },
      { property: "og:title", content: "Vivek Vishal — Finance Professional" },
      {
        property: "og:description",
        content:
          "Finance today, public service tomorrow. MBA (Finance), Assistant Manager at DSP Asset Managers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "Vivek Vishal" },
      {
        name: "twitter:description",
        content: "MBA (Finance) · Assistant Manager, DSP Asset Managers · Aspiring Civil Servant.",
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
            "MBA (Finance), Assistant Manager at DSP Asset Managers, aspiring civil servant.",
          knowsAbout: [
            "Finance",
            "Mutual Funds",
            "Investment Products",
            "Financial Analysis",
            "Public Policy",
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
