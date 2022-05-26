import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

import { PipeConstantsEnum } from "./constants/PipeConstants";

@Injectable()
export class ValidationIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== "param") {
      return value;
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(PipeConstantsEnum.NOT_RIGHT_ID_ERROR);
    }

    return value;
  }
}
