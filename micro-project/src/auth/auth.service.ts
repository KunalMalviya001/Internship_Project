import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User_Interface } from './interface/user.interface';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // For Login
  async login(
    user: User_Interface,
  ): Promise<{ access_token: string } | Error | undefined> {
    const isUser = await this.userService.user_login(user.user_Email);
    if (isUser) {
      const isPass = await bcrypt.compare(
        user.user_Password,
        isUser.user_Password,
      );
      console.log(isPass);
      if (isPass) {
        const payload = { sub: user.user_Email, username: user.user_Name };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
    return new UnauthorizedException();
  }

  // fro Registration
  async register(user: User_Interface): Promise<User> {
    const password = await bcrypt.hash(user.user_Password, 10);
    const create_User = await this.userService.create(
      user.user_Email,
      password,
    );
    return create_User;
  }
}
