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
        path: 'perfil',
        loadChildren: () =>
          import('../perfil/perfil-module').then(m => m.PerfilModule)
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
