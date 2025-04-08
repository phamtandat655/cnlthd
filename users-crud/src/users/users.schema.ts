import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; // Import các decorator và factory từ @nestjs/mongoose để định nghĩa schema cho MongoDB
import { Document } from 'mongoose'; // Import Document từ mongoose để mở rộng kiểu dữ liệu của User

export type UserDocument = User & Document; // Định nghĩa kiểu dữ liệu UserDocument, bao gồm cả User và các thuộc tính của Mongoose Document
@Schema() // Đánh dấu class User là một schema của Mongoose
export class User {
  @Prop({ required: true }) // Định nghĩa trường name với thuộc tính bắt buộc (required: true)
  name: string;
  @Prop({ required: true, unique: true }) // Định nghĩa trường email, vừa bắt buộc vừa phải là duy nhất (unique: true)
  email: string;
  @Prop({ required: true }) // Định nghĩa trường password với thuộc tính bắt buộc
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User); // Tạo schema Mongoose từ class User
