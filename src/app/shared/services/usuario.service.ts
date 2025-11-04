import { Injectable } from '@angular/core';
import apiClient from 'src/shared/services/api-client';
import { Usuario, UsuarioSinContrasena } from 'src/app/modules/auth/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // Listar todos los usuarios (requiere autenticación)
  async listarUsuarios(): Promise<UsuarioSinContrasena[]> {
    try {
      const response = await apiClient.get('/usuarios');
      return response.data;
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      throw error;
    }
  }

  // Obtener usuario por ID (requiere autenticación)
  async obtenerUsuarioPorId(id: number): Promise<UsuarioSinContrasena> {
    try {
      const response = await apiClient.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

  // Buscar usuario por email (requiere autenticación)
  async buscarUsuarioPorEmail(email: string): Promise<UsuarioSinContrasena | null> {
    try {
      const usuarios = await this.listarUsuarios();
      console.log('Usuarios obtenidos:', usuarios);
      
      if (!Array.isArray(usuarios)) {
        console.error('La respuesta no es un array:', usuarios);
        return null;
      }
      
      const usuario = usuarios.find(u => u.correo.toLowerCase() === email.toLowerCase());
      return usuario || null;
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw error;
    }
  }

  // Actualizar usuario (solo el propio usuario o admin)
  async actualizarUsuario(id: number, data: Partial<Usuario>): Promise<UsuarioSinContrasena> {
    try {
      const response = await apiClient.put(`/usuarios/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  // Eliminar usuario (solo admin - rol 1)
  async eliminarUsuario(id: number): Promise<void> {
    try {
      const response = await apiClient.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }
}
