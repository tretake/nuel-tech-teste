import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Product, ProductService } from '../../services/product.service'; 

@Component({
  selector: 'app-product-list',
  imports: [CommonModule], 
  templateUrl: './product-list.component.html', 
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; 

  constructor(private productService: ProductService) { } // injetar o serviço

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; 
      },
      error: (err) => {
        console.error('Error loading products:', err); 
      }
    });
  }

  deleteProduct(id: number | undefined): void {
    if (!id) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log(`Product with id ${id} deleted`);
        this.loadProducts(); 
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      }
    });
  }
}

