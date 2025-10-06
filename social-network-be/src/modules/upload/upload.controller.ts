import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("images", 5))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const urls = await Promise.all(
      files.map(file => this.uploadService.uploadFile(file))
    );
    return urls
  }
}
