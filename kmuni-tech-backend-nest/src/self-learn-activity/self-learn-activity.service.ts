import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelfLearnActivityAttempt } from '../entities/self-learn-activity-attempt.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class SelfLearnActivityService {
  constructor(
    @InjectRepository(SelfLearnActivityAttempt)
    private readonly attemptsRepo: Repository<SelfLearnActivityAttempt>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async listUserAttempts(userId: string, topic: string, level: string, chapterId: string) {
    const attempts = await this.attemptsRepo.find({
      where: { user: { id: userId }, topic, level, chapterId },
      order: { createdAt: 'ASC' },
    });

    return attempts.map((a) => ({
      id: a.id,
      topic: a.topic,
      level: a.level,
      chapterId: a.chapterId,
      attemptNumber: a.attemptNumber,
      score: a.score,
      totalQuestions: a.totalQuestions,
      createdAt: a.createdAt.toISOString(),
    }));
  }

  async submitAttempt(input: {
    userId: string;
    topic: string;
    level: string;
    chapterId: string;
    score: number;
    answers?: unknown;
  }) {
    const user = await this.usersRepo.findOne({ where: { id: input.userId } });
    if (!user) throw new BadRequestException('User not found');

    const existingCount = await this.attemptsRepo.count({
      where: { user: { id: input.userId }, topic: input.topic, level: input.level, chapterId: input.chapterId },
    });

    const nextAttemptNumber = existingCount + 1;
    if (nextAttemptNumber > 3) {
      throw new BadRequestException('Attempt limit reached (3 attempts)');
    }

    const attempt = this.attemptsRepo.create({
      user,
      topic: input.topic,
      level: input.level,
      chapterId: input.chapterId,
      attemptNumber: nextAttemptNumber,
      score: input.score,
      totalQuestions: 5,
      answers: input.answers,
    });

    const saved = await this.attemptsRepo.save(attempt);

    return {
      id: saved.id,
      topic: saved.topic,
      level: saved.level,
      chapterId: saved.chapterId,
      attemptNumber: saved.attemptNumber,
      score: saved.score,
      totalQuestions: saved.totalQuestions,
      createdAt: saved.createdAt.toISOString(),
      attemptsUsed: nextAttemptNumber,
      attemptsRemaining: Math.max(0, 3 - nextAttemptNumber),
    };
  }
}
