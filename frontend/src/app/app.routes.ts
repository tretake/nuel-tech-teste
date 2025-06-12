import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component'; 
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
export const routes: Routes = [
  
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];