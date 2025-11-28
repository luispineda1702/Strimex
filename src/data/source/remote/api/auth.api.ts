import { backendApi } from "./backendApi";

export const AuthAPI = {
  validateToken: async (token: string) => {
    try {
      const resp = await backendApi.post(
        "/auth/validate", 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      return resp.data;
    } catch (error) {
      return null;
    }
  }
};
