import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { TaskService } from '../../../../core/services/task.service';
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
  private readonly router = inject(Router);

  private readonly filterSubject = new BehaviorSubject<TaskFilter>('all');

  readonly activeFilter$ = this.filterSubject.asObservable();
  readonly vm$ = this.activeFilter$.pipe(
    switchMap((filter) =>
      this.taskService.getFilteredTasks$(filter).pipe(
        map((tasks) => ({
          filter,
          tasks,
        })),
      ),
    ),
  );

  setFilter(filter: TaskFilter): void {
    this.filterSubject.next(filter);
  }

  goToCreateTask(): void {
    void this.router.navigate(['/tasks/new']);
  }

  onEditTask(task: Task): void {
    void this.router.navigate(['/tasks', task.id]);
  }

  onDeleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  logout(): void {
    this.authService.logout();
  }

  trackByTaskId(_: number, task: Task): number {
    return task.id;
  }
}
