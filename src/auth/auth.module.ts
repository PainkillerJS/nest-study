import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthController } from "./auth.controller";
import { AuthService } from "./service/auth.service";
import { UserModel } from "./models/user.model";
import { UserService } from "./service/User.service";
import { getJWTConfig } from "../config/jwt.config";

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: "User"
        }
      }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    })
  ],
  providers: [AuthService, UserService]
})
export class AuthModule {}
