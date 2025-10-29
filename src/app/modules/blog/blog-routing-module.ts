import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Blog } from './pages/blog/blog';

const routes: Routes = [
  {
    path: '',
    component: Blog
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
