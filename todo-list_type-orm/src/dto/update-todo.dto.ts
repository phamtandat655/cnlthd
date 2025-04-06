import { PartialType } from "@nestjs/mapped-types";
import { CreateTodoDto } from "./create-todo.dto";

//Partial Type là thư viện thuộc @nestjs/mapped-types
//Giup chúng ta tạo ra một class mới từ một class đã có sẵn và làm cho tất cả truong của class mới trở thành optional
//Trong trường hợp này, chúng ta sử dụng PartialType để tạo ra một class mới từ CreateTodoDto và tất cả các trường của class mới trở thành optional, tức là tuyệt đối không bắt buộc phải truyền vào giá trị cho các trường này
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}