import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Users, Plus, Search, X, UserCheck, Edit, Trash2, Check, Loader, UsersRound, SearchX, Info, Calendar, Crown, Shield, User, UserMinus, LogOut, CheckCircle } from 'lucide-angular';
import { GruposRoutingModule } from './grupos-routing-module';
import { Grupos } from './pages/grupos/grupos';

@NgModule({
  declarations: [Grupos],
  imports: [
    CommonModule,
    FormsModule,
    GruposRoutingModule,
    LucideAngularModule.pick({ 
      Users, 
      Plus, 
      Search, 
      X, 
      UserCheck, 
      Edit, 
      Trash2, 
      Check, 
      Loader, 
      UsersRound, 
      SearchX, 
      Info, 
      Calendar, 
      Crown, 
      Shield, 
      User, 
      UserMinus, 
      LogOut, 
      CheckCircle 
    })
  ]
})
export class GruposModule { }
