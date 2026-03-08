import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelfLearnChapterCompletion } from '../entities/self-learn-chapter-completion.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class SelfLearnProgressService {
  constructor(
    @InjectRepository(SelfLearnChapterCompletion)
    private readonly completionsRepo: Repository<SelfLearnChapterCompletion>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async listUserCompletions(userId: string, filters?: { topic?: string; level?: string }) {
    const qb = this.completionsRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.user', 'user')
      .where('user.id = :userId', { userId })
      .orderBy('c.completedAt', 'ASC');

    if (filters?.topic) qb.andWhere('c.topic = :topic', { topic: filters.topic });
    if (filters?.level) qb.andWhere('c.level = :level', { level: filters.level });

    const rows = await qb.getMany();
    return rows.map((c) => ({
      id: c.id,
      topic: c.topic,
      level: c.level,
      chapterId: c.chapterId,
      completedAt: c.completedAt.toISOString(),
    }));
  }

  async setChapterCompletion(input: {
    userId: string;
    topic: string;
    level: string;
    chapterId: string;
    completed: boolean;
  }) {
    const user = await this.usersRepo.findOne({ where: { id: input.userId } });
    if (!user) throw new BadRequestException('User not found');

    const existing = await this.completionsRepo.findOne({
      where: {
        user: { id: input.userId },
        topic: input.topic,
        level: input.level,
        chapterId: input.chapterId,
      },
      relations: { user: true },
    });

    if (!input.completed) {
      if (existing) {
        await this.completionsRepo.delete({ id: existing.id });
      }
      return { topic: input.topic, level: input.level, chapterId: input.chapterId, completed: false };
    }

    if (existing) {
      return {
        id: existing.id,
        topic: existing.topic,
        level: existing.level,
        chapterId: existing.chapterId,
        completed: true,
        completedAt: existing.completedAt.toISOString(),
      };
    }

    const created = this.completionsRepo.create({
      user,
      topic: input.topic,
      level: input.level,
      chapterId: input.chapterId,
    });
    const saved = await this.completionsRepo.save(created);
    return {
      id: saved.id,
      topic: saved.topic,
      level: saved.level,
      chapterId: saved.chapterId,
      completed: true,
      completedAt: saved.completedAt.toISOString(),
    };
  }
}
