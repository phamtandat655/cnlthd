import { Injectable } from '@nestjs/common'; // Import Injectable để đánh dấu lớp này có thể được tiêm phụ thuộc (Dependency Injection)
import { InjectModel } from '@nestjs/mongoose'; // Import InjectModel để tiêm model của Mongoose vào service
import { Model } from 'mongoose'; // Import Model từ Mongoose để làm việc với dữ liệu MongoDB
import { User, UserDocument } from './users.schema'; // Import User và UserDocument từ tệp users.schema.ts

@Injectable() // Đánh dấu đây là một service có thể được tiêm vào các module khác
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {} 
  // Tiêm Model<UserDocument> vào service để làm việc với collection User trong MongoDB

  // Hàm tạo mới một user
  async create(userDto: any): Promise<User> {
    const user = new this.userModel(userDto); // Tạo một instance mới của User từ dữ liệu truyền vào
    return user.save(); // Lưu user vào database và trả về kết quả
  }

  // Hàm lấy danh sách tất cả user
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Lấy tất cả user từ database và trả về dưới dạng mảng
  }

  // Hàm tìm một user theo ID
  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec(); // Tìm user theo ID, nếu không có sẽ trả về null
  }

  // Hàm cập nhật thông tin user theo ID
  async update(id: string, userDto: any): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true }).exec(); 
    // Tìm user theo ID và cập nhật, { new: true } để trả về dữ liệu sau khi cập nhật
  }

  // Hàm xóa user theo ID
  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec(); // Tìm user theo ID và xóa, nếu không có trả về null
  }
}
