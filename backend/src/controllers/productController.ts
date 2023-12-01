import Connection from '../dbhelpers/dbhelper'
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../interface/product';

const dbhelper = new Connection();


export const addProduct = async (req: { body: Product }, res: any) => {
  try {
    const productId = uuidv4();
    const { productName, productDescription, productClassification, productCategory, productCost, productImg, earlyCost } =
      req.body;

    const result = await dbhelper.execute('addProductPROC', {
      productId,
      productName,
      productDescription,
      productClassification,
      productCategory,
      productCost,
      productImg,
      earlyCost,
    });

    if (result && result.rowsAffected[0] === 1) {
      return res.status(200).json({
        message: 'Product added successfully',
      });
    } else {
      return res.status(400).json({ message: 'Product adding failed' });
    }
  } catch (error: any) {
    return res.status(400).json({ Error: error.message });
  }
};

export const updateProduct = async (req: { params: { productId: string }; body: Product }, res: any) => {
  try {
    const productId = req.params.productId;
    const { productName, productDescription, productClassification, productCategory, productCost, productImg, earlyCost } =
      req.body;

    const result = await dbhelper.execute('updateProductPROC', {
      productId,
      productName,
      productDescription,
      productClassification,
      productCategory,
      productCost,
      productImg,
      earlyCost,
    });

    if (result && result.rowsAffected[0] === 1) {
      return res.status(200).json({
        message: 'Product Update Successfully',
      });
    } else {
      return res.status(400).json({ message: 'Product Update failed' });
    }
  } catch (error: any) {
    return res.status(400).json({ Error: error.message });
  }
};

export const viewOneProduct = async (req: { params: { productId: string } }, res: any) => {
  try {
    const productId = req.params.productId;
    const oneProduct = await dbhelper.execute('viewOneProductProc', { productId });

    if (oneProduct && oneProduct.recordset.length > 0) {
      return res.status(200).json({ message: 'Here is the product', oneProduct: oneProduct.recordset[0] });
    } else {
      return res.status(400).json({ message: 'Failed to fetch The Product' });
    }
  } catch (error: any) {
    return res.status(401).json({ Error: error.message });
  }
};

export const viewAllProducts = async (req: any, res: any) => {
  try {
    const allProducts = await dbhelper.execute('viewAllproductsProc');

    const productsWithImageUrl = allProducts.recordset.map((product: any) => ({
      ...product,
      productImg: `${product.productImg}`,
    }));

    return res.status(200).json(productsWithImageUrl);
  } catch (error: any) {
    return res.status(401).json({ Error: error.message });
  }
};



export const viewProductsCategory = async (req: { params: { productCategory: string } }, res: any) => {
  try {
    const productCategory = req.params.productCategory;
    const products = await dbhelper.execute('viewProductWithCategory', { productCategory });

    if (products && products.recordset.length > 0) {
      return res.status(200).json({ message: 'Here are products in your category', products: products.recordset });
    } else {
      return res.status(400).json({ message: 'Failed To fetch Products according to category' });
    }
  } catch (error: any) {
    return res.status(401).json({ Error: error.message });
  }
};

export const deleteProduct = async (req: { params: { productId: string } }, res: any) => {
  try {
    const productId = req.params.productId;
    const deleted = await dbhelper.execute('deleteProductProc', { productId });

    if (deleted && deleted.rowsAffected[0] === 1) {
      return res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      return res.status(401).json({ message: 'Failed deleting Product' });
    }
  } catch (error: any) {
    return res.status(401).json({ Error: error.message });
  }
};

