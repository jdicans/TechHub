import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post, Comentario, Autor } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private postsSubject = new BehaviorSubject<Post[]>(this.getPostsIniciales());
  public posts$ = this.postsSubject.asObservable();

  private currentUser: Autor = {
    id: 'user-1',
    nombre: 'Usuario Tech',
    avatar: '👨‍💻',
    bio: 'Desarrollador apasionado'
  };

  constructor() {}

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  getPostById(id: string): Post | undefined {
    return this.postsSubject.value.find(p => p.id === id);
  }

  crearPost(post: Omit<Post, 'id' | 'fecha' | 'likes' | 'comentariosList' | 'vistas' | 'autor'>): void {
    const nuevoPost: Post = {
      ...post,
      id: this.generarId(),
      autor: this.currentUser,
      fecha: new Date(),
      likes: 0,
      comentariosList: [],
      vistas: 0
    };

    const posts = this.postsSubject.value;
    this.postsSubject.next([nuevoPost, ...posts]);
  }

  agregarComentario(postId: string, contenido: string): void {
    const posts = this.postsSubject.value;
    const post = posts.find(p => p.id === postId);

    if (!post) return;

    const nuevoComentario: Comentario = {
      id: this.generarId(),
      autor: this.currentUser,
      contenido,
      fecha: new Date()
    };

    post.comentariosList.push(nuevoComentario);
    this.postsSubject.next([...posts]);
  }

  darLike(postId: string): void {
    const posts = this.postsSubject.value;
    const post = posts.find(p => p.id === postId);

    if (!post) return;

    post.likes++;
    this.postsSubject.next([...posts]);
  }

  private generarId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getPostsIniciales(): Post[] {
    return [
      {
        id: '1',
        titulo: 'El futuro de la Inteligencia Artificial en 2025',
        resumen: 'Exploramos las tendencias y avances más importantes en IA que están transformando la industria tecnológica.',
        contenido: 'La inteligencia artificial continúa evolucionando a un ritmo acelerado...',
        autor: {
          id: '1',
          nombre: 'María García',
          avatar: '👩‍💻',
          bio: 'Data Scientist & AI Researcher'
        },
        categoria: 'Inteligencia Artificial',
        tags: ['IA', 'Machine Learning', 'Tecnología'],
        imagen: 'https://picsum.photos/seed/ai2025/800/400',
        likes: 234,
        comentariosList: [],
        vistas: 1523,
        fecha: new Date('2025-10-25')
      },
      {
        id: '2',
        titulo: 'Guía completa de Angular 18',
        resumen: 'Todo lo que necesitas saber sobre las nuevas características y mejoras en Angular 18.',
        contenido: 'Angular 18 trae consigo importantes mejoras en performance...',
        autor: {
          id: '2',
          nombre: 'Carlos Rodríguez',
          avatar: '👨‍💼',
          bio: 'Frontend Developer'
        },
        categoria: 'Desarrollo Web',
        tags: ['Angular', 'JavaScript', 'Frontend'],
        imagen: 'https://picsum.photos/seed/angular18/800/400',
        likes: 189,
        comentariosList: [],
        vistas: 987,
        fecha: new Date('2025-10-20')
      },
      {
        id: '3',
        titulo: 'Mejores prácticas en desarrollo ágil',
        resumen: 'Aprende a implementar metodologías ágiles efectivas en tu equipo de desarrollo.',
        contenido: 'El desarrollo ágil se ha convertido en el estándar de la industria...',
        autor: {
          id: '3',
          nombre: 'Ana Martínez',
          avatar: '👩‍🔬',
          bio: 'Scrum Master & Agile Coach'
        },
        categoria: 'Metodologías',
        tags: ['Agile', 'Scrum', 'Productividad'],
        imagen: 'https://picsum.photos/seed/agile/800/400',
        likes: 156,
        comentariosList: [],
        vistas: 756,
        fecha: new Date('2025-10-15')
      },
      {
        id: '4',
        titulo: 'Seguridad en aplicaciones web modernas',
        resumen: 'Protege tus aplicaciones con estas técnicas esenciales de seguridad.',
        contenido: 'La seguridad es una preocupación fundamental en el desarrollo web...',
        autor: {
          id: '4',
          nombre: 'Roberto Silva',
          avatar: '👨‍🔧',
          bio: 'Security Engineer'
        },
        categoria: 'Seguridad',
        tags: ['Security', 'Web', 'Best Practices'],
        imagen: 'https://picsum.photos/seed/security/800/400',
        likes: 267,
        comentariosList: [],
        vistas: 1834,
        fecha: new Date('2025-10-10')
      }
    ];
  }
}
