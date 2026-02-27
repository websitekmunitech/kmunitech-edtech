/// <reference types="vite/client" />

import { Activity, Course, Enrollment, Lesson, LoginCredentials, SignupData, UnilinkEvent, UnilinkEventStatus, User, UserRole } from '../types';

const envApiBase = (
  import.meta.env.VITE_API_BASE_URL ??
  import.meta.env.VITE_API_URL ??
  ''
)
  .toString()
  .trim();

const defaultApiBase =
  typeof window !== 'undefined' && import.meta.env.PROD
    ? window.location.origin
    : 'http://localhost:3000';

export const API_BASE_URL = (envApiBase.length > 0 ? envApiBase : defaultApiBase).replace(/\/$/, '');

type ApiUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved?: boolean;
  avatar?: string;
  bio?: string;
  createdAt?: string;
};

type AuthResponse = {
  success: boolean;
  message?: string;
  user?: ApiUser;
  token?: string;
};

type EnrollmentDTO = {
  id: string;
  courseId: string;
  courseTitle: string;
  courseThumbnail?: string;
  instructorName: string;
  progress: number;
  enrolledAt?: string;
  completedAt?: string | null;
};

type ActivityDTO = {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
};

type InstructorAnalyticsDTO = {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
};

type AdminAnalyticsDTO = {
  totalUsers: number;
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  totalEnrollments: number;
};

type CourseListDTO = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  instructorId?: string;
  instructorName: string;
  price: number | string;
  level: string;
  category: string;
  tags?: string[];
  totalDuration?: number;
  rating?: number;
  studentsCount?: number;
  isFeatured?: boolean;
  createdAt?: string;
};

type LessonDTO = {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  order?: number;
  isPreview?: boolean;
};

type CourseDTO = CourseListDTO & {
  lessons?: LessonDTO[];
};

type CreateInstructorLessonRequest = {
  title: string;
  description?: string;
  duration: number;
  order: number;
  isPreview?: boolean;
  videoUrl?: string;
  content?: string;
};

type CreateInstructorCourseRequest = {
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  level: string;
  category: string;
  tags?: string[];
  lessons: CreateInstructorLessonRequest[];
};

type UpdateInstructorCourseRequest = {
  title?: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  level?: string;
  category?: string;
  tags?: string[];
};

type AdminUpdateUserRequest = {
  name?: string;
  email?: string;
  role?: UserRole;
  isApproved?: boolean;
};

type RegisterUnilinkLeadRequest = {
  name: string;
  phone: string;
};

export type HomeStats = {
  studentsEnrolled: number;
  expertCourses: number;
  satisfactionRate: number | null;
  proInstructors: number;
  updatedAt: string;
};

async function apiFetch<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = (typeof payload === 'string' ? payload : payload?.message) || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

async function apiUpload<T>(
  path: string,
  formData: FormData,
  token: string,
  method: 'POST' | 'PATCH' | 'PUT' = 'POST',
): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    method,
    headers,
    body: formData,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = (typeof payload === 'string' ? payload : payload?.message) || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

export type PublicUnilinkEventsResponse = {
  upcoming: UnilinkEvent[];
  finished: UnilinkEvent[];
};

export type PublicUserProfile = {
  id: string;
  name: string;
  role: UserRole;
  createdAt: string;
  courses?: Course[];
};

export type PublicUserListItem = {
  id: string;
  name: string;
  role: UserRole;
  createdAt: string;
};

export async function fetchPublicUnilinkEvents() {
  return apiFetch<PublicUnilinkEventsResponse>('/api/public/unilink-events');
}

export type AdminUnilinkEvent = UnilinkEvent & {
  createdAt?: string;
  updatedAt?: string;
};

export async function fetchAdminUnilinkEvents(token: string) {
  return apiFetch<AdminUnilinkEvent[]>('/api/admin/unilink-events', { method: 'GET' }, token);
}

