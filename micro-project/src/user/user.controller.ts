import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public } from '../common/decorators/skip.auth';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { LoginService } from './services/login/login.service';
import { UpdateService } from './services/update/update.service';
import { DeleteService } from './services/delete/delete.service';
import { GetUserDetailService } from './services/get-user-detail/get-user-detail.service';
import { RegisterService } from './services/register/register.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../common/enum/role.enum';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private updteService: UpdateService,
    private deleteService: DeleteService,
    private getUserDetailService: GetUserDetailService,
    private registerService: RegisterService,
  ) {}

  // For login
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: LoginUserDto) {
    return this.loginService.loginUser(logInDto);
  }

  // for Register
  @Public()
  @Post('registerUser')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.registerService.registerUser(registerUserDto);
  }

  @Put('updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.updteService.updateUser(updateUserDto);
  }

  @Get()
  // @Public()
  @Roles(Role.Admin)
  async getUserDetail(
    @Query('user_email') user_email: string,
  ): Promise<User | Error | undefined> {
    return await this.getUserDetailService.getUserDetail(user_email);
  }

  @Public()
  @Delete('deleteUser')
  async deleteUser(
    @Query('user_email') user_email: string,
  ): Promise<User | Error | undefined> {
    return await this.deleteService.deleteUser(user_email);
  }
}
