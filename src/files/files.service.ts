import { Injectable } from "@nestjs/common";

import { resolve } from "path";
import { format } from "date-fns";
import { path } from "app-root-path";
import { ensureDir, writeFile } from "fs-extra";
import * as sharp from "sharp";

import { FileElementResponse } from "./dto/File-response-element.response";
import { MFile } from "../common/helpers/MFile";

@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), "yyy-MM-dd");
    const uploadFolder = resolve(path, "uploads", dateFolder);

    await ensureDir(uploadFolder);

    const res: FileElementResponse[] = [];

    for (const file of files) {
      await writeFile(resolve(uploadFolder, file.originalname), file.buffer);
      res.push({ url: resolve(dateFolder, file.originalname), name: file.originalname });
    }

    return res;
  }

  convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
