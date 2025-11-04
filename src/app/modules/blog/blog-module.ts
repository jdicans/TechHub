import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  FileText, 
  MessageCircle, 
  Eye, 
  Plus, 
  X, 
  Search, 
  Send, 
  Tag, 
  Filter,
  BookOpen,
  User,
  Calendar,
  Edit,
  Trash2,
  Check,
  Inbox,
  MessageSquare,
  Info,
  Loader
} from 'lucide-angular';

import { BlogRoutingModule } from './blog-routing-module';
import { Blog } from './pages/blog/blog';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';


@NgModule({
  declarations: [
    Blog
  ],
  imports: [
    CommonModule,
    FormsModule,
    BlogRoutingModule,
    TruncatePipe,
    LucideAngularModule.pick({ 
      FileText, 
      MessageCircle, 
      Eye, 
      Plus, 
      X, 
      Search, 
      Send, 
      Tag, 
      Filter,
      BookOpen,
      User,
      Calendar,
      Edit,
      Trash2,
      Check,
      Inbox,
      MessageSquare,
      Info,
      Loader
    })
  ]
})
export class BlogModule { }
