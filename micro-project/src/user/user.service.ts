import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { NotFoundException } from '@nestjs/common';
// import { UserInterface } from './interface/user.interface';
// import { UserDeleteInterface } from './interface/userDelete.interface';
// import { UserUpdateInterface } from './interface/userUpdate.interface';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userMadule: Model<User>) {}

  // For User Login
  async user_login(
    email: string,
    password: string,
  ): Promise<User | string | Error> {
    const user = await this.userMadule.findOne({ user_Email: email });
    if (!user) {
      throw new NotFoundException('not');
    }
    if (user.user_Email === password) {
      return user;
    }
    return 'Password Not Match';
  }

  // For User Registration
}