export async function createAdminUnilinkEvent(
  input: { title: string; status: UnilinkEventStatus; poster: File },
  token: string,
) {
  const form = new FormData();
  form.append('title', input.title);
  form.append('status', input.status);
  form.append('poster', input.poster);
  return apiUpload<AdminUnilinkEvent>('/api/admin/unilink-events', form, token, 'POST');
}

export async function updateAdminUnilinkEvent(
  id: string,
  input: { title?: string; poster?: File },
  token: string,
) {
  const form = new FormData();
  if (typeof input.title === 'string') form.append('title', input.title);
  if (input.poster) form.append('poster', input.poster);
  return apiUpload<AdminUnilinkEvent>(`/api/admin/unilink-events/${id}`, form, token, 'PATCH');
}

export async function deleteAdminUnilinkEvent(id: string, token: string) {
  return apiFetch<{ success: boolean }>(`/api/admin/unilink-events/${id}`, { method: 'DELETE' }, token);
}

export async function registerUnilinkLead(payload: RegisterUnilinkLeadRequest) {
  return apiFetch<{ success: boolean; id?: string; message?: string }>('/api/unilink/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchHomeStats() {
  return apiFetch<HomeStats>('/api/public/home-stats');
}

export async function fetchPublicUserProfile(userId: string) {
  const data = await apiFetch<{
    id: string;
    name: string;
    role: string;
    createdAt: string;
    courses?: CourseListDTO[];
  }>(`/api/public/users/${userId}`, { method: 'GET' });

  return {
    id: data.id,
    name: data.name,
    role: (data.role as UserRole) ?? 'student',
    createdAt: data.createdAt ?? '',
    courses: data.courses ? data.courses.map(toCourse) : undefined,
  } satisfies PublicUserProfile;
}

export async function fetchPublicUsers(params?: { limit?: number; offset?: number }) {
  const qs = new URLSearchParams();
  if (typeof params?.limit === 'number') qs.set('limit', String(params.limit));
  if (typeof params?.offset === 'number') qs.set('offset', String(params.offset));
  const suffix = qs.toString() ? `?${qs.toString()}` : '';

  const data = await apiFetch<Array<{ id: string; name: string; role: string; createdAt: string }>>(
    `/api/public/users${suffix}`,
    { method: 'GET' },
  );

  return data.map((u) => ({
    id: u.id,
    name: u.name,
    role: (u.role as UserRole) ?? 'student',
    createdAt: u.createdAt ?? '',
  })) as PublicUserListItem[];
}

const toUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  name: apiUser.name,
  email: apiUser.email,
  role: (apiUser.role as UserRole) ?? 'student',
  isApproved: apiUser.isApproved ?? undefined,
  avatar: apiUser.avatar ?? undefined,
  bio: apiUser.bio ?? undefined,
  createdAt: apiUser.createdAt ?? '',
});

const toEnrollment = (dto: EnrollmentDTO): Enrollment => ({
  id: dto.id,
  courseId: dto.courseId,
  courseTitle: dto.courseTitle,
  courseThumbnail: dto.courseThumbnail ?? '',
  instructorName: dto.instructorName,
  progress: dto.progress ?? 0,
  enrolledAt: dto.enrolledAt ?? '',
  completedAt: dto.completedAt ?? null,
});

const toActivity = (dto: ActivityDTO): Activity => ({
  id: dto.id,
  type: (dto.type as Activity['type']) ?? 'enrollment',
  title: dto.title,
  description: dto.description,
  timestamp: dto.timestamp,
});

const toLesson = (lesson: LessonDTO): Lesson => ({
  id: lesson.id,
  title: lesson.title,
  description: lesson.description ?? '',
  duration: lesson.duration ?? 0,
  order: lesson.order ?? 0,
  isPreview: Boolean(lesson.isPreview),
});

