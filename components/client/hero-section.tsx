"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      
      {/* Background Effects (Aurora) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Texte */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Commandes 2026 ouvertes
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              L'Élevage <br />
              <span className="text-gradient">Réinventé.</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-[600px] leading-relaxed">
              Sélectionnez votre bélier d'exception parmi nos races Sardi & Timahdite. 
              Traçabilité complète, santé garantie et livraison premium à domicile.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="btn-premium h-14 px-8 text-lg group">
                Commander Maintenant
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-secondary/50 backdrop-blur-sm">
                Voir le catalogue
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map((i) => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-gray-200 overflow-hidden relative">
                      <Image 
                        src="/placeholder-user.jpg" 
                        alt="Client" 
                        fill 
                        className="object-cover" 
                      />
                   </div>
                 ))}
              </div>
              <div>
                <div className="flex items-center text-yellow-500 gap-1">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="font-medium text-foreground">4.9/5 par nos clients</p>
              </div>
            </div>
          </motion.div>

          {/* Visuel 3D / Image Glass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] w-full flex items-center justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl animate-float">
               <Image
                src="/images/sheep-hero.jpg" 
                alt="Bélier Sardi"
                fill
                className="object-cover"
                priority
              />
              {/* Carte Flottante */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl flex items-center gap-4 bg-white/80 dark:bg-black/60">
                <div className="bg-primary/20 p-3 rounded-xl text-primary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Certificat Sanitaire</p>
                  <p className="font-bold text-foreground">Garantie Vétérinaire 100%</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}