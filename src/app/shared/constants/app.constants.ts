export const APP_CONFIG = {
  name: 'TechHub',
  version: '1.0.0',
  description: 'Plataforma de comunidad tecnológica'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'techhub_token',
  REFRESH_TOKEN: 'techhub_refresh_token',
  USER_DATA: 'techhub_user',
  THEME: 'techhub_theme',
  LANGUAGE: 'techhub_language'
};

export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'EEEE, d MMMM yyyy',
  TIME: 'HH:mm',
  DATETIME: 'dd/MM/yyyy HH:mm',
  ISO: 'yyyy-MM-dd'
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_PAGE_SIZE: 100
};

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 50,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 30,
  MAX_BIO_LENGTH: 500,
  MAX_COMMENT_LENGTH: 1000
};

export const HTTP_TIMEOUT = 30000; // 30 segundos

export const DEBOUNCE_TIME = 300; // milisegundos

export const TOAST_DURATION = 3000; // milisegundos

export const ROUTES = {
  AUTH: '/auth',
  HOME: '/home',
  DASHBOARD: '/home/dashboard',
  EVENTOS: '/home/eventos',
  EMPRENDIMIENTOS: '/home/emprendimientos',
  BLOG: '/home/blog',
  COMUNIDAD: '/home/comunidad',
  PERFIL: '/home/perfil'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    PROFILE: '/api/auth/profile'
  },
  EVENTOS: {
    LIST: '/api/eventos',
    CREATE: '/api/eventos',
    UPDATE: '/api/eventos/:id',
    DELETE: '/api/eventos/:id',
    INSCRIBIR: '/api/eventos/:id/inscribir',
    DESINSCRIBIR: '/api/eventos/:id/desinscribir'
  },
  EMPRENDIMIENTOS: {
    LIST: '/api/emprendimientos',
    CREATE: '/api/emprendimientos',
    UPDATE: '/api/emprendimientos/:id',
    DELETE: '/api/emprendimientos/:id'
  },
  BLOG: {
    LIST: '/api/posts',
    CREATE: '/api/posts',
    UPDATE: '/api/posts/:id',
    DELETE: '/api/posts/:id',
    COMMENT: '/api/posts/:id/comentarios'
  },
  COMUNIDAD: {
    LIST: '/api/usuarios',
    CONECTAR: '/api/usuarios/:id/conectar',
    DESCONECTAR: '/api/usuarios/:id/desconectar'
  }
};

export const ERROR_MESSAGES = {
  GENERIC: 'Ha ocurrido un error. Por favor, intenta de nuevo.',
  NETWORK: 'Error de conexión. Verifica tu conexión a internet.',
  UNAUTHORIZED: 'No tienes autorización para realizar esta acción.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  SERVER_ERROR: 'Error del servidor. Por favor, intenta más tarde.',
  VALIDATION: 'Los datos proporcionados no son válidos.'
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Creado exitosamente',
  UPDATED: 'Actualizado exitosamente',
  DELETED: 'Eliminado exitosamente',
  SAVED: 'Guardado exitosamente'
};
