import { IsArray, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateActivityAttemptDto {
  @IsString()
  @IsIn(['html', 'css', 'js'])
  topic!: string;

  @IsString()
  @IsIn(['Beginner', 'Intermediate', 'Advanced'])
  level!: string;

  @IsString()
  chapterId!: string;

  @IsInt()
  @Min(0)
  @Max(5)
  score!: number;

  @IsOptional()
  @IsArray()
  answers?: unknown[];
}
