import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/portfolio/SiteChrome";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vivek Vishal" },
      {
        name: "description",
        content:
          "Get in touch with Vivek Vishal — for introductions, referrals, or a conversation about mutual funds and markets. Based in Nagpur, India.",
      },
      { property: "og:title", content: "Contact — Vivek Vishal" },
      {
        property: "og:description",
        content:
          "For introductions, referrals, or a good conversation about markets.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vivekvishal.com/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vivekvishal.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteChrome>
      <PageHeader
        eyebrow="Contact"
        title="Say hello."
        intro="For introductions, referrals, or a conversation about mutual funds and markets. Email works best — I usually reply within two business days."
      />
      <Contact />
    </SiteChrome>
  );
}
