import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";

import { TopPageModel } from "./models/top-page.model";
import { FindTopPageDto } from "./dto/Find-top-page.dto";
import { CreatePageDto } from "./dto/Create-page.dto";
import { ValidationIdPipe } from "../common/pipes/validation-id.pipe";
import { TopPageService } from "./top-page.service";
import { PageConstants } from "./constants/Page.constants";

@Controller("top-page")
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreatePageDto) {
    return this.topPageService.createPage(dto);
  }

  @Get(":id")
  async get(@Param("id", ValidationIdPipe) id: string) {
    const page = await this.topPageService.getPage(id);

    if (!page) {
      throw new NotFoundException(PageConstants.NOT_FOUND_ERROR);
    }

    return page;
  }

  @Get("byAlias/:alias")
  async getByAlias(@Param("alias", ValidationIdPipe) alias: string) {
    const page = await this.topPageService.getByAlias(alias);

    if (!page) {
      throw new NotFoundException(PageConstants.NOT_FOUND_ERROR);
    }

    return page;
  }

  @Delete(":id")
  async delete(@Param("id", ValidationIdPipe) id: string) {
    const page = await this.topPageService.deletePage(id);

    if (!page) {
      throw new NotFoundException(PageConstants.NOT_FOUND_ERROR);
    }

    return page;
  }

  @Patch(":id")
  async patch(@Param("id", ValidationIdPipe) id: string, @Body() dto: TopPageModel) {
    const page = await this.topPageService.changePage(id, dto);

    if (!page) {
      throw new NotFoundException(PageConstants.NOT_FOUND_ERROR);
    }

    return page;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("find")
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }
}
