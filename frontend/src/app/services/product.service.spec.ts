// import { TestBed } from '@angular/core/testing';

// import { ProductService } from './product.service';

// describe('ProductService', () => {
//   let service: ProductService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ProductService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });



import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('createProduct', () => {
    it('should send a POST request to the server with the product data', () => {
      const product: Product = {
        productId: 'product-id',
        productName: 'Product name',
        productDescription: 'This is a  product.',
        productClassification: 'my Classification',
        productCategory: 'my Category',
        productCost: 10.99,
        productImg: 'image-url.jpg',
        earlyCost: 8.99,
        userId: 'user-id',
      };

      service.createProduct(product).subscribe();

      const req = httpTestingController.expectOne('http://localhost:4700/product/add');
      expect(req.request.method).toEqual('POST');
      req.flush({  });
    });
  });

  describe('getProducts', () => {
    it('should send a GET request to the server', () => {
      service.getProducts().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4700/product/allProducts');
      expect(req.request.method).toEqual('GET');
      req.flush([]); 
    });
  });

  describe('getProductById', () => {
    it('should send a GET request to the server with the productId in the URL', () => {
      const productId = 'fake-product-id';

      service.getProductById(productId).subscribe();

      const req = httpTestingController.expectOne(`http://localhost:4700/product/viewOneProduct/${productId}`);
      expect(req.request.method).toEqual('GET');
      req.flush({ });
    });
  });

  describe('deleteProduct', () => {
    it('should send a DELETE request to the server with the productId in the URL', () => {
      const productId = 'fake-product-id';

      service.deleteProduct(productId).subscribe();

      const req = httpTestingController.expectOne(`http://localhost:4700/product/delete/${productId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({ });
    });
  });

  describe('updateProduct', () => {
    it('should send a PUT request to the server with the updated product data', () => {
      const productId = 'fake-product-id';
      const product: Product = {
        productId: 'product-id',
        productName: 'Updated Product',
        productDescription: 'This is an updated  product.',
        productClassification: 'Updated Classification',
        productCategory: 'Updated Category',
        productCost: 15.99,
        productImg: 'updated-fake-image-url.jpg',
        earlyCost: 12.99,
        userId: 'fake-user-id',
      };

      service.updateProduct(productId, product).subscribe();

      const req = httpTestingController.expectOne(`http://localhost:4700/product/update/${productId}`);
      expect(req.request.method).toEqual('PUT');
      req.flush({  });
    });
  });;
    

  describe('viewAllProducts', () => {
    it('should send a GET request to the server', () => {
      service.viewAllProducts().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4700/product/allProducts');
      expect(req.request.method).toEqual('GET');
      req.flush([]); 
    });
  });

  describe('viewProductsCategory', () => {
    it('should send a GET request to the server with the productCategory in the URL', () => {
      const productCategory = 'fake-category';

      service.viewProductsCategory(productCategory).subscribe();

      const req = httpTestingController.expectOne(`http://localhost:4700/product/allProducts/${productCategory}`);
      expect(req.request.method).toEqual('GET');
      req.flush([]); 
    });
  });

  describe('getProductsCategories', () => {
    it('should send a GET request to the server', () => {
      service.getProductsCategories().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4700/product/allProducts');
      expect(req.request.method).toEqual('GET');
      req.flush([]); 
    });
  });
});
