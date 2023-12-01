import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform( products: Product[], name: string): Product[]{
    if(!products || name==''){
      return products
    };
    const filtered: Product[]=[];
    for(let product of products){
      if(product.productName.toLowerCase().includes(name.toLowerCase())){
        filtered.push(product)
      }
    }
    return filtered;
  }

}
