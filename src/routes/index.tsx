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
      { title: "Vivek Vishal | Assistant Manager, DSP Mutual Fund" },
      {
        name: "description",
        content:
          "Vivek Vishal — MBA (Finance), Assistant Manager at DSP Mutual Fund. Mutual fund distribution, product positioning, and business development in Nagpur, India.",
      },
      { property: "og:title", content: "Vivek Vishal | Assistant Manager, DSP Mutual Fund" },
      {
        property: "og:description",
        content:
          "MBA (Finance). Assistant Manager at DSP Mutual Fund. Mutual fund distribution and distributor engagement in Nagpur, India.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vivek Vishal | DSP Mutual Fund" },
      {
        name: "twitter:description",
        content: "MBA (Finance) · Assistant Manager, DSP Mutual Fund · Mutual fund distribution & capital markets.",
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
          worksFor: { "@type": "Organization", name: "DSP Mutual Fund" },
          address: { "@type": "PostalAddress", addressLocality: "Nagpur", addressCountry: "IN" },
          email: "hello@vivekvishal.com",
          alumniOf: [
            { "@type": "CollegeOrUniversity", name: "Sarala Birla University" },
            { "@type": "CollegeOrUniversity", name: "Ranchi University" },
          ],
          description:
            "MBA (Finance), Assistant Manager at DSP Mutual Fund — mutual fund distribution and capital markets.",
          knowsAbout: [
            "Mutual Funds",
            "Capital Markets",
            "Investment Products",
            "Distributor Engagement",
            "Business Development",
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
