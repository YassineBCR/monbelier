"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { ProductCard } from "@/components/client/product-card";
import { OrderDialog } from "@/components/client/order-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

// Données fictives pour le catalogue
const MOCK_PRODUCTS = [
  { id: "1", name: "Le Roi Sardi", race: "Sardi" as const, weight: 65, age: 24, price: 4500, available: true, image: "/images/sheep-hero.jpg" },
  { id: "2", name: "Timahdite Atlas", race: "Timahdite" as const, weight: 55, age: 18, price: 3200, available: true, image: "/images/sheep-hero.jpg" },
  { id: "3", name: "Sardi Premium", race: "Sardi" as const, weight: 70, age: 26, price: 5000, available: true, image: "/images/sheep-hero.jpg" },
  { id: "4", name: "Petit Prince", race: "Timahdite" as const, weight: 45, age: 12, price: 2800, available: true, image: "/images/sheep-hero.jpg" },
  { id: "5", name: "Colosse", race: "Sardi" as const, weight: 80, age: 30, price: 6000, available: false, image: "/images/sheep-hero.jpg" },
  { id: "6", name: "Atlas Gold", race: "Timahdite" as const, weight: 60, age: 22, price: 3800, available: true, image: "/images/sheep-hero.jpg" },
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<"Tous" | "Sardi" | "Timahdite">("Tous");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof MOCK_PRODUCTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrage
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "Tous" || product.race === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 pb-20">
      <AppHeader />
      
      {/* Header Catalogue */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Catalogue <span className="text-gradient">2026</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                Chaque bélier est sélectionné pour sa qualité génétique et sanitaire.
            </p>

            {/* Barre d'outils (Filtres + Recherche) */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-panel p-4 rounded-2xl max-w-4xl mx-auto">
                <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl">
                    {["Tous", "Sardi", "Timahdite"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as any)}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedCategory === cat 
                                ? "bg-white shadow-sm text-foreground dark:bg-black/50" 
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-auto md:min-w-[300px]">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Rechercher un bélier..." 
                        className="pl-9 bg-white/5 border-white/10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Grille Produits */}
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onOrder={(p) => {
                        setSelectedProduct(p);
                        setIsDialogOpen(true);
                    }} 
                />
            ))}
        </div>

        {filteredProducts.length === 0 && (
            <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">Aucun bélier ne correspond à votre recherche.</p>
                <Button variant="link" onClick={() => {setSearch(""); setSelectedCategory("Tous")}} className="mt-2 text-primary">
                    Réinitialiser les filtres
                </Button>
            </div>
        )}
      </section>

      {/* Modal de Commande */}
      <OrderDialog 
        product={selectedProduct} 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </main>
  );
}