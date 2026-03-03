"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Calendar, Truck, ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

// --- COMPOSANTS UI DU SITE ---
import { AppHeader } from "@/components/app-header";
import { ProductCard } from "@/components/client/product-card"; // Ton composant stylé
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const supabase = createClient();

// --- DONNÉES HARMONISÉES ---
const PRODUCTS = [
  {
    id: "A",
    title: "Agneau Standard",
    price: 350,
    description: "Agneau Mérinos d'Aveyron. Idéal pour les familles moyennes.",
    image: "/images/sheep-hero.jpg",
    features: ["Origine France 🇫🇷", "17-19 kg", "Abattage Rituel"]
  },
  {
    id: "B",
    title: "Agneau Large",
    price: 380,
    description: "Agneau Mérinos d'Aveyron. Une bête charnue et tendre.",
    image: "/images/sheep-hero.jpg",
    features: ["Origine France 🇫🇷", "20-22 kg", "Sélection Gold"]
  },
  {
    id: "C",
    title: "Agneau XXL",
    price: 400,
    description: "Le Boss (+23kg). Qualité exceptionnelle pour les grands repas.",
    image: "/images/sheep-hero.jpg",
    features: ["Origine France 🇫🇷", "+23 kg", "Grand Format"]
  }
];

export default function CatalogPage() {
  const router = useRouter();
  
  // --- ÉTATS ---
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jours, setJours] = useState<any[]>([]);

  // Sélections
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<any>(null);

  // Formulaire
  const [form, setForm] = useState({
    prenom: "", nom: "", tel: "", email: "",
    adresse: "", cp: "", ville: "", complement: ""
  });

  useEffect(() => {
    const loadJours = async () => {
      const { data } = await supabase.from('jours_livraison').select('*').eq('active', true).order('nom');
      setJours(data || []);
    };
    loadJours();
  }, []);

  // --- ACTIONS ---
  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    setStep(2);
    toast.success(`Choix validé : ${product.title}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDay = (day: any) => {
    setSelectedDay(day);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.tel || !form.adresse) return toast.error("Champs obligatoires manquants");
    
    setLoading(true);
    try {
      const { error } = await supabase.from('commandes').insert([{
        categorie_mouton: selectedProduct.id,
        jour_livraison_id: selectedDay.id,
        montant_total: selectedProduct.price,
        acompte_verse: 100,
        prenom: form.prenom,
        nom: form.nom,
        telephone: form.tel,
        email: form.email,
        adresse_rue: form.adresse,
        code_postal: form.cp,
        ville: form.ville,
        etage_batiment: form.complement,
        statut_paiement: 'acompte_paye'
      }]);

      if (error) throw error;
      
      toast.success("Commande validée !");
      // Ici tu pourrais rediriger vers une vraie page de succès ou Stripe
      router.push("/success"); 
      
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Navigation retour */}
        <div className="mb-8">
           <Link href="/">
             <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
               <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
             </Button>
           </Link>
        </div>

        {/* PROGRESS BAR (Style épuré) */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground bg-secondary/50 px-6 py-3 rounded-full">
            <span className={step >= 1 ? "text-primary font-bold flex items-center gap-2" : "flex items-center gap-2"}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>1</span>
              Mouton
            </span>
            <span className="text-muted-foreground/30">——</span>
            <span className={step >= 2 ? "text-primary font-bold flex items-center gap-2" : "flex items-center gap-2"}>
               <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>2</span>
               Livraison
            </span>
            <span className="text-muted-foreground/30">——</span>
            <span className={step >= 3 ? "text-primary font-bold flex items-center gap-2" : "flex items-center gap-2"}>
               <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>3</span>
               Infos
            </span>
          </div>
        </div>

        {/* --- ETAPE 1 : MOUTON --- */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Choisissez votre Agneau</h1>
              <p className="text-muted-foreground">Sélectionnez la taille qui convient à votre famille.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {PRODUCTS.map((prod) => (
                <div key={prod.id} onClick={() => handleSelectProduct(prod)} className="group cursor-pointer">
                  {/* CORRECTION MAJEURE ICI : On passe les props une par une pour éviter le bug */}
                  <ProductCard 
                    title={prod.title}
                    price={prod.price}
                    description={prod.description}
                    image={prod.image}
                    features={prod.features}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ETAPE 2 : JOUR --- */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Jour de Livraison</h2>
              <p className="text-muted-foreground">Quand souhaitez-vous être livré ?</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {jours.map(day => (
                <Card 
                  key={day.id} 
                  onClick={() => handleSelectDay(day)}
                  className="cursor-pointer hover:border-primary hover:bg-primary/5 transition-all border-2 group relative overflow-hidden"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">{day.nom}</h3>
                      <p className="text-sm text-muted-foreground font-medium">Créneau 9h - 18h</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
               <Button variant="link" onClick={() => setStep(1)} className="text-muted-foreground">← Changer de mouton</Button>
            </div>
          </div>
        )}

        {/* --- ETAPE 3 : FORMULAIRE --- */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-8 duration-500">
            
            {/* Colonne Gauche : Formulaire */}
            <div className="md:col-span-2 space-y-6">
               <Card className="border-none shadow-lg">
                 <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-lg"><Truck className="w-5 h-5 text-primary"/></div>
                        Adresse de Livraison
                      </h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label>Numéro et Rue</Label>
                            <Input className="h-12" placeholder="Ex: 12 Rue des Oliviers" value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Code Postal</Label>
                                <Input className="h-12" placeholder="34000" value={form.cp} onChange={e => setForm({...form, cp: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label>Ville</Label>
                                <Input className="h-12" placeholder="Montpellier" value={form.ville} onChange={e => setForm({...form, ville: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Complément (Bâtiment, Etage...)</Label>
                            <Input className="h-12" placeholder="Optionnel" value={form.complement} onChange={e => setForm({...form, complement: e.target.value})} />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                         <div className="bg-primary/10 p-2 rounded-lg"><CheckCircle className="w-5 h-5 text-primary"/></div>
                         Vos Coordonnées
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Prénom</Label>
                            <Input className="h-12" value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Nom</Label>
                            <Input className="h-12" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                          <Label>Téléphone Mobile</Label>
                          <Input className="h-12" type="tel" value={form.tel} onChange={e => setForm({...form, tel: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                          <Label>Email (Optionnel)</Label>
                          <Input className="h-12" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                      </div>
                    </div>
                 </CardContent>
               </Card>
            </div>

            {/* Colonne Droite : Récap & Paiement */}
            <div className="md:col-span-1">
               <div className="sticky top-24 space-y-4">
                 <Card className="bg-primary text-primary-foreground border-none shadow-xl overflow-hidden relative">
                    {/* Motif de fond décoratif */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    
                    <CardContent className="p-6 space-y-6 relative z-10">
                       <div>
                         <p className="text-primary-foreground/80 text-sm font-medium mb-1">Total commande</p>
                         <p className="text-4xl font-bold">{selectedProduct?.price} €</p>
                       </div>
                       
                       <Separator className="bg-primary-foreground/20" />
                       
                       <div className="space-y-3 text-sm">
                         <div className="flex justify-between">
                           <span className="opacity-80">Produit</span>
                           <span className="font-bold">{selectedProduct?.title}</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="opacity-80">Livraison</span>
                           <span className="font-bold">{selectedDay?.nom}</span>
                         </div>
                       </div>

                       <div className="bg-white/10 p-4 rounded-xl space-y-2">
                          <div className="flex justify-between text-lg font-bold">
                             <span>Acompte</span>
                             <span>100 €</span>
                          </div>
                          <p className="text-xs opacity-70 leading-tight">Payable maintenant par carte bancaire pour valider la réservation.</p>
                       </div>

                       <Button 
                         onClick={handleSubmit} 
                         disabled={loading}
                         variant="secondary"
                         className="w-full h-14 text-lg font-bold shadow-lg"
                       >
                         {loading ? "Validation..." : `Payer 100 €`}
                       </Button>
                    </CardContent>
                 </Card>

                 <p className="text-center text-xs text-muted-foreground px-4">
                    Le solde de <strong>{selectedProduct?.price - 100}€</strong> sera à régler en espèces au livreur lors de la réception.
                 </p>
               </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}