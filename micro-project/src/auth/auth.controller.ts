import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login_User_Dto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // For login
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: Login_User_Dto) {
    return this.authService.login(logInDto);
  }

  // for Register
  @Post('register')
  async register(@Body() createUserDto: Login_User_Dto) {
    return await this.authService.register(createUserDto);
  }
}
