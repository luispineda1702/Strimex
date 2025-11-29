import { backendApi } from "./backendApi";

export const AuthAPI = {
  login: async (firebaseToken: string) => {
    const { data } = await backendApi.post("/auth/login", { firebaseToken });
    
    return {
      token: data.token,
      correo: data.email,
      nombreCompleto: data.fullname,
      avatar: data.avatar ?? null,
    };
  },

  register: async (firebaseToken: string, name: string) => {
    const { data } = await backendApi.post(
      "/auth/register",
      { name },
      {
        headers: { Authorization: `Bearer ${firebaseToken}` },
      }
    );

    return data;
  },

  validateToken: async (token: string) => {
    try {
      const { data } = await backendApi.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        token,
        correo: data.email,
        nombreCompleto: data.name,
        avatar: data.avatar ?? null,
      };
    } catch (_) {
      return null;
    }
  },
};
