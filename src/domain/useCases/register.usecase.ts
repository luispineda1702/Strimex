import { AuthAPI } from "../../data/source/remote/api/auth.api";
import { User } from "../entities/user";

export const RegisterUseCase = async (
  firebaseToken: string,
  name: string
): Promise<User> => {

  const backendUser = await AuthAPI.register(firebaseToken, name);

  if (!backendUser) {
    throw new Error("Error registrando usuario en backend");
  }

  const user: User = {
    token: backendUser.token,
    correo: backendUser.email,
    nombreCompleto: backendUser.fullname,
    avatar: backendUser.avatar ?? null,
  };

  return user;
};
