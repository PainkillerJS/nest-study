import { Injectable, UseGuards } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";

import type { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";

import { TopLevelCategory, TopPageModel } from "./models/top-page.model";
import { CreatePageDto } from "./dto/Create-page.dto";
import { JwtAuthGuards } from "../auth/guards/jwt.guard";

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

  @UseGuards(JwtAuthGuards)
  async createPage(dto: CreatePageDto): Promise<DocumentType<TopPageModel>> {
    return this.topPageModel.create(dto);
  }

  async getPage(_id: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findById(_id).exec();
  }

  async getByAlias(alias: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel.find({ firstCategory }, { alias: 1, title: 1, secondCategory: 1 }).exec();
  }

  @UseGuards(JwtAuthGuards)
  async deletePage(_id: string) {
    return this.topPageModel.findByIdAndDelete(_id).exec();
  }

  @UseGuards(JwtAuthGuards)
  async changePage(_id: string, dto: CreatePageDto) {
    return this.topPageModel.findByIdAndUpdate(_id, dto, { new: true }).exec();
  }
}
