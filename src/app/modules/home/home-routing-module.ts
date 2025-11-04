import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';

const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard-module').then(m => m.DashboardModule)
      },
      {
        path: 'eventos',
        loadChildren: () =>
          import('../eventos/eventos-module').then(m => m.EventosModule)
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('../blog/blog-module').then(m => m.BlogModule)
      },
      {
        path: 'comunidad',
        loadChildren: () =>
          import('../comunidad/comunidad-module').then(m => m.ComunidadModule)
      },
      {
        path: 'emprendimientos',
        loadChildren: () =>
          import('../emprendimientos/emprendimientos-module').then(m => m.EmprendimientosModule)
      },
      {
        path: 'grupos',
        loadChildren: () =>
          import('../grupos/grupos-module').then(m => m.GruposModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
