import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroComponent } from './cadastro.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      signup: jasmine.createSpy('signup').and.returnValue(of({}))
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [CadastroComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation errors for empty fields', () => {
    component.signupForm.setValue({ email: '', password: '' });
    component.onSubmit();
    fixture.detectChanges();
    expect(component.signupForm.get('email')?.touched).toBeTrue();
    expect(component.signupForm.get('password')?.touched).toBeTrue();
  });

  it('should call signup and navigate on valid submit', () => {
    component.signupForm.setValue({ email: 'test@email.com', password: '123456' });
    component.onSubmit();
    expect(mockAuthService.signup).toHaveBeenCalledWith('test@email.com', '123456');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should show error message on signup error', () => {
    mockAuthService.signup.and.returnValue(throwError(() => ({ error: { error: 'Erro ao cadastrar' } })));
    component.signupForm.setValue({ email: 'test@email.com', password: '123456' });
    component.onSubmit();
    expect(component.errorMessage).toBe('Erro ao cadastrar');
  });

  it('should navigate to login on goToLogin()', () => {
    component.goToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});