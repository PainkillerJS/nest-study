import { prop } from "@typegoose/typegoose";
import type { Base } from "@typegoose/typegoose/lib/defaultClasses";

import { Types } from "mongoose";

export interface ReviewModel extends Base {}

export class ReviewModel {
  @prop()
  name: string;

  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  rating: number;

  @prop()
  productId: Types.ObjectId;
}
