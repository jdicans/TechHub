import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Emprendimiento,
  CategoriaEmprendimiento,
  EtapaEmprendimiento,
  FiltroEmprendimientos
} from '../models/emprendimiento.model';

@Injectable({
  providedIn: 'root'
})
export class EmprendimientosService {
  private emprendimientosSubject = new BehaviorSubject<Emprendimiento[]>(this.getEmprendimientosIniciales());
  public emprendimientos$ = this.emprendimientosSubject.asObservable();

  private currentUserId = 'user-1'; // Simula el usuario actual

  constructor() {}

  getEmprendimientos(): Observable<Emprendimiento[]> {
    return this.emprendimientos$;
  }

  getEmprendimientoById(id: string): Observable<Emprendimiento | undefined> {
    return this.emprendimientos$.pipe(
      map(emprendimientos => emprendimientos.find(e => e.id === id))
    );
  }

  filtrarEmprendimientos(filtro: FiltroEmprendimientos): Observable<Emprendimiento[]> {
    return this.emprendimientos$.pipe(
      map(emprendimientos => {
        let emprendimientosFiltrados = [...emprendimientos];

        if (filtro.categoria) {
          emprendimientosFiltrados = emprendimientosFiltrados.filter(
            e => e.categoria === filtro.categoria
          );
        }

        if (filtro.etapa) {
          emprendimientosFiltrados = emprendimientosFiltrados.filter(
            e => e.etapa === filtro.etapa
          );
        }

        if (filtro.busqueda) {
          const busqueda = filtro.busqueda.toLowerCase();
          emprendimientosFiltrados = emprendimientosFiltrados.filter(
            e => e.nombre.toLowerCase().includes(busqueda) ||
                 e.descripcion.toLowerCase().includes(busqueda) ||
                 e.categoria.toLowerCase().includes(busqueda)
          );
        }

        if (filtro.buscoInversion !== undefined) {
          emprendimientosFiltrados = emprendimientosFiltrados.filter(
            e => e.buscoInversion === filtro.buscoInversion
          );
        }

        if (filtro.buscoColaboradores !== undefined) {
          emprendimientosFiltrados = emprendimientosFiltrados.filter(
            e => e.buscoColaboradores === filtro.buscoColaboradores
          );
        }

        return emprendimientosFiltrados;
      })
    );
  }

  crearEmprendimiento(emprendimiento: Omit<Emprendimiento, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'vistas'>): void {
    const nuevoEmprendimiento: Emprendimiento = {
      ...emprendimiento,
      id: this.generarId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [],
      vistas: 0
    };

    const emprendimientosActuales = this.emprendimientosSubject.value;
    this.emprendimientosSubject.next([...emprendimientosActuales, nuevoEmprendimiento]);
  }

  toggleLike(emprendimientoId: string): void {
    const emprendimientos = this.emprendimientosSubject.value;
    const emprendimiento = emprendimientos.find(e => e.id === emprendimientoId);

    if (!emprendimiento) return;

    const index = emprendimiento.likes.indexOf(this.currentUserId);
    if (index === -1) {
      emprendimiento.likes.push(this.currentUserId);
    } else {
      emprendimiento.likes.splice(index, 1);
    }

    emprendimiento.updatedAt = new Date();
    this.emprendimientosSubject.next([...emprendimientos]);
  }

  incrementarVistas(emprendimientoId: string): void {
    const emprendimientos = this.emprendimientosSubject.value;
    const emprendimiento = emprendimientos.find(e => e.id === emprendimientoId);

    if (!emprendimiento) return;

    emprendimiento.vistas++;
    this.emprendimientosSubject.next([...emprendimientos]);
  }

  tieneLike(emprendimientoId: string): boolean {
    const emprendimiento = this.emprendimientosSubject.value.find(e => e.id === emprendimientoId);
    return emprendimiento ? emprendimiento.likes.includes(this.currentUserId) : false;
  }

