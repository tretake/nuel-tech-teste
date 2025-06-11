import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component'; 
import { ProductFormComponent } from './components/product-form/product-form.component'; 


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet,ProductListComponent,ProductFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-angular';
}
