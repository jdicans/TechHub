import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AlertService } from '../../../../shared/services/alert.service';

interface OpcionSettings {
  titulo: string;
  descripcion: string;
  icon: string;
  ruta: string;
  color: string;
  disponible: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent implements OnInit {
  opciones: OpcionSettings[] = [
    {
      titulo: 'Mi Perfil',
      descripcion: 'Ver y editar tu información personal',
      icon: 'user',
      ruta: '/settings/perfil',
      color: 'primary',
      disponible: true
    },
    {
      titulo: 'Notificaciones',
      descripcion: 'Gestiona tus preferencias de notificaciones',
      icon: 'bell',
      ruta: '/settings/notificaciones',
      color: 'primary',
      disponible: true
    },
    {
      titulo: 'Privacidad',
      descripcion: 'Controla quién puede ver tu información',
      icon: 'shield',
      ruta: '/settings/privacidad',
      color: 'success',
      disponible: true
    },
    {
      titulo: 'Cambiar Contraseña',
      descripcion: 'Actualiza tu contraseña de acceso',
      icon: 'lock',
      ruta: '/settings/password',
      color: 'warning',
      disponible: true
    },
    {
      titulo: 'Tema',
      descripcion: 'Personaliza la apariencia de la aplicación',
      icon: 'palette',
      ruta: '/settings/tema',
      color: 'info',
      disponible: true
    }
  ];

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    // Mostrar popup informativo al cargar la página
    this.mostrarInfoDesarrollo();
  }

  async mostrarInfoDesarrollo(): Promise<void> {
    await this.alertService.info(
      '🎨 Estado de los Módulos',
      `
        <div style="text-align: left;">
          <p style="margin-bottom: 12px;"><strong>Módulos Completos y Funcionales:</strong></p>
          <ul style="margin: 0 0 16px 20px; padding: 0;">
            <li style="margin-bottom: 8px;">✅ <strong>Mi Perfil</strong> - Ver y editar tu información</li>
            <li style="margin-bottom: 8px;">✅ <strong>Cambiar Contraseña</strong> - Actualizar contraseña de acceso</li>
          </ul>
          
          <p style="margin-bottom: 12px;"><strong>En Construcción (Puedes explorarlos):</strong></p>
          <ul style="margin: 0 0 16px 20px; padding: 0;">
            <li style="margin-bottom: 8px;">🔧 <strong>Notificaciones</strong> - Vista en desarrollo</li>
            <li style="margin-bottom: 8px;">🔧 <strong>Privacidad</strong> - Vista en desarrollo</li>
            <li style="margin-bottom: 8px;">🔧 <strong>Tema</strong> - Vista en desarrollo</li>
          </ul>
          
          <p style="margin-top: 16px; color: #6b7280; font-size: 14px;">
            <em>Puedes navegar por todos los módulos para ver el progreso del diseño.</em>
          </p>
        </div>
      `,
      true  // Indicar que es contenido HTML
    );
  }

  navegarA(opcion: OpcionSettings): void {
    // Permitir navegación a todos los módulos
    this.router.navigate([opcion.ruta]);
  }

  volverHome(): void {
    this.router.navigate(['/home']);
  }
}
