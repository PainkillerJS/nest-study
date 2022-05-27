import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { JwtAuthGuards } from "../auth/guards/jwt.guard";
import { FileElementResponse } from "./dto/File-response-element.response";
import { FilesService } from "./files.service";
import { MFile } from "../common/helpers/MFile";

@Controller("files")
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @HttpCode(200)
  @Post("upload")
  @UseGuards(JwtAuthGuards)
  @UseInterceptors(FileInterceptor("files"))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
    const saveArray: MFile[] = [new MFile(file)];

    if (file.mimetype.includes("image")) {
      const buffer = await this.fileService.convertToWebP(file.buffer);
      saveArray.push(new MFile({ originalname: `${file.originalname.split(".")[0]}.webp`, buffer }));
    }

    return this.fileService.saveFiles(saveArray);
  }
}
