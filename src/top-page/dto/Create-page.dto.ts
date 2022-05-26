import { IsEnum, IsString, IsArray, IsNumber, IsOptional, ValidateNested } from "class-validator";

import { TopLevelCategory } from "../models/top-page.model";
import { Type } from "class-transformer";

export class HhData {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  SeniorSalary: number;
}

export class TopPageAdvantage {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreatePageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantage)
  advantages: TopPageAdvantage[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => HhData)
  hh?: HhData;
}
