import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, LogIn, UserPlus, Mail, Lock, Eye, EyeOff, Zap, CheckCircle, User } from 'lucide-angular';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages/auth/auth';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    LucideAngularModule.pick({ LogIn, UserPlus, Mail, Lock, Eye, EyeOff, Zap, CheckCircle, User })
  ]
})
export class AuthModule { }
