import { UserRepositoryImpl } from "../../data/repositories/UserRepositoryImpl";

export const LoginUseCase = async (email: string, password: string) => {
  const repo = new UserRepositoryImpl();
  return await repo.login(email, password); // ahora devuelve { user, token }
};
