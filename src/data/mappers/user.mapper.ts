import { User } from "../../domain/entities/user";
import { LoginResponse } from "../source/remote/interface/backendApi.interface";

export class UserMapper{
    static async userApiToUserEntity(data:LoginResponse):Promise<User>{
        return{
            nombreCompleto: data.fullname,
            correo: data.email
        }
    }
}