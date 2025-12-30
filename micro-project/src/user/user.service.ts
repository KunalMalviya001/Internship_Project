import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schema/user.schema';
import { UserUpdateInterface } from './interface/userUpdate.interface';
// import { User_Delete_Interface } from './interface/userDelete.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userMadule: Model<User>) {}

  // For User Login
  async findUser(email: string): Promise<User | undefined | null> {
    return await this.userMadule.findOne({
      user_email: email,
    });
  }

  // For User Registration
  async createUser(email: string, hash_Password: string): Promise<User> {
    if ((await this.userMadule.find({ user_email: email }).exec()).length > 0) {
      throw new Error('User already Exist');
    }
    return await this.userMadule.insertOne({
      user_email: email,
      user_password: hash_Password,
    });
  }

  // For User Update
  async updateUser(user: UserUpdateInterface) {
    try {
      const isUpdate = await this.userMadule.findOneAndUpdate(
        { user_email: user.user_email },
        { $set: user },
      );
      if (isUpdate) {
        return 'user Updated';
      } else {
        throw new Error();
      }
    } catch {
      return new NotFoundException('Not Found User');
    }
  }
}
