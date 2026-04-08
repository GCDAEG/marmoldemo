export type NavSection = {
  id: string;
  label: string;
  href?: string;
};

export const sections: NavSection[] = [
  {
    id: "hero",
    label: "Inicio",
  },
  {
    id: "catalog",
    label: "Catálogo", // O "Productos" / "Materiales"
  },
  {
    id: "como-trabajamos",
    label: "Proceso",
  },
  {
    id: "nosotros",
    label: "Nosotros",
  },
];
