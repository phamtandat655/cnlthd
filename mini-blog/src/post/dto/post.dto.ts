export class CreatePostDto {
    title: string;
    content: string;
    userId: number;
    categoryIds: number[];
}
  
  
export class UpdatePostDto {
    title: string;
    content: string;
}