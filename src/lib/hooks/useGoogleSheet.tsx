import { useState, useEffect } from "react";

// La <T> significa "Tipo Genérico". Le diremos qué forma tiene la data cuando usemos el hook.
export function useGoogleSheet<T>(url: string | undefined) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si no hay URL configurada, cortamos acá
    if (!url) {
      setIsLoading(false);
      setError("No hay URL configurada para el catálogo.");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, { redirect: "follow" });
        if (!response.ok)
          throw new Error("Error al conectar con la base de datos");

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error en useGoogleSheet:", err);
        setError("Hubo un problema al cargar el catálogo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
