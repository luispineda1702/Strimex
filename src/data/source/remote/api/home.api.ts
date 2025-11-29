import { backendApi } from "./backendApi";

export const HomeAPI = {
  getHome: async () => {
    const { data } = await backendApi.get("/home");
    return data;
  },
};
