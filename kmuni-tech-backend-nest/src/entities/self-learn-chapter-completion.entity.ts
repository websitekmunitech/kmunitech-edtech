import { CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from './user.entity';

@Entity('self_learn_chapter_completions')
@Index(['user', 'topic', 'level', 'chapterId'], { unique: true })
export class SelfLearnChapterCompletion {
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

  @CreateDateColumn()
  completedAt!: Date;
}
