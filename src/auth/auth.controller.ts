import { Controller, Post, HttpCode, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from "@nestjs/common";

import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { AuthConstants } from "./constants/auth.constants";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post("register")
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);

    if (oldUser) {
      throw new HttpException(AuthConstants.ALREADY_REGISTERED_ERROR, HttpStatus.BAD_REQUEST);
    }

    return this.authService.createUser(dto);
  }

  @HttpCode(200)
  @Post("login")
  async login(@Body() dto: AuthDto) {}
}
