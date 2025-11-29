import { AuthAPI } from "../../data/source/remote/api/auth.api";
import { StorageAdapter } from "../../data/source/local/storage.adapter";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../presentation/config/firebase";

export const LoginUseCase = async (email: string, password: string) => {

  const fbCred = await signInWithEmailAndPassword(auth, email, password);
  const firebaseToken = await fbCred.user.getIdToken();

  const backendUser = await AuthAPI.login(firebaseToken);

  await StorageAdapter.setItem("token", backendUser.token);
  console.log("TOKEN BACKEND:", backendUser.token);
  return backendUser;
  
};
