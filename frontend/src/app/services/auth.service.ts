import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginResponse, User, UserDetails } from '../interfaces/user';
import { Observable,catchError,tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static isLoggedIn: any;

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:4700/user';
  registerUser(user:User){
    this.http.post(`${this.apiUrl}/register`,user).subscribe(res=>{
      return res
    })
  }


  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, user).pipe(
      tap((result) => {
        
        const token = result.token;

       
        localStorage.setItem('token', token);
      })
    );
  }
  getUserDetails(): Observable<UserDetails> {
    const token = localStorage.getItem('token') || '';
  
    // Include the token in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });
  
    // Make the HTTP request with the headers
    return this.http.get<UserDetails>('http://localhost:4700/user/checkUserDetails/', { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle HTTP errors
          console.error('Error fetching user details:', error);
          return throwError('Failed to fetch user details. Please try again.');
        })
      );
  }
  

  // getUserDetails(): Observable<any> {
  
  //   const token = localStorage.getItem('token');

  //   console.log(token);
    
  //   // const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    
  //   return this.http.get<any>('http://localhost:4500/users/details/', token);
  // }

  isLoggedIn(): boolean {
   
    return !!localStorage.getItem('token');
  }
  
}
