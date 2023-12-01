import { Router } from "express";
import {
  addToCart,
  viewCart,
  removeAllFromCart,
  removeOneFromCart,
} from "../controllers/cartController";

const cartRoute = Router();

cartRoute.post("/add",addToCart);
cartRoute.get("/viewCart/:userId",viewCart);
cartRoute.delete("/deleteAll/:userId",removeAllFromCart);
cartRoute.delete("/removeOne/:productId",removeOneFromCart);

export { cartRoute };
