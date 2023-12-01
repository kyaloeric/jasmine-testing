import { v4 as uuidv4 } from 'uuid';
import mssql, { Request } from 'mssql';
import { sqlConfig } from '../config/sqlConfig';
import { AddToCartRequest } from '../interface/cart'
import Connection from '../dbhelpers/dbhelper'

const dbhelper = new Connection


export const addToCart = async (req: { body: AddToCartRequest }, res: any) => {
    try {
      const productId = uuidv4();
      const { productName, productCost, productImg, boughtBy } = req.body;
  
      const result = await dbhelper.execute('addToCartProc', {
        productId,
        productName,
        productCost,
        productImg,
        boughtBy,
      });
  
      if (result && result.rowsAffected[0] === 1) {
        return res.status(200).json({ message: 'Product Added to Cart' });
      } else {
        return res.status(404).json({ message: 'Failed adding Product To Cart' });
      }
    } catch (error: any) {
      return res.status(401).json({ Error: error.message });
    }
  };
  
export const viewCart = async (req: { params: { userId: string } }, res: any) => {
    try {
      const userId = req.params.userId;
  
      const cart = await dbhelper.execute('viewCartProc', { userId });
  
      if (cart && cart.recordset.length > 0) {
        return res.status(200).json({ cart: cart.recordset });
      } else {
        return res.status(402).json({ message: 'Failed Fetching cart' });
      }
    } catch (error: any) {
      return res.status(401).json({ Error: error.message });
    }
  };
  
  // Remove All from Cart
export const removeAllFromCart = async (req: { params: { userId: string } }, res: any) => {
    try {
      const userId = req.params.userId;
  
      const result = await dbhelper.execute('deleteFromCartProc', { userId });
  
      if (result && result.rowsAffected[0] === 1) {
        return res.status(200).json({ message: 'Removed all Items From the cart' });
      } else {
        return res.status(400).json({ message: 'Failed to Remove Items from cart' });
      }
    } catch (error: any) {
      return res.status(401).json({ Error: error.message });
    }
  };
  
export const removeOneFromCart = async (req: { params: { productId: string } }, res: any) => {
    try {
      const productId = req.params.productId;
  
      const result = await dbhelper.execute('removeOneFromCartProc', { productId });
  
      if (result && result.rowsAffected[0] === 1) {
        return res.status(200).json({ message: 'Item Removed from cart' });
      } else {
        return res.status(401).json({ message: 'Error Removing Item From the Cart' });
      }
    } catch (error: any) {
      return res.status(400).json({ Error: error.message });
    }
  };
  
