import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { User, UserRole } from '../entities/user.entity';
import { CourseListDTO } from '../courses/courses.service';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
    @InjectRepository(Course)
    private readonly coursesRepo: Repository<Course>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async getHomeStats() {
    const [expertCourses, proInstructors] = await Promise.all([
      this.coursesRepo.count(),
      this.usersRepo.count({ where: { role: UserRole.INSTRUCTOR } }),
    ]);

    const studentsEnrolledRaw = await this.enrollmentsRepo
      .createQueryBuilder('e')
      .select('COUNT(DISTINCT e.studentId)', 'count')
      .getRawOne<{ count: string }>();

    const avgRatingRaw = await this.coursesRepo
      .createQueryBuilder('c')
      .select('AVG(c.rating)', 'avg')
      .getRawOne<{ avg: string | null }>();

    const studentsEnrolled = Number(studentsEnrolledRaw?.count ?? 0);
    const avgRating = Number(avgRatingRaw?.avg ?? 0);
    const satisfactionRate = avgRating > 0 ? Math.round((avgRating / 5) * 100) : null;

    return {
      studentsEnrolled,
      expertCourses,
      satisfactionRate,
      proInstructors,
      updatedAt: new Date().toISOString(),
    };
  }

  async getPublicUserProfile(userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const role =
      user.role === UserRole.ADMIN
        ? 'admin'
        : user.role === UserRole.INSTRUCTOR
          ? 'instructor'
          : 'student';

    let courses: CourseListDTO[] | undefined;
    if (user.role === UserRole.INSTRUCTOR) {
      const list = await this.coursesRepo.find({
        where: { instructor: { id: user.id } },
        relations: { instructor: true },
        order: { createdAt: 'DESC' },
      });
      courses = list.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description ?? '',
        thumbnail: c.thumbnail ?? undefined,
        instructorId: c.instructor?.id,
        instructorName: c.instructor?.name ?? user.name,
        price: c.price,
        level: c.level ?? 'beginner',
        category: c.category ?? 'web-dev',
        tags: c.tags ?? [],
        totalDuration: c.totalDuration ?? 0,
        rating: c.rating ?? 0,
        studentsCount: c.studentsCount ?? 0,
        isFeatured: Boolean(c.isFeatured),
        createdAt: c.createdAt ? c.createdAt.toISOString() : '',
      }));
    }

    return {
      id: user.id,
      name: user.name,
      role,
      createdAt: user.createdAt ? user.createdAt.toISOString() : '',
      ...(courses ? { courses } : {}),
    };
  }

  async listPublicUsers(input?: { limit?: number; offset?: number }) {
    const limit = Number.isFinite(input?.limit as number) ? Math.max(1, Math.min(60, input!.limit!)) : 24;
    const offset = Number.isFinite(input?.offset as number) ? Math.max(0, input!.offset!) : 0;

    const users = await this.usersRepo.find({
      where: [{ role: UserRole.INSTRUCTOR }, { role: UserRole.STUDENT }],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return users.map((u) => ({
      id: u.id,
      name: u.name,
      role: u.role === UserRole.INSTRUCTOR ? 'instructor' : 'student',
      createdAt: u.createdAt ? u.createdAt.toISOString() : '',
      bio: u.bio ?? null,
    }));
  }
}
