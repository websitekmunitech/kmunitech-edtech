import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { Users, Star, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { Course } from '../../types';
import { fetchInstructorAnalytics, fetchInstructorCourses } from '../../utils/api';

export default function InstructorAnalytics() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [analytics, setAnalytics] = useState<{ totalCourses: number; totalStudents: number; averageRating: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const load = async () => {
    if (!token) return;
    setLoadError('');
    const [coursesData, analyticsData] = await Promise.all([
      fetchInstructorCourses(token),
      fetchInstructorAnalytics(token),
    ]);
    setCourses(coursesData);
    setAnalytics(analyticsData);
  };

  useEffect(() => {
    let mounted = true;
    let timer: any;
    let inFlight = false;

    (async () => {
      if (!token) {
        setIsLoading(false);
        setLoadError('Not authenticated');
        return;
      }
      try {
        setIsLoading(true);
        await load();
      } catch (e: any) {
        if (!mounted) return;
        setLoadError(e?.message || 'Failed to load analytics');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }

      timer = setInterval(async () => {
        if (!mounted || !token || inFlight) return;
        inFlight = true;
        try {
          await load();
        } catch {
          // keep last good data
        } finally {
          inFlight = false;
        }
      }, 15000);
    })();

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  const enrollmentsByCourse = useMemo(() => {
    const items = courses
      .slice()
      .sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0))
      .slice(0, 6)
      .map((c) => ({
        label: (c.title || '').trim().slice(0, 3) || '—',
        value: Number(c.studentsCount || 0),
      }));
    const max = Math.max(1, ...items.map((i) => i.value));
    return { items, max };
  }, [courses]);


  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">Analytics</h1><p className="text-slate-400 mt-1">Performance insights for your courses</p></div>
      {isLoading ? (
        <div className="py-10">
          <LoadingSpinner text="Loading analytics..." />
        </div>
      ) : loadError ? (
        <p className="text-slate-400 text-sm">{loadError}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatCard icon={<Users size={18} />} label="Total Students" value={analytics?.totalStudents ?? '—'} color="from-indigo-500 to-purple-500" sub="Live" />
            <StatCard icon={<TrendingUp size={18} />} label="Total Courses" value={analytics?.totalCourses ?? '—'} color="from-blue-500 to-cyan-500" />
            <StatCard icon={<Star size={18} />} label="Avg Rating" value={Number.isFinite(analytics?.averageRating) ? (analytics?.averageRating ?? 0).toFixed(1) : '—'} color="from-amber-500 to-orange-500" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="text-white font-bold mb-5">Student Enrollments</h2>
              {enrollmentsByCourse.items.length === 0 ? (
                <p className="text-slate-400 text-sm">No courses yet.</p>
              ) : (
                <div className="flex items-end gap-3 h-48">
                  {enrollmentsByCourse.items.map((item, i) => (
                    <div key={`${item.label}-${i}`} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs text-slate-500">{item.value}</span>
                      <div
                        className="w-full bg-indigo-500/20 hover:bg-indigo-500/40 rounded-t-lg transition-all cursor-pointer"
                        style={{ height: `${(item.value / enrollmentsByCourse.max) * 100}%`, minHeight: '8px' }}
                      />
                      <span className="text-xs text-slate-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-emerald-400 text-sm font-semibold mt-4 flex items-center gap-1"><TrendingUp size={14} /> Auto-refresh every 15s</p>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
