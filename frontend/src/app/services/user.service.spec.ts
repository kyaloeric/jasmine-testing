// import { TestBed } from '@angular/core/testing';

// import { UserService } from './user.service';

// describe('UserService', () => {
//   let service: UserService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(UserService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });



import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { UserDetails } from '../interfaces/user';
import { ProductService } from './product.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, ProductService], 
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should send a GET request to the server with the token in headers', () => {
      service.getUsers().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4700/user/');
      expect(req.request.method).toEqual('GET');
      req.flush([]); 
    });
  });

  describe('checkDetails', () => {
    it('should send a GET request to the server with the token in headers and return user role', () => {
      spyOn(localStorage, 'getItem').and.returnValue('fake-token');

      service.checkDetails().subscribe((role) => {
        expect(role).toEqual('user'); 
      });

      const req = httpTestingController.expectOne('http://localhost:4700/user/checkUserDetails');
      expect(req.request.method).toEqual('GET');
      req.flush({ info: { role: 'user' } });
    });
  });

  describe('updateUserById', () => {
    it('should send a PUT request to the server with the updated user data', () => {
      spyOn(localStorage, 'getItem').and.returnValue('fake-token');
      spyOn(service['authService'], 'getUserDetails').and.returnValue(of({
        userId: 'f76c76b4-38ad-480a-9217-349b8df30fc8',
        userName: 'username',
        userEmail: 'email@example.com',
        userPhone: 'phone-number',
        profilePic: 'profile-pic-url',
        role: 'role'
      } as UserDetails));
  
      const updatedUser = {
        userId: 'f76c76b4-38ad-480a-9217-349b8df30fc8',
        userName: 'caleb kellah',
        userEmail: 'qwerty12@gmail.com',
        userPhone: '0778770338',
        profilePic: 'https://images.unsplash.com/photo-1682687982423-295485af248a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
        role: 'user'
      };
  
      service.updateUserById(updatedUser).subscribe();
  
      const req = httpTestingController.expectOne('http://localhost:4700/user/update/f76c76b4-38ad-480a-9217-349b8df30fc8');
      expect(req.request.method).toEqual('PUT');
      req.flush({  });
    });
  });
  

  describe('deleteUser', () => {
    it('should send a DELETE request to the server with the userId in the URL', () => {
      const userId = 'f76c76b4-38ad-480a-9217-349b8df30fc8';

      service.deleteUser(userId).subscribe();

      const req = httpTestingController.expectOne(`http://localhost:4700/user/delete/${userId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({  });
    });
  });

  describe('getProducts', () => {
    it('should send a GET request to the server for products', () => {
      service.getProducts().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4700/products/all');
      expect(req.request.method).toEqual('GET');
      req.flush([]); 
    });
  });
});
