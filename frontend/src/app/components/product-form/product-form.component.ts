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
  @Output() productCreated = new EventEmitter<void>(); //evento para atualizar product-list
  product: Product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0
  };

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  constructor(private productService: ProductService) {}

  onSubmit() {
    if (!this.product.name || this.product.name.trim() === '') {
      alert('O nome do produto não pode ficar em branco.');
      return;
    }
    if (this.product.price <= 0) {
      alert('O preço não pode ser menor que zero.');
      return;
    }
    if (!this.product.category || this.product.category.trim() === '') {
      alert('a categoria do produto não pode ficar em branco.');
      return;
    }
    if (this.product.stock < 0) {
      alert('O estoque não pode ser negativo.');
      return;
    }
    if (!Number.isInteger(this.product.stock)) {
      alert('O estoque precisa ser um número inteiro.');
      return;
    }

     

    this.productService.createProduct(this.product).subscribe({
      next: (created) => {
        console.log('Produto criado:', created);
        this.resetForm();
        this.productCreated.emit(); // Emite o evento
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
  }
}
