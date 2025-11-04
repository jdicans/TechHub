// Interfaces para Publicaciones
export interface Publicacion {
  id_publicacion: number;
  titulo: string;
  contenido: string;
  fecha_creacion: string;
  id_usuario: number;
  id_categoria: number;
  tipo?: string;
  usuario?: Usuario;
  categoria?: Categoria;
  etiquetas?: Etiqueta[];
}

export interface PublicacionCreate {
  titulo: string;
  contenido: string;
  id_categoria: number;
  tipo?: string;
  etiquetas?: number[];
}

export interface PublicacionUpdate {
  titulo?: string;
  contenido?: string;
  id_categoria?: number;
  tipo?: string;
  etiquetas?: number[];
}

// Interfaces para Comentarios
export interface Comentario {
  id_comentario: number;
  contenido: string;
  fecha: string;
  id_usuario: number;
  id_publicacion: number;
  usuario?: Usuario;
}

export interface ComentarioCreate {
  contenido: string;
  id_publicacion: number;
}

export interface ComentarioUpdate {
  contenido: string;
}

// Interfaces para Etiquetas
export interface Etiqueta {
  id_etiqueta: number;
  nombre: string;
  descripcion?: string;
}

export interface EtiquetaCreate {
  nombre: string;
  descripcion?: string;
}

export interface EtiquetaUpdate {
  nombre?: string;
  descripcion?: string;
}

// Interface para Usuario (relación)
export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  foto_perfil?: string;
}

// Interface para Categoria (relación)
export interface Categoria {
  id_categoria: number;
  nombre: string;
}
