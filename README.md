# Task Manager

Aplicacion web tipo gestor de tareas desarrollada con Angular 21. El proyecto esta planteado como una base frontend profesional, con arquitectura modular, estado reactivo sencillo con RxJS y una estructura preparada para crecer por funcionalidades.

## Demo

https://task-manager-swart-zeta-65.vercel.app/

## Repositorio

https://github.com/sergioromerogalan/TaskManager

## Caracteristicas

- Login fake sin backend real
- Dashboard inicial con resumen de tareas
- CRUD completo de tareas
- Filtros por estado: todas, completadas y pendientes
- Formularios reactivos con validaciones
- Estado reactivo con `BehaviorSubject`
- Persistencia en `localStorage`
- Routing con lazy loading
- Guard de autenticacion e interceptor basico
- Base de tests unitarios para servicio y componente

## Stack

- Angular 21
- TypeScript
- RxJS
- SCSS
- Bootstrap 5
- Vitest

## Arquitectura

El proyecto sigue una estructura modular orientada a separacion de responsabilidades:

```text
src/app/
├── core/        # servicios singleton, guards, interceptors, handlers
├── shared/      # componentes reutilizables, pipes y modulos compartidos
└── features/
    ├── auth/        # login fake
    ├── dashboard/   # vista inicial protegida
    └── tasks/       # listado, alta y edicion de tareas
```

### Criterios aplicados

- La logica de negocio vive en servicios
- Los modelos se definen con interfaces TypeScript
- El estado simple se resuelve con `BehaviorSubject`
- Los componentes consumen observables con `async pipe` siempre que es posible
- Las features cargan por lazy loading para mantener una base escalable

## Modulo de tareas

El modulo `tasks` incluye:

- `/tasks`: listado de tareas con filtros y acciones
- `/tasks/new`: creacion de tarea
- `/tasks/:id`: edicion de tarea

La persistencia actual es local y se gestiona desde `TaskService` usando la clave `tm_tasks` en `localStorage`.

## Scripts

Desde la raiz del proyecto:

```bash
npm install
npm start
```

Scripts disponibles:

```bash
npm start
npm run build
npm test
npm test -- --watch=false
```

`npm start` levanta el servidor de desarrollo en `http://localhost:4200`.

## Testing

Actualmente el proyecto incluye ejemplos basicos de test unitario:

- Servicio: validacion del flujo CRUD reactivo de tareas
- Componente: validacion del formulario de tareas

Los tests se ejecutan con Vitest a traves de Angular:

```bash
npm test -- --watch=false
```

## Estado actual

Esta base esta pensada como punto de partida realista para seguir evolucionando:

- autenticacion fake reemplazable por backend real
- capa de datos migrable a API REST o JSON Server
- estructura preparada para nuevas features y mas cobertura de testing

