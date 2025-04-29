export class CreatePostDto {
    title: string;
    content: string;
    userId: number;
    category: string[];
}
  
  
export class UpdatePostDto {
    title: string;
    content: string;
    category: string[];
}