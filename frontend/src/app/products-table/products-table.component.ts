import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent{
  @Input() products: any[] = [];
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

  editClicked(product: any) {
    this.editProduct.emit(product);
  }

  deleteClicked(productId: string) {
    this.deleteProduct.emit(productId);
  }
}
