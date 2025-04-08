import { Test, TestingModule } from '@nestjs/testing';
// Import các module hỗ trợ test từ @nestjs/testing

import { AppController } from './app.controller';
// Import AppController để kiểm tra

import { AppService } from './app.service';
// Import AppService để cung cấp dữ liệu cho controller

describe('AppController', () => {
  let appController: AppController;
  // Biến appController sẽ được sử dụng để kiểm tra controller

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Định nghĩa AppController cần test
      providers: [AppService], // Cung cấp AppService như một dependency
    }).compile();

    appController = app.get<AppController>(AppController);
    // Lấy instance của AppController sau khi module được khởi tạo
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // Kiểm tra xem phương thức getHello() có trả về "Hello World!" hay không
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
