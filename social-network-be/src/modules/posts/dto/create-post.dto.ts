import { IsString } from "class-validator";

export class CreatePostDto {

    @IsString({message: "Vui lòng nhập nội dung của bài viết!"})
    content: string;

    @IsString({message: "Vui lòng chọn chế độ hiển thị"})
    visibility: string;

    [key: string]: any; 


}
