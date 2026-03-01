"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      toast.success("Connexion réussie", { description: "Content de vous revoir." });
      router.refresh();
      router.push("/admin"); // Le middleware redirigera vers /dashboard si c'est un client simple
    } catch (error: any) {
      toast.error("Erreur de connexion", { description: "Email ou mot de passe incorrect." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Aurora Inversé */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background animate-pulse-slow" />
      
      <div className="w-full max-w-md p-8 glass-panel rounded-[2rem] border-white/20 relative animate-float">
        
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Bon retour</h1>
            <p className="text-muted-foreground">Connectez-vous pour suivre vos commandes.</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input name="email" type="email" placeholder="Email" className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all" required />
                </div>
            </div>
            <div className="space-y-2">
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input name="password" type="password" placeholder="Mot de passe" className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 transition-all" required />
                </div>
            </div>
          </div>

          <Button type="submit" className="btn-premium h-12 w-full text-lg mt-2" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Se connecter"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm space-y-4">
          <p className="text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline underline-offset-4">
              Créer un compte
            </Link>
          </p>
          <Link href="/" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}