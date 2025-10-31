import { Injectable, ErrorHandler } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private alertService: AlertService) {}

  handleError(error: Error): void {
    console.error('Error capturado por GlobalErrorHandler:', error);

    // Mostrar error al usuario solo en desarrollo
    if (this.isDevMode()) {
      this.alertService.error(
        'Error en la aplicación',
        error.message || 'Ha ocurrido un error inesperado'
      );
    } else {
      // En producción, mostrar mensaje genérico
      this.alertService.error(
        'Error',
        'Ha ocurrido un error. Por favor, intenta de nuevo más tarde.'
      );
    }

    // Aquí podrías enviar el error a un servicio de logging como Sentry
    this.logErrorToService(error);
  }

  private isDevMode(): boolean {
    return !window.location.hostname.includes('produccion');
  }

  private logErrorToService(error: Error): void {
    // TODO: Implementar logging a servicio externo
    console.log('Error logged:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}
