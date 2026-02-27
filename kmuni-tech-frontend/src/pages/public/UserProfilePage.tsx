import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import CourseCard from '../../components/common/CourseCard';
import { fetchPublicUserProfile, PublicUserProfile } from '../../utils/api';

export default function UserProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<PublicUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) {
        setIsLoading(false);
        setError('Profile not found');
        return;
      }
      try {
        setError('');
        setIsLoading(true);
        const data = await fetchPublicUserProfile(id);
        if (!mounted) return;
        setProfile(data);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load profile');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const joinedLabel = useMemo(() => {
    if (!profile?.createdAt) return '—';
    const date = new Date(profile.createdAt);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString();
  }, [profile?.createdAt]);

  const roleLabel = (role: string) => {
    if (role === 'admin') return 'Admin';
    if (role === 'instructor') return 'Instructor';
    return 'Student';
  };

  const handleShare = async () => {
    try {
      setShareStatus('');
      const url = window.location.href;
      const title = profile?.name ? `${profile.name} | Profile` : 'Profile';

      // Prefer native share where available
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const navAny: any = navigator;
      if (typeof navAny?.share === 'function') {
        await navAny.share({ title, url });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareStatus('Link copied');
        return;
      }

      setShareStatus('Copy not supported');
    } catch {
      setShareStatus('Share failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0f1a] to-[#1a1c2e]">
      <Navbar />

      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="py-16">
              <LoadingSpinner text="Loading profile..." />
            </div>
          ) : error ? (
            <div className="card p-6">
              <p className="text-slate-300">{error}</p>
            </div>
          ) : !profile ? (
            <div className="card p-6">
              <p className="text-slate-300">Profile not found</p>
            </div>
          ) : (
            <>
              <div className="card p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
                    {profile.name?.charAt(0) || 'U'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-white truncate">{profile.name}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="badge bg-white/5 text-slate-300 border border-white/10 text-xs">
                        {roleLabel(profile.role)}
                      </span>
                      <span className="text-slate-500 text-sm">Joined {joinedLabel}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={handleShare} className="btn-secondary flex items-center gap-2 text-sm px-4 py-2.5">
                      <Share2 size={16} /> Share Profile
                    </button>
                  </div>
                </div>
                {shareStatus && <p className="text-slate-400 text-sm mt-4">{shareStatus}</p>}
              </div>

              {profile.role === 'instructor' && (
                <div className="mt-8">
                  <h2 className="text-white font-bold text-xl mb-4">Courses</h2>
                  {profile.courses && profile.courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {profile.courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm">No courses yet.</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
