import { Router } from "express";
import {
  addProduct,
  updateProduct,
  viewOneProduct,
  viewAllProducts,
  viewProductsCategory,
  deleteProduct,
} from "../controllers/productController";

const productRoute = Router();

productRoute.post("/add", addProduct);
productRoute.put("/update/:productId", updateProduct);
productRoute.get("/viewOneProduct/:productId", viewOneProduct);
productRoute.get("/allProducts", viewAllProducts);
productRoute.get("/allProducts/:productCategory", viewProductsCategory
);
productRoute.delete("/delete/:productId", deleteProduct);

export { productRoute };
