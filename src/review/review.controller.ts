import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";

import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewService } from "./review.service";
import { ReviewConstsEnum } from "./constants/review.consts.";
import { JwtAuthGuards } from "../auth/guards/jwt.guard";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    const deleteDic = await this.reviewService.delete(id);

    if (!deleteDic) {
      throw new HttpException(ReviewConstsEnum.REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuards)
  @Get("byProduct/:productId")
  async getByProduct(@Param("productId") productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @UseGuards(JwtAuthGuards)
  @Delete("byProduct/:productId")
  async deleteByProductId(@Param("productId") productId: string) {
    return this.reviewService.deleteByProductId(productId);
  }
}
