// import { TestBed } from '@angular/core/testing';

// import { CartService } from './cart.service';

// describe('CartService', () => {
//   let service: CartService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(CartService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CartService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addToCart', () => {
    it('should send a POST request to the server', () => {
      const product = { };

      service.addToCart(product).subscribe();

      const req = httpTestingController.expectOne('http://localhost:4700/cart/add');
      expect(req.request.method).toEqual('POST');
      req.flush({  });
    });
  });

  describe('viewCart', () => {
    it('should send a GET request to the server with the userId in the URL', () => {
      const userId = '123';

      service.viewCart(userId).subscribe();

      const req = httpTestingController.expectOne(`http://localhost:4700/cart/viewCart/${userId}`);
      expect(req.request.method).toEqual('GET');
      req.flush({  });
    });
  });

  describe('removeAllFromCart', () => {
    it('should send a DELETE request to the server with the userId in the URL', () => {
      const userId = '123';

      service.removeAllFromCart(userId).subscribe();

      const req = httpTestingController.expectOne(`http://localhost:4700/cart/deleteAll/${userId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({  });
    });
  });

  describe('removeOneFromCart', () => {
    it('should send a DELETE request to the server with the productId in the URL', () => {
      const productId = '456';

      service.removeOneFromCart(productId).subscribe();

      const req = httpTestingController.expectOne(`http://localhost:4700/cart/removeOne/${productId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({  });
    });
  });
});
