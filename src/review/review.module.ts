import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { ReviewModel } from "./models/review.model";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: "Review"
        }
      }
    ])
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
