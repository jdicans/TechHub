export interface User {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  rol?: string;
  bio?: string;
  ubicacion?: string;
  empresa?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  skills?: string[];
  intereses?: string[];
  fechaRegistro?: Date;
  ultimoAcceso?: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  token: AuthToken;
}
