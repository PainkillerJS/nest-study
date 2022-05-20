import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { ReviewController } from "./review.controller";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModule,
        schemaOptions: {
          collection: "Review"
        }
      }
    ])
  ],
  controllers: [ReviewController]
})
export class ReviewModule {}
