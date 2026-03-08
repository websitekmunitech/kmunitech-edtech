import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { CurrentUser, JwtUser } from '../common/auth/current-user.decorator';
import { SetChapterCompletionDto } from './dto/set-chapter-completion.dto';
import { SelfLearnProgressService } from './self-learn-progress.service';

@UseGuards(JwtAuthGuard)
@Controller('self-learn/progress')
export class SelfLearnProgressController {
  constructor(private readonly progress: SelfLearnProgressService) {}

  @Get()
  async list(
    @CurrentUser() user: JwtUser,
    @Query('topic') topic?: string,
    @Query('level') level?: string,
  ) {
    return this.progress.listUserCompletions(user.userId, {
      topic: topic?.trim() || undefined,
      level: level?.trim() || undefined,
    });
  }

  @Put('chapter')
  async setChapter(@CurrentUser() user: JwtUser, @Body() dto: SetChapterCompletionDto) {
    return this.progress.setChapterCompletion({
      userId: user.userId,
      topic: dto.topic,
      level: dto.level,
      chapterId: dto.chapterId,
      completed: dto.completed,
    });
  }
}
