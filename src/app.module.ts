import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { TypegooseModule } from "nestjs-typegoose";

import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { ReviewModule } from "./review/review.module";
import { TopPageModule } from "./top-page/top-page.module";
import { getMongoConfig } from "./config/mongo.config";

@Module({
  imports: [
    AuthModule,
    ProductModule,
    ReviewModule,
    TopPageModule,
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
