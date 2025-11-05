import axios from 'axios';
import { environment } from '../../environments/environment';
import { TokenUtil } from '../../app/shared/utils/token.util';

const apiClient = axios.create({
  baseURL: environment.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación
apiClient.interceptors.request.use((config: any) => {
  // Usar TokenUtil para obtener un token válido
  const token = TokenUtil.getValidToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    
    // Log en desarrollo
    if (!environment.production) {
      const timeLeft = TokenUtil.getTimeUntilExpiration();
      console.log(`🔑 Token agregado (expira en ${timeLeft} min):`, token.substring(0, 20) + '...');
    }
  } else {
    // Si no hay token y la ruta no es pública, advertir
    if (!config.url?.includes('/auth/')) {
      console.warn('⚠️ No hay token válido para petición protegida:', config.url);
    }
  }
  
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores globales
apiClient.interceptors.response.use((response: any) => {
  return response;
}, (error: any) => {
  const status = error.response?.status;
  const url = error.config?.url;
  
  // Log detallado del error (solo en desarrollo)
  if (!environment.production) {
    console.group('🔴 API Error');
    console.log('Status:', status);
    console.log('URL:', url);
    console.log('Method:', error.config?.method?.toUpperCase());
    console.log('Response:', error.response?.data);
    console.log('Full Error:', error);
    console.groupEnd();
  }
  
  // Manejar diferentes códigos de error
  switch (status) {
    case 401:
      // No autorizado - Token inválido o expirado
      console.warn('⚠️ Sesión expirada. Redirigiendo al login...');
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      window.location.href = '/auth';
      break;
      
    case 403:
      // Prohibido - Sin permisos suficientes
      console.error('🚫 Acceso denegado. No tienes permisos para esta acción.');
      // Aquí puedes mostrar una alerta al usuario
      // AlertService.error('No tienes permisos para realizar esta acción');
      break;
      
    case 404:
      // No encontrado
      console.warn('❓ Recurso no encontrado:', url);
      break;
      
    case 500:
      // Error del servidor
      console.error('💥 Error del servidor. Intenta nuevamente más tarde.');
      break;
  }
  
  return Promise.reject(error);
});

export default apiClient;
