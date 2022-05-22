import { Controller, Post, HttpCode, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from "@nestjs/common";

import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./service/auth.service";
import { AuthConstants } from "./constants/auth.constants";
import { UserService } from "./service/User.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post("register")
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.userService.findUser(dto.login);

    if (oldUser) {
      throw new HttpException(AuthConstants.ALREADY_REGISTERED_ERROR, HttpStatus.BAD_REQUEST);
    }

    return this.userService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("login")
  async login(@Body() { login, password }: AuthDto) {
    const { email } = await this.authService.validateUser(login, password);

    return this.authService.login(email);
  }
}
