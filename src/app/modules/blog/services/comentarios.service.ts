import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comentario, ComentarioCreate, ComentarioUpdate } from '../models/post.model';
import apiClient from 'src/shared/services/api-client';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private readonly baseUrl = '/comentarios';

  constructor() {}

  // Obtener todos los comentarios
  getComentarios(): Observable<Comentario[]> {
    return from(apiClient.get(this.baseUrl)).pipe(
      map((response: any) => response.data)
    );
  }

  // Obtener comentario por ID
  getComentarioById(id: number): Observable<Comentario> {
    return from(apiClient.get(`${this.baseUrl}/${id}`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Obtener comentarios de una publicación
  getComentariosByPublicacion(publicacionId: number): Observable<Comentario[]> {
    return from(apiClient.get(`${this.baseUrl}/publicacion/${publicacionId}`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Contar comentarios de una publicación
  countComentariosByPublicacion(publicacionId: number): Observable<{ count: number }> {
    return from(apiClient.get(`${this.baseUrl}/publicacion/${publicacionId}/count`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Obtener comentarios por usuario
  getComentariosByUsuario(userId: number): Observable<Comentario[]> {
    return from(apiClient.get(`${this.baseUrl}/usuario/${userId}`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Obtener mis comentarios (requiere autenticación)
  getMisComentarios(): Observable<Comentario[]> {
    return from(apiClient.get(`${this.baseUrl}/mis-comentarios`)).pipe(
      map((response: any) => response.data)
    );
  }

  // Crear nuevo comentario (requiere autenticación)
  createComentario(comentario: ComentarioCreate): Observable<Comentario> {
    return from(apiClient.post(this.baseUrl, comentario)).pipe(
      map((response: any) => response.data)
    );
  }

  // Actualizar comentario (solo autor o admin)
  updateComentario(id: number, comentario: ComentarioUpdate): Observable<Comentario> {
    return from(apiClient.put(`${this.baseUrl}/${id}`, comentario)).pipe(
      map((response: any) => response.data)
    );
  }

  // Eliminar comentario (solo autor o admin)
  deleteComentario(id: number): Observable<{ message: string }> {
    return from(apiClient.delete(`${this.baseUrl}/${id}`)).pipe(
      map((response: any) => response.data)
    );
  }
}