const toCourse = (dto: CourseListDTO | CourseDTO): Course => ({
  id: dto.id,
  title: dto.title,
  description: dto.description ?? '',
  thumbnail: dto.thumbnail ?? '',
  instructorId: (dto as CourseDTO).instructorId ?? '',
  instructorName: dto.instructorName,
  price: Number(dto.price ?? 0),
  level: dto.level as Course['level'],
  category: dto.category as Course['category'],
  tags: dto.tags ?? [],
  lessons: 'lessons' in dto && dto.lessons ? dto.lessons.map(toLesson) : [],
  totalDuration: dto.totalDuration ?? 0,
  rating: dto.rating ?? 0,
  studentsCount: dto.studentsCount ?? 0,
  isFeatured: Boolean(dto.isFeatured),
  createdAt: dto.createdAt ?? '',
});

export async function loginUser(credentials: LoginCredentials) {
  const res = await apiFetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return { ...res, user: res.user ? toUser(res.user) : undefined };
}

export async function signupUser(data: SignupData) {
  const res = await apiFetch<AuthResponse>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return { ...res, user: res.user ? toUser(res.user) : undefined };
}

export async function fetchCurrentUser(token: string) {
  return apiFetch<ApiUser>('/api/auth/me', { method: 'GET' }, token).then(toUser);
}

export async function fetchCourses() {
  const data = await apiFetch<CourseListDTO[]>('/api/courses');
  return data.map(toCourse);
}

export async function fetchFeaturedCourses() {
  const data = await apiFetch<CourseListDTO[]>('/api/courses/featured');
  return data.map(toCourse);
}

export async function fetchCourseById(id: string, token?: string) {
  const data = await apiFetch<CourseDTO>(`/api/courses/${id}`, { method: 'GET' }, token);
  return toCourse(data);
}

export async function enrollInCourse(id: string, token: string) {
  return apiFetch(`/api/courses/${id}/enroll`, { method: 'POST' }, token);
}

export async function fetchStudentEnrollments(token: string) {
  const data = await apiFetch<EnrollmentDTO[]>('/api/student/courses', { method: 'GET' }, token);
  return data.map(toEnrollment);
}

export async function updateEnrollmentProgress(enrollmentId: string, progress: number, token: string) {
  const data = await apiFetch<EnrollmentDTO>(`/api/student/enrollments/${enrollmentId}/progress`, {
    method: 'PUT',
    body: JSON.stringify({ progress }),
  }, token);
  return toEnrollment(data);
}

export async function fetchStudentActivities(token: string) {
  const data = await apiFetch<ActivityDTO[]>('/api/student/activities', { method: 'GET' }, token);
  return data.map(toActivity);
}

export async function fetchInstructorCourses(token: string) {
  const data = await apiFetch<CourseListDTO[]>('/api/instructor/courses', { method: 'GET' }, token);
  return data.map(toCourse);
}

export async function fetchInstructorAnalytics(token: string) {
  return apiFetch<InstructorAnalyticsDTO>('/api/instructor/analytics', { method: 'GET' }, token);
}

export async function createInstructorCourse(payload: CreateInstructorCourseRequest, token: string) {
  const data = await apiFetch<CourseDTO>('/api/instructor/courses', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);
  return toCourse(data);
}

