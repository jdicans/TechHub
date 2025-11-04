export interface Grupo {
  id_grupo: number;
  nombre: string;
  descripcion?: string;
  fecha_creacion: string;
  miembros?: Miembro[];
  total_miembros: number;
}

export interface GrupoCreate {
  nombre: string;
  descripcion?: string;
}

export interface GrupoUpdate {
  nombre?: string;
  descripcion?: string;
}

export interface Miembro {
  id_usuario: number;
  nombre: string;
  apellido: string;
  foto_perfil?: string;
  rol_grupo: 'administrador' | 'moderador' | 'miembro';
  fecha_union: string;
}

export interface MiembroCreate {
  id_usuario: number;
  rol_grupo?: 'administrador' | 'moderador' | 'miembro';
}

export interface MiembroRolUpdate {
  rol_grupo: 'administrador' | 'moderador' | 'miembro';
}

export interface MiembrosCount {
  count: number;
}
