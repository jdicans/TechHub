import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';
    
    const fecha = new Date(value);
    const ahora = new Date();
    const segundos = Math.floor((ahora.getTime() - fecha.getTime()) / 1000);
    
    if (segundos < 60) {
      return 'hace un momento';
    }
    
    const minutos = Math.floor(segundos / 60);
    if (minutos < 60) {
      return 'hace ' + minutos + (minutos === 1 ? ' minuto' : ' minutos');
    }
    
    const horas = Math.floor(minutos / 60);
    if (horas < 24) {
      return 'hace ' + horas + (horas === 1 ? ' hora' : ' horas');
    }
    
    const dias = Math.floor(horas / 24);
    if (dias < 7) {
      return 'hace ' + dias + (dias === 1 ? ' día' : ' días');
    }
    
    const semanas = Math.floor(dias / 7);
    if (semanas < 4) {
      return 'hace ' + semanas + (semanas === 1 ? ' semana' : ' semanas');
    }
    
    const meses = Math.floor(dias / 30);
    if (meses < 12) {
      return 'hace ' + meses + (meses === 1 ? ' mes' : ' meses');
    }
    
    const anios = Math.floor(dias / 365);
    return 'hace ' + anios + (anios === 1 ? ' año' : ' años');
  }
}
