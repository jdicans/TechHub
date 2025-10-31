import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, FileText, Heart, MessageCircle, Eye, Plus, X, Search, Send } from 'lucide-angular';

import { BlogRoutingModule } from './blog-routing-module';
import { Blog } from './pages/blog/blog';


@NgModule({
  declarations: [
    Blog
  ],
  imports: [
    CommonModule,
    FormsModule,
    BlogRoutingModule,
    LucideAngularModule.pick({ FileText, Heart, MessageCircle, Eye, Plus, X, Search, Send })
  ]
})
export class BlogModule { }
