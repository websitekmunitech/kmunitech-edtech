import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { CurrentUser, JwtUser } from '../common/auth/current-user.decorator';
import { CreateActivityAttemptDto } from './dto/create-activity-attempt.dto';
import { SelfLearnActivityService } from './self-learn-activity.service';

@UseGuards(JwtAuthGuard)
@Controller('self-learn/activity')
export class SelfLearnActivityController {
  constructor(private readonly selfLearn: SelfLearnActivityService) {}

  @Get('attempts')
  async attempts(
    @CurrentUser() user: JwtUser,
    @Query('topic') topic: string,
    @Query('level') level: string,
    @Query('chapterId') chapterId: string,
  ) {
    return this.selfLearn.listUserAttempts(user.userId, topic, level, chapterId);
  }

  @Post('attempts')
  async submitAttempt(@CurrentUser() user: JwtUser, @Body() dto: CreateActivityAttemptDto) {
    return this.selfLearn.submitAttempt({
      userId: user.userId,
      topic: dto.topic,
      level: dto.level,
      chapterId: dto.chapterId,
      score: dto.score,
      answers: dto.answers,
    });
  }
}
