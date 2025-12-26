import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { productInterface } from './interfaces/products.interface';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import type { productUpdateInterface } from './interfaces/productsUpdate.interface';
import type { productDeleteInterface } from './interfaces/productsDelete.interface';

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
  async getCategoryProduct(category: string): Promise<productInterface[]> {
    const categoryProduct: productInterface[] = await this.productModel
      .find({ productCategory: new RegExp(`^${category}$`, 'i') })
      .exec();
    if (!categoryProduct || categoryProduct.length == 0) {
      throw new NotFoundException(`Product ${category} not found`);
    }
    return categoryProduct;
  }

  // For Adding Product
  async addProduct(product: productInterface): Promise<string> {
    if (
      (await this.productModel.find({ Product_id: product.Product_id }))
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
  async updateProduct(product: productUpdateInterface): Promise<string> {
    if (
      await this.productModel.findOneAndUpdate(
        { Product_id: product.Product_id },
        { $set: product },
      )
    ) {
      return 'Product Update';
    }
    return 'Product Not Found';
  }

  // For Deleting Product
  async deleteProduct(product: productDeleteInterface): Promise<string> {
    if (await this.productModel.findOneAndDelete(product)) {
      return 'One Product Dlete';
    }
    return 'No Deletion Happen';
  }
}
