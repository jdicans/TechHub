import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { TokenUtil } from '../utils/token.util';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {
  constructor(private alertService: AlertService) {}

  /**
   * Maneja errores HTTP y muestra mensajes apropiados al usuario
   * @param error Error de Axios o HTTP
   * @param customMessage Mensaje personalizado (opcional)
   */
  handleError(error: any, customMessage?: string): void {
    const status = error.response?.status;
    const errorData = error.response?.data;
    const url = error.config?.url;

    switch (status) {
      case 400:
        // Bad Request - Error de validación
        this.alertService.error(
          'Error de validación',
          errorData?.message || customMessage || 'Los datos enviados no son válidos'
        );
        break;

      case 401:
        // Unauthorized - No autenticado
        this.alertService.warning(
          'Sesión expirada',
          'Tu sesión ha caducado. Por favor, inicia sesión nuevamente.'
        ).then(() => {
          TokenUtil.clearSession();
          window.location.href = '/auth';
        });
        break;

      case 403:
        // Forbidden - Sin permisos
        const userInfo = TokenUtil.getUserFromToken();
        const message = errorData?.message || customMessage || 
          'No tienes permisos para realizar esta acción.';
        
        this.alertService.error('Acceso denegado', message);
        
        // Log adicional en consola para debugging
        console.group('🚫 Error 403 - Acceso Denegado');
        console.log('URL:', url);
        console.log('Usuario:', userInfo);
        console.log('Rol requerido:', errorData?.requiredRole);
        console.log('Rol actual:', userInfo?.rol);
        console.log('Respuesta completa:', errorData);
        console.groupEnd();
        break;

      case 404:
        // Not Found
        this.alertService.error(
          'No encontrado',
          errorData?.message || customMessage || 'El recurso solicitado no existe'
        );
        break;

      case 409:
        // Conflict - Conflicto (duplicado, etc.)
        this.alertService.warning(
          'Conflicto',
          errorData?.message || customMessage || 'Ya existe un registro con estos datos'
        );
        break;

      case 422:
        // Unprocessable Entity - Error de validación semántica
        this.alertService.error(
          'Error de validación',
          errorData?.message || customMessage || 'Los datos proporcionados no son correctos'
        );
        break;

      case 429:
        // Too Many Requests - Rate limit
        this.alertService.warning(
          'Demasiadas solicitudes',
          'Has excedido el límite de solicitudes. Por favor, espera un momento.'
        );
        break;

      case 500:
        // Internal Server Error
        this.alertService.error(
          'Error del servidor',
          errorData?.message || customMessage || 'Ocurrió un error en el servidor. Intenta nuevamente más tarde.'
        );
        break;

      case 502:
      case 503:
      case 504:
        // Bad Gateway, Service Unavailable, Gateway Timeout
        this.alertService.error(
          'Servicio no disponible',
          'El servidor no está disponible en este momento. Por favor, intenta más tarde.'
        );
        break;

      default:
        // Error desconocido
        if (!navigator.onLine) {
          this.alertService.warning(
            'Sin conexión',
            'No hay conexión a internet. Verifica tu conexión y vuelve a intentarlo.'
          );
        } else {
          this.alertService.error(
            'Error',
            errorData?.message || customMessage || 'Ocurrió un error inesperado'
          );
        }
        break;
    }
  }

  /**
   * Maneja errores 403 específicamente con más detalle
   * @param error Error de Axios
   * @param action Acción que se intentaba realizar
   */
  handle403(error: any, action?: string): void {
    const errorData = error.response?.data;
    const userInfo = TokenUtil.getUserFromToken();

    let message = `No tienes permisos para ${action || 'realizar esta acción'}.`;
    
    if (errorData?.requiredRole) {
      message += `\n\nRol requerido: ${errorData.requiredRole}`;
    }
    
    if (userInfo?.rol) {
      message += `\nTu rol actual: ${userInfo.rol}`;
    }

    this.alertService.error('Acceso denegado', message);

    // Log detallado para debugging
    console.group('🚫 Error 403 Detallado');
    console.log('Acción:', action);
    console.log('Usuario:', userInfo);
    console.log('Rol requerido:', errorData?.requiredRole);
    console.log('Mensaje del servidor:', errorData?.message);
    console.log('Error completo:', error);
    console.groupEnd();
  }

  /**
   * Verifica si el usuario tiene permisos antes de realizar una acción
   * @param requiredRole Rol requerido
   * @param action Nombre de la acción
   * @returns true si tiene permisos
   */
  checkPermission(requiredRole: string, action?: string): boolean {
    if (!TokenUtil.hasRole(requiredRole)) {
      this.alertService.warning(
        'Sin permisos',
        `Necesitas ser ${requiredRole} para ${action || 'realizar esta acción'}.`
      );
      return false;
    }
    return true;
  }
}
