import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  product_Id: number;

  @Prop({ required: true })
  product_Name: string;

  @Prop({ required: true })
  product_Category: string;

  @Prop()
  product_Description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
