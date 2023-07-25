import { Injectable } from '@nestjs/common';
import { UserService } from 'src/common/user/user.service';
import * as argon2 from 'argon2'
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) { }
  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.user({ login });
    if (user && await argon2.verify(user.password, password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async userData(id: string) {
    const { password, ...user } = await this.userService.user({ id });
    return user
  }
}