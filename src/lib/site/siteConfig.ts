// /src/lib/config/tuwebhoy-marmol.ts

export const siteConfig = {
  // 1. Identidad Visual y Marca
  brand: {
    name: "EJEMPLO",
    suffix: "ARG", // O "Gchú"
    logo: "/logos/marmoles-logo.png",
    theme: "elegant", 
    colors: {
      primary: "#2563eb",   // Azul que transmite confianza y construcción
      secondary: "#4b5563", // Gris neutro para textos
      accent: "#f3f4f6"     // Fondo sutil
    }
  },

  // 2. Textos Principales (Landing Page)
  hero: {
    badge: "text of the printing and typesettin",
    title: "Lorem Ipsum is simply dummy text of",
    subtitle: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
    buttonText: "remaining essentially unchanged",
    bgImage: "/images/hero-marmol.jpg", 
    
    // Estas categorías se usan en los filtros del catálogo y en la marquesina del Footer
    
  },
categories: ["Todos", "Ejemplo 1", "Ejemplo 2"],
  // 3. Funcionalidades y Datos Comerciales
  features: {
    hasFilters: true,
    hasCart: true,
    whatsappNumber: "5493446123456", // Reemplazar por el del cliente
    deliveryInfo: "Medición, corte e instalación en Gualeguaychú y zona de influencia.",
    openingHours: "Lun a Vie: 08:00 a 17:00 / Sáb: 08:30 a 12:30"
  },

  // 4. CONEXIÓN A LA BASE DE DATOS (Google Sheets)
  // URL generada desde Google Apps Script para este cliente específico
  databaseUrl: "https://script.google.com/macros/s/AKfycbwUm-Wb2BDf8ltibLk4mqkMc2rBwAeSutjZyWbkGfm85hjZcICG_u6yYAw3bG37bDZJ/exec",
};