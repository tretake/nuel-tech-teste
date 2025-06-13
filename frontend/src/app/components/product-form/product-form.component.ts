import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService, Product } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [
    CommonModule,
    FormsModule 
  ],
  styleUrls: ['./product-form.component.scss'] 
})
export class ProductFormComponent {
  @Output() productCreated = new EventEmitter<void>();
  product: Product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0
  };

  showModal = false;

  validationErrors: any = {};

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
    this.validationErrors = {};
  }

  constructor(private productService: ProductService) {}

  onSubmit() {
    this.validationErrors = {};

    if (!this.product.name || this.product.name.trim() === '') {
      this.validationErrors.name = 'O nome do produto não pode ficar em branco.';
    }
    if (this.product.price <= 0) {
      this.validationErrors.price = 'O preço não pode ser menor ou igual a zero.';
    }
    if (!this.product.category || this.product.category.trim() === '') {
      this.validationErrors.category = 'A categoria do produto não pode ficar em branco.';
    }
    if (this.product.stock < 0) {
      this.validationErrors.stock = 'O estoque não pode ser negativo.';
    }
    if (!Number.isInteger(this.product.stock)) {
      this.validationErrors.stock = 'O estoque precisa ser um número inteiro.';
    }

    if (Object.keys(this.validationErrors).length > 0) {
      return;
    }

    this.productService.createProduct(this.product).subscribe({
      next: (created) => {
        console.log('Produto criado:', created);
        this.resetForm();
        this.productCreated.emit();
        this.closeModal();
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
    this.validationErrors = {};
  }
}