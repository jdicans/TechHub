import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  menuItemsPrincipales: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'home',
      route: 'dashboard',
      description: 'Inicio'
    },
    {
      label: 'Eventos',
      icon: 'calendar',
      route: 'eventos',
      description: 'Eventos y talleres'
    },
    {
      label: 'Emprendimientos',
      icon: 'lightbulb',
      route: 'emprendimientos',
      description: 'Proyectos e ideas'
    },
    {
      label: 'Grupos de Estudio',
      icon: 'users-round',
      route: 'grupos',
      description: 'Comunidades de aprendizaje'
    },
    {
      label: 'Blog',
      icon: 'file-text',
      route: 'blog',
      description: 'Artículos y noticias'
    },
    {
      label: 'Comunidad',
      icon: 'users',
      route: 'comunidad',
      description: 'Red de contactos'
    }
  ];

  menuItemsCuenta: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'user',
      route: '/settings/perfil',
      description: 'Mi perfil'
    },
    {
      label: 'Configuración',
      icon: 'settings',
      route: '/settings',
      description: 'Ajustes y privacidad'
    }
  ];

  mostrarMenuMovil = false;
  menuColapsado = false;
  usuarioActual = {
    nombre: 'Usuario Tech',
    avatar: 'JD'
  };

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {}

  toggleMenuDesktop(): void {
    this.menuColapsado = !this.menuColapsado;
  }

  toggleMenuMovil(): void {
    this.mostrarMenuMovil = !this.mostrarMenuMovil;
  }

  cerrarSesion(): void {
    this.alertService.confirm(
      '¿Cerrar sesión?',
      '¿Estás seguro de que deseas cerrar sesión?',
      'Sí, cerrar sesión'
    ).then((result) => {
      if (result.isConfirmed) {
        // Limpiar almacenamiento
        try {
          localStorage.clear();
          sessionStorage.clear();
        } catch (e) {
          console.error('Error limpiando storage:', e);
        }

        // Navegar directamente a auth
        this.router.navigateByUrl('/auth', { replaceUrl: true }).then(() => {
          // Forzar recarga
          window.location.href = '/auth';
        }).catch(err => {
          console.error('Error en navegación:', err);
          // Fallback: navegar directamente
          window.location.href = '/auth';
        });
      }
    });
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}
