import { backendApi } from "./backendApi";
import { StorageAdapter } from "../../local/storage.adapter";

export const FavoritesAPI = {
  getFavorites: async () => {
    const token = await StorageAdapter.getItem("token");
    console.log("TOKEN FAVORITES:", token);
    
    const { data } = await backendApi.get("/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },

  addFavorite: async (mediaId: number, mediaType: string) => {
    const token = await StorageAdapter.getItem("token");

    const { data } = await backendApi.post(
      "/favorites",
      { mediaId, mediaType },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  },

  removeFavorite: async (mediaId: number, mediaType: string) => {
    const token = await StorageAdapter.getItem("token");

    const { data } = await backendApi.delete("/favorites", {
      data: { mediaId, mediaType },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    

    return data;
  },
};
