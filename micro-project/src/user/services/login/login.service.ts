import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user.service';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../../interface/user.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
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
        const payload = {
          sub: user.user_email,
          roles: user.roles,
          username: user.user_name,
        };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
    return new UnauthorizedException();
  }
}
