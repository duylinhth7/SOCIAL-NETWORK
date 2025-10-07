import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadService {
  //A File
  uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'social-network' },
        (error: any, result: UploadApiResponse | undefined) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed'));
          resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  //Multiple
  uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'social-network' },
            (error: any, result: UploadApiResponse | undefined) => {
              if (error) return reject(error);
              if (!result) return reject(new Error('Upload failed'));
              resolve(result.secure_url);
            },
          );

          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        }),
    );

    return Promise.all(uploadPromises); // trả về mảng URL
  }
}
