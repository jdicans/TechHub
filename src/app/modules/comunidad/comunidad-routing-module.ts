import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Comunidad } from './pages/comunidad/comunidad';

const routes: Routes = [
  {
    path: '',
    component: Comunidad
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunidadRoutingModule { }
