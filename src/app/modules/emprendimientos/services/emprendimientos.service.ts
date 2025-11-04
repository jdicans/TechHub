import { Injectable } from '@angular/core';import apiClient from 'src/shared/services/api-client';
import { EventoConRelaciones, CreateEventoRequest, UpdateEventoRequest } from '../../eventos/models/evento.model';

// ID de la categoría "Emprendimiento" en la base de datos
const CATEGORIA_EMPRENDIMIENTO_ID = 9;

@Injectable({
  providedIn: 'root'
})
export class EmprendimientosService {
  
  constructor() {}

  /**
   * Obtener todos los emprendimientos (eventos con id_categoria = 9)
   */
  async obtenerEmprendimientos(): Promise<EventoConRelaciones[]> {
    try {
      console.log('💼 Obteniendo todos los emprendimientos...');
      
      const response = await apiClient.get('/eventos?select=*');
      console.log('✅ Eventos obtenidos:', response.data);
      
      const eventos = response.data?.data || response.data || [];
      
      // Filtrar solo los eventos con categoria de emprendimiento (id_categoria = 9)
      const emprendimientos = eventos.filter((evento: any) => 
        evento.id_categoria === CATEGORIA_EMPRENDIMIENTO_ID
      );
      
      console.log(`✅ ${emprendimientos.length} emprendimientos encontrados`);
      
      return emprendimientos.map((evento: any) => ({
        ...evento,
        categoria: evento.categoria || null,
        organizador: evento.organizador || null,
        inscritos: evento.inscritos || [],
        total_inscritos: evento.total_inscritos || evento.inscritos?.length || 0,
        esta_inscrito: evento.esta_inscrito || false
      }));
    } catch (error: any) {
      console.error('❌ Error al obtener emprendimientos:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error data:', error.response?.data);
      throw error;
    }
  }

