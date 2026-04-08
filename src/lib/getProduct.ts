// lib/getProduct.ts
export interface Product {
  id: string;
  categoria: string;
  nombre: string;
  origen: string;
  espesor: string;
  terminacion: string;
  precio: number;
  estado: "DISPONIBLE" | "STOCK BAJO" | "A PEDIDO";
  imagen_url: string;
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzYfiP8qYubJT8QbKmsE1NPNRZdzSIzDZGuOTsvjvdrXFDwcCwBtgKnbRWzLi2cwGP9yg/exec";

export async function getProducts(): Promise<Product[]> {
  // Al ejecutarse en el servidor, no hay error de CORS
  const res = await fetch(GOOGLE_SCRIPT_URL, {
    cache: 'no-store' // Para que siempre traiga los datos frescos mientras desarrollas
  });

  if (!res.ok) throw new Error("Error en la red");
  
  const data = await res.json();
  return data.map((p: any) => ({
    ...p,
    precio: Number(p.precio) || 0
  }));
}