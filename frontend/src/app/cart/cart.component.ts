
import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  userId: string = ''; 
  product: any = {};
  

  cartItems: any[] = [];
  errorMessage: string = '';
  dialog: any;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product).subscribe(
      (response) => {
        console.log(response.message);
        this.product.boughtBy = this.userId;
        this.viewCart(); 
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to add product to cart.';
      }
    );
  }
  openCartModal(): void {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '400px', // Adjust the width as needed
      data: { cartItems: this.cartItems },
    });

    dialogRef.afterClosed().subscribe((_result: any) => {
      // Handle actions after the modal is closed if needed
    });
  }

  closeCart(): void {
    // Handle actions when the modal is closed
  }
  viewCart(): void {
    this.cartService.viewCart(this.userId).subscribe(
      (response) => {
        console.log(response.cart);
        this.cartItems = response.cart;
        this.errorMessage = ''; 
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to view cart.';
      }
    );
  }

  removeAllFromCart(): void {
    this.cartService.removeAllFromCart(this.userId).subscribe(
      (response) => {
        console.log(response.message);
        this.cartItems = []; 
        this.errorMessage = ''; 
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to remove all items from cart.';
      }
    );
  }

  removeOneFromCart(productId: string): void {
    this.cartService.removeOneFromCart(productId).subscribe(
      (response) => {
        console.log(response.message);
        this.viewCart(); 
        this.errorMessage = ''; 
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to remove item from cart.';
      }
    );
  }
}
