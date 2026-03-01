
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone, // Stocké dans les métadonnées pour le Trigger SQL
          },
        },
      });

      if (error) throw error;

      toast.success("Compte créé avec succès !", {
        description: "Veuillez vérifier votre email pour confirmer l'inscription.",
        duration: 5000,
      });
      
      // Optionnel : Redirection vers une page de confirmation ou login
      router.push("/login");

    } catch (error: any) {
      toast.error("Erreur lors de l'inscription", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Aurora */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background animate-pulse-slow" />
      
      <div className="w-full max-w-md p-8 glass-panel rounded-[2rem] border-white/20 relative animate-in fade-in zoom-in duration-500">
        
        <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="mr-1 h-4 w-4" /> Retour à l'accueil
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Créer un compte</h1>
            <p className="text-muted-foreground">Rejoignez l'élite de l'élevage et commandez votre bélier.</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          
          <div className="space-y-4">
            {/* Nom Complet */}
            <div className="space-y-2">
                <div className="relative group">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input name="fullName" type="text" placeholder="Nom complet (ex: Yassine Bcr)" className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all" required />
                </div>
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
                <div className="relative group">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input name="phone" type="tel" placeholder="Téléphone (ex: 06 12 34 56 78)" className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all" required />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <div className="relative group">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input name="email" type="email" placeholder="Email professionnel" className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all" required />
                </div>
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
                <div className="relative group">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input name="password" type="password" placeholder="Mot de passe sécurisé" className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all" minLength={6} required />
                </div>
            </div>
          </div>

          <Button type="submit" className="btn-premium h-12 w-full text-lg mt-2 group" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            Commencer l'expérience
            {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
          </Button>

        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline underline-offset-4">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}