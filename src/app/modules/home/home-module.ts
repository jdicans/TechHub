import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Home as HomeIcon, Calendar, Lightbulb, FileText, Users, User, LogOut, Menu, X, ChevronLeft, Settings } from 'lucide-angular';

import { HomeRoutingModule } from './home-routing-module';
import { Home } from './pages/home/home';


@NgModule({
  declarations: [
    Home
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LucideAngularModule.pick({ Home: HomeIcon, Calendar, Lightbulb, FileText, Users, User, LogOut, Menu, X, ChevronLeft, Settings })
  ]
})
export class HomeModule { }
