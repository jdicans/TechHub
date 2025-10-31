import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';
import { AlertService } from '../../../../shared/services/alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  posts$: Observable<Post[]>;
  postSeleccionado: Post | null = null;
  mostrarFormulario = false;
  nuevoComentario = '';
  nuevoPost = {
    titulo: '',
    resumen: '',
    contenido: '',
    categoria: '',
    tags: '',
    imagen: ''
  };

  constructor(
    private blogService: BlogService,
    private alertService: AlertService
  ) {
    this.posts$ = this.blogService.getPosts();
  }

  ngOnInit(): void {}

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.nuevoPost = {
        titulo: '',
        resumen: '',
        contenido: '',
        categoria: '',
        tags: '',
        imagen: ''
      };
    }
  }

  crearPost(): void {
    if (!this.nuevoPost.titulo || !this.nuevoPost.contenido) {
      this.alertService.warning('Campos incompletos', 'Por favor completa el título y contenido del post');
      return;
    }

    const tagsArray = this.nuevoPost.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    this.blogService.crearPost({
      titulo: this.nuevoPost.titulo,
      resumen: this.nuevoPost.resumen,
      contenido: this.nuevoPost.contenido,
      categoria: this.nuevoPost.categoria || 'General',
      tags: tagsArray,
      imagen: this.nuevoPost.imagen || 'https://picsum.photos/800/400'
    });

    this.alertService.success('¡Post creado!', 'Tu artículo se ha publicado exitosamente');
    this.toggleFormulario();
  }

  verPost(post: Post): void {
    this.postSeleccionado = post;
    this.nuevoComentario = '';
  }

  cerrarPost(): void {
    this.postSeleccionado = null;
    this.nuevoComentario = '';
  }

  agregarComentario(postId: string, contenido: string): void {
    if (!contenido.trim()) {
      this.alertService.warning('Comentario vacío', 'Por favor escribe un comentario');
      return;
    }
    this.blogService.agregarComentario(postId, contenido);
    this.alertService.toast('Comentario agregado', 'success');
    this.nuevoComentario = '';
  }

  darLike(postId: string): void {
    this.blogService.darLike(postId);
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
}
