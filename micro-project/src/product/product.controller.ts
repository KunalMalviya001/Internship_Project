import { Controller, Get, Query, Body, Post, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductInterface } from './interfaces/products.interface';
import { Product } from './schema/product.schema';
import type { ProductUpdateInterface } from './interfaces/productsUpdate.interface';
import type { ProductDeleteInterface } from './interfaces/productsDelete.interface';

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
  ): Promise<string | ProductInterface[]> {
    // console.log('hello');
    return await this.productService
      .getCategoryProduct(category)
      .then((data) => data)
      .catch((e) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return `${(e.message as string) ?? 'not found'}`;
      });
  }

  // For Add new Product
  @Post()
  async addNewProduct(
    @Body()
    product: {
      product_id: number;
      product_name: string;
      product_category: string;
    },
  ): Promise<string> {
    return this.productService.addProduct(product);
  }

  // For Updating Product
  @Post('update')
  async updateProductContoller(
    @Body() product: ProductUpdateInterface,
  ): Promise<string> {
    return this.productService.updateProduct(product);
  }

  // For delete A  Product
  @Delete('delete')
  async deleteProductController(
    @Body() product: ProductDeleteInterface,
  ): Promise<string> {
    return this.productService.deleteProduct(product);
  }
}
