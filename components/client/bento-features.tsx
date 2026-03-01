"use client";

import { Truck, ShieldCheck, Heart, Scale } from "lucide-react";

export function BentoFeatures() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Pourquoi nous choisir ?</h2>
          <p className="text-muted-foreground text-lg">Une expérience d'achat pensée pour votre tranquillité d'esprit et le bien-être animal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Grande Carte Gauche */}
          <div className="md:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden group min-h-[300px] flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Truck className="w-12 h-12 text-primary mb-6 relative z-10" />
            <h3 className="text-2xl font-bold mb-2 relative z-10">Livraison Premium</h3>
            <p className="text-muted-foreground relative z-10 max-w-md">
              Nous livrons votre bélier directement chez vous avec nos véhicules adaptés, garantissant zéro stress pour l'animal.
            </p>
          </div>

          {/* Carte Droite Haut */}
          <div className="glass-panel p-8 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden flex flex-col justify-center">
             <div className="absolute top-0 right-0 p-8 opacity-20">
                <ShieldCheck size={100} />
             </div>
             <ShieldCheck className="w-10 h-10 mb-4" />
             <h3 className="text-xl font-bold mb-2">Santé Garantie</h3>
             <p className="opacity-90 text-sm">Suivi vétérinaire rigoureux et carnet de vaccination à jour.</p>
          </div>

          {/* Carte Droite Bas */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center hover:scale-[1.02] transition-transform duration-300">
             <Scale className="w-10 h-10 text-primary mb-4" />
             <h3 className="text-xl font-bold mb-2">Poids Certifié</h3>
             <p className="text-muted-foreground text-sm">Chaque bélier est pesé avant la livraison pour une transparence totale.</p>
          </div>

          {/* Grande Carte Bas */}
          <div className="md:col-span-2 glass-panel p-8 rounded-3xl flex items-center justify-between gap-8 group">
             <div className="flex flex-col gap-2">
                <Heart className="w-10 h-10 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold">Élevage Éthique</h3>
                <p className="text-muted-foreground">Nos animaux grandissent en plein air dans les pâturages.</p>
             </div>
             <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-orange-200 to-red-200 dark:from-orange-900 dark:to-red-900 blur-2xl opacity-50" />
          </div>

        </div>
      </div>
    </section>
  );
}