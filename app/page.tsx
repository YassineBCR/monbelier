import { AppHeader } from "@/components/app-header";
import { HeroSection } from "@/components/client/hero-section";
import { BentoFeatures } from "@/components/client/bento-features";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <AppHeader />
      
      <HeroSection />
      
      <BentoFeatures />

      {/* Section CTA Finale */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <div className="glass-panel max-w-4xl mx-auto p-12 rounded-[3rem] border-white/20 bg-white/40 dark:bg-black/40">
            <h2 className="text-4xl font-bold mb-6">Prêt à trouver la perle rare ?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 500 familles satisfaites qui ont choisi la qualité Mon Bélier pour leur Aïd.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-premium px-10 h-14 text-lg">
                Voir le Catalogue
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-14 px-10 text-lg hover:bg-white/50">
                Contacter un commercial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimaliste */}
      <footer className="py-12 border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Mon Bélier. L'excellence de l'élevage.</p>
        </div>
      </footer>
    </main>
  );
}