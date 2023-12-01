import { Request } from "express";

// export interface Product {
//   productId: string;
//   productName: string;
//   productDescription: string;
//   productPrice: number;
//   productImg: string;
// }

export interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  productClassification: string;
  productCategory: string;
  productCost: number;
  productImg: string;
  earlyCost: number;
}
