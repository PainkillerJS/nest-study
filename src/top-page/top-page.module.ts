import { Module } from "@nestjs/common";

import { TypegooseModule } from "nestjs-typegoose";

import { TopPageController } from "./top-page.controller";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModule,
        schemaOptions: {
          collection: "TopPage"
        }
      }
    ])
  ],
  controllers: [TopPageController]
})
export class TopPageModule {}
