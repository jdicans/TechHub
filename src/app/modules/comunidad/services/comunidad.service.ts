import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Miembro } from '../models/comunidad.model';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {
  private miembrosSubject = new BehaviorSubject<Miembro[]>(this.getMiembrosIniciales());
  public miembros$ = this.miembrosSubject.asObservable();
  private currentUserId = 'user-1';

  constructor() {}

  getMiembros(): Observable<Miembro[]> {
    return this.miembros$;
  }

  getMiembroById(id: string): Miembro | undefined {
    return this.miembrosSubject.value.find(m => m.id === id);
  }

  conectar(miembroId: string): void {
    const miembros = this.miembrosSubject.value;
    const miembro = miembros.find(m => m.id === miembroId);

    if (!miembro) return;

    const index = miembro.conectados.indexOf(this.currentUserId);
    if (index > -1) {
      miembro.conectados.splice(index, 1);
      miembro.conexiones--;
    } else {
      miembro.conectados.push(this.currentUserId);
      miembro.conexiones++;
    }

    this.miembrosSubject.next([...miembros]);
  }

  desconectar(miembroId: string): void {
    const miembros = this.miembrosSubject.value;
    const miembro = miembros.find(m => m.id === miembroId);

    if (!miembro) return;

    const index = miembro.conectados.indexOf(this.currentUserId);
    if (index > -1) {
      miembro.conectados.splice(index, 1);
      miembro.conexiones--;
      this.miembrosSubject.next([...miembros]);
    }
  }

  estaConectado(miembroId: string): boolean {
    const miembro = this.getMiembroById(miembroId);
    return miembro ? miembro.conectados.includes(this.currentUserId) : false;
  }

  private getMiembrosIniciales(): Miembro[] {
    return [
      {
        id: '1',
        nombre: 'Ana Martinez',
        avatar: '👩‍💻',
        rol: 'Full Stack Developer',
        especialidad: 'React & Node.js',
        ubicacion: 'Madrid, España',
        conexiones: 234,
        proyectos: 12,
        skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
        conectados: []
      },
      {
        id: '2',
        nombre: 'Carlos Rodriguez',
        avatar: '👨‍💼',
        rol: 'Product Manager',
        especialidad: 'Agile & Scrum',
        ubicacion: 'Barcelona, España',
        conexiones: 189,
        proyectos: 8,
        skills: ['Scrum', 'Product Strategy', 'Jira', 'Analytics', 'Leadership'],
        conectados: []
      },
      {
        id: '3',
        nombre: 'Sofia Lopez',
        avatar: '👩‍🔬',
        rol: 'Data Scientist',
        especialidad: 'Machine Learning',
        ubicacion: 'Buenos Aires, Argentina',
        conexiones: 312,
        proyectos: 15,
        skills: ['Python', 'TensorFlow', 'SQL', 'R', 'Big Data'],
        conectados: []
      },
      {
        id: '4',
        nombre: 'Diego Torres',
        avatar: '👨‍🔧',
        rol: 'DevOps Engineer',
        especialidad: 'Cloud Infrastructure',
        ubicacion: 'México DF, México',
        conexiones: 156,
        proyectos: 10,
        skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
        conectados: []
      },
      {
        id: '5',
        nombre: 'Laura Sanchez',
        avatar: '👩‍🎨',
        rol: 'UX/UI Designer',
        especialidad: 'Product Design',
        ubicacion: 'Santiago, Chile',
        conexiones: 278,
        proyectos: 20,
        skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Adobe XD'],
        conectados: []
      },
      {
        id: '6',
        nombre: 'Miguel Fernandez',
        avatar: '👨‍🚀',
        rol: 'Mobile Developer',
        especialidad: 'iOS & Android',
        ubicacion: 'Lima, Perú',
        conexiones: 201,
        proyectos: 14,
        skills: ['Swift', 'Kotlin', 'React Native', 'Firebase', 'Flutter'],
        conectados: []
      }
    ];
  }
}
