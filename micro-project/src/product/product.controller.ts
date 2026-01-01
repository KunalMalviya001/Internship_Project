import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  RequestTimeoutException,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductInterface } from './interfaces/products.interface';
import { Product } from './schema/product.schema';
import type { ProductUpdateInterface } from './interfaces/productsUpdate.interface';
import type { ProductDeleteInterface } from './interfaces/productsDelete.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dt';
import { Public } from '../common/decorators/skip.auth';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // For Get all product
  @Public()
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
  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addNewProduct(
    @Body(new ValidationPipe())
    product: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string | Error | undefined> {
    try {
      const upload_image = this.cloudinaryService.uploadImage(file);
      let product_url: string[];
      return await upload_image
        .then((e) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          product_url = e?.secure_url as string[];
        })
        .then(() => {
          return this.productService.addProduct(
            product as ProductInterface,
            product_url,
          );
        });
      // return 'not upload';
    } catch {
      return new RequestTimeoutException();
    }
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
