import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Users, Search, UserPlus, UserCheck, Eye, MapPin, Mail, Briefcase } from 'lucide-angular';
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
    LucideAngularModule.pick({ Users, Search, UserPlus, UserCheck, Eye, MapPin, Mail, Briefcase })
  ]
})
export class ComunidadModule { }
