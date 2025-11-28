// presentation/hooks/useAuth.tsx
import { create } from "zustand";
import { User } from "../../domain/entities/user";
import { StorageAdapter } from "../../data/source/local/storage.adapter";
import { LoginUseCase } from "../../domain/useCases/login.usecase";
import { AuthAPI } from "../../data/source/remote/api/auth.api"; // tu adapter para validateToken

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<any>;
  checkStatus: () => Promise<any>;
  logout: () => Promise<any>;
}

export const useAuth = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    try {
      // 1) Ejecutar el caso de uso (internamente hará Firebase + backend validate)
      const user = await LoginUseCase(email, password);

      
      const token = await StorageAdapter.getItem("token");

      // Si no hay token (por implementación anterior), no es crítico; guardamos user y status.
      await StorageAdapter.setItem("email", user.correo);
      await StorageAdapter.setItem("fullName", user.nombreCompleto);
      if (token) await StorageAdapter.setItem("token", token);

      set({
        status: "authenticated",
        token: token || undefined,
        user,
      });

      return user;
    } catch (err) {
      console.log("Login error in useAuth:", err);
      set({
        status: "unauthenticated",
        token: undefined,
        user: undefined,
      });
      return null;
    }
  },

  checkStatus: async () => {
    try {
      const token = await StorageAdapter.getItem("token");
      if (!token) {
        // No token -> no auth
        set({
          status: "unauthenticated",
          token: undefined,
          user: undefined,
        });
        return;
      }

      // Validar token contra backend
      const backendUser = await AuthAPI.validateToken(token);
      if (!backendUser) {
        await get().logout();
        return;
      }

      await StorageAdapter.setItem("email", backendUser.correo);
      await StorageAdapter.setItem("fullName", backendUser.nombreCompleto);

      set({
        status: "authenticated",
        token,
        user: backendUser,
      });
    } catch (err) {
      console.log("checkStatus error:", err);
      await get().logout();
    }
  },

  logout: async () => {
    // Hacer logout local
    await StorageAdapter.removeItem("token");
    await StorageAdapter.removeItem("email");
    await StorageAdapter.removeItem("fullName");

    // Opcional: también cerrar sesión en Firebase
    try {
      // Import dinámico para evitar ciclos: require firebase here
      const { signOut } = require("firebase/auth");
      const { auth } = require("../../presentation/config/firebase");
      await signOut(auth);
    } catch (e) {
      // no crítico si falla
    }

    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined,
    });
  },
}));
