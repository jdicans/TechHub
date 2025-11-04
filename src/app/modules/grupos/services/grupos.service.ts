import { Injectable } from '@angular/core';
import apiClient from 'src/shared/services/api-client';
import { Observable, from } from 'rxjs';
import { Grupo, GrupoCreate, GrupoUpdate, Miembro, MiembroCreate, MiembroRolUpdate, MiembrosCount } from '../models/grupo.model';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  // ========== GRUPOS ==========

  // Obtener todos los grupos
  getGrupos(): Observable<Grupo[]> {
    return from(
      apiClient.get('/grupos').then(response => response.data)
    );
  }

  // Obtener grupo por ID
  getGrupoById(id: number): Observable<Grupo> {
    return from(
      apiClient.get(`/grupos/${id}`).then(response => response.data)
    );
  }

  // Obtener mis grupos (requiere autenticación)
  getMisGrupos(): Observable<Grupo[]> {
    return from(
      apiClient.get('/grupos/mis-grupos').then(response => response.data)
    );
  }

  // Obtener grupos de un usuario específico
  getGruposByUsuario(userId: number): Observable<Grupo[]> {
    return from(
      apiClient.get(`/grupos/usuario/${userId}`).then(response => response.data)
    );
  }

  // Crear grupo (requiere autenticación)
  createGrupo(grupo: GrupoCreate): Observable<Grupo> {
    return from(
      apiClient.post('/grupos', grupo).then(response => response.data)
    );
  }

  // Actualizar grupo (solo administradores)
  updateGrupo(id: number, grupo: GrupoUpdate): Observable<Grupo> {
    return from(
      apiClient.put(`/grupos/${id}`, grupo).then(response => response.data)
    );
  }

  // Eliminar grupo (solo administradores)
  deleteGrupo(id: number): Observable<{ message: string }> {
    return from(
      apiClient.delete(`/grupos/${id}`).then(response => response.data)
    );
  }

  // ========== MIEMBROS ==========

  // Obtener miembros de un grupo
  getMiembros(grupoId: number): Observable<Miembro[]> {
    return from(
      apiClient.get(`/grupos/${grupoId}/miembros`).then(response => response.data)
    );
  }

  // Contar miembros de un grupo
  countMiembros(grupoId: number): Observable<MiembrosCount> {
    return from(
      apiClient.get(`/grupos/${grupoId}/miembros/count`).then(response => response.data)
    );
  }

  // Agregar miembro al grupo (solo administradores)
  addMiembro(grupoId: number, miembro: MiembroCreate): Observable<Grupo> {
    return from(
      apiClient.post(`/grupos/${grupoId}/miembros`, miembro).then(response => response.data)
    );
  }

  // Remover miembro del grupo (administrador o el mismo usuario)
  removeMiembro(grupoId: number, userId: number): Observable<{ message: string }> {
    return from(
      apiClient.delete(`/grupos/${grupoId}/miembros/${userId}`).then(response => response.data)
    );
  }

  // Cambiar rol de un miembro (solo administradores)
  updateMiembroRol(grupoId: number, userId: number, rolData: MiembroRolUpdate): Observable<Grupo> {
    return from(
      apiClient.put(`/grupos/${grupoId}/miembros/${userId}/rol`, rolData).then(response => response.data)
    );
  }
}
