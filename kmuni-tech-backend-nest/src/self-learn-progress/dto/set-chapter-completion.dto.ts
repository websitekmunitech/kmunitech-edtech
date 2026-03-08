import { IsBoolean, IsIn, IsString } from 'class-validator';

export class SetChapterCompletionDto {
  @IsString()
  @IsIn(['html', 'css', 'js', 'node', 'deploy', 'python', 'ml', 'sql', 'git'])
  topic!: string;

  @IsString()
  @IsIn(['Beginner', 'Intermediate', 'Advanced'])
  level!: string;

  @IsString()
  chapterId!: string;

  @IsBoolean()
  completed!: boolean;
}
