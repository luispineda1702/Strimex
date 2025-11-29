import { useEffect, useState } from "react";
import { FavoritesAPI } from "../../data/source/remote/api/favorites.api";
import { StorageAdapter } from "../../data/source/local/storage.adapter";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      setLoading(true);

      const token = await StorageAdapter.getItem("token");
      if (!token) {
        console.log("⚠ No hay token, no cargamos favoritos aún");
        setFavorites([]);
        return;
      }

      const data = await FavoritesAPI.getFavorites();
      setFavorites(data);
    } catch (err) {
      console.log("Error cargando favoritos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    loading,
    loadFavorites,
    isFavorite: (id: number) => favorites.some(f => f.mediaId === id),
    toggleFavorite: async (item: any) => {
      try {
        const token = await StorageAdapter.getItem("token");
        if (!token) {
          console.log("❌ No hay token, usuario no autenticado");
          return;
        }

        if (favorites.some(f => f.mediaId === item.id)) {
          await FavoritesAPI.removeFavorite(item.id, item.mediaType);
        } else {
          await FavoritesAPI.addFavorite(item.id, item.mediaType);
        }

        loadFavorites();
      } catch (err) {
        console.log("Error toggling favorites:", err);
      }
    },
  };
};
