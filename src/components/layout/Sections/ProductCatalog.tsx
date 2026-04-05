"use client";
import { Section } from "@/components/layout/Section";
import { ShoppingCart, ArrowRight, Award } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precio: string | number;
  destacado: "Si" | "No";
  imagen_url: string;
  descripcion: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "MAR-01",
    nombre: "Alfajor de Maicena Clásico",
    categoria: "Clásicos",
    precio: 1200,
    destacado: "Si",
    imagen_url:
      "https://images.unsplash.com/photo-1613249000637-6329eef9287c?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion:
      "Tapas de maicena extra suaves con abundante dulce de leche y borde de coco rallado.",
  },
  {
    id: "MAR-02",
    nombre: "Chocolate Semi Amargo",
    categoria: "Clásicos",
    precio: 1500,
    destacado: "Si",
    imagen_url:
      "https://images.unsplash.com/photo-1604953781841-004f1848ed3d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion:
      "Cobertura de chocolate amargo 70% cacao con corazón de dulce de leche artesanal.",
  },
  {
    id: "MAR-03",
    nombre: "Blanco con Nuez",
    categoria: "Premium",
    precio: 1800,
    destacado: "Si",
    imagen_url:
      "https://images.unsplash.com/photo-1517400847543-fd27a32c8d12?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dv",
    descripcion:
      "Baño de chocolate blanco suizo, masa de nuez y doble relleno de dulce de leche.",
  },
  {
    id: "MAR-04",
    nombre: "Fruta (Membrillo)",
    categoria: "Clásicos",
    precio: 1200,
    destacado: "No",
    imagen_url:
      "https://images.unsplash.com/photo-1552552492-9c335658343d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion:
      "Tapas glaseadas clásicas con generoso relleno de dulce de membrillo de primera calidad.",
  },
  {
    id: "MAR-05",
    nombre: "Triple Dulce de Leche",
    categoria: "Premium",
    precio: 2200,
    destacado: "Si",
    imagen_url:
      "https://images.unsplash.com/photo-1624761527858-7d6792e57202?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion:
      "Tres tapas de cacao intenso intercaladas con dos capas extra gruesas de dulce de leche.",
  },
  {
    id: "MAR-06",
    nombre: "Conitos de DDL (x6)",
    categoria: "Especiales",
    precio: 4500,
    destacado: "No",
    imagen_url:
      "https://images.unsplash.com/photo-1648821994613-6fdbad6657ba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion:
      "Caja de 6 conitos con base de masa sablée, copo de dulce de leche y baño de chocolate.",
  },
];

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

  const dynamicCategories = [
    "Todos",
    ...Array.from(new Set(MOCK_PRODUCTS.map((p) => p.categoria))),
  ];

  const handleWhatsAppOrder = (productName: string, productId: string) => {
    const message = `Hola! 👋 Me interesa encargar: ${productName} (Ref: ${productId}). ¿Podrían armarme un pedido?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const filteredProducts = MOCK_PRODUCTS.filter(
    (product) =>
      activeCategory === "Todos" || product.categoria === activeCategory,
  );

  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("es-AR");
  };

  return (
    <Section
      id="catalog"
      height="content"
      className="bg-background py-20 border-b border-border"
    >
      <div className="flex flex-col gap-10 max-w-7xl mx-auto px-6">
        {/* FILTROS DINÁMICOS */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold text-foreground/50 uppercase tracking-widest">
            Nuestras Especialidades
          </span>
          <div className="flex flex-wrap gap-2">
            {dynamicCategories.map((cat) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-white border border-border rounded-[var(--radius)] overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                {/* Imagen */}
                <div className="h-56 bg-background flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={product.imagen_url}
                    alt={product.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm border backdrop-blur-md",
                        product.destacado === "Si"
                          ? "bg-primary/90 text-background border-primary/50"
                          : "bg-white/90 text-foreground/60 border-border",
                      )}
                    >
                      {product.destacado === "Si" ? "★ Destacado" : "Catálogo"}
                    </span>
                  </div>
                </div>

                {/* Contenido de la Card */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                      {product.categoria}
                    </p>
                    <h3 className="text-lg font-bold text-foreground leading-tight mb-2">
                      {product.nombre}
                    </h3>
                    <p className="text-xs text-foreground/60 leading-relaxed line-clamp-2">
                      {product.descripcion}
                    </p>
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
                        className="p-3 bg-background text-foreground/70 rounded-full border border-border hover:bg-primary hover:border-primary hover:text-white transition-colors"
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
                      className="w-full py-3 bg-foreground text-background rounded-md text-sm font-bold hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
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