export async function updateInstructorCourse(courseId: string, payload: UpdateInstructorCourseRequest, token: string) {
  const data = await apiFetch<CourseDTO>(`/api/instructor/courses/${courseId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    token,
  );
  return toCourse(data);
}

export async function deleteInstructorCourse(courseId: string, token: string) {
  return apiFetch(`/api/instructor/courses/${courseId}`, { method: 'DELETE' }, token);
}

export async function uploadLessonVideo(lessonId: string, file: File, token: string) {
  const form = new FormData();
  form.append('file', file);
  return apiUpload(`/api/instructor/lessons/${lessonId}/video`, form, token);
}

export async function fetchLessonPlaybackUrl(lessonId: string, token: string) {
  const data = await apiFetch<{ url: string }>(`/api/media/lessons/${lessonId}/playback`, { method: 'GET' }, token);
  return data.url;
}

export async function fetchAdminAnalytics(token: string) {
  return apiFetch<AdminAnalyticsDTO>('/api/admin/analytics', { method: 'GET' }, token);
}

export async function fetchAdminCourses(token: string) {
  const data = await apiFetch<CourseListDTO[]>('/api/admin/courses', { method: 'GET' }, token);
  return data.map(toCourse);
}

export async function fetchAdminUsers(token: string) {
  const data = await apiFetch<ApiUser[]>('/api/admin/users', { method: 'GET' }, token);
  return data.map(toUser);
}

export async function adminResetUserPassword(userId: string, newPassword: string, token: string) {
  return apiFetch(`/api/admin/users/${userId}/reset-password`, {
    method: 'POST',
    body: JSON.stringify({ newPassword }),
  }, token);
}

export async function adminDeleteUser(userId: string, token: string) {
  return apiFetch(`/api/admin/users/${userId}`, { method: 'DELETE' }, token);
}

export async function adminUpdateUser(userId: string, payload: AdminUpdateUserRequest, token: string) {
  const dto = {
    ...payload,
    role: payload.role,
  };
  const data = await apiFetch<ApiUser>(`/api/admin/users/${userId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(dto),
    },
    token,
  );
  return toUser(data);
}

export async function adminDeleteCourse(courseId: string, token: string) {
  return apiFetch(`/api/admin/courses/${courseId}`, { method: 'DELETE' }, token);
}

export async function adminApproveInstructor(userId: string, token: string) {
  return apiFetch(`/api/admin/instructors/${userId}/approve`, { method: 'POST' }, token);
}

export type SelfLearnActivityAttemptDTO = {
  id: string;
  topic: string;
  level: string;
  chapterId: string;
  attemptNumber: number;
  score: number;
  totalQuestions: number;
  createdAt: string;
};

export type SubmitSelfLearnActivityAttemptRequest = {
  topic: string;
  level: string;
  chapterId: string;
  score: number;
  answers?: unknown[];
};

export type SubmitSelfLearnActivityAttemptResponse = SelfLearnActivityAttemptDTO & {
  attemptsUsed: number;
  attemptsRemaining: number;
};

export async function fetchSelfLearnActivityAttempts(
  params: { topic: string; level: string; chapterId: string },
  token: string,
) {
  const query = new URLSearchParams({
    topic: params.topic,
    level: params.level,
    chapterId: params.chapterId,
  });
  return apiFetch<SelfLearnActivityAttemptDTO[]>(`/api/self-learn/activity/attempts?${query.toString()}`, { method: 'GET' }, token);
}

export async function submitSelfLearnActivityAttempt(payload: SubmitSelfLearnActivityAttemptRequest, token: string) {
  return apiFetch<SubmitSelfLearnActivityAttemptResponse>('/api/self-learn/activity/attempts', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);
}

export type AdminSelfLearnActivityAttemptDTO = SelfLearnActivityAttemptDTO & {
  user: { id: string; name: string; email: string; role: string };
};

export async function fetchAdminSelfLearnActivityAttempts(
  token: string,
  params?: { userId?: string; topic?: string; level?: string; chapterId?: string; limit?: number },
) {
  const query = new URLSearchParams();
  if (params?.userId) query.set('userId', params.userId);
  if (params?.topic) query.set('topic', params.topic);
  if (params?.level) query.set('level', params.level);
  if (params?.chapterId) query.set('chapterId', params.chapterId);
  if (typeof params?.limit === 'number') query.set('limit', String(params.limit));

  const qs = query.toString();
  const path = qs ? `/api/admin/self-learn/activity-attempts?${qs}` : '/api/admin/self-learn/activity-attempts';
  return apiFetch<AdminSelfLearnActivityAttemptDTO[]>(path, { method: 'GET' }, token);
}
