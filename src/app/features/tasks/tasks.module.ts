import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [TaskFormComponent, TaskListComponent],
  imports: [SharedModule, TasksRoutingModule],
})
export class TasksModule {}
