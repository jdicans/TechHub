import { Injectable } from '@angular/core';
import apiClient from 'src/shared/services/api-client';
import { UsuarioSinContrasena } from '../../auth/models/usuario.model';

export interface ActualizarPerfilRequest {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  carrera?: string;
  foto_perfil?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  // Obtener el perfil del usuario actual
  async obtenerPerfil(): Promise<UsuarioSinContrasena> {
    try {
      const response = await apiClient.get('/usuarios/profile');
      console.log('📡 Respuesta de la API:', response);
      console.log('📡 response.data:', response.data);
      
      // La API devuelve { success: true, data: { ...usuario } }
      if (response.data && response.data.data) {
        console.log('✅ Datos del usuario:', response.data.data);
        return response.data.data;
      }
      
      // Si la estructura es diferente, devolver response.data directamente
      console.log('✅ Devolviendo response.data directamente');
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener el perfil:', error);
      throw error;
    }
  }

  // Actualizar el perfil del usuario (necesita el ID del usuario)
  async actualizarPerfil(idUsuario: number, data: ActualizarPerfilRequest): Promise<UsuarioSinContrasena> {
    try {
      const response = await apiClient.put(`/usuarios/${idUsuario}`, data);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      throw error;
    }
  }

  // Cambiar la contraseña del usuario
  async cambiarContrasena(contrasenaActual: string, contrasenaNueva: string): Promise<void> {
    try {
      console.log('🔐 Servicio: Enviando solicitud de cambio de contraseña...');
      
      const response = await apiClient.put('/usuarios/change-password', {
        contrasenaActual,
        contrasenaNueva
      });

      console.log('✅ Servicio: Contraseña cambiada exitosamente', response.data);
      
      // La API podría devolver { success: true, message: "..." } o similar
      return response.data;
    } catch (error: any) {
      console.error('❌ Servicio: Error al cambiar la contraseña:', error);
      console.error('❌ Error response:', error.response?.data);
      throw error;
    }
  }

  // Subir foto de perfil
  async subirFotoPerfil(archivo: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('foto', archivo);
      
      // Nota: Este endpoint podría requerir una configuración diferente para FormData
      const response = await fetch(`${apiClient}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al subir la foto');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error al subir la foto de perfil:', error);
      throw error;
    }
  }
}
