import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Product, ProductService } from '../../services/product/product.service'; 
import { FormsModule } from '@angular/forms';

//product.service

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule], 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'] 
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; 
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) { }

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
  }

  saveProduct(): void {
    if (!this.selectedProduct || !this.selectedProduct.id) return;

    //Validação de Formulário
    if (!this.selectedProduct.name || this.selectedProduct.name.trim() === '') {
      alert('O nome do produto não pode ficar em branco.');
      return;
    }
    if (this.selectedProduct.price < 0) {
      alert('O preço não pode ser negativo.');
      return;
    }
    if (!this.selectedProduct.category || this.selectedProduct.category.trim() === '') {
      alert('a categoria do produto não pode ficar em branco.');
      return;
    }
    if (this.selectedProduct.stock < 0) {
      alert('O estoque não pode ser negativo.');
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
  }
}