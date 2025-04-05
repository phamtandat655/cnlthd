import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, createReadStream } from 'fs';
import { Response } from 'express';

@Controller('upload') // Định nghĩa route gốc cho controller
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // API để upload file
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Thư mục lưu file trên server
        filename: (req, file, callback) => {
          // Tạo tên file duy nhất bằng cách thêm timestamp + số ngẫu nhiên
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Lấy phần mở rộng của file
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Đặt tên mới cho file
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn dung lượng file tối đa là 5MB
      fileFilter: (req, file, callback) => { 
        // Chỉ cho phép upload các loại file hình ảnh, PDF, DOCX
        const allowedTypes = ['image/'
          , 'application/pdf'
          , 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!allowedTypes.some(type => file.mimetype.startsWith(type))) {
          return callback(new Error('Only images, PDFs, and DOCX files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully', path: `/uploads/${file.filename}`, file };
  }

  // API xem file (chỉ dùng được với ảnh)
  @Get('view/:filename')
  async viewFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = this.uploadService.getFilePath(filename); // Lấy đường dẫn file
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found'); // Nếu file không tồn tại, trả lỗi 404
    }
    res.sendFile(filePath); // Trả về file để hiển thị trên trình duyệt
  }

  // API download file
  @Get('download/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = this.uploadService.getFilePath(filename); // Lấy đường dẫn file
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found'); // Nếu file không tồn tại, trả lỗi 404
    }
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`); // Set header để tải xuống
    createReadStream(filePath).pipe(res); // Đọc file và gửi về client
  }
}
