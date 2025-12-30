import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from '../../product/schema/product.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  user_Name: string;

  @Prop({ required: true })
  user_Email: string;

  @Prop({ required: true })
  user_Password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Porduct' }] })
  cart: Product[];
}

export const UserSchema = SchemaFactory.createForClass(User);
