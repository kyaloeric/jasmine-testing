import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit{
  filter=''
  products: any;


  constructor(private userService: UserService, private productService:ProductService) {}

  ngOnInit() {
    this.getProducts();
    // this.loadProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((products)=>{
      console.log(products);
      this.products=products
      return products
    })
  }
}



  // loadProducts(): void {
  //   this.productService.getProducts().subscribe(
  //     (products) => {
  //       this.products = products;
  //       this.loadProducts();
  //     },
  //     (error) => {
  //       console.error('Error fetching products:', error);
  //     }
  //   );

    
  // }



