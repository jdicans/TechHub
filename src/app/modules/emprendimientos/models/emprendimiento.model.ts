export interface Emprendimiento {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: CategoriaEmprendimiento;
  etapa: EtapaEmprendimiento;
  creador: Creador;
  descripcionDetallada: string;
  problema: string;
  solucion: string;
  mercadoObjetivo: string;
  propuestaValor: string;
  equipoRequerido: string[];
  tecnologias: string[];
  buscoInversion: boolean;
  montoInversion?: number;
  buscoColaboradores: boolean;
  website?: string;
  email?: string;
  telefono?: string;
  redesSociales?: RedesSociales;
  imagen?: string;
  galeria?: string[];
  likes: string[]; // IDs de usuarios que dieron like
  vistas: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Creador {
  id: string;
  nombre: string;
  avatar?: string;
  email: string;
}

export interface RedesSociales {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

export enum CategoriaEmprendimiento {
  TECNOLOGIA = 'Tecnología',
  SALUD = 'Salud',
  EDUCACION = 'Educación',
  FINTECH = 'Fintech',
  ECOMMERCE = 'E-commerce',
  AGRICULTURA = 'Agricultura',
  LOGISTICA = 'Logística',
  ENTRETENIMIENTO = 'Entretenimiento',
  SOSTENIBILIDAD = 'Sostenibilidad',
  SERVICIOS = 'Servicios',
  OTRO = 'Otro'
}

export enum EtapaEmprendimiento {
  IDEA = 'Idea',
  VALIDACION = 'Validación',
  MVP = 'MVP',
  TRACCION = 'Tracción',
  CRECIMIENTO = 'Crecimiento',
  ESCALAMIENTO = 'Escalamiento'
}

export interface FiltroEmprendimientos {
  categoria?: CategoriaEmprendimiento;
  etapa?: EtapaEmprendimiento;
  busqueda?: string;
  buscoInversion?: boolean;
  buscoColaboradores?: boolean;
}
