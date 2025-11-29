export interface User {
  token: string;                 // JWT del backend
  correo: string;                // email del usuario
  nombreCompleto: string;        // fullname del backend
  avatar: string | null;         // avatar opcional
}
