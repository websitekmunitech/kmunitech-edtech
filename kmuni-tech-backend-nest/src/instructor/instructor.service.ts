import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { Lesson } from '../entities/lesson.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { User } from '../entities/user.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseDTO, CourseListDTO } from '../courses/courses.service';
import { UpdateCourseDto } from './dto/update-course.dto';

type InstructorAnalyticsDTO = {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
};

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Course) private readonly coursesRepo: Repository<Course>,
    @InjectRepository(Lesson) private readonly lessonsRepo: Repository<Lesson>,
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async listCourses(instructorId: string): Promise<CourseListDTO[]> {
    const courses = await this.coursesRepo.find({
      where: { instructor: { id: instructorId } },
      relations: { instructor: true },
    });
    return courses.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description ?? '',
      thumbnail: c.thumbnail ?? undefined,
      instructorId: c.instructor?.id,
      instructorName: c.instructor?.name ?? 'Unknown',
      price: c.price,
      level: c.level ?? 'beginner',
      category: c.category ?? 'web-dev',
      tags: c.tags ?? [],
      totalDuration: c.totalDuration ?? 0,
      rating: c.rating ?? 0,
      studentsCount: c.studentsCount ?? 0,
      isFeatured: Boolean(c.isFeatured),
      createdAt: (c as any).createdAt ? (c as any).createdAt.toISOString() : '',
    }));
  }

  async analytics(instructorId: string): Promise<InstructorAnalyticsDTO> {
    const courses = await this.coursesRepo.find({
      where: { instructor: { id: instructorId } },
    });
    const totalCourses = courses.length;
    const totalStudents = courses.reduce((sum, c) => sum + (c.studentsCount ?? 0), 0);
    const averageRating = totalCourses
      ? courses.reduce((sum, c) => sum + (c.rating ?? 0), 0) / totalCourses
      : 0;
    return { totalCourses, totalStudents, averageRating };
  }

  async createCourse(instructorId: string, dto: CreateCourseDto): Promise<CourseDTO> {
    const instructor = await this.usersRepo.findOne({ where: { id: instructorId } });
    if (!instructor) throw new BadRequestException('Instructor not found');

    const totalDuration = (dto.lessons ?? []).reduce(
      (sum, l) => sum + (l.duration ?? 0),
      0,
    );

    const course = this.coursesRepo.create({
      title: dto.title,
      description: dto.description,
      thumbnail: dto.thumbnail ?? undefined,
      price: dto.price,
      level: dto.level,
      category: dto.category,
      tags: dto.tags ?? [],
      totalDuration,
      rating: 0,
      studentsCount: 0,
      isFeatured: false,
      instructor,
    });
    const savedCourse = await this.coursesRepo.save(course);

    const lessons = (dto.lessons ?? []).map((l) =>
      this.lessonsRepo.create({
        title: l.title,
        description: l.description ?? undefined,
        duration: l.duration,
        order: l.order,
        isPreview: Boolean(l.isPreview),
        videoUrl: l.videoUrl ?? undefined,
        content: l.content ?? undefined,
        course: savedCourse,
      }),
    );
    const savedLessons = await this.lessonsRepo.save(lessons);

    return {
      id: savedCourse.id,
      title: savedCourse.title,
      description: savedCourse.description ?? '',
      thumbnail: savedCourse.thumbnail ?? undefined,
      instructorId: instructor.id,
      instructorName: instructor.name,
      price: savedCourse.price,
      level: savedCourse.level ?? 'beginner',
      category: savedCourse.category ?? 'web-dev',
      tags: savedCourse.tags ?? [],
      lessons: savedLessons
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((l) => ({
          id: l.id,
          title: l.title,
          description: l.description ?? undefined,
          duration: l.duration,
          order: l.order,
          isPreview: l.isPreview,
        })),
      totalDuration: savedCourse.totalDuration ?? 0,
      rating: savedCourse.rating ?? 0,
      studentsCount: savedCourse.studentsCount ?? 0,
      isFeatured: Boolean(savedCourse.isFeatured),
      createdAt: (savedCourse as any).createdAt ? (savedCourse as any).createdAt.toISOString() : '',
    };
  }

  async ensureCourseOwnedByInstructor(courseId: string, instructorId: string): Promise<Course> {
    const course = await this.coursesRepo.findOne({
      where: { id: courseId },
      relations: { instructor: true, lessons: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    if (course.instructor?.id !== instructorId) {
      throw new BadRequestException('Not your course');
    }
    return course;
  }

  async updateCourse(instructorId: string, courseId: string, dto: UpdateCourseDto): Promise<CourseDTO> {
    const course = await this.ensureCourseOwnedByInstructor(courseId, instructorId);

    if (typeof dto.title === 'string') course.title = dto.title;
    if (typeof dto.description === 'string') course.description = dto.description;
    if (typeof dto.thumbnail === 'string') course.thumbnail = dto.thumbnail.trim() ? dto.thumbnail : null;
    if (typeof dto.price === 'number') course.price = dto.price;
    if (typeof dto.level === 'string') course.level = dto.level;
    if (typeof dto.category === 'string') course.category = dto.category;
    if (Array.isArray(dto.tags)) course.tags = dto.tags;

    const saved = await this.coursesRepo.save(course);
    const lessons = (saved.lessons ?? [])
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((l) => ({
        id: l.id,
        title: l.title,
        description: l.description ?? undefined,
        duration: l.duration,
        order: l.order,
        isPreview: l.isPreview,
      }));

    return {
      id: saved.id,
      title: saved.title,
      description: saved.description ?? '',
      thumbnail: saved.thumbnail ?? undefined,
      instructorId: course.instructor?.id ?? instructorId,
      instructorName: course.instructor?.name ?? 'Unknown',
      price: saved.price,
      level: saved.level ?? 'beginner',
      category: saved.category ?? 'web-dev',
      tags: saved.tags ?? [],
      lessons,
      totalDuration: saved.totalDuration ?? 0,
      rating: saved.rating ?? 0,
      studentsCount: saved.studentsCount ?? 0,
      isFeatured: Boolean(saved.isFeatured),
      createdAt: (saved as any).createdAt ? (saved as any).createdAt.toISOString() : '',
    };
  }

  async deleteCourse(instructorId: string, courseId: string): Promise<{ success: boolean }> {
    await this.ensureCourseOwnedByInstructor(courseId, instructorId);

    await this.enrollmentsRepo
      .createQueryBuilder()
      .delete()
      .where('courseId = :courseId', { courseId })
      .execute();

    await this.lessonsRepo
      .createQueryBuilder()
      .delete()
      .where('courseId = :courseId', { courseId })
      .execute();

    await this.coursesRepo.delete({ id: courseId });
    return { success: true };
  }

  async ensureLessonOwnedByInstructor(lessonId: string, instructorId: string): Promise<Lesson> {
    const lesson = await this.lessonsRepo.findOne({
      where: { id: lessonId },
      relations: { course: { instructor: true } },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.course?.instructor?.id !== instructorId) {
      throw new BadRequestException('Not your lesson');
    }
    return lesson;
  }

  async saveLessonVideoUrl(lessonId: string, videoUrl: string): Promise<void> {
    const lesson = await this.lessonsRepo.findOne({ where: { id: lessonId } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    lesson.videoUrl = videoUrl;
    await this.lessonsRepo.save(lesson);
  }
}
