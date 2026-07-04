import { FeaturedProjects } from "@/components/featured-projects";
import { HeroSection } from "@/components/hero-section";
import { CinematicMain } from "@/components/cinematic-main";
import { ConsultationModal } from "@/components/consultation-modal";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <ConsultationModal />
      <CinematicMain id="main-content" className="min-h-screen overflow-x-clip">
        <SiteHeader />
        <HeroSection />
        <FeaturedProjects />
      </CinematicMain>
    </>
  );
}
