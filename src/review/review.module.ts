import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";

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
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
