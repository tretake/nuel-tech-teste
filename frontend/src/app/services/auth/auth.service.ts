import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject  } from 'rxjs';


export interface User {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private userSubject = new BehaviorSubject<any>(this.getUser());
  user$ = this.userSubject.asObservable();  //usado para atualizar o componente header

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(`${this.apiUrl}/sessions`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userSubject.next(response.user); 
      })
    );
  }

  signup(email: string, password: string): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(`${this.apiUrl}/users`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userSubject.next(response.user); 
      })
    );
  }


  getUser(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Faz logout, removendo token/usuário do localStorage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null); 
  }

  // Recupera o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // Retorna true se houver token (usuário autenticado), false caso contrário
  isAuthenticated(): boolean {
    return !!this.getToken(); 
  }
}
