import { IsBoolean, IsIn, IsString } from 'class-validator';

export class SetChapterCompletionDto {
  @IsString()
  topic!: string;

  @IsString()
  @IsIn(['Beginner', 'Intermediate', 'Advanced'])
  level!: string;

  @IsString()
  chapterId!: string;

  @IsBoolean()
  completed!: boolean;
}
