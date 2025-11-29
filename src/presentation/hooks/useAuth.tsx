// src/presentation/hooks/useAuth.tsx

import { create } from "zustand";
import { User } from "../../domain/entities/user";
import { StorageAdapter } from "../../data/source/local/storage.adapter";
import { LoginUseCase } from "../../domain/useCases/login.usecase";
import { AuthAPI } from "../../data/source/remote/api/auth.api";

import { signOut } from "firebase/auth";
import { auth } from "../../presentation/config/firebase";

// ----------------------------
// TIPOS
// ----------------------------
export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<User | null>;
  register: (firebaseToken: string, name: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

// ----------------------------
// STORE DE ZUSTAND
// ----------------------------
export const useAuth = create<AuthState>()((set, get) => ({

  status: "checking",
  token: undefined,
  user: undefined,

  //----------------------------------
  // LOGIN
  //----------------------------------
  login: async (email: string, password: string) => {
    try {
      const user = await LoginUseCase(email, password);

      await StorageAdapter.setItem("token", user.token);
      await StorageAdapter.setItem("email", user.correo);
      await StorageAdapter.setItem("fullName", user.nombreCompleto);

      set({
        status: "authenticated",
        token: user.token,
        user,
      });

      return user;
    } catch (err) {
      console.log("Login error:", err);

      set({
        status: "unauthenticated",
        token: undefined,
        user: undefined,
      });

      return null;
    }
  },

  //----------------------------------
  // REGISTRO → firebase → backend
  //----------------------------------
  register: async (firebaseToken: string, name: string) => {
    try {
      await AuthAPI.register(firebaseToken, name);
      return true;
    } catch (err) {
      console.log("Register error:", err);
      return false;
    }
  },

  checkStatus: async () => {
    const token = await StorageAdapter.getItem("token");

    if (!token) {
      set({ status: "unauthenticated", user: undefined, token: undefined });
      return;
    }

    const backendUser = await AuthAPI.validateToken(token);

    if (!backendUser) {
      await get().logout();
      return;
    }

    const user: User = {
      token,
      correo: backendUser.email,
      nombreCompleto: backendUser.fullname,
      avatar: backendUser.avatar ?? null,
    };

    set({
      status: "authenticated",
      token,
      user,
    });
  },

  logout: async () => {
    await StorageAdapter.removeItem("token");
    await StorageAdapter.removeItem("email");
    await StorageAdapter.removeItem("fullName");

    try {
      await signOut(auth);
    } catch (_) {}

    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined,
    });
  },

}));
