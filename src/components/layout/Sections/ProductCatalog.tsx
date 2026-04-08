"use client";
import { Section } from "@/components/layout/Section";
import {
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Maximize,
  Sparkles,
  Box,
  Loader2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Product } from "@/lib/getProduct";

interface ProductCatalogProps {
  initialProducts: Product[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ initialProducts }) => {
  const WHATSAPP_NUMBER = "5493446000000";
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Usamos un pequeño estado de carga para la transición de entrada
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    const isMounting = () => {
      setIsMounting(false);
    };
    isMounting();
  }, []);

  const onCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };

  // Categorías dinámicas basadas en los productos reales que vienen de la Sheets
  const dynamicCategories = [
    "Todos",
    ...Array.from(new Set(initialProducts.map((p) => p.categoria))),
  ];

  const filteredProducts = initialProducts.filter(
    (product) =>
      activeCategory === "Todos" || product.categoria === activeCategory,
  );

  const handleWhatsAppOrder = (productName: string, productId: string) => {
    const message = `Hola! 👋 Me interesa cotizar una mesada en: ${productName} (Ref: ${productId}). ¿Me podrían asesorar?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const getStatusColor = (estado: string) => {
    switch (estado?.toUpperCase()) {
      case "DISPONIBLE":
        return "text-emerald-600 bg-emerald-50";
      case "STOCK BAJO":
        return "text-amber-600 bg-amber-50";
      case "A PEDIDO":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Section
      id="catalog"
      height="content"
      className="bg-background border-b border-border"
    >
      <div className="flex flex-col gap-10 max-w-[1200px] mx-auto w-full">
        {/* FILTROS DINÁMICOS */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
            Explorar Catálogo
          </span>
          <div className="flex flex-wrap gap-3">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-md text-sm font-bold transition-all border",
                  activeCategory === cat
                    ? "bg-[#0f172a] text-white border-[#0f172a]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                )}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE MATERIALES */}
        {isMounting ? (
          <div className="h-64 flex flex-col items-center justify-center text-primary gap-4">
            <Loader2 className="size-10 animate-spin opacity-20" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Imagen de Postimages / Sheets */}
                  <div className="h-48 bg-gray-50 relative flex items-center justify-center border-b border-gray-100 overflow-hidden">
                    {product.imagen_url ? (
                      <Image
                        src={product.imagen_url}
                        alt={product.nombre}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                      />
                    ) : (
                      <Box className="size-10 text-gray-200" strokeWidth={1} />
                    )}

                    <div
                      className={cn(
                        "absolute top-3 left-3 px-2 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-wide shadow-sm z-10",
                        getStatusColor(product.estado),
                      )}
                    >
                      {product.estado}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-4">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">
                        {product.categoria}
                      </p>
                      <h3 className="text-lg font-black text-slate-900 leading-tight">
                        {product.nombre}
                      </h3>
                    </div>

                    <ul className="space-y-2.5 mb-6 text-xs font-medium text-gray-500">
                      <li className="flex items-center gap-2">
                        <MapPin className="size-3.5 opacity-60" /> Origen:{" "}
                        <span className="text-slate-900 font-bold">
                          {product.origen}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Maximize className="size-3.5 opacity-60" /> Espesor:{" "}
                        <span className="text-slate-900 font-bold">
                          {product.espesor}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="size-3.5 opacity-60" />{" "}
                        Terminación:{" "}
                        <span className="text-slate-900 font-bold">
                          {product.terminacion}
                        </span>
                      </li>
                    </ul>

                    <div className="mt-auto">
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                            Precio Ref.
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-slate-900">
                              ${product.precio.toLocaleString("es-AR")}
                            </span>
                            <span className="text-sm font-bold text-slate-900">
                              /m²
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            handleWhatsAppOrder(product.nombre, product.id)
                          }
                          className="size-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-slate-900 transition-colors shadow-sm active:scale-90"
                        >
                          <ArrowRight className="size-4" />
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
                        className="w-full bg-[#0f172a] text-white hover:bg-[#1e293b] py-3 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                      >
                        <ShoppingCart className="size-4" />
                        Añadir a mi Selección
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* BANNER DE PRECISIÓN */}
        <div className="bg-[#eff6ff] rounded-xl border border-blue-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mt-4">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="size-14 bg-primary rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="size-7 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900 mb-1">
                Calidad Certificada
              </h4>
              <p className="text-sm text-blue-800/70 font-medium max-w-lg">
                Revisión rigurosa de placas para asegurar vetas uniformes antes
                de cada corte.
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")
            }
            className="whitespace-nowrap px-8 py-3.5 bg-white text-primary font-bold text-sm rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm w-full md:w-auto active:scale-95"
          >
            Hablar con un Asesor
          </button>
        </div>
      </div>
    </Section>
  );
};

export default ProductCatalog;
