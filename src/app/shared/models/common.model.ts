export interface Creador {
  id: string;
  nombre: string;
  avatar: string;
  email?: string;
}

export interface Comentario {
  id: string;
  autor: Creador;
  contenido: string;
  fecha: Date;
  likes?: number;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ToastConfig {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface BreadcrumbItem {
  label: string;
  url?: string;
  active?: boolean;
}
