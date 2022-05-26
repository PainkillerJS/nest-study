import { Injectable } from "@nestjs/common";

import { resolve } from "path";
import { format } from "date-fns";
import { path } from "app-root-path";
import { ensureDir, writeFile } from "fs-extra";

import { FileElementResponse } from "./dto/File-response-element.response";

@Injectable()
export class FilesService {
  async saveFiles(files: Express.Multer.File[]): Promise<FileElementResponse[]> {
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
}
