import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { By } from '@angular/platform-browser';
import {  provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ProductListComponent, ProductFormComponent],
      providers: [        
        provideHttpClient(), 
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ProductFormComponent and ProductListComponent', () => {
    const form = fixture.debugElement.query(By.directive(ProductFormComponent));
    const list = fixture.debugElement.query(By.directive(ProductListComponent));
    expect(form).toBeTruthy();
    expect(list).toBeTruthy();
  });

  it('should call productList.loadProducts() when onProductCreated is called', () => {
    
    component.productList = jasmine.createSpyObj('ProductListComponent', ['loadProducts']);
    component.onProductCreated();
    expect(component.productList.loadProducts).toHaveBeenCalled();
  });
});