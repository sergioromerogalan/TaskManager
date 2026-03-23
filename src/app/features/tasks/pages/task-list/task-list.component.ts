import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { TaskService } from '../../../../core/services/task.service';
import { TaskFormValue } from '../../components/task-form/task-form.component';
import { Task, TaskFilter } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private readonly authService = inject(AuthService);
  private readonly taskService = inject(TaskService);

  private readonly filterSubject = new BehaviorSubject<TaskFilter>('all');

  selectedTask: Task | null = null;
  readonly activeFilter$ = this.filterSubject.asObservable();

  readonly vm$ = combineLatest([
    this.taskService.getTasks(),
    this.activeFilter$,
  ]).pipe(
    map(([tasks, filter]) => ({
      filter,
      tasks: this.applyFilter(tasks, filter),
    })),
  );

  setFilter(filter: TaskFilter): void {
    this.filterSubject.next(filter);
  }

  onSaveTask(taskFormValue: TaskFormValue): void {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask.id, taskFormValue);
      this.selectedTask = null;
      return;
    }

    this.taskService.createTask(taskFormValue);
  }

  onEditTask(task: Task): void {
    this.selectedTask = task;
  }

  onDeleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);

    if (this.selectedTask?.id === taskId) {
      this.selectedTask = null;
    }
  }

  onCancelEdit(): void {
    this.selectedTask = null;
  }

  logout(): void {
    this.authService.logout();
  }

  trackByTaskId(_: number, task: Task): number {
    return task.id;
  }

  private applyFilter(tasks: Task[], filter: TaskFilter): Task[] {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }
}
