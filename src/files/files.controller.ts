import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { JwtAuthGuards } from "../auth/guards/jwt.guard";
import { FileElementResponse } from "./dto/File-response-element.response";
import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @HttpCode(200)
  @Post("upload")
  @UseGuards(JwtAuthGuards)
  @UseInterceptors(FileInterceptor("files"))
  async uploadFile(@UploadedFile() file: Express.Multer.File[]): Promise<FileElementResponse[]> {
    return this.fileService.saveFiles(file);
  }
}
