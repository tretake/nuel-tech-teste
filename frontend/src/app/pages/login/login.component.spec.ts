import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(of({}))
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation errors for empty fields', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    fixture.detectChanges();
    expect(component.loginForm.get('email')?.touched).toBeTrue();
    expect(component.loginForm.get('password')?.touched).toBeTrue();
  });

  it('should call login and navigate on valid submit', () => {
    component.loginForm.setValue({ email: 'test@email.com', password: '123456' });
    component.onSubmit();
    expect(mockAuthService.login).toHaveBeenCalledWith('test@email.com', '123456');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should show error message on login error', () => {
    mockAuthService.login.and.returnValue(throwError(() => ({ error: { error: 'Erro ao fazer login' } })));
    component.loginForm.setValue({ email: 'test@email.com', password: '123456' });
    component.onSubmit();
    expect(component.errorMessage).toBe('Erro ao fazer login');
  });

  it('should navigate to cadastro on goToCadastro()', () => {
    component.goToCadastro();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cadastro']);
  });
});