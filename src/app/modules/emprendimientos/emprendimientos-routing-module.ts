import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Emprendimientos } from './pages/emprendimientos/emprendimientos';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: Emprendimientos,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprendimientosRoutingModule { }
