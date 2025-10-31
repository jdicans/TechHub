import { Component, OnInit } from '@angular/core';

interface Stats {
  totalEventos: number;
  eventosInscritos: number;
  totalPosts: number;
  totalMiembros: number;
  conexiones: number;
  proyectos: number;
}

interface EventoProximo {
  id: string;
  titulo: string;
  fecha: Date;
  categoria: string;
  inscritos: number;
}

interface PostReciente {
  id: string;
  titulo: string;
  autor: string;
  fecha: Date;
  likes: number;
  comentarios: number;
}

interface ActividadReciente {
  id: string;
  tipo: 'evento' | 'post' | 'conexion' | 'proyecto';
  descripcion: string;
  fecha: Date;
  icono: string;
}

interface ActividadSemanal {
  dia: string;
  valor: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats: Stats = {
    totalEventos: 12,
    eventosInscritos: 8,
    totalPosts: 24,
    totalMiembros: 156,
    conexiones: 42,
    proyectos: 5
  };

  eventosProximos: EventoProximo[] = [
    {
      id: '1',
      titulo: 'Workshop de Angular 18',
      fecha: new Date(2025, 10, 5),
      categoria: 'Desarrollo',
      inscritos: 45
    },
    {
      id: '2',
      titulo: 'Networking TechHub',
      fecha: new Date(2025, 10, 8),
      categoria: 'Networking',
      inscritos: 78
    },
    {
      id: '3',
      titulo: 'Hackathon 2025',
      fecha: new Date(2025, 10, 12),
      categoria: 'Competencia',
      inscritos: 120
    },
    {
      id: '4',
      titulo: 'Charla sobre IA',
      fecha: new Date(2025, 10, 15),
      categoria: 'Tecnología',
      inscritos: 65
    }
  ];

  postsRecientes: PostReciente[] = [
    {
      id: '1',
      titulo: 'Introducción a TypeScript 5.0',
      autor: 'María García',
      fecha: new Date(2025, 9, 28),
      likes: 34,
      comentarios: 12
    },
    {
      id: '2',
      titulo: 'Mejores prácticas en Angular',
      autor: 'Carlos López',
      fecha: new Date(2025, 9, 27),
      likes: 56,
      comentarios: 23
    },
    {
      id: '3',
      titulo: 'Deploy con Docker y Kubernetes',
      autor: 'Ana Martínez',
      fecha: new Date(2025, 9, 26),
      likes: 41,
      comentarios: 18
    }
  ];

  actividadReciente: ActividadReciente[] = [
    {
      id: '1',
      tipo: 'evento',
      descripcion: 'Te inscribiste en "Workshop de Angular 18"',
      fecha: new Date(2025, 9, 29),
      icono: 'calendar-check'
    },
    {
      id: '2',
      tipo: 'post',
      descripcion: 'Publicaste "Guía de testing en Angular"',
      fecha: new Date(2025, 9, 28),
      icono: 'file-text'
    },
    {
      id: '3',
      tipo: 'conexion',
      descripcion: 'Te conectaste con Pedro Sánchez',
      fecha: new Date(2025, 9, 27),
      icono: 'user-plus'
    },
    {
      id: '4',
      tipo: 'proyecto',
      descripcion: 'Actualizaste tu proyecto "E-commerce App"',
      fecha: new Date(2025, 9, 26),
      icono: 'lightbulb'
    }
  ];

  actividadSemanal: ActividadSemanal[] = [
    { dia: 'Lun', valor: 12 },
    { dia: 'Mar', valor: 19 },
    { dia: 'Mié', valor: 8 },
    { dia: 'Jue', valor: 15 },
    { dia: 'Vie', valor: 22 },
    { dia: 'Sáb', valor: 5 },
    { dia: 'Dom', valor: 3 }
  ];

  progresoPerfilPorcentaje = 75;
  fechaActual = new Date();

  ngOnInit() {
    // Aquí podrías cargar datos reales de servicios
  }

  getBarHeight(valor: number): number {
    const max = Math.max(...this.actividadSemanal.map(a => a.valor));
    return (valor / max) * 100;
  }

  formatearFecha(fecha: Date): string {
    const ahora = new Date();
    const diff = ahora.getTime() - fecha.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;

    return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }

  formatearFechaEvento(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  getDiasHastaEvento(fecha: Date): number {
    const ahora = new Date();
    const diff = fecha.getTime() - ahora.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
