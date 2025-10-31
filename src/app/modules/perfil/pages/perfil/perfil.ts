import { Component, OnInit } from '@angular/core';
import { Perfil as PerfilModel } from '../../models/perfil.model';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  perfil: PerfilModel = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@techhub.com',
    avatar: '👨‍💻',
    bio: 'Desarrollador Full Stack apasionado por crear soluciones innovadoras. Me encanta aprender nuevas tecnologías y compartir conocimiento con la comunidad.',
    rol: 'Senior Full Stack Developer',
    ubicacion: 'Madrid, España',
    empresa: 'TechHub Solutions',
    website: 'https://juanperez.dev',
    github: 'github.com/juanperez',
    linkedin: 'linkedin.com/in/juanperez',
    skills: ['JavaScript', 'TypeScript', 'Angular', 'React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
    intereses: ['Inteligencia Artificial', 'Cloud Computing', 'Open Source', 'DevOps', 'Machine Learning', 'Blockchain']
  };

  editando: boolean = false;
  perfilEditado: PerfilModel = { ...this.perfil };

  ngOnInit(): void {}

  activarEdicion(): void {
    this.editando = true;
    this.perfilEditado = { ...this.perfil };
  }

  guardarCambios(): void {
    this.perfil = { ...this.perfilEditado };
    this.editando = false;
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.perfilEditado = { ...this.perfil };
  }

  agregarSkill(event: any): void {
    const input = event.target.value.trim();
    if (input && event.key === 'Enter') {
      this.perfilEditado.skills.push(input);
      event.target.value = '';
    }
  }

  eliminarSkill(index: number): void {
    this.perfilEditado.skills.splice(index, 1);
  }

  agregarInteres(event: any): void {
    const input = event.target.value.trim();
    if (input && event.key === 'Enter') {
      this.perfilEditado.intereses.push(input);
      event.target.value = '';
    }
  }

  eliminarInteres(index: number): void {
    this.perfilEditado.intereses.splice(index, 1);
  }
}
