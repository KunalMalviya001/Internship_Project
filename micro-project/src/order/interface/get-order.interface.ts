import { Product } from '../../product/schema/product.schema';
import { User } from '../../user/schema/user.schema';

export interface GetOrderInterface {
  user: User;
  items: [Product];
}
