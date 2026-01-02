import { Product } from '../../product/schema/product.schema';

export interface GetOrderInterface {
  user_email: string;
  items: [Product];
}
