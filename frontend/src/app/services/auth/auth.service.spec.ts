import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [        
        provideHttpClient(), 
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should login and store token/user', () => {
    service.login('test@email.com', '123').subscribe();
    const req = httpMock.expectOne('http://localhost:3000/sessions');
    req.flush({ token: 'abc', user: { name: 'Test', password: '' } });
    expect(localStorage.getItem('token')).toBe('abc');
    expect(service.getUser()).toEqual({ name: 'Test', password: '' });
  });

  it('should signup and store token/user', () => {
    service.signup('signup@email.com', '456').subscribe();
    const req = httpMock.expectOne('http://localhost:3000/users');
    req.flush({ token: 'def', user: { name: 'Signup', password: '' } });
    expect(localStorage.getItem('token')).toBe('def');
    expect(service.getUser()).toEqual({ name: 'Signup', password: '' });
  });

  it('should logout and clear token/user', () => {
    localStorage.setItem('token', 'abc');
    localStorage.setItem('user', JSON.stringify({ name: 'Test', password: '' }));
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(service.getUser()).toBeNull();
  });

  it('should get token', () => {
    localStorage.setItem('token', 'xyz');
    expect(service.getToken()).toBe('xyz');
  });

  it('should return true if authenticated', () => {
    localStorage.setItem('token', 'xyz');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if not authenticated', () => {
    localStorage.removeItem('token');
    expect(service.isAuthenticated()).toBeFalse();
  });
});