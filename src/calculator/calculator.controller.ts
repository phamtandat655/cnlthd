import { Get, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
// @nestjs/common là một module trong NestJS, cung cấp các decorator (@Get, @Query, @Controller) để xây dựng API.
// @Get giúp xử lý các request GET.
// @Query dùng để lấy dữ liệu từ query parameters trên URL.
// @Controller giúp định nghĩa một controller.
@Controller('calculator')
export class CalculatorController {
// @Controller('calculator'): Định nghĩa một controller có tên calculator.
// Tất cả API trong class này sẽ có đường dẫn bắt đầu bằng /calculator. Ví dụ:
// GET /calculator/add
// GET /calculator/subtract
// GET /calculator/multiply
// GET /calculator/divide
    @Get('add')
    add(@Query('a') a:string, @Query('b') b:string):number{
        return Number(a)+Number(b);
    }
// @Get('add'): Tạo endpoint /calculator/add để xử lý phép cộng.
// @Query('a') a: string, @Query('b') b: string: Lấy giá trị a và b từ query parameters của request.
// Number(a) + Number(b): Chuyển a, b thành số và thực hiện phép cộng.
    @Get('subtract')
    subtract(@Query('a')a:string,@Query('b') b:string):number{
        return Number(a)-Number(b);
    }
// Tương tự phép cộng
    @Get('multiply')
    multiply(@Query('a') a:string,@Query('b') b:string):number{
        return Number(a)*Number(b);
    }
// Tương tự phép cộng
    @Get('divide')
    divide(@Query('a') a:string,@Query('b') b:string):number{
        if(Number(b)===0)
        {
            throw new Error('Không thể chia với 0')
        }
        return Number(a)/ Number(b);
    }
// Tương tự phép cộng
// Có thêm lệnh if nếu b=0 thì không thể thực hiện phép chia
}

