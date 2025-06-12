import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product/product.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: any;

  const mockProducts = [
    { id: 1, name: 'Produto 1', description: 'Desc 1', price: 10, category: 'Cat 1', stock: 5 },
    { id: 2, name: 'Produto 2', description: 'Desc 2', price: 20, category: 'Cat 2', stock: 10 }
  ];

  beforeEach(async () => {
    mockProductService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of(mockProducts)),
      deleteProduct: jasmine.createSpy('deleteProduct').and.returnValue(of({})),
      updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of(mockProducts[0]))
    };

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product rows', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Produto 1');
    expect(rows[1].nativeElement.textContent).toContain('Produto 2');
  });

  it('should show empty message if no products', () => {
    mockProductService.getProducts.and.returnValue(of([]));
    component.loadProducts();
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('p'));
    expect(msg.nativeElement.textContent).toContain('Nenhum produto encontrado');
  });

  it('should call deleteProduct and reload products', () => {
    spyOn(component, 'loadProducts');
    component.deleteProduct(1);
    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(1);
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should enter edit mode and save changes', () => {
    component.editProduct(mockProducts[0]);
    expect(component.selectedProduct).toEqual(mockProducts[0]);
    component.selectedProduct = { ...mockProducts[0], name: 'Novo Nome' };
    component.saveProduct();
    expect(mockProductService.updateProduct).toHaveBeenCalledWith(1, jasmine.objectContaining({ name: 'Novo Nome' }));
    expect(component.selectedProduct).toBeNull();
  });
});