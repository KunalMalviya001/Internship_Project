import {
  Controller,
  Get,
  Query,
  // Post,
  Body,
  Post,
  Delete,
  // NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { productInterface } from './interfaces/products.interface';
import { Product } from './schema/product.schema';
import type { productUpdateInterface } from './interfaces/productsUpdate.interface';
import type { productDeleteInterface } from './interfaces/productsDelete.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // For Get all product
  @Get()
  getProduct(): Promise<Product[]> {
    return this.productService.getAllProduct();
  }

  // For getting Categor wise Product
  @Get(':category')
  async getSelectedProduct(
    @Query('category') category: string,
  ): Promise<string | productInterface[]> {
    // console.log('hello');
    return await this.productService
      .getCategoryProduct(category)
      .then((data) => data)
      .catch((e) => {
        return `${(e.message as string) ?? 'not found'}`;
      });
  }

  // For Add new Product
  @Post()
  async addNewProduct(
    @Body()
    product: {
      Product_id: number;
      Product_Name: string;
      Product_Category: string;
    },
  ): Promise<string> {
    return this.productService.addProduct(product);
  }

  // For Updating Product
  @Post('update')
  async updateProductContoller(
    @Body() product: productUpdateInterface,
  ): Promise<string> {
    console.log(product);
    return this.productService.updateProduct(product);
  }

  // For delete A  Product
  @Delete('delete')
  async deleteProductController(
    @Body() product: productDeleteInterface,
  ): Promise<string> {
    return this.productService.deleteProduct(product);
  }
}
