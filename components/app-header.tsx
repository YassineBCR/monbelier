"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingBag, User } from "lucide-react";
import { useState, useEffect } from "react";

export function AppHeader() {
  const [scrolled, setScrolled] = useState(false);

  // Détecter le scroll pour changer le style de la navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "py-4" : "py-6"
    }`}>
      <div className="container mx-auto px-4">
        <div className={`mx-auto max-w-5xl rounded-full border border-white/10 transition-all duration-300 backdrop-blur-xl ${
          scrolled ? "bg-white/70 dark:bg-black/60 shadow-lg" : "bg-transparent border-transparent"
        }`}>
          <div className="flex h-14 items-center justify-between px-6">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                B
              </span>
              <span>Mon Bélier<span className="text-primary">.</span></span>
            </Link>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors">Catalogue</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Notre Élevage</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <ShoppingBag size={20} />
              </Button>
              <Link href="/login">
                <Button size="sm" className="hidden md:flex rounded-full px-5 btn-premium">
                  Espace Client
                </Button>
              </Link>
              
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="glass-panel w-[300px] border-l border-white/10">
                  <div className="flex flex-col gap-6 mt-10">
                    <Link href="/catalog" className="text-lg font-medium">Catalogue</Link>
                    <Link href="/about" className="text-lg font-medium">Notre Élevage</Link>
                    <Link href="/login">
                      <Button className="w-full btn-premium">Connexion</Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}