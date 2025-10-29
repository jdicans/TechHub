import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Eventos } from './pages/eventos/eventos';

const routes: Routes = [
  {
    path: '',
    component: Eventos
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
