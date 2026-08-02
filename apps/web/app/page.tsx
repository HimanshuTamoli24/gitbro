"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { LandingNavbar } from "~/components/landing/Navbar";
import { HeroSection } from "~/components/landing/HeroSection";
import { IntegrationsSection } from "~/components/landing/IntegrationsSection";
import { TestimonialsSection } from "~/components/landing/TestimonialsSection";
import { FAQSection } from "~/components/landing/FAQSection";
import { Footer } from "~/components/landing/Footer";

export default function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      {/* SEO Friendly Structure */}
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Product Demo Video Section */}

        {/* Multi-Provider Git Integrations */}
        <IntegrationsSection />

        {/* Features Section */}

        {/* Testimonials */}
        {/* <TestimonialsSection /> */}

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
