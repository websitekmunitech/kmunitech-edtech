import { Controller, Get, Param, Query } from '@nestjs/common';
import { PublicService } from './public.service';
import { UnilinkEventsService } from '../unilink-events/unilink-events.service';

@Controller('public')
export class PublicController {
  constructor(
    private readonly pub: PublicService,
    private readonly unilinkEvents: UnilinkEventsService,
  ) {}

  @Get('home-stats')
  homeStats() {
    return this.pub.getHomeStats();
  }

  @Get('unilink-events')
  unilinkEventsList() {
    return this.unilinkEvents.listPublicGrouped();
  }

  @Get('users/:id')
  userProfile(@Param('id') id: string) {
    return this.pub.getPublicUserProfile(id);
  }

  @Get('users')
  usersList(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.pub.listPublicUsers({
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
  }

  @Get('self-learn/leaderboard')
  selfLearnLeaderboard(
    @Query('limit') limit?: string,
    @Query('topic') topic?: string,
    @Query('level') level?: string,
  ) {
    return this.pub.getSelfLearnLeaderboard({
      limit: limit ? Number(limit) : undefined,
      topic,
      level,
    });
  }
}
