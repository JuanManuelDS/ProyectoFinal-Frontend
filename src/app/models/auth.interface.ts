export interface AuthResponse {
    token?: string;
  }
  
  export interface TokenValidation {
    username?: string;
    roles?: string;
  }
  
  export interface Usuario {
    nombreUsuario: string;
    contrasena: string;
  }