import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
filter=''


products: any[] = [];
constructor(private productService:ProductService){}

ngOnInit(){
  this.getProducts()

}
  
  getProducts(){
    this.productService.getProducts().subscribe((products)=>{
      console.log(products);
      this.products=products
      return products
    })
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const imageArray = [
    'image1.jphttps://d1eipm3vz40hy0.cloudfront.net/images/AMER/customer+satisfaction.jpg',
    'https://assets-global.website-files.com/605826c62e8de87de744596e/63f5e30a4d577354fdfce512_Duotone-Master-ssssFile-copy.jpg',
    'https://www.digitalsilk.com/wp-content/uploads/2022/09/best-tech-websites-hero-image.jpg',
  ];
  let currentIndex = 0;

  function changeImage() {
    currentIndex = (currentIndex + 1) % imageArray.length;
  }

  setInterval(changeImage, 5000); 
});