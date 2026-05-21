import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustMetrics } from "@/components/landing/trust-metrics";
import { AssetsSection } from "@/components/landing/assets-section";
import { RatesSection } from "@/components/landing/rates";
import { LoanCalculator } from "@/components/landing/loan-calculator";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { DemoModalProvider } from "@/components/demo/demo-modal-provider";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <DemoModalProvider />
      <Navbar />
      <Hero />
      <TrustMetrics />
      <AssetsSection />
      <RatesSection />
      <LoanCalculator />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