  private generarId(): string {
    return `emprendimiento-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getEmprendimientosIniciales(): Emprendimiento[] {
    return [
      {
        id: '1',
        nombre: 'EduTech AI',
        descripcion: 'Plataforma de educación personalizada con inteligencia artificial',
        categoria: CategoriaEmprendimiento.EDUCACION,
        etapa: EtapaEmprendimiento.MVP,
        creador: {
          id: 'user-2',
          nombre: 'María González',
          avatar: '👩‍💼',
          email: 'maria@edutech.com'
        },
        descripcionDetallada: 'EduTech AI es una plataforma revolucionaria que utiliza IA para personalizar el aprendizaje de cada estudiante.',
        problema: 'La educación tradicional no se adapta al ritmo y estilo de aprendizaje de cada estudiante.',
        solucion: 'Algoritmos de IA que analizan el progreso y adaptan el contenido en tiempo real.',
        mercadoObjetivo: 'Estudiantes de secundaria y universidad, escuelas y universidades',
        propuestaValor: 'Aumenta el rendimiento académico en un 40% mediante aprendizaje adaptativo',
        equipoRequerido: ['Desarrollador Full Stack', 'Data Scientist', 'UX Designer'],
        tecnologias: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
        buscoInversion: true,
        montoInversion: 100000,
        buscoColaboradores: true,
        website: 'https://edutech-ai.com',
        email: 'contacto@edutech-ai.com',
        redesSociales: {
          linkedin: 'edutech-ai',
          twitter: '@edutech_ai'
        },
        imagen: 'https://picsum.photos/seed/edutech/600/400',
        galeria: [],
        likes: ['user-1', 'user-3'],
        vistas: 245,
        createdAt: new Date('2025-09-15'),
        updatedAt: new Date('2025-10-20')
      },
      {
        id: '2',
        nombre: 'GreenLogistics',
        descripcion: 'Solución de logística sostenible para últimas millas',
        categoria: CategoriaEmprendimiento.LOGISTICA,
        etapa: EtapaEmprendimiento.TRACCION,
        creador: {
          id: 'user-3',
          nombre: 'Carlos Ramírez',
          avatar: '👨‍💻',
          email: 'carlos@greenlogistics.com'
        },
        descripcionDetallada: 'Red de distribución urbana usando vehículos eléctricos y bicicletas cargo.',
        problema: 'Las entregas urbanas generan alta contaminación y congestión',
        solucion: 'Red de micro-centros de distribución con flota 100% eléctrica',
        mercadoObjetivo: 'E-commerce, restaurantes, farmacias en zonas urbanas',
        propuestaValor: 'Reducción del 70% en emisiones con entregas más rápidas',
        equipoRequerido: ['Gerente de Operaciones', 'Desarrollador Mobile'],
        tecnologias: ['Flutter', 'Node.js', 'MongoDB', 'Google Maps API'],
        buscoInversion: true,
        montoInversion: 250000,
        buscoColaboradores: false,
        website: 'https://greenlogistics.com',
        email: 'info@greenlogistics.com',
        redesSociales: {
          linkedin: 'greenlogistics',
          instagram: '@greenlogistics'
        },
        imagen: 'https://picsum.photos/seed/logistics/600/400',
        galeria: [],
        likes: ['user-1'],
        vistas: 189,
        createdAt: new Date('2025-08-01'),
        updatedAt: new Date('2025-10-25')
      },
      {
        id: '3',
        nombre: 'HealthConnect',
        descripcion: 'Telemedicina accesible para comunidades rurales',
        categoria: CategoriaEmprendimiento.SALUD,
        etapa: EtapaEmprendimiento.CRECIMIENTO,
        creador: {
          id: 'user-4',
          nombre: 'Dra. Ana Martínez',
          avatar: '👩‍⚕️',
          email: 'ana@healthconnect.com'
        },
        descripcionDetallada: 'Plataforma de telemedicina que conecta pacientes en zonas rurales con especialistas.',
        problema: 'Falta de acceso a atención médica especializada en zonas rurales',
        solucion: 'Consultas médicas virtuales, seguimiento remoto y prescripción digital',
        mercadoObjetivo: 'Población rural sin acceso a especialistas médicos',
        propuestaValor: 'Atención médica de calidad en menos de 24 horas',
        equipoRequerido: ['Médicos asociados'],
        tecnologias: ['React Native', 'WebRTC', 'Firebase', 'HIPAA Compliant'],
        buscoInversion: false,
        buscoColaboradores: true,
        website: 'https://healthconnect.com',
        email: 'contacto@healthconnect.com',
        telefono: '+1234567890',
        redesSociales: {
          facebook: 'healthconnect',
          instagram: '@health_connect'
        },
        imagen: 'https://picsum.photos/seed/health/600/400',
        galeria: [],
        likes: ['user-2', 'user-5'],
        vistas: 312,
        createdAt: new Date('2025-06-10'),
        updatedAt: new Date('2025-10-28')
      },
      {
        id: '4',
        nombre: 'FoodShare',
        descripcion: 'Marketplace para reducir desperdicio de alimentos',
        categoria: CategoriaEmprendimiento.SOSTENIBILIDAD,
        etapa: EtapaEmprendimiento.VALIDACION,
        creador: {
          id: 'user-5',
          nombre: 'Roberto Silva',
          avatar: '👨‍🍳',
          email: 'roberto@foodshare.com'
        },
        descripcionDetallada: 'App que conecta restaurantes con excedentes de comida con consumidores a precios reducidos.',
        problema: '30% de los alimentos producidos se desperdician mientras hay hambre',
        solucion: 'Marketplace que permite vender excedentes a precios reducidos antes de cierre',
        mercadoObjetivo: 'Restaurantes, panaderías, supermercados y consumidores conscientes',
        propuestaValor: 'Reduce desperdicio en 60% y ahorra 50% en comida de calidad',
        equipoRequerido: ['Marketing Manager', 'Desarrollador Backend'],
        tecnologias: ['Vue.js', 'Laravel', 'MySQL', 'Stripe'],
        buscoInversion: true,
        montoInversion: 50000,
        buscoColaboradores: true,
        email: 'hola@foodshare.com',
        redesSociales: {
          instagram: '@foodshare',
          twitter: '@foodshare'
        },
        imagen: 'https://picsum.photos/seed/foodshare/600/400',
        galeria: [],
        likes: ['user-1', 'user-3', 'user-4'],
        vistas: 421,
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-27')
      },
      {
        id: '5',
        nombre: 'CodeMentor Pro',
        descripcion: 'Plataforma de mentoría para desarrolladores junior',
        categoria: CategoriaEmprendimiento.TECNOLOGIA,
        etapa: EtapaEmprendimiento.IDEA,
        creador: {
          id: 'user-6',
          nombre: 'Luis Torres',
          avatar: '👨‍💻',
          email: 'luis@codementor.com'
        },
        descripcionDetallada: 'Red de mentores senior que ayudan a juniors a crecer profesionalmente.',
        problema: 'Developers junior luchan por encontrar guía y dirección en su carrera',
        solucion: 'Matching inteligente entre mentores y mentees con sesiones estructuradas',
        mercadoObjetivo: 'Desarrolladores junior (0-3 años exp) y empresas tech',
        propuestaValor: 'Acelera crecimiento profesional en 3x mediante mentoría personalizada',
        equipoRequerido: ['Co-founder técnico', 'Community Manager', 'UX Designer'],
        tecnologias: ['Angular', 'Node.js', 'WebRTC', 'Zoom API'],
        buscoInversion: false,
        buscoColaboradores: true,
        email: 'contacto@codementor-pro.com',
        redesSociales: {
          linkedin: 'codementor-pro',
          twitter: '@codementor_pro'
        },
        imagen: 'https://picsum.photos/seed/codementor/600/400',
        galeria: [],
        likes: [],
        vistas: 87,
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date('2025-10-28')
      }
    ];
  }
}
