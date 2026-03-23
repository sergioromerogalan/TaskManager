import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should create, update and delete a task through its reactive API', async () => {
    const initialCount = (await firstValueFrom(service.getTasks())).length;

    service.createTask({
      title: 'Nueva tarea',
      description: 'Descripcion de prueba',
      completed: false,
    });

    const createdTask = (await firstValueFrom(service.getFilteredTasks$('all')))[0];

    expect((await firstValueFrom(service.getTasks())).length).toBe(initialCount + 1);
    expect(createdTask.title).toBe('Nueva tarea');

    service.updateTask(createdTask.id, { completed: true });
    expect((await firstValueFrom(service.getTaskById$(createdTask.id)))?.completed).toBe(
      true,
    );

    service.deleteTask(createdTask.id);
    expect(await firstValueFrom(service.getTaskById$(createdTask.id))).toBeUndefined();
  });
});
