import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { Product_Interface } from './interfaces/products.interface';
import type { Product_Update_Interface } from './interfaces/productsUpdate.interface';
import type { Product_Delete_Interface } from './interfaces/productsDelete.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // For Get ALL Product
  async getAllProduct(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // For Get Product Based on Category
  async getCategoryProduct(category: string): Promise<Product_Interface[]> {
    const categoryProduct: Product_Interface[] = await this.productModel
      .find({ productCategory: new RegExp(`^${category}$`, 'i') })
      .exec();
    if (!categoryProduct || categoryProduct.length == 0) {
      throw new NotFoundException(`Product ${category} not found`);
    }
    return categoryProduct;
  }

  // For Adding Product
  async addProduct(product: Product_Interface): Promise<string> {
    if (
      (await this.productModel.find({ Product_id: product.product_Id }))
        .length > 0
    ) {
      return 'Already Exist';
    }
    const ans = await this.productModel.insertMany(product);
    if (!ans) {
      return 'not done';
    }
    return 'product added';
  }

  // For Updating Product
  async updateProduct(product: Product_Update_Interface): Promise<string> {
    if (
      await this.productModel.findOneAndUpdate(
        { Product_id: product.product_Id },
        { $set: product },
      )
    ) {
      return 'Product Update';
    }
    throw new NotFoundException(`Product not found`);
  }

  // For Deleting Product
  async deleteProduct(product: Product_Delete_Interface): Promise<string> {
    if (await this.productModel.findOneAndDelete(product)) {
      return 'One Product Dlete';
    }
    return 'No Deletion Happen';
  }
}
