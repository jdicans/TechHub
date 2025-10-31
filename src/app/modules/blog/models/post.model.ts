export interface Post {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  autor: Autor;
  categoria: string;
  tags: string[];
  imagen: string;
  likes: number;
  comentariosList: Comentario[];
  vistas: number;
  fecha: Date;
}

export interface Autor {
  id: string;
  nombre: string;
  avatar: string;
  bio?: string;
}

export interface Comentario {
  id: string;
  autor: Autor;
  contenido: string;
  fecha: Date;
}
