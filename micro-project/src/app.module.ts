import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_connect || 'mongodb://localhost/nest',
    ),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
