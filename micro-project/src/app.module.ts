import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthModule } from './auth/auth.module';
import dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_CONNECT || 'mongodb://localhost/nest',
      {
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => console.log('connected'));
          connection.on('open', () => console.log('open'));
          connection.on('disconnected', () => console.log('disconnected'));
          connection.on('reconnected', () => console.log('reconnected'));
          connection.on('disconnecting', () => console.log('disconnecting'));

          return connection;
        },
      },
    ),
    ProductModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
