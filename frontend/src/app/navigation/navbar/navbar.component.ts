import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartComponent } from 'src/app/cart/cart.component';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string = ''; 
  product: any = {};
  

  cartItems: any[] = [];
  errorMessage: string = '';
  dialog: any;
  loggedIn: boolean = false;
  showProfileDropdown: boolean = false;
 filter=''

  constructor(private router: Router, private authService: AuthService, private formBuilder:FormBuilder, private cartService:CartService) {
    this.loggedIn = authService.isLoggedIn();
  }

  loggedInTrue = localStorage.getItem('loggedIn')

  // loggedIn = this.loggedInTrue

  ngOnInit(): void {
  
  }

  checkLoggedIn(){

    console.log(this.loggedInTrue);
    if(this.loggedInTrue == 'true'){
     
    }
  }

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
 

  logout() {
    this.router.navigate(['']);
    localStorage.clear();
    this.loggedIn = false;
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }
}