  /**
   * Obtener un emprendimiento por ID
   */
  async obtenerEmprendimientoPorId(id: number): Promise<EventoConRelaciones> {
    try {
      console.log(`💼 Obteniendo emprendimiento con ID: ${id}`);
      const response = await apiClient.get(`/eventos/${id}`);
      console.log('✅ Emprendimiento obtenido:', response.data);
      
      if (response.data && response.data.data) {
        return response.data.data;
      }
      
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error al obtener emprendimiento ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtener mis emprendimientos (eventos que YO creé con categoria emprendimiento)
   */
  async obtenerMisEmprendimientos(): Promise<EventoConRelaciones[]> {
    try {
      console.log('💼 Obteniendo mis emprendimientos creados...');
      
      // Obtener todos los eventos
      const response = await apiClient.get('/eventos');
      const todosEventos = response.data?.data || response.data || [];
      
      // Obtener el ID del usuario actual
      let userId = parseInt(localStorage.getItem('userId') || '0');
      
      if (userId === 0) {
        userId = parseInt(localStorage.getItem('id_usuario') || '0');
      }
      if (userId === 0) {
        userId = parseInt(localStorage.getItem('user_id') || '0');
      }
      if (userId === 0) {
        userId = parseInt(localStorage.getItem('id') || '0');
      }
      
      console.log('👤 Mi userId desde localStorage:', userId);
      
      // Filtrar: eventos creados por mí Y con categoría emprendimiento
      const misEmprendimientos = todosEventos.filter((evento: any) => {
        const eventoUserId = parseInt(evento.id_usuario) || evento.id_usuario;
        const esMio = eventoUserId == userId;
        const esEmprendimiento = evento.id_categoria === CATEGORIA_EMPRENDIMIENTO_ID;
        return esMio && esEmprendimiento;
      });
      
      console.log(`✅ Encontrados ${misEmprendimientos.length} emprendimientos creados por mí`);
      
      return misEmprendimientos.map((evento: any) => ({
        ...evento,
        categoria: evento.categoria || null,
        organizador: evento.organizador || null,
        inscritos: evento.inscritos || [],
        total_inscritos: evento.total_inscritos || evento.inscritos?.length || 0,
        esta_inscrito: evento.esta_inscrito || false
      }));
    } catch (error: any) {
      console.error('❌ Error al obtener mis emprendimientos:', error);
      throw error;
    }
  }

  /**
   * Crear un nuevo emprendimiento (evento con categoria emprendimiento)
   */
  async crearEmprendimiento(data: CreateEventoRequest): Promise<EventoConRelaciones> {
    try {
      // Obtener el userId del localStorage
      let userId = parseInt(localStorage.getItem('userId') || '0');
      
      if (userId === 0) {
        userId = parseInt(localStorage.getItem('id_usuario') || '0');
      }
      if (userId === 0) {
        userId = parseInt(localStorage.getItem('user_id') || '0');
      }
      if (userId === 0) {
        userId = parseInt(localStorage.getItem('id') || '0');
      }
      
      // Forzar la categoría a emprendimiento (id = 9)
      const emprendimientoConUsuario = {
        ...data,
        id_usuario: userId,
        id_categoria: CATEGORIA_EMPRENDIMIENTO_ID
      };
      
      console.log('💼 Creando nuevo emprendimiento:', emprendimientoConUsuario);
      const response = await apiClient.post('/eventos', emprendimientoConUsuario);
      console.log('✅ Emprendimiento creado:', response.data);
      
      if (response.data && response.data.data) {
        return response.data.data;
      }
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al crear emprendimiento:', error);
      throw error;
    }
  }

  /**
   * Actualizar un emprendimiento existente
   */
  async actualizarEmprendimiento(id: number, data: UpdateEventoRequest): Promise<EventoConRelaciones> {
    try {
      // Asegurar que la categoría sea emprendimiento
      const dataConCategoria = {
        ...data,
        id_categoria: CATEGORIA_EMPRENDIMIENTO_ID
      };
      
      console.log(`💼 Actualizando emprendimiento ${id}:`, dataConCategoria);
      const response = await apiClient.put(`/eventos/${id}`, dataConCategoria);
      console.log('✅ Emprendimiento actualizado:', response.data);
      
      if (response.data && response.data.data) {
        return response.data.data;
      }
      
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error al actualizar emprendimiento ${id}:`, error);
      
      if (error.response?.status === 403) {
        throw new Error('No tienes permisos para actualizar este emprendimiento (solo admin)');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Error al actualizar emprendimiento');
    }
  }

  /**
   * Eliminar un emprendimiento
   */
  async eliminarEmprendimiento(id: number): Promise<void> {
    try {
      console.log(`💼 Eliminando emprendimiento ${id}...`);
      await apiClient.delete(`/eventos/${id}`);
      console.log('✅ Emprendimiento eliminado exitosamente');
    } catch (error: any) {
      console.error(`❌ Error al eliminar emprendimiento ${id}:`, error);
      
      if (error.response?.status === 403) {
        throw new Error('No tienes permisos para eliminar este emprendimiento (solo admin)');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Error al eliminar emprendimiento');
    }
  }

  /**
   * Inscribirse a un emprendimiento
   */
  async inscribirseEmprendimiento(idEmprendimiento: number): Promise<any> {
    try {
      console.log(`💼 Inscribiéndose al emprendimiento ${idEmprendimiento}...`);
      const response = await apiClient.post(`/eventos/${idEmprendimiento}/inscribirse`);
      console.log('✅ Inscripción exitosa:', response.data);
      
      return response.data?.data || response.data;
    } catch (error: any) {
      console.error(`❌ Error al inscribirse al emprendimiento ${idEmprendimiento}:`, error);
      
      if (error.response?.status === 409) {
        throw new Error('Ya estás inscrito en este emprendimiento');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Error al inscribirse');
    }
  }

  /**
   * Cancelar inscripción a un emprendimiento
   */
  async cancelarInscripcion(idEmprendimiento: number): Promise<void> {
    try {
      console.log(`💼 Cancelando inscripción del emprendimiento ${idEmprendimiento}...`);
      await apiClient.delete(`/eventos/${idEmprendimiento}/cancelar-inscripcion`);
      console.log('✅ Inscripción cancelada');
    } catch (error: any) {
      console.error(`❌ Error al cancelar inscripción del emprendimiento ${idEmprendimiento}:`, error);
      
      if (error.response?.status === 404) {
        throw new Error('No estás inscrito en este emprendimiento');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Error al cancelar inscripción');
    }
  }

  /**
   * Obtener emprendimientos a los que el usuario está inscrito
   */
  async obtenerEmprendimientosInscritos(): Promise<EventoConRelaciones[]> {
    try {
      console.log('💼 Obteniendo emprendimientos inscritos...');
      const response = await apiClient.get('/eventos/mis-eventos');
      console.log('✅ Eventos inscritos obtenidos:', response.data);
      
      const eventos = response.data?.data || response.data || [];
      
      // Filtrar solo los que son emprendimientos
      const emprendimientos = eventos.filter((evento: any) => 
        evento.id_categoria === CATEGORIA_EMPRENDIMIENTO_ID
      );
      
      return emprendimientos.map((evento: any) => ({
        ...evento,
        categoria: evento.categoria || null,
        organizador: evento.organizador || null,
        inscritos: evento.inscritos || [],
        total_inscritos: evento.total_inscritos || evento.inscritos?.length || 0,
        esta_inscrito: true
      }));
    } catch (error: any) {
      console.error('❌ Error al obtener emprendimientos inscritos:', error);
      
      if (error.response?.status === 400 || error.response?.status === 404) {
        console.warn('⚠️ Endpoint /eventos/mis-eventos no está disponible aún');
        return [];
      }
      
      throw error;
    }
  }

  /**
   * Utilidades
   */
  
  estaInscrito(emprendimiento: EventoConRelaciones): boolean {
    return emprendimiento.esta_inscrito || false;
  }

  esCreador(emprendimiento: EventoConRelaciones, idUsuario: number): boolean {
    return emprendimiento.id_usuario === idUsuario || emprendimiento.organizador?.id_usuario === idUsuario;
  }

  formatearFecha(fecha: Date | string): string {
    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  emprendimientoPasado(fecha: Date | string): boolean {
    const fechaEmprendimiento = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaEmprendimiento < new Date();
  }

  getModalidadBadge(modalidad?: string): { color: string; label: string } {
    switch (modalidad?.toLowerCase()) {
      case 'presencial':
        return { color: 'primary', label: 'Presencial' };
      case 'virtual':
        return { color: 'success', label: 'Virtual' };
      case 'híbrido':
      case 'hibrido':
        return { color: 'info', label: 'Híbrido' };
      default:
        return { color: 'secondary', label: 'Sin especificar' };
    }
  }
}
