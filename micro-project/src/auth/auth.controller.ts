import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './skip.auth';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // For login
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: LoginUserDto) {
    return this.authService.loginUser(logInDto);
  }

  // for Register
  @Public()
  @Post('registerUser')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.registerUser(registerUserDto);
  }

  @Public()
  @Put('updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.authService.updateUser(updateUserDto);
  }
}
