import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Mock, vi } from 'vitest';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: {
    login: Mock;
    isAuthenticated: Mock;
  };

  beforeEach(async () => {
    authServiceSpy = {
      login: vi.fn().mockReturnValue(
        of({
          id: 1,
          name: 'demo',
          email: 'demo@taskmanager.local',
          token: 'fake-jwt-token',
        }),
      ),
      isAuthenticated: vi.fn().mockReturnValue(false),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy as Partial<AuthService> }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should mark the form invalid when required fields are empty', () => {
    component.loginForm.setValue({
      username: '',
      password: '',
    });

    component.submit();

    expect(component.loginForm.invalid).toBe(true);
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });
});
