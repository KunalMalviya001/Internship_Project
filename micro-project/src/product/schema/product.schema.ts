import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  Product_id: number;

  @Prop({ required: true })
  Product_Name: string;

  @Prop({ required: true })
  Product_Category: string;

  @Prop()
  Product_description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
