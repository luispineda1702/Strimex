// src/presentation/hooks/useMediaByGenre.ts
import { useEffect, useState } from "react";
import { MediaAPI } from "../../data/source/remote/api/media.api";

export const useMediaByGenre = (type: "movie" | "tv") => {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<any[]>([]);

  const GENRES = type === "movie"
    ? [
        { id: 28, name: "Acción" },
        { id: 35, name: "Comedia" },
        { id: 18, name: "Drama" },
        { id: 27, name: "Terror" },
        { id: 878, name: "Ciencia Ficción" },
      ]
    : [
        { id: 10759, name: "Acción y Aventura" },
        { id: 35, name: "Comedia" },
        { id: 18, name: "Drama" },
        { id: 10765, name: "Fantasía" },
        { id: 9648, name: "Misterio" },
      ];

  const loadGenres = async () => {
    try {
      setLoading(true);

      const promises = GENRES.map(async g => {
        const items = await MediaAPI.getByGenre(type, g.id);
        return {
          genre: g.name,
          items: items.map(i => ({
            id: i.id,
            title: i.title,
            poster: i.poster,
            rating: i.rating,
            overview: i.overview,
            mediaType: type,
          })),
        };
      });

      const results = await Promise.all(promises);
      setSections(results);

    } catch (err) {
      console.log("Error cargando géneros:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  return { loading, sections };
};
