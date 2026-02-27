import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('self_learn_activity_attempts')
@Index(['user', 'topic', 'level', 'chapterId'])
export class SelfLearnActivityAttempt {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'text' })
  topic!: string;

  @Column({ type: 'text' })
  level!: string;

  @Column({ type: 'text' })
  chapterId!: string;

  @Column({ type: 'int' })
  attemptNumber!: number;

  @Column({ type: 'int' })
  score!: number;

  @Column({ type: 'int' })
  totalQuestions!: number;

  @Column({ type: 'jsonb', nullable: true })
  answers?: unknown;

  @CreateDateColumn()
  createdAt!: Date;
}
