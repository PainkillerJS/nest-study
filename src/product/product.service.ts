import { Injectable } from "@nestjs/common";

import { InjectModel } from "nestjs-typegoose";
import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";

import { ProductModel } from "./models/product.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindProductDto } from "./dto/find-product.dto";
import { ReviewModel } from "../review/models/review.model";

type AggregateFindWithReviewTypes = ProductModel & { review: ReviewModel[]; reviewCount: number; reviewAvg: number };

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

  async create(dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
    return this.productModel.create(dto);
  }

  async findById(id: string): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateProductDto): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return this.productModel
      .aggregate<AggregateFindWithReviewTypes>([
        {
          $match: {
            categories: dto.category
          }
        },
        {
          $sort: {
            _id: 1
          }
        },
        {
          $limit: dto.limit
        },
        {
          $lookup: {
            from: "Review",
            localField: "_id",
            foreignField: "productId",
            as: "review"
          }
        },
        {
          $addFields: {
            reviewCount: { $size: "$review" },
            reviewAvg: { $avg: "$review.rating" }
          }
        }
      ])
      .exec();
  }
}
