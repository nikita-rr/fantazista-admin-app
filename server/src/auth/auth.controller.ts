import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserGuard } from './guards/user.guard';
import { LoginRequest } from './requests/login.request';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Session() session, @Body() body: LoginRequest) {
    const user = await this.authService.validateUser(body.login, body.password);
    if (user) {
      session.user = user;
      return user;
    } else throw new HttpException('Неверный логин или пароль', HttpStatus.UNAUTHORIZED);
  }

  @UseGuards(new UserGuard())
  @Get('logout')
  logout(@Request() req) {
    req.session.user = undefined;
  }

  @UseGuards(new UserGuard())
  @Get('user-data')
  async check(@Session() session) {
    try {
      const user = await this.authService.userData(session.user.id);
      return user;
    } catch (error) {
      session.user = null;
    }
  }
}
