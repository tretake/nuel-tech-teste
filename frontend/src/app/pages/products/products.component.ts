import { Component, ViewChild } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component'; 
import { ProductFormComponent } from '../../components/product-form/product-form.component'; 

@Component({
  selector: 'app-products',
  imports: [ProductListComponent,ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  // Permite acessar métodos de ProductListComponent
  @ViewChild(ProductListComponent) productList!: ProductListComponent;

  onProductCreated() {
    this.productList.loadProducts();  // Quando um produto é criado, recarrega a lista de produtos chamando o método do filho
  }
}
