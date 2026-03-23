import { Component, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { TaskService } from '../../../../core/services/task.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  private readonly authService = inject(AuthService);
  private readonly taskService = inject(TaskService);

  readonly session = this.authService.getCurrentSession();

  readonly stats$ = this.taskService.getTasks().pipe(
    map((tasks) => ({
      total: tasks.length,
      pending: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
    })),
  );

  logout(): void {
    this.authService.logout();
  }
}
