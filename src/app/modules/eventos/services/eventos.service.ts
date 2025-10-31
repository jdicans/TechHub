import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento, CategoriaEvento, FiltroEventos } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private eventosSubject = new BehaviorSubject<Evento[]>(this.getEventosIniciales());
  public eventos$ = this.eventosSubject.asObservable();

  private currentUserId = 'user-1'; // Simula el usuario actual

  constructor() {}

  getEventos(): Observable<Evento[]> {
    return this.eventos$;
  }

  getEventoById(id: string): Observable<Evento | undefined> {
    return this.eventos$.pipe(
      map(eventos => eventos.find(e => e.id === id))
    );
  }

  filtrarEventos(filtro: FiltroEventos): Observable<Evento[]> {
    return this.eventos$.pipe(
      map(eventos => {
        let eventosFiltrados = [...eventos];

        if (filtro.categoria) {
          eventosFiltrados = eventosFiltrados.filter(
            e => e.categoria === filtro.categoria
          );
        }

        if (filtro.busqueda) {
          const busqueda = filtro.busqueda.toLowerCase();
          eventosFiltrados = eventosFiltrados.filter(
            e => e.titulo.toLowerCase().includes(busqueda) ||
                 e.descripcion.toLowerCase().includes(busqueda) ||
                 e.ubicacion.toLowerCase().includes(busqueda)
          );
        }

        if (filtro.fechaDesde) {
          eventosFiltrados = eventosFiltrados.filter(
            e => new Date(e.fecha) >= filtro.fechaDesde!
          );
        }

        if (filtro.fechaHasta) {
          eventosFiltrados = eventosFiltrados.filter(
            e => new Date(e.fecha) <= filtro.fechaHasta!
          );
        }

        return eventosFiltrados;
      })
    );
  }

  crearEvento(evento: Omit<Evento, 'id' | 'createdAt' | 'inscritos' | 'likes'>): void {
    const nuevoEvento: Evento = {
      ...evento,
      id: this.generarId(),
      createdAt: new Date(),
      inscritos: [],
      likes: []
    };

    const eventosActuales = this.eventosSubject.value;
    this.eventosSubject.next([...eventosActuales, nuevoEvento]);
  }

  inscribirseEvento(eventoId: string): boolean {
    const eventos = this.eventosSubject.value;
    const evento = eventos.find(e => e.id === eventoId);

    if (!evento) return false;

    // Verificar si ya está inscrito
    if (evento.inscritos.includes(this.currentUserId)) {
      return false;
    }

    // Verificar capacidad
    if (evento.inscritos.length >= evento.capacidadMaxima) {
      return false;
    }

    evento.inscritos.push(this.currentUserId);
    this.eventosSubject.next([...eventos]);
    return true;
  }

  desinscribirseEvento(eventoId: string): boolean {
    const eventos = this.eventosSubject.value;
    const evento = eventos.find(e => e.id === eventoId);

    if (!evento) return false;

    const index = evento.inscritos.indexOf(this.currentUserId);
    if (index === -1) return false;

    evento.inscritos.splice(index, 1);
    this.eventosSubject.next([...eventos]);
    return true;
  }

  toggleLike(eventoId: string): void {
    const eventos = this.eventosSubject.value;
    const evento = eventos.find(e => e.id === eventoId);

    if (!evento) return;

    const index = evento.likes.indexOf(this.currentUserId);
    if (index === -1) {
      evento.likes.push(this.currentUserId);
    } else {
      evento.likes.splice(index, 1);
    }

    this.eventosSubject.next([...eventos]);
  }

  estaInscrito(eventoId: string): boolean {
    const evento = this.eventosSubject.value.find(e => e.id === eventoId);
    return evento ? evento.inscritos.includes(this.currentUserId) : false;
  }

  tieneLike(eventoId: string): boolean {
    const evento = this.eventosSubject.value.find(e => e.id === eventoId);
    return evento ? evento.likes.includes(this.currentUserId) : false;
  }

  private generarId(): string {
    return `evento-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getEventosIniciales(): Evento[] {
    return [
      {
        id: '1',
        titulo: 'Angular Workshop 2025',
        descripcion: 'Taller intensivo de Angular 18 con las últimas características y mejores prácticas.',
        fecha: new Date('2025-11-15'),
        hora: '10:00',
        ubicacion: 'Centro de Innovación Tech',
        categoria: CategoriaEvento.TALLER,
        organizador: 'Tech Community',
        capacidadMaxima: 50,
        inscritos: ['user-2', 'user-3'],
        likes: ['user-2'],
        imagen: 'https://picsum.photos/seed/angular/400/250',
        createdAt: new Date('2025-10-01')
      },
      {
        id: '2',
        titulo: 'Hackathon IA 2025',
        descripcion: 'Competencia de 24 horas para desarrollar soluciones innovadoras con Inteligencia Artificial.',
        fecha: new Date('2025-11-20'),
        hora: '09:00',
        ubicacion: 'Campus Universitario',
        categoria: CategoriaEvento.HACKATHON,
        organizador: 'AI Innovators',
        capacidadMaxima: 100,
        inscritos: ['user-4'],
        likes: ['user-2', 'user-4', 'user-5'],
        imagen: 'https://picsum.photos/seed/hackathon/400/250',
        createdAt: new Date('2025-09-15')
      },
      {
        id: '3',
        titulo: 'Networking Tech Leaders',
        descripcion: 'Encuentro informal para conectar con líderes de la industria tecnológica.',
        fecha: new Date('2025-11-05'),
        hora: '18:00',
        ubicacion: 'Hotel Plaza Central',
        categoria: CategoriaEvento.NETWORKING,
        organizador: 'TechHub Community',
        capacidadMaxima: 30,
        inscritos: [],
        likes: ['user-1'],
        imagen: 'https://picsum.photos/seed/networking/400/250',
        createdAt: new Date('2025-10-20')
      },
      {
        id: '4',
        titulo: 'Conferencia Cloud Computing',
        descripcion: 'Expertos internacionales hablan sobre el futuro de la computación en la nube.',
        fecha: new Date('2025-12-01'),
        hora: '14:00',
        ubicacion: 'Auditorio Nacional',
        categoria: CategoriaEvento.CONFERENCIA,
        organizador: 'Cloud Experts',
        capacidadMaxima: 200,
        inscritos: ['user-1', 'user-2', 'user-3', 'user-4'],
        likes: ['user-1', 'user-3'],
        imagen: 'https://picsum.photos/seed/cloud/400/250',
        createdAt: new Date('2025-09-01')
      },
      {
        id: '5',
        titulo: 'Meetup JavaScript',
        descripcion: 'Reunión mensual de la comunidad JavaScript. Charlas, demos y networking.',
        fecha: new Date('2025-11-10'),
        hora: '19:00',
        ubicacion: 'CoWorking Space Downtown',
        categoria: CategoriaEvento.MEETUP,
        organizador: 'JS Community',
        capacidadMaxima: 40,
        inscritos: ['user-5'],
        likes: [],
        imagen: 'https://picsum.photos/seed/javascript/400/250',
        createdAt: new Date('2025-10-15')
      }
    ];
  }
}
