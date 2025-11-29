import { backendApi } from "./backendApi";

export const ProvidersAPI = {
  getProviders: async (id: number, type: "movie" | "tv") => {
    const { data } = await backendApi.get(`/media/${id}/providers?type=${type}`);
    return data;
  },
};
