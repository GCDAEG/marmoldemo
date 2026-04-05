"use client";
import { Section } from "@/components/layout/Section";
import { ShoppingCart, ArrowRight, Award } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

// Interfaz alineada exactamente con tu Google Sheet
interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precio: string | number;
  destacado: "Si" | "No";
  imagen_url: string;
}

interface ProductCatalogProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const WHATSAPP_NUMBER = "5493446123456";
  const { addToCart } = useCart();

  // Estados
  const [pruebaProductos, setPruebaProductos] = useState<Product[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>([
    "Todos",
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwUm-Wb2BDf8ltibLk4mqkMc2rBwAeSutjZyWbkGfm85hjZcICG_u6yYAw3bG37bDZJ/exec",
          { redirect: "follow" },
        );
        const data = await response.json();

        console.log("Datos recibidos desde Google Sheets:", data);
        setPruebaProductos(data);

        // EXTRAER CATEGORÍAS DINÁMICAMENTE
        const uniqueCats = Array.from(
          new Set(data.map((p: Product) => p.categoria).filter(Boolean)),
        ) as string[];

        setDynamicCategories(["Todos", ...uniqueCats]);
      } catch (error) {
        console.error("Error al traer los productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleWhatsAppOrder = (productName: string, productId: string) => {
    const message = `Hola! 👋 Me interesa encargar: ${productName} (Ref: ${productId}). ¿Podrían armarme un pedido?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const filteredProducts = pruebaProductos.filter(
    (product) =>
      activeCategory === "Todos" || product.categoria === activeCategory,
  );

  // Utilidad para formatear el precio (Ej: 15000 -> 15.000)
  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("es-AR");
  };

  return (
    <Section
      id="catalog"
      height="content"
      // Usamos las variables globales de Tailwind para el fondo y el borde
      className="bg-background py-20 border-b border-border"
    >
      <div className="flex flex-col gap-10 max-w-7xl mx-auto">
        {/* FILTROS DINÁMICOS */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold text-foreground/50 uppercase tracking-widest">
            Nuestras Especialidades
          </span>
          <div className="flex flex-wrap gap-2">
            {/* Si está cargando, mostramos unos skeletons de botones usando border */}
            {isLoading && dynamicCategories.length === 1
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-11 w-24 bg-border animate-pulse rounded-full"
                  />
                ))
              : dynamicCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`px-6 py-3 rounded-full text-sm font-bold border transition-all duration-300 ${
                      activeCategory === cat ||
                      (cat === "Todos" && activeCategory === "Todos")
                        ? "bg-foreground text-background border-foreground shadow-md"
                        : "bg-white text-foreground/70 border-border hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
          </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              // SKELETONS DE CARGA (Ajustados a la paleta base)
              <motion.div
                key="loading-skeleton"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 col-span-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="flex flex-col bg-white border border-border rounded-[var(--radius)] overflow-hidden shadow-sm animate-pulse"
                  >
                    <div className="h-56 bg-border/50 w-full" />
                    <div className="p-5 flex-1 flex flex-col gap-4">
                      <div>
                        <div className="h-3 bg-border rounded w-1/3 mb-3" />
                        <div className="h-6 bg-border rounded w-3/4" />
                      </div>
                      <div className="mt-auto pt-4 flex items-end justify-between">
                        <div className="flex flex-col gap-2 w-1/2">
                          <div className="h-3 bg-border rounded w-1/2" />
                          <div className="h-6 bg-border rounded w-3/4" />
                        </div>
                        <div className="size-11 bg-border rounded-full" />
                      </div>
                      <div className="h-11 w-full bg-border rounded-md mt-2" />
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              // PRODUCTOS REALES
              <>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group flex flex-col bg-white border border-border rounded-[var(--radius)] overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                  >
                    {/* Visualizador de Foto */}
                    <div className="h-56 bg-background flex items-center justify-center relative overflow-hidden">
                      <div className="relative w-full h-full bg-border/50">
                        <Image
                          src={product.imagen_url}
                          alt={product.nombre}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span
                          className={cn(
                            "text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm border backdrop-blur-md",
                            product.destacado === "Si"
                              ? "bg-primary/90 text-background border-primary/50"
                              : "bg-white/90 text-foreground/60 border-border",
                          )}
                        >
                          {product.destacado === "Si"
                            ? "★ Destacado"
                            : "Catálogo"}
                        </span>
                      </div>
                    </div>

                    {/* Info del Producto */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-4">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                          {product.categoria}
                        </p>
                        <h3 className="text-xl font-bold text-foreground leading-tight">
                          {product.nombre}
                        </h3>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-end justify-between mb-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-foreground/60 uppercase font-bold">
                              Precio Ref.
                            </span>
                            <span className="text-2xl font-black text-foreground">
                              ${formatPrice(product.precio)}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleWhatsAppOrder(product.nombre, product.id)
                            }
                            className="p-3 bg-background text-foreground/70 rounded-full border border-border hover:bg-primary hover:border-primary hover:text-white transition-colors shadow-sm"
                            title="Consultar por WhatsApp"
                          >
                            <ArrowRight className="size-5" />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              title: product.nombre,
                              price: product.precio.toString(),
                              category: product.categoria,
                            })
                          }
                          className="w-full py-3 bg-foreground text-background rounded-md text-sm font-bold hover:bg-foreground/90 hover:shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
                        >
                          <ShoppingCart className="size-4" />
                          Añadir a mi Selección
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* BANNER DE GARANTÍA */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center flex-col md:flex-row gap-5 text-center md:text-left">
            <div className="size-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0 border border-primary/20">
              <Award className="size-7 text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-serif font-bold text-foreground mb-1">
                Receta Original Garantizada
              </h4>
              <p className="text-sm text-foreground/80 max-w-lg">
                Todos nuestros alfajores son elaborados diariamente,
                garantizando la frescura de las tapas y la abundancia de nuestro
                característico dulce de leche.
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")
            }
            className="whitespace-nowrap px-8 py-3.5 bg-white text-foreground border border-border font-bold rounded-lg hover:border-primary hover:text-primary transition-all shadow-sm"
          >
            Consultar Disponibilidad
          </button>
        </div>
      </div>
    </Section>
  );
};

export default ProductCatalog;
