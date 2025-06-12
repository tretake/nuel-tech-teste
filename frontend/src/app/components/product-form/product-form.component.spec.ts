import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../../services/product/product.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockProductService: any;

  beforeEach(async () => {
    mockProductService = {
      createProduct: jasmine.createSpy('createProduct').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close modal', () => {
    expect(component.showModal).toBeFalse();
    component.openModal();
    expect(component.showModal).toBeTrue();
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });

  it('should emit productCreated and close modal on submit', () => {
    spyOn(component.productCreated, 'emit');
    component.openModal();
    component.product = {
      name: 'Test',
      description: 'Desc',
      price: 10,
      category: 'Cat',
      stock: 5
    };
    component.onSubmit();
    expect(mockProductService.createProduct).toHaveBeenCalled();
    expect(component.productCreated.emit).toHaveBeenCalled();
    expect(component.showModal).toBeFalse();
  });

  it('should render the modal when showModal is true', () => {
    component.openModal();
    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal).toBeTruthy();
  });
});