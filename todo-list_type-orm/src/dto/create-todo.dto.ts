import { IsString, Length } from "class-validator";

// CreateTodoDto là một lớp định nghĩa cấu trúc dữ liệu sẽ được gửi đến máy chủ khi tạo một công việc mới (todo).
// Lớp này sử dụng thư viện class-validator để kiểm tra và xác thực dữ liệu.
// Trong trường hợp này, chúng ta sử dụng decorator @IsString để kiểm tra xem giá trị của trường title có phải là một chuỗi không.
// Chúng ta sử dụng decorator @Length để kiểm tra xem giá trị của trường title có độ dài từ 3 đến 20 ký tự không.
//Lấy từ thư viện class-validator, class-transformer
export class CreateTodoDto {
    @IsString()
    @Length(3, 50)
    title: string;

    @IsString()
    @Length(3,255)
    description: string;
}