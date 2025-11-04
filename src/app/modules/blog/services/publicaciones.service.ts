import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publicacion, PublicacionCreate, PublicacionUpdate } from '../models/post.model';
import apiClient from 'src/shared/services/api-client';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private readonly baseUrl = '/publicaciones';

  constructor() {}

  // Obtener todas las publicaciones
  getPublicaciones(): Observable<Publicacion[]> {
    return from(apiClient.get(this.baseUrl)).pipe(
      map((response: any) => response.data)
    );
  }

  // Obtener publicación por ID
  getPublicacionById(id: number): Observable<Publicacion> {
    return from(apiClient.get(`${this.baseUrl}/${id}`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Obtener mis publicaciones (requiere autenticación)
  getMisPublicaciones(): Observable<Publicacion[]> {
    return from(apiClient.get(`${this.baseUrl}/mis-publicaciones`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Obtener publicaciones por usuario
  getPublicacionesByUsuario(userId: number): Observable<Publicacion[]> {
    return from(apiClient.get(`${this.baseUrl}/usuario/${userId}`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Obtener publicaciones por categoría
  getPublicacionesByCategoria(categoryId: number): Observable<Publicacion[]> {
    return from(apiClient.get(`${this.baseUrl}/categoria/${categoryId}`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Crear nueva publicación (requiere autenticación)
  createPublicacion(publicacion: PublicacionCreate): Observable<Publicacion> {
    return from(apiClient.post(this.baseUrl, publicacion)).pipe(
      map((response: any) => response.data)
    );
  }

  // Actualizar publicación (solo autor o admin)
  updatePublicacion(id: number, publicacion: PublicacionUpdate): Observable<Publicacion> {
    return from(apiClient.put(`${this.baseUrl}/${id}`, publicacion)).pipe(
      map((response: any) => response.data)
    );
  }

  // Eliminar publicación (solo autor o admin)
  deletePublicacion(id: number): Observable<{ message: string }> {
    return from(apiClient.delete(`${this.baseUrl}/${id}`)).pipe(
      map((response: any) => response.data)
    );
  }
}
