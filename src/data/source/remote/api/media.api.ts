import { backendApi } from "./backendApi";

export const MediaAPI = {
  getByGenre: async (type: "movie" | "tv", genreId: number) => {
    const { data } = await backendApi.get(`/media/genre/${genreId}?type=${type}`);
    return data;
  },
};
