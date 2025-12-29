import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { error } from 'console';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  find_user(
    @Query('user_Email') user_Email: string,
    @Query('user_Password') user_Password: string,
  ): Promise<User | string | Error> | Error {
    try {
      return this.userService.user_login(user_Email, user_Password);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not Found User',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}
