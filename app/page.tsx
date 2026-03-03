import { AppHeader } from "@/components/app-header";
import { HeroSection } from "@/components/client/hero-section";
import { BentoFeatures } from "@/components/client/bento-features";
// On peut ajouter d'autres sections ici si tu en as (FAQ, Footer...)

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <AppHeader />
      <main>
        {/* Tes composants designés par v0 */}
        <HeroSection />
        <BentoFeatures />
      </main>
      
      <footer className="py-8 text-center text-muted-foreground text-sm border-t mt-12">
        <p>&copy; 2025 MonBelier.fr - Élevage & Tradition</p>
      </footer>
    </div>
  );
}