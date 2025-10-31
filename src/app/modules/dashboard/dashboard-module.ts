import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Calendar, FileText, Users, TrendingUp, Activity, CalendarDays, ArrowRight, Tag, Newspaper, Heart, MessageCircle, Zap, CalendarPlus, PenSquare, Lightbulb, UserPlus, UserCircle, CheckCircle, Circle, Clock, CalendarCheck, UserCheck, BarChart, Minus } from 'lucide-angular';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './pages/dashboard/dashboard';

@NgModule({
  declarations: [
    Dashboard
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    LucideAngularModule.pick({
      Calendar,
      FileText,
      Users,
      TrendingUp,
      Activity,
      CalendarDays,
      ArrowRight,
      Tag,
      Newspaper,
      Heart,
      MessageCircle,
      Zap,
      CalendarPlus,
      PenSquare,
      Lightbulb,
      UserPlus,
      UserCircle,
      CheckCircle,
      Circle,
      Clock,
      CalendarCheck,
      UserCheck,
      BarChart,
      Minus
    })
  ]
})
export class DashboardModule { }
