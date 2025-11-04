import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etiqueta, EtiquetaCreate, EtiquetaUpdate } from '../models/post.model';
import apiClient from 'src/shared/services/api-client';

@Injectable({
  providedIn: 'root'
})
export class EtiquetasService {
  private readonly baseUrl = '/etiquetas';

  constructor() {}

  // Obtener todas las etiquetas
  getEtiquetas(): Observable<Etiqueta[]> {
    return from(apiClient.get(this.baseUrl)).pipe(
      map((response: any) => response.data)
    );
  }

  // Obtener etiqueta por ID
  getEtiquetaById(id: number): Observable<Etiqueta> {
    return from(apiClient.get(`${this.baseUrl}/${id}`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Crear nueva etiqueta (requiere autenticación)
  createEtiqueta(etiqueta: EtiquetaCreate): Observable<Etiqueta> {
    return from(apiClient.post(this.baseUrl, etiqueta)).pipe(
      map((response: any) => response.data)
    );
  }

  // Actualizar etiqueta (requiere autenticación)
  updateEtiqueta(id: number, etiqueta: EtiquetaUpdate): Observable<Etiqueta> {
    return from(apiClient.put(`${this.baseUrl}/${id}`, etiqueta)).pipe(
      map((response: any) => response.data)
    );
  }

  // Eliminar etiqueta (solo admin - rol 1)
  deleteEtiqueta(id: number): Observable<{ message: string }> {
    return from(apiClient.delete(`${this.baseUrl}/${id}`)).pipe(
      map((response: any) => response.data)
    );
  }
}
