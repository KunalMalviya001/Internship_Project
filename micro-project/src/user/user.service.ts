import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schema/user.schema';
// import { User_Interface } from './interface/user.interface';
// import { User_Delete_Interface } from './interface/userDelete.interface';
// import { User_Update_Interface } from './interface/userUpdate.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userMadule: Model<User>) {}

  // For User Login
  async user_login(email: string): Promise<User | undefined | null> {
    return await this.userMadule.findOne({
      user_Email: email,
    });
  }

  // For User Registration
  async create(email: string, hash_Password: string): Promise<User> {
    console.log(email);
    if ((await this.userMadule.find({ email }).exec()).length > 0) {
      throw new Error('User already Exist');
    }
    return await this.userMadule.insertOne({
      user_Email: email,
      user_Password: hash_Password,
    });
  }
}
