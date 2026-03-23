import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task, TaskFilter } from '../../features/tasks/models/task.model';

const TASKS_STORAGE_KEY = 'tm_tasks';

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Preparar roadmap del sprint',
    description: 'Definir prioridades funcionales del Task Manager.',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Diseñar dashboard inicial',
    description: 'Crear metricas basicas y accesos directos.',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());

  readonly tasks$ = this.tasksSubject.asObservable();

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getTaskById$(taskId: number): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map((tasks) => tasks.find((task) => task.id === taskId)),
    );
  }

  createTask(task: Pick<Task, 'title' | 'description' | 'completed'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.updateState([newTask, ...this.tasksSubject.value]);
  }

  updateTask(taskId: number, changes: Partial<Task>): void {
    const updatedTasks = this.tasksSubject.value.map((task) =>
      task.id === taskId
        ? {
            ...task,
            ...changes,
            updatedAt: new Date().toISOString(),
          }
        : task,
    );

    this.updateState(updatedTasks);
  }

  deleteTask(taskId: number): void {
    this.updateState(this.tasksSubject.value.filter((task) => task.id !== taskId));
  }

  getFilteredTasks$(filter: TaskFilter): Observable<Task[]> {
    return this.tasks$.pipe(
      map((tasks) => {
        switch (filter) {
          case 'completed':
            return tasks.filter((task) => task.completed);
          case 'pending':
            return tasks.filter((task) => !task.completed);
          default:
            return tasks;
        }
      }),
    );
  }

  private loadTasks(): Task[] {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

    if (!storedTasks) {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }

    try {
      return JSON.parse(storedTasks) as Task[];
    } catch {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
  }

  private updateState(tasks: Task[]): void {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }
}
