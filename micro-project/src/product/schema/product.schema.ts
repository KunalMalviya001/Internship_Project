import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  product_id: number;

  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  product_category: string;

  @Prop()
  product_detail: string;

  @Prop()
  product_price: number;

  @Prop()
  product_stock: number;

  @Prop()
  product_images: string[];

  @Prop()
  product_rating: number;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } })
  product_review: {
    user: User[];
    product_review: string;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);
