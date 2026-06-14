import { FeaturedProjects } from "@/components/featured-projects";
import { HeroSection } from "@/components/hero-section";
import { ConsultationModal } from "@/components/consultation-modal";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <ConsultationModal />
      <main id="main-content" className="min-h-screen overflow-x-clip">
        <SiteHeader />
        <HeroSection />
        <FeaturedProjects />
      </main>
    </>
  );
}
