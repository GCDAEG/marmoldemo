"use client";
import { Section } from "@/components/layout/Section";
import { SimpleCTAButton } from "@/components/ui/CTAButton";
import React, { useState } from "react";
import { X } from "lucide-react"; // Asegúrate de tener lucide-react instalado
import Image from "next/image";
const galleryImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/2604792/pexels-photo-2604792.jpeg",
    alt: "Cabaña de madera con vista al río",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
    alt: "Cabaña rústica rodeada de bosque y río",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/14851450/pexels-photo-14851450.jpeg",
    alt: "Piscina infinita con vista al río",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    alt: "Jardín tropical alrededor de cabaña",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    alt: "Cabaña moderna con piscina y jardín",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    alt: "Vista panorámica desde la cabaña al río",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f",
    alt: "Piscina rodeada de jardín y naturaleza",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600585153490-76fb20a32601",
    alt: "Cabaña de madera junto al río al atardecer",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    alt: "Jardín exuberante con piscina",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    alt: "Interior y exterior de cabaña con vista al río",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    alt: "Piscina con deck de madera y vista al río",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    alt: "Cabaña en medio del bosque con río cercano",
  },
];
type GalleryImage = {
  id: string | number;
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

interface GalleryProps {
  images?: GalleryImage[]; // ← Aquí pasas tu array de imágenes
}

const Gallery = ({ images = galleryImages }: GalleryProps) => {
  // Estado para controlar la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Section id="gallery" height="content">
      <div className="flex flex-col gap-12">
        {/* Título y descripción */}
        <div className="text-center flex flex-col gap-6">
          <h2>Galería</h2>
          <p>
            Un vistazo a nuestras cabañas, jardines, piscina y vistas al río.
          </p>
        </div>

        {/* Masonry Gallery estilo Pinterest */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.src)} // Al hacer clic, guarda la URL
              className="mb-4 md:mb-6 break-inside-avoid group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width || 600}
                height={image.height || 800}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Overlay opcional con hover */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  Ver imagen
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col items-center gap-6">
          <h4 className="text-lg md:text-2xl font-semibold">
            ¿Querés disfrutar de todo esto?
          </h4>
          <SimpleCTAButton className="w-fit px-8 py-4" />
        </div>
      </div>

      {/* --- MODAL DE IMAGEN --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-100 flex items-center justify-center p-4 backdrop-blur-sm transition-all animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)} // Cerrar al hacer clic fuera
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-110"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          <div className="relative max-w-5xl w-full max-h-[90vh] flex justify-center items-center">
            <Image
              src={selectedImage}
              alt="Imagen de galería ampliada"
              width={1400}
              height={1000}
              className="max-h-[90vh] w-auto object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}
    </Section>
  );
};

export default Gallery;
