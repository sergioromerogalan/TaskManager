import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should create, update and delete a task', () => {
    const initialCount = service.getFilteredTasks('all').length;

    service.createTask({
      title: 'Nueva tarea',
      description: 'Descripcion de prueba',
      completed: false,
    });

    const createdTask = service.getFilteredTasks('all')[0];

    expect(service.getFilteredTasks('all').length).toBe(initialCount + 1);
    expect(createdTask.title).toBe('Nueva tarea');

    service.updateTask(createdTask.id, { completed: true });
    expect(service.getTaskById(createdTask.id)?.completed).toBe(true);

    service.deleteTask(createdTask.id);
    expect(service.getTaskById(createdTask.id)).toBeUndefined();
  });
});
