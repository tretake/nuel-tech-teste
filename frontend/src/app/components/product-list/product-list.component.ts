import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Product, ProductService } from '../../services/product/product.service'; 
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule], 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'] 
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; 
  selectedProduct: Product | null = null;
  editValidationErrors: any = {}; 

  constructor(private productService: ProductService) { } // Injeta o serviço de produtos

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

  editProduct(product: Product): void {
    this.selectedProduct = { ...product }; 
    this.editValidationErrors = {}; 
  }

  saveProduct(): void {
    if (!this.selectedProduct || !this.selectedProduct.id) return;

    // Validação de Formulário 
    this.editValidationErrors = {};

    if (!this.selectedProduct.name || this.selectedProduct.name.trim() === '') {
      this.editValidationErrors.name = 'O nome do produto não pode ficar em branco.';
    }
    if (this.selectedProduct.price <= 0) {
      this.editValidationErrors.price = 'O preço não pode ser menor ou igual a zero.';
    }
    if (!this.selectedProduct.category || this.selectedProduct.category.trim() === '') {
      this.editValidationErrors.category = 'A categoria do produto não pode ficar em branco.';
    }
    if (this.selectedProduct.stock < 0) {
      this.editValidationErrors.stock = 'O estoque não pode ser negativo.';
    }
    

    if (Object.keys(this.editValidationErrors).length > 0) {
      return;
    }

    this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe({
      next: (updatedProduct) => {
        console.log('Product updated:', updatedProduct);
        this.selectedProduct = null; 
        this.loadProducts(); 
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }

  cancelEdit(): void {
    this.selectedProduct = null; 
    this.editValidationErrors = {};
  }
}