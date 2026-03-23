import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Credentials, SessionUser } from '../../features/auth/models/auth.model';

const AUTH_STORAGE_KEY = 'tm_session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sessionSubject = new BehaviorSubject<SessionUser | null>(
    this.getStoredSession(),
  );

  readonly session$ = this.sessionSubject.asObservable();

  login(credentials: Credentials): Observable<SessionUser> {
    const session: SessionUser = {
      id: 1,
      name: credentials.username.trim(),
      email: `${credentials.username.trim().toLowerCase()}@taskmanager.local`,
      token: 'fake-jwt-token',
    };

    return of(session).pipe(
      delay(300),
      tap((currentSession) => {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentSession));
        this.sessionSubject.next(currentSession);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.sessionSubject.next(null);
  }

  isAuthenticated(): boolean {
    return Boolean(this.sessionSubject.value?.token);
  }

  getToken(): string | null {
    return this.sessionSubject.value?.token ?? null;
  }

  getCurrentSession(): SessionUser | null {
    return this.sessionSubject.value;
  }

  private getStoredSession(): SessionUser | null {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!session) {
      return null;
    }

    try {
      return JSON.parse(session) as SessionUser;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  }
}
