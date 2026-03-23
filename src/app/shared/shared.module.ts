import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { TaskStatusPipe } from './pipes/task-status.pipe';

@NgModule({
  declarations: [PageHeaderComponent, TaskStatusPipe],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    TaskStatusPipe,
  ],
})
export class SharedModule {}
