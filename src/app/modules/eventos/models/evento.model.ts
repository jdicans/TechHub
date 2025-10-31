export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: Date;
  hora: string;
  ubicacion: string;
  categoria: CategoriaEvento;
  organizador: string;
  capacidadMaxima: number;
  inscritos: string[]; // IDs de usuarios inscritos
  likes: string[]; // IDs de usuarios que dieron like
  imagen?: string;
  createdAt: Date;
}

export enum CategoriaEvento {
  TECNOLOGIA = 'Tecnología',
  NETWORKING = 'Networking',
  TALLER = 'Taller',
  CONFERENCIA = 'Conferencia',
  HACKATHON = 'Hackathon',
  MEETUP = 'Meetup',
  SOCIAL = 'Social',
  OTRO = 'Otro'
}

export interface FiltroEventos {
  categoria?: CategoriaEvento;
  busqueda?: string;
  fechaDesde?: Date;
  fechaHasta?: Date;
}
