import { Injectable, UnauthorizedException } from "@nestjs/common";

import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { compareSync } from "bcryptjs";

import { UserModel } from "../models/user.model";
import { AuthConstants } from "../constants/auth.constants";
import { UserService } from "./User.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Pick<UserModel, "email">> {
    const user = await this.userService.findUser(email);

    if (!user) {
      throw new UnauthorizedException(AuthConstants.USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = compareSync(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(AuthConstants.WRONG_PASSWORD_ERROR);
    }

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };

    return {
      access_token: this.jwtService.signAsync(payload)
    };
  }
}
