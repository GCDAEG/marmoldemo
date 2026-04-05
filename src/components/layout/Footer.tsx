"use client";
import { Instagram, Facebook, Store, Award, MapPin } from "lucide-react";
import { useLenis } from "lenis/react";
import { sections } from "@/lib/sections";
import Link from "next/link";
import { siteConfig } from "@/lib/site/siteConfig";

export function FooterSection() {
  const lenis = useLenis();
  const { brand } = siteConfig;

  return (
    <footer className="bg-background text-foreground border-t border-border pt-20 pb-8 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* LOGO CENTRAL */}
      <Link href="/" className="group flex flex-col items-center gap-3 mb-10">
        <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-sm group-hover:scale-105 transition-transform">
          <Store className="text-primary size-8" />
        </div>
        <span className="text-4xl font-serif font-black tracking-tight text-foreground">
          {brand.name}
        </span>
      </Link>

      {/* LEMA Y CONTACTO */}
      <div className="max-w-md mb-12">
        <p className="text-foreground/70 font-medium mb-6 leading-relaxed">
          Elaboración diaria en Gualeguaychú con puro dulce de leche. Tradición
          y receta original en cada bocado.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm font-bold text-foreground/80">
          <a
            href="https://wa.me/5493446000000"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            WhatsApp: +54 9 3446 000000
          </a>
          <span className="hidden sm:block text-border">|</span>
          <span>Gualeguaychú, Entre Ríos</span>
        </div>
      </div>

      {/* ENLACES DE NAVEGACIÓN (En línea) */}
      <ul className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-bold uppercase tracking-widest text-foreground/50">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => lenis?.scrollTo(`#${section.id}`, { offset: -70 })}
              className="hover:text-primary transition-colors"
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>

      {/* REDES SOCIALES */}
      <div className="flex gap-4 mb-16">
        {[Instagram, Facebook].map((Icon, i) => (
          <Link
            key={i}
            href="#"
            className="size-12 rounded-full border border-border flex items-center justify-center text-foreground/50 hover:bg-primary hover:text-background hover:border-primary transition-all shadow-sm bg-white"
          >
            <Icon className="size-5" strokeWidth={1.5} />
          </Link>
        ))}
      </div>

      {/* LÍNEA DIVISORIA */}
      <div className="w-full max-w-4xl border-t border-border mb-8" />

      {/* FOOTER FINAL (Copyright, Sello y Firma) */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Sellos de confianza */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
            <Award className="size-3.5 text-primary" />
            <span>Receta Original</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
            <MapPin className="size-3.5 text-primary" />
            <span>Gualeguaychú</span>
          </div>
        </div>

        {/* Firma */}
        <div className="flex flex-col items-center md:items-end gap-1.5">
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
            © {new Date().getFullYear()} {brand.name} Todos los derechos
            reservados.
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-foreground/40 tracking-wide hover:text-primary transition-colors cursor-pointer"
          >
            Diseño por{" "}
            <span className="font-black text-foreground/60">
              soy gonzalo de tuweb hoy
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
