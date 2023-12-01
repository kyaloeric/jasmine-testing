// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { AuthService } from '../services/auth.service'; 
// import { UserService } from '../services/user.service';
// import { AdminComponent } from '../dashboards/admin/admin.component';
// // import { NavbarService } from '../services/navbar.service';
// import { ActivatedRoute } from '@angular/router';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs/internal/Observable';
// import { Product } from '../interfaces/product';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductComponent implements OnInit {
//   products: any[] = [];
//   showNavbar: boolean = true;
//   productCategories: string[] = []; 

//   constructor(private productService: ProductService,  private route: ActivatedRoute, private authService: AuthService, private userService: UserService) {}

//   ngOnInit(): void {
//     this.loadProducts();
//     this.getProducts();
//     // this.checkUserRole();

//     // this.navbarService.setShowNavbar(true);  
//    }

//    getProducts(){
//     this.productService.getProducts().subscribe((products)=>{
//       console.log(products);
//       this.products=products
//       return products
//     })
//   }


//    loadProducts() {
//     this.productService.getProducts().subscribe(
//       (data) => {
//         if (data && data.hasOwnProperty('products') && Array.isArray(data.products)) {
//           this.products = data.products; // Corrected typo here
//         } else {
//           console.error('Invalid API response format. Expected an object with a "products" property.');
//         }
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }
  


//   // loadCategories() {
//   //   this.productService.getProductsCategories().subscribe(
//   //     (data) => {
//   //       if (data && data.hasOwnProperty('products') && Array.isArray(data.prodcuts)) {
//   //         this.products = data.prodcuts;
//   //       } else {
//   //         console.error('Invalid API response format. Expected an object with a "products" property.');
//   //       }
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching products', error);
//   //     }
//   //   );
//   // }

//   // loadCategories() {
//   //   this.productService.getProductsCategories().subscribe(
//   //     (data) => {
//   //       if (data && data.hasOwnProperty('products') && Array.isArray(data.products)) {
//   //         // Assuming your categories are stored in the 'category' property of each product
//   //         this.categories = data.products.map((product: any) => product.productCategory);
//   //       } else {
//   //         console.error('Invalid API response format. Expected an object with a "products" property.');
//   //       }
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching products', error);
//   //     }
//   //   );
//   // }


//   // loadCategories() {
//   //   this.productService.getProductsCategories().subscribe(
//   //     (data) => {
//   //       if (data && data.hasOwnProperty('products') && Array.isArray(data.products)) {
//   //         this.productCategories = data.products.map((product: any) => product.productCategory);
//   //       } else {
//   //         console.error('Invalid API response format. Expected an object with a "products" property.');
//   //       }
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching categories', error);
//   //     }
//   //   );
//   // }


//   loadCategories() {
//     this.productService.getProductsCategories().subscribe(
//       (data) => {
//         if (data && data.hasOwnProperty('products') && Array.isArray(data.products)) {
//           this.productCategories = data.products.map((product: any) => product.category);
//           console.log(this.productCategories); // Add this line
//         } else {
//           console.error('Invalid API response format. Expected an object with a "products" property.');
//         }
//       },
//       (error) => {
//         console.error('Error fetching categories', error);
//       }
//     );
//   }
  
//   loadProductsByCategory(productCategory: string) {
//     this.productService.viewProductsCategory(productCategory).subscribe(
//       (data) => {
//         this.products = data;
//         console.log(this.products);
//       },
//       (error) => {
//         console.error('Error fetching products for category', error);
//       }
//     );
//   }
  


  
//   // checkUserRole() {
//   //   this.userService.checkDetails().subscribe(
//   //     (role) => {
//   //       // console.log('User role:', role);
  
//   //       this.showNavbar = role !== 'admin';
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching user details:', error);
//   //     }
//   //   );
//   // }


//   checkUserRole1(): Observable<boolean> {
//   return this.userService.checkDetails().pipe(
//     map((role) => {
//       // console.log('User role:', role);
//       return role === 'user';
//     })
//   );
// }
  
// }

