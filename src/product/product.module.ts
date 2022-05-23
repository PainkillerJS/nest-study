import { Module } from "@nestjs/common";

import { TypegooseModule } from "nestjs-typegoose";

import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductModel } from "./models/product.model";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: "Product"
        }
      }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
