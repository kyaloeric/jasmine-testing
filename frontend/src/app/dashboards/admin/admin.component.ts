import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
// import { ModalCommunicationService } from 'src/app/services/modal-communication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {


  visible = true
  notVisible=false
  loggedIn=true
  hidden=true
  filter=''
  productForm!: FormGroup
  products!: Product[];
  users!: User[];

  updateProductForm!: FormGroup
  product!: Product
  productId: string=''
  updateProductId :string =''

  constructor(
    private productService:ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productCost: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productCategory:['',[Validators.required]],
      productImg:['',[Validators.required]],
      earlyCost:['',[Validators.required]],
      productClassification:['',[Validators.required]]



    }
      );


    
  }


  ngOnInit() {
    this.getProducts();
    this.getUsers();


    
 }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }

  createProduct() {
    let createProduct: Product = this.productForm.value;
    this.productService.createProduct(createProduct).subscribe(
      () => {
        this.getProducts();
        this.loadProducts();
        this.visible=true
       
      },
      (error) => {
        console.error('Error creating products:', error);
      }
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:',error.error.message);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.loadProducts();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.loadUsers();
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }

  deleteProduct(productID: string): void {
    alert('Are you sure You want to delete, this action is irreversible')
    this.productService.deleteProduct(productID).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }


  deleteUser(userID: string): void {
    alert('Are you sure You want to delete, this action is irreversible')
    this.userService.deleteUser(userID).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting Tour:', error);
      }
    );
  }
  

 

 
}
