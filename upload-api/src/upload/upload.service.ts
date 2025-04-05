import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { writeFile } from 'fs/promises';

@Injectable() // Đánh dấu class này là một service có thể inject vào các class khác
export class UploadService {
  // Thư mục lưu trữ file tải lên
  private uploadDir = join(__dirname, '../../uploads');

  // Hàm xử lý lưu file vào thư mục
  async uploadFile(file: Express.Multer.File) {
    const filePath = join(this.uploadDir, file.originalname); // Đường dẫn file
    await writeFile(filePath, file.buffer); // Ghi nội dung file vào thư mục
    return { message: 'File uploaded successfully', path: `/uploads/${file.originalname}` };
  }

  // Lấy đường dẫn của file trong thư mục lưu trữ
  getFilePath(filename: string) {
    return join(this.uploadDir, filename);
  }
}
