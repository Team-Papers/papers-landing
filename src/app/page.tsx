import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import GenreShowcaseSection from "@/components/sections/GenreShowcaseSection";
import BecomeAuthorSection from "@/components/sections/BecomeAuthorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DownloadAppSection from "@/components/sections/DownloadAppSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <GenreShowcaseSection />
      <BecomeAuthorSection />
      <TestimonialsSection />
      <DownloadAppSection />
      <NewsletterSection />
    </>
  );
}
