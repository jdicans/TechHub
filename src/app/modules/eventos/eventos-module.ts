import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Calendar, MapPin, Clock, User, Users, Heart, Eye, Plus, X, Search, Filter } from 'lucide-angular';

import { EventosRoutingModule } from './eventos-routing-module';
import { Eventos } from './pages/eventos/eventos';


@NgModule({
  declarations: [
    Eventos
  ],
  imports: [
    CommonModule,
    FormsModule,
    EventosRoutingModule,
    LucideAngularModule.pick({ Calendar, MapPin, Clock, User, Users, Heart, Eye, Plus, X, Search, Filter })
  ]
})
export class EventosModule { }
