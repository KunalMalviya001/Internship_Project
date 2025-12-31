import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../user.service';
import { User } from '../../schema/user.schema';

@Injectable()
export class GetUserDetailService {
  constructor(private userService: UserService) {}
  // For Show user Detail
  async getUserDetail(email: string): Promise<User | Error | undefined> {
    try {
      const isUser = await this.userService.findUser(email);
      if (isUser) {
        return isUser;
      } else {
        throw new Error('no user');
      }
    } catch {
      return new NotFoundException('User Not Found');
    }
  }
}
