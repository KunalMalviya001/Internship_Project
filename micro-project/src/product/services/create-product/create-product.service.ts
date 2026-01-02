import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../schema/product.schema';
import { ProductInterface } from '../../interfaces/products.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // For Adding Product
  async addProduct(
    product: ProductInterface,
    product_url: string[],
  ): Promise<string> {
    if (
      (await this.productModel.find({ product_id: product.product_id }))
        .length > 0
    ) {
      return 'Already Exist';
    }
    product.product_images = product_url;
    const ans = await this.productModel.insertMany(product);
    if (!ans) {
      return 'not done';
    }
    return 'product added';
  }
}
