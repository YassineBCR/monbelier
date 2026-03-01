"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2, Truck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
    id: string;
    name: string;
    price: number;
    race: string;
}

export function OrderDialog({ product, open, onOpenChange }: { product: Product | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);

    // 1. Vérifier si l'utilisateur est connecté
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        toast.error("Vous devez être connecté", { description: "Redirection vers la page de connexion..." });
        router.push("/login");
        return;
    }

    // 2. Créer la commande
    const { error } = await supabase.from("orders").insert({
        user_id: user.id,
        amount: product.price,
        status: "pending",
        items: {
            product_id: product.id,
            name: product.name,
            race: product.race,
            price: product.price
        }
    });

    if (error) {
        toast.error("Erreur", { description: error.message });
    } else {
        toast.success("Commande reçue !", { description: "Nous vous contacterons sous 24h pour la livraison." });
        onOpenChange(false);
        router.push("/admin"); // Redirection vers le dashboard client pour voir la commande
    }
    setLoading(false);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel border-white/20 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            Confirmer la commande
          </DialogTitle>
          <DialogDescription>
            Vous êtes sur le point de réserver le bélier <strong>{product.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
            {/* Résumé Produit */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-white/10">
                <div className="h-16 w-16 rounded-lg bg-gray-200 overflow-hidden relative">
                    {/* Placeholder image miniature */}
                    <div className="absolute inset-0 bg-primary/20" />
                </div>
                <div>
                    <h4 className="font-bold">{product.name} ({product.race})</h4>
                    <p className="text-primary font-bold text-lg">{product.price} MAD</p>
                </div>
            </div>

            <form onSubmit={handleOrder} className="space-y-4">
                <div className="space-y-2">
                    <Label>Adresse de livraison (Ville, Quartier)</Label>
                    <Input placeholder="Ex: Casablanca, Californie..." required className="bg-white/5" />
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-500/10 p-3 rounded-lg text-blue-600">
                    <Truck size={16} />
                    <span>Paiement à la livraison disponible (Cash ou Chèque)</span>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                        Annuler
                    </Button>
                    <Button type="submit" className="flex-1 btn-premium" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Valider la réservation
                    </Button>
                </div>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}