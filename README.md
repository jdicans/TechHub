# 🚀 TechHub

Plataforma de comunidad tecnológica moderna construida con Angular 20+

![Angular](https://img.shields.io/badge/Angular-20.3-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Descripción

TechHub es una plataforma integral para comunidades tecnológicas que incluye:

- 📅 **Eventos**: Gestión de eventos y talleres tecnológicos
- 💡 **Emprendimientos**: Showcase de proyectos e ideas innovadoras
- 📝 **Blog**: Artículos y noticias de la comunidad
- 👥 **Comunidad**: Red de contactos y networking
- 📊 **Dashboard**: Panel de control con métricas y actividad
- 👤 **Perfil**: Gestión de perfil personal

## ✨ Características

### Diseño y UX
- ✅ Diseño minimalista y moderno
- ✅ Totalmente responsive (móvil, tablet, desktop)
- ✅ Sistema de diseño con variables CSS
- ✅ Iconos con Lucide Angular
- ✅ Alertas modernas con SweetAlert2
- ✅ Skeleton loaders para mejor UX
- ✅ Animaciones suaves y transiciones

### Arquitectura
- ✅ Componentes standalone y modulares
- ✅ Lazy loading de módulos
- ✅ Pipes personalizados (timeAgo, truncate, safeHtml)
- ✅ Directivas reutilizables (lazyLoad, autoFocus, clickOutside)
- ✅ Manejo global de errores
- ✅ Servicio de almacenamiento seguro
- ✅ Constantes centralizadas

### Optimización
- ✅ Build optimizado para producción
- ✅ Tree shaking
- ✅ Minificación de assets
- ✅ Lazy loading de imágenes
- ✅ Bundle size optimizado

## 🛠️ Tecnologías

- **Framework**: Angular 20.3
- **Language**: TypeScript 5.x
- **Styling**: CSS moderno con variables
- **Icons**: Lucide Angular
- **Alerts**: SweetAlert2
- **Router**: Angular Router con lazy loading
- **Forms**: Reactive Forms
- **HTTP**: HttpClient (preparado para API)

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm 9+

### Pasos

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd TechHub
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm start
```

4. Abrir navegador en:
```
http://localhost:4200
```

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm start                 # Inicia servidor de desarrollo
npm run watch            # Modo watch

# Build
npm run build            # Build de producción
npm run build -- --configuration development  # Build de desarrollo

# Tests
npm test                 # Ejecuta tests unitarios
npm run test:headless    # Tests en modo headless

# Code Quality
npm run lint             # Verifica código con ESLint
```

## 📁 Estructura del Proyecto

```
TechHub/
├── src/
│   ├── app/
│   │   ├── modules/           # Módulos de la aplicación
│   │   │   ├── auth/          # Autenticación
│   │   │   ├── home/          # Layout principal
│   │   │   ├── dashboard/     # Panel de control
│   │   │   ├── eventos/       # Gestión de eventos
│   │   │   ├── emprendimientos/  # Proyectos
│   │   │   ├── blog/          # Blog y artículos
│   │   │   ├── comunidad/     # Red social
│   │   │   └── perfil/        # Perfil de usuario
│   │   ├── shared/            # Recursos compartidos
│   │   │   ├── animations/    # Animaciones reutilizables
│   │   │   ├── components/    # Componentes compartidos
│   │   │   ├── constants/     # Constantes de la app
│   │   │   ├── directives/    # Directivas personalizadas
│   │   │   ├── models/        # Interfaces y tipos
│   │   │   ├── pipes/         # Pipes personalizados
│   │   │   └── services/      # Servicios compartidos
│   │   └── app.routes.ts      # Configuración de rutas
│   ├── styles.css             # Estilos globales
│   └── index.html             # HTML principal
├── angular.json               # Configuración de Angular
├── package.json               # Dependencias
└── tsconfig.json              # Configuración de TypeScript
```

## 🎨 Sistema de Diseño

### Variables CSS

El proyecto utiliza un sistema de variables CSS centralizado:

```css
/* Colores principales */
--primary: #2563eb
--success: #10b981
--warning: #f59e0b
--danger: #ef4444

/* Espaciado */
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px

/* Tipografía */
--font-size-sm: 0.875rem
--font-size-base: 1rem
--font-size-lg: 1.125rem
--font-size-xl: 1.25rem
```

### Componentes Reutilizables

#### Skeleton Loader
```html
<app-skeleton-loader 
  type="card" 
  [count]="3"
  height="200px">
</app-skeleton-loader>
```

#### Pipes
```html
<!-- TimeAgo -->
{{ fecha | timeAgo }}

<!-- Truncate -->
{{ texto | truncate:100 }}
```

#### Directivas
```html
<!-- Lazy Load -->
<img [appLazyLoad]="imageUrl" alt="imagen">

<!-- Auto Focus -->
<input appAutoFocus type="text">

<!-- Click Outside -->
<div (appClickOutside)="cerrarModal()">
  Contenido del modal
</div>
```

## 🔐 Preparación para API

El proyecto está preparado para conectar con una API REST:

### Servicios Base
- `AlertService`: Manejo de alertas y notificaciones
- `StorageService`: Almacenamiento seguro local/session
- `GlobalErrorHandler`: Manejo centralizado de errores

### Modelos de API
```typescript
// ApiResponse genérico
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Paginación
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### Constantes API
```typescript
// src/app/shared/constants/app.constants.ts
export const API_ENDPOINTS = {
  AUTH: { LOGIN: '/api/auth/login', ... },
  EVENTOS: { LIST: '/api/eventos', ... },
  // ... más endpoints
};
```

## 🚧 Próximos Pasos

### Para Conectar con API:

1. **Crear Environment Files**
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

2. **Crear HttpInterceptor**
   - Agregar tokens de autenticación
   - Manejo centralizado de errores HTTP
   - Loading state global

3. **Crear AuthGuard**
   - Protección de rutas
   - Redirección si no autenticado

4. **Crear AuthService Real**
   - Login/Registro con API
   - Gestión de tokens
   - Refresh token

5. **Actualizar Servicios**
   - Reemplazar datos mock con llamadas HTTP
   - Implementar CRUD completo

## 📝 Convenciones de Código

- **Componentes**: PascalCase (ej: `Dashboard`, `EventosComponent`)
- **Archivos**: kebab-case (ej: `eventos.service.ts`, `blog-module.ts`)
- **Variables**: camelCase (ej: `mostrarFormulario`, `eventosService`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `API_URL`, `MAX_LENGTH`)
- **Interfaces**: PascalCase con 'I' opcional (ej: `User`, `IEvento`)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- **TechHub Team** - *Desarrollo inicial*

## 🙏 Agradecimientos

- Angular Team
- Lucide Icons
- SweetAlert2
- Comunidad de desarrolladores

---

**Hecho con ❤️ y Angular**
