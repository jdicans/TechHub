import apiClient from 'src/shared/services/api-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Método para iniciar sesión
  async login(email: string, password: string): Promise<void> {
    try {
      const response = await apiClient.post('/usuarios/login', { 
        correo: email, 
        contrasena: password 
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Guardar el token en localStorage
      
      // Obtener el perfil del usuario y guardar sus datos
      try {
        const userProfile = await this.getCurrentUser();
        console.log('👤 Perfil del usuario (respuesta completa):', userProfile);
        console.log('👤 userProfile.data:', userProfile.data);
        console.log('👤 userProfile.data?.data:', userProfile.data?.data);
        
        // La respuesta puede venir en diferentes formatos
        const user = userProfile.data?.data || userProfile.data || userProfile;
        console.log('👤 Usuario extraído:', user);
        
        if (user && user.id_usuario) {
          // Guardar datos individuales (compatibilidad)
          localStorage.setItem('userId', user.id_usuario?.toString() || '');
          localStorage.setItem('userName', user.nombre || '');
          localStorage.setItem('userEmail', user.correo || '');
          localStorage.setItem('rol', user.id_rol?.toString() || '0');
          
          // Guardar objeto completo del usuario (para otros componentes)
          localStorage.setItem('usuario', JSON.stringify(user));
          
          console.log('✅ Datos del usuario guardados en localStorage:');
          console.log('   - userId:', localStorage.getItem('userId'));
          console.log('   - userName:', localStorage.getItem('userName'));
          console.log('   - userEmail:', localStorage.getItem('userEmail'));
          console.log('   - rol:', localStorage.getItem('rol'));
        } else {
          console.error('❌ No se pudo extraer el usuario de la respuesta');
        }
      } catch (profileError) {
        console.warn('⚠️ No se pudo obtener el perfil del usuario:', profileError);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  }

  // Método para registrar un nuevo usuario
  async register(userData: { nombre: string; apellido: string; email: string; password: string; cedula: string; telefono: string; carrera: string; id_rol: number }): Promise<void> {
    try {
      await apiClient.post('/usuarios/register', {
        nombre: userData.nombre,
        apellido: userData.apellido,
        correo: userData.email,
        contrasena: userData.password,
        cedula: userData.cedula,
        carrera: userData.carrera,
        telefono: userData.telefono,
        id_rol: userData.id_rol
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario'); // Remover objeto completo del usuario
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para obtener el perfil del usuario actual
  async getCurrentUser(): Promise<any> {
    try {
      const response = await apiClient.get('/usuarios/profile');
      return response.data;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      // Si falla (token inválido/expirado), hacer logout
      this.logout();
      throw error;
    }
  }
}
