import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Recursos } from './pages/recursos/recursos';

const routes: Routes = [
  {
    path: '',
    component: Recursos
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosRoutingModule { }
