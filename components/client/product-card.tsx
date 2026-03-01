"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ruler, Weight, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  race: "Sardi" | "Timahdite";
  weight: number;
  age: number;
  price: number;
  image: string;
  available: boolean;
}

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product) => void;
}

export function ProductCard({ product, onOrder }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative glass-panel rounded-3xl overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500"
    >
      {/* Image Header */}
      <div className="relative h-64 w-full overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="backdrop-blur-md bg-white/30 text-white border-none px-3 py-1">
                {product.race}
            </Badge>
        </div>
        {!product.available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-xl uppercase tracking-widest border-2 border-white px-4 py-2">Vendu</span>
            </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.age} mois</p>
            </div>
            <div className="text-right">
                <span className="text-2xl font-bold text-primary">{product.price} MAD</span>
            </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 p-2 rounded-lg">
                <Weight size={16} />
                <span>{product.weight} kg</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 p-2 rounded-lg">
                <Ruler size={16} />
                <span>Excellente corne</span>
            </div>
        </div>

        {/* Action Button */}
        <Button 
            onClick={() => onOrder(product)}
            disabled={!product.available}
            className="w-full btn-premium group-hover:shadow-primary/25"
        >
            Commander
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}