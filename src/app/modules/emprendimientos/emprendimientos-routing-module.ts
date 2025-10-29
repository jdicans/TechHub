import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Emprendimientos } from './pages/emprendimientos/emprendimientos';

const routes: Routes = [
  {
    path: '',
    component: Emprendimientos
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprendimientosRoutingModule { }
