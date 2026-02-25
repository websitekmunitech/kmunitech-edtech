import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PlusCircle, Users, Star, Edit3, Eye, Trash2 } from 'lucide-react';
import { formatPriceINR } from '../../utils/currency';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Course } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { deleteInstructorCourse, fetchInstructorCourses, updateInstructorCourse } from '../../utils/api';

export default function InstructorCourses() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [isWorking, setIsWorking] = useState(false);

  const [editCourseId, setEditCourseId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editLevel, setEditLevel] = useState<Course['level']>('beginner');
  const [editCategory, setEditCategory] = useState<Course['category']>('web-dev');
  const [editTags, setEditTags] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!token) {
        setIsLoading(false);
        setLoadError('Not authenticated');
        return;
      }
      try {
        setLoadError('');
        const data = await fetchInstructorCourses(token);
        if (!mounted) return;
        setCourses(data);
      } catch (e: any) {
        if (!mounted) return;
        setLoadError(e?.message || 'Failed to load instructor courses');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  const openEdit = (course: Course) => {
    setActionError('');
    setEditCourseId(course.id);
    setEditTitle(course.title ?? '');
    setEditDescription(course.description ?? '');
    setEditThumbnail(course.thumbnail ?? '');
    setEditPrice(Number(course.price ?? 0));
    setEditLevel((course.level ?? 'beginner') as Course['level']);
    setEditCategory((course.category ?? 'web-dev') as Course['category']);
    setEditTags((course.tags ?? []).join(', '));
  };

  const closeEdit = () => {
    if (isWorking) return;
    setEditCourseId(null);
  };

  const handleSaveEdit = async () => {
    if (!token || !editCourseId) return;
    if (!editTitle.trim()) {
      setActionError('Title is required.');
      return;
    }
    if (Number.isNaN(editPrice) || editPrice < 0) {
      setActionError('Price must be 0 or greater.');
      return;
    }

    const tags = editTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    try {
      setActionError('');
      setIsWorking(true);
      const updated = await updateInstructorCourse(editCourseId, {
        title: editTitle.trim(),
        description: editDescription,
        thumbnail: editThumbnail,
        price: editPrice,
        level: editLevel,
        category: editCategory,
        tags,
      }, token);
      setCourses(prev => prev.map(c => (c.id === updated.id ? updated : c)));
      setEditCourseId(null);
    } catch (e: any) {
      setActionError(e?.message || 'Failed to update course');
    } finally {
      setIsWorking(false);
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!token) return;
    const ok = window.confirm('Delete this course? This cannot be undone.');
    if (!ok) return;
    try {
      setActionError('');
      setIsWorking(true);
      await deleteInstructorCourse(courseId, token);
      setCourses(prev => prev.filter(c => c.id !== courseId));
    } catch (e: any) {
      setActionError(e?.message || 'Failed to delete course');
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-white">My Courses</h1><p className="text-slate-400 mt-1">Manage and monitor your published courses</p></div>
        <Link to="/instructor/create-course" className="btn-primary flex items-center gap-2 text-sm"><PlusCircle size={15} /> New Course</Link>
      </div>
      <div className="space-y-4">
        {actionError && (
          <div className="card p-4 border border-red-500/20 text-red-300 text-sm">
            {actionError}
          </div>
        )}
        {isLoading ? (
          <div className="py-10">
            <LoadingSpinner text="Loading your courses..." />
          </div>
        ) : loadError ? (
          <p className="text-slate-400 text-sm">{loadError}</p>
        ) : courses.length === 0 ? (
          <p className="text-slate-400 text-sm">No courses created yet.</p>
        ) : courses.map((course, i) => (
          <div key={course.id} className="card p-5 hover:border-white/15 transition-all">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 bg-gradient-to-br ${['from-indigo-500 to-purple-500','from-orange-500 to-red-500'][i]}`}>
                {course.title.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold">{course.title}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-1.5 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><Users size={13} />{course.studentsCount.toLocaleString()} students</span>
                  <span className="flex items-center gap-1"><Star size={13} className="text-amber-400" />{course.rating}</span>
                  <span className={`badge ${course.price === 0 ? 'badge-free' : 'badge-paid'}`}>{course.price === 0 ? 'Free' : formatPriceINR(course.price)}</span>
                  <span className="badge-level capitalize">{course.level}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all"><Eye size={15} /></button>
                <button
                  disabled={isWorking}
                  onClick={() => openEdit(course)}
                  className="w-9 h-9 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                ><Edit3 size={15} /></button>
                <button
                  disabled={isWorking}
                  onClick={() => handleDelete(course.id)}
                  className="w-9 h-9 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                ><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Course Modal */}
      {editCourseId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-lg animate-slide-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-indigo-500/15 border border-indigo-500/20 rounded-xl flex items-center justify-center"><Edit3 size={18} className="text-indigo-400" /></div>
              <div><h3 className="text-white font-bold">Edit Course</h3><p className="text-slate-500 text-sm">Update course details</p></div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Title</label>
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} className="input-field min-h-[100px]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    min={0}
                    value={editPrice}
                    onChange={e => setEditPrice(Number(e.target.value))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Level</label>
                  <select value={editLevel} onChange={e => setEditLevel(e.target.value as Course['level'])} className="input-field">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Category</label>
                  <select value={editCategory} onChange={e => setEditCategory(e.target.value as Course['category'])} className="input-field">
                    <option value="web-dev">Web Dev</option>
                    <option value="data-science">Data Science</option>
                    <option value="mobile">Mobile</option>
                    <option value="devops">DevOps</option>
                    <option value="ai-ml">AI/ML</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Tags (comma separated)</label>
                  <input value={editTags} onChange={e => setEditTags(e.target.value)} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Thumbnail URL (optional)</label>
                <input value={editThumbnail} onChange={e => setEditThumbnail(e.target.value)} className="input-field" />
              </div>
            </div>

            {actionError && <p className="text-red-400 text-xs mt-4">{actionError}</p>}

            <div className="flex gap-3 mt-6">
              <button disabled={isWorking} onClick={closeEdit} className="flex-1 btn-secondary text-sm py-2.5 disabled:opacity-60 disabled:cursor-not-allowed">Cancel</button>
              <button
                disabled={isWorking}
                onClick={handleSaveEdit}
                className="flex-1 btn-primary text-sm py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
