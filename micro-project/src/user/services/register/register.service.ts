import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user.service';
import { UserInterface } from '../../interface/user.interface';
import bcrypt from 'bcrypt';
import { error } from 'console';
import { User } from '../../schema/user.schema';

@Injectable()
export class RegisterService {
  constructor(private userService: UserService) {}
  // Fro Registration
  async registerUser(user: UserInterface): Promise<User> {
    const password = await bcrypt.hash(user.user_password, 10);
    try {
      user.user_password = password;
      return await this.userService.createUser(user);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User Already Existed',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }
}
