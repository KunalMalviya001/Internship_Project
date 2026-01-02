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
  Put,
} from '@nestjs/common';
import { ProductInterface } from './interfaces/products.interface';
import { Product } from './schema/product.schema';
import type { ProductUpdateInterface } from './interfaces/productsUpdate.interface';
import type { ProductDeleteInterface } from './interfaces/productsDelete.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dt';
import { Public } from '../common/decorators/skip.auth';
import { CreateProductService } from './services/create-product/create-product.service';
import { UpdateProductService } from './services/update-product/update-product.service';
import { DeleteProductService } from './services/delete-product/delete-product.service';
import { GetProductService } from './services/get-product/get-product.service';
import { GetSortedProductService } from './services/get-sorted-product/get-sorted-product.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/role.enum';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly getProductService: GetProductService,
    private readonly getSortedProductService: GetSortedProductService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // For Get all product
  @Public()
  @Get()
  getProduct(): Promise<Product[]> {
    return this.getProductService.getAllProduct();
  }

  // For getting Categor wise Product
  @Public()
  @Get(':category')
  async getSelectedProduct(
    @Query('category') category: string,
  ): Promise<string | ProductInterface[]> {
    // console.log('hello');
    return await this.getSortedProductService
      .getCategoryProduct(category)
      .then((data) => data)
      .catch((e) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return `${(e.message as string) ?? 'not found'}`;
      });
  }

  // For Add new Product
  // @Public()

  @Roles(Role.Admin)
  @Roles(Role.admin)
  @Roles(Role.ADMIN)
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
          product_url = e?.secure_url as string[];
        })
        .then(() => {
          return this.createProductService.addProduct(
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

  @Roles(Role.Admin)
  @Roles(Role.admin)
  @Roles(Role.ADMIN)
  @Put('update')
  async updateProductContoller(
    @Body() product: ProductUpdateInterface,
  ): Promise<string> {
    return this.updateProductService.updateProduct(product);
  }

  // For delete A  Product

  @Roles(Role.Admin)
  @Roles(Role.admin)
  @Roles(Role.ADMIN)
  @Delete('delete')
  async deleteProductController(
    @Body() product: ProductDeleteInterface,
  ): Promise<string> {
    return this.deleteProductService.deleteProduct(product);
  }
}
