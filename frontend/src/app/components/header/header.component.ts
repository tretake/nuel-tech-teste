import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  user: any;
  private sub: Subscription;

  // Injeta AuthService e Router
  constructor(private authService: AuthService, private router: Router) {
    this.sub = this.authService.user$.subscribe(user => { //para detectar mudanças no usuario
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}