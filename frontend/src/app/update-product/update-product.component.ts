import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  
  hidden = true
  show=true
  updateProductForm!: FormGroup
  products! : Product []
  product!: Product
  productId: string=''
  updateProductId :string =''
  filter=''

  constructor( private formBuilder:FormBuilder, private productService:ProductService ){

 this.updateProductForm = this.formBuilder.group({
  productName: ['', [Validators.required]],
  productCost: ['', [Validators.required]],
  productDescription: ['', [Validators.required]],
  productCategory:['',[Validators.required]],
  productImg:['',[Validators.required]],
  productClassification:['',[Validators.required]]
}
  );
  }


  ngOnInit() {
    this.getProducts();  
 }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
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


  deleteProduct(productId: string): void {
    alert('Are you sure You want to delete, this action is irreversible')
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }


  clickUpdateProductID = (productId:string)=> {
    this.updateProductId = productId

    console.log(this.updateProductId);
    
  }

  updateProduct() {
    if (this.updateProductForm.invalid) {
    
      return;
    }
  console.log(this.product);
  console.log(this.updateProductId);
  
  
    if (!this.updateProductId) {
      
      console.error('Invalid product or productID');
      return;
    }
  
    let updatedProduct: Product = this.updateProductForm.value;
     this.productId= this.updateProductId;
  
    console.log(updatedProduct);
  
    this.productService.updateProduct(this.productId, updatedProduct).subscribe(
      (response: any) => {
        console.log('Product updated successfully', response);
        const index = this.products.findIndex(product => product.productId === this.productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }

        this.updateProductForm.reset();
        this.hidden = true;
      },
      (error: any) => {
        console.error('Error updating Product', error);
      }
    );
  }


}
