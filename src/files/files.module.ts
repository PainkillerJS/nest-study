import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";

import { resolve } from "path";
import { path } from "app-root-path";

import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(path, "upload"),
      serveRoot: resolve("static")
    })
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
