import {
  Component,
  EventEmitter,
  Input,
  inject,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

export interface TaskFormValue {
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnChanges {
  private readonly formBuilder = inject(FormBuilder);

  @Input() task: Task | null = null;
  @Output() saveTask = new EventEmitter<TaskFormValue>();
  @Output() cancelEdit = new EventEmitter<void>();

  readonly taskForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    completed: [false],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.taskForm.reset({
        title: this.task?.title ?? '',
        description: this.task?.description ?? '',
        completed: this.task?.completed ?? false,
      });
    }
  }

  submit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.saveTask.emit(this.taskForm.getRawValue());

    if (!this.task) {
      this.taskForm.reset({
        title: '',
        description: '',
        completed: false,
      });
    }
  }
}
