import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [
    CommonModule,
    FormsModule 
  ],
})
export class ProductFormComponent {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0
  };

  constructor(private productService: ProductService) {}

  onSubmit() {
    this.productService.createProduct(this.product).subscribe({
      next: (created) => {
        console.log('Produto criado:', created);
        this.resetForm();
      },
      error: (err) => console.error('Erro ao criar produto:', err)
    });
  }

  resetForm() {
    this.product = {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0
    };
  }
}
