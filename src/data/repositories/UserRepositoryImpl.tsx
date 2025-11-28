import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.Repository";
import { UserMapper } from "../mappers/user.mapper";
import { backendApi } from "../source/remote/api/backendApi";
import { LoginResponse } from "../source/remote/interface/backendApi.interface";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../presentation/config/firebase";

export class UserRepositoryImpl implements UserRepository {

  async login(email: string, password: string): Promise<{ user: User; token: string }> {

    // 1) Login en Firebase
    const firebaseResp = await signInWithEmailAndPassword(auth, email, password);

    // 2) Obtener idToken
    const idToken = await firebaseResp.user.getIdToken();

    // 3) Validar token en backend
    const { data } = await backendApi.post<LoginResponse>(
      "/auth/validate",
      {},
      { headers: { Authorization: `Bearer ${idToken}` } }
    );

    // 4) Mapear a Usuario de tu dominio
    const userEntity = await UserMapper.userApiToUserEntity(data);

    // 5) Retornar token + user
    return { user: userEntity, token: idToken };
  }

  async create(email: string, password: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
