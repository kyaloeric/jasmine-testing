// cart.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:4700/cart';

  constructor(private http: HttpClient) {}

  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product);
  }

  viewCart(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/viewCart/${userId}`);
  }

  removeAllFromCart(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteAll/${userId}`);
  }

  removeOneFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/removeOne/${productId}`);
  }
}