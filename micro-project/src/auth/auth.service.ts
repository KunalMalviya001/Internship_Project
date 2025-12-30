import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserInterface } from './interface/user.interface';
import type { UserUpdateInterface } from './interface/userUpdate.interface';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './schema/user.schema';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // For Login
  async loginUser(
    user: UserInterface,
  ): Promise<{ access_token: string } | Error | undefined> {
    const isUser = await this.userService.findUser(user.user_email);
    if (isUser) {
      const isPass = await bcrypt.compare(
        user.user_password,
        isUser.user_password,
      );
      if (isPass) {
        const payload = { sub: user.user_email, username: user.user_name };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
    return new UnauthorizedException();
  }

  // Fro Registration
  async registerUser(user: UserInterface): Promise<User> {
    const password = await bcrypt.hash(user.user_password, 10);
    try {
      return await this.userService.createUser(user.user_email, password);
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

  // For Update User Data
  async updateUser(user: UserUpdateInterface) {
    if (user.user_password) {
      user.user_password = await bcrypt.hash(user.user_password, 10);
    }
    try {
      return await this.userService.updateUser(user);
    } catch {
      return new NotFoundException('User Not Found');
    }
  }
}
