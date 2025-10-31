import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Lightbulb, Heart, Eye, Plus, X, Search, Filter, MapPin, Users, DollarSign, UserPlus, Globe, Mail, Phone } from 'lucide-angular';

import { EmprendimientosRoutingModule } from './emprendimientos-routing-module';
import { Emprendimientos } from './pages/emprendimientos/emprendimientos';


@NgModule({
  declarations: [
    Emprendimientos
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmprendimientosRoutingModule,
    LucideAngularModule.pick({ Lightbulb, Heart, Eye, Plus, X, Search, Filter, MapPin, Users, DollarSign, UserPlus, Globe, Mail, Phone })
  ]
})
export class EmprendimientosModule { }
