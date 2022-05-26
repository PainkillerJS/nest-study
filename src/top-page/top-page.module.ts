import { Module } from "@nestjs/common";

import { TypegooseModule } from "nestjs-typegoose";

import { TopPageController } from "./top-page.controller";
import { TopPageService } from "./top-page.service";
import { TopPageModel } from "./models/top-page.model";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          collection: "TopPage"
        }
      }
    ])
  ],
  controllers: [TopPageController],
  providers: [TopPageService]
})
export class TopPageModule {}
