import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { TaskService } from '../../../../core/services/task.service';
import { TaskFormValue } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-task-editor',
  standalone: false,
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss',
})
export class TaskEditorComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);

  readonly taskId = Number(this.route.snapshot.paramMap.get('id'));
  readonly isEditMode = this.route.snapshot.paramMap.has('id');
  readonly task$ = this.isEditMode
    ? this.taskService.getTaskById$(this.taskId)
    : this.route.data.pipe(map(() => null));

  onSave(taskFormValue: TaskFormValue): void {
    if (this.isEditMode) {
      this.taskService.updateTask(this.taskId, taskFormValue);
    } else {
      this.taskService.createTask(taskFormValue);
    }

    void this.router.navigate(['/tasks']);
  }

  onCancel(): void {
    void this.router.navigate(['/tasks']);
  }
}
