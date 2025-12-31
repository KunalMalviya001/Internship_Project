import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../../user.service';
import { User } from '../../schema/user.schema';

@Injectable()
export class DeleteService {
  constructor(private userService: UserService) {}
  // For Delete User
  async deleteUser(email: string): Promise<User | Error | undefined> {
    try {
      const isUserDelete = await this.userService.deleteUser(email);
      if (isUserDelete) {
        return isUserDelete;
      } else {
        throw new Error('no user Delete');
      }
    } catch {
      return new NotFoundException('User Not Found');
    }
  }
}
