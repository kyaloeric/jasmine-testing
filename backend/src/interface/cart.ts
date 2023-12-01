import { Request } from "express";

export interface CartItem {
  productId: string;
  quantity: number;
}


export interface AddToCartRequest {
  productName: string;
  productCost: number;
  productImg: string;
  boughtBy: string;
}


export interface AddToCartRequest {
  productName: string;
  productCost: number;
  productImg: string;
  boughtBy: string;
}