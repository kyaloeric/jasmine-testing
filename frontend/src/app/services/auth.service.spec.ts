// import { TestBed } from '@angular/core/testing';

// import { AuthService } from './auth.service';

// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AuthService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User, UserDetails, LoginResponse } from '../interfaces/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {
    it('should send a POST request to the server', () => {
      const user: User = {
        userId: '',
        userName: '',
        userEmail: '',
        userPhone: '',
        password: '',
        profilePic: '',
        role: ''
      };

      service.registerUser(user);

      const req = httpTestingController.expectOne('http://localhost:4700/user/register');
      expect(req.request.method).toEqual('POST');
      req.flush({ /* your response data here */ });
    });
  });

  describe('login', () => {
    it('should send a POST request to the server and store the token in local storage', () => {
      const user: User = {
        userId: '',
        userName: '',
        userEmail: '',
        userPhone: '',
        password: '',
        profilePic: '',
        role: ''
      };
      const loginResponse: LoginResponse = {
        token: 'fake-token',
        user: undefined,
        userId: ''
      };

      service.login(user).subscribe();

      const req = httpTestingController.expectOne('http://localhost:4700/user/login/');
      expect(req.request.method).toEqual('POST');
      req.flush(loginResponse);

      expect(localStorage.getItem('token')).toEqual('fake-token');
    });
  });

  describe('getUserDetails', () => {
    it('should send a GET request to the server with the token in headers', () => {
      const userDetails: UserDetails = {
        userId: '',
        userPhone: '',
        userName: '',
        userEmail: '',
        profilePic: ''
      };

      service.getUserDetails().subscribe((response) => {
        expect(response).toEqual(userDetails);
      });

      const req = httpTestingController.expectOne('http://localhost:4700/user/checkUserDetails/');
      expect(req.request.method).toEqual('GET');

      // Mock server response
      req.flush(userDetails);
    });

    it('should handle HTTP errors', () => {
      service.getUserDetails().subscribe(
        () => fail('Expected an error, but got a successful response'),
        (error) => {
          expect(error).toEqual('Failed to fetch user details. Please try again.');
        }
      );

      const req = httpTestingController.expectOne('http://localhost:4700/user/checkUserDetails/');
      expect(req.request.method).toEqual('GET');

      // Simulate an HTTP error
      req.error(new ErrorEvent('HTTP error'), { status: 500 });
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if token is present in local storage', () => {
      localStorage.setItem('token', 'fake-token');
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if token is not present in local storage', () => {
      localStorage.removeItem('token');
      expect(service.isLoggedIn()).toBeFalse();
    });
  });
});
