import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Users, 
  Mail, 
  GraduationCap, 
  Search, 
  X, 
  FilterX,
  SearchX
} from 'lucide-angular';
import { ComunidadRoutingModule } from './comunidad-routing-module';
import { Comunidad } from './pages/comunidad/comunidad';

@NgModule({
  declarations: [
    Comunidad
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComunidadRoutingModule,
    LucideAngularModule.pick({ 
      Users, 
      Mail, 
      GraduationCap, 
      Search, 
      X, 
      FilterX,
      SearchX
    })
  ]
})
export class ComunidadModule { }
