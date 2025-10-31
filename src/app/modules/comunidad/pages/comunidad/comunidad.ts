import { Component, OnInit } from '@angular/core';
import { ComunidadService } from '../../services/comunidad.service';
import { Miembro } from '../../models/comunidad.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comunidad',
  standalone: false,
  templateUrl: './comunidad.html',
  styleUrl: './comunidad.css',
})
export class Comunidad implements OnInit {
  miembros$: Observable<Miembro[]>;

  constructor(private comunidadService: ComunidadService) {
    this.miembros$ = this.comunidadService.getMiembros();
  }

  ngOnInit(): void {}

  verPerfil(miembro: Miembro): void {
    console.log('Ver perfil de:', miembro.nombre);
  }

  conectar(id: string): void {
    this.comunidadService.conectar(id);
  }

  estaConectado(id: string): boolean {
    return this.comunidadService.estaConectado(id);
  }

  getSkillsLimitados(skills: string[]): string[] {
    return skills.slice(0, 3);
  }
}
