import { User } from '../../user/schema/user.schema';

export class CreateProductDto {
  product_id: number;

  product_name: string;

  product_category: string;

  product_detail?: string;

  product_price?: number;

  product_stock?: number;

  product_images?: string[];

  product_rating?: number;

  product_review?: {
    user: User[];
    product_review: string;
  };
}
