import { TestBed } from '@angular/core/testing';
import {  HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService, Product } from './product.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: 1,
    name: 'Produto Teste',
    description: 'Descrição',
    price: 10,
    category: 'Categoria',
    stock: 5
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [        
        provideHttpClient(), 
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual([mockProduct]);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush([mockProduct]);
  });

  it('should create a product', () => {
    service.createProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should update a product', () => {
    service.updateProduct(1, mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });

  it('should delete a product', () => {
  service.deleteProduct(1).subscribe(response => {
    expect(response === undefined || response === null || JSON.stringify(response) === '{}').toBeTrue();
  });

  const req = httpMock.expectOne('http://localhost:3000/products/1');
  expect(req.request.method).toBe('DELETE');
  req.flush(null); 
});
});