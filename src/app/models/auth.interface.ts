export interface AuthResponse {
  token?: string;
}

export interface TokenValidation {
  username?: string;
  roles?: string;
}

export interface Usuario {
  id?: number;
  nombreUsuario: string;
  contrasena: string;
  email?: string;
  lastLogin?:string
}

export interface NuevoUsuario {
  nombreUsuario: string;
  contrasena: string;
  email: string;
}
