import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Course } from './course.entity';

export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // Store role as text to remain compatible with SQLite (enum type not supported)
  @Column({ type: 'text', default: UserRole.STUDENT })
  role!: UserRole;

  @Column({ type: 'boolean', default: true })
  isApproved!: boolean;

  @Column({ type: 'text', nullable: true })
  bio?: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Enrollment, (e) => e.student)
  enrollments?: Enrollment[];

  @OneToMany(() => Course, (c) => c.instructor)
  coursesCreated?: Course[];
}
