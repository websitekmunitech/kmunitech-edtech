import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { fetchPublicUsers, PublicUserListItem } from '../../utils/api';

const roleBadge: Record<string, string> = {
  student: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  instructor: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  admin: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
};

export default function SocialConnectPage() {
  const [users, setUsers] = useState<PublicUserListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareStatusById, setShareStatusById] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError('');
        setIsLoading(true);
        const data = await fetchPublicUsers({ limit: 24, offset: 0 });
        if (!mounted) return;
        setUsers(data);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load profiles');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleShare = async (id: string, name: string) => {
    try {
      setShareStatusById((s) => ({ ...s, [id]: '' }));
      const url = `${window.location.origin}/profile/${id}`;
      const title = `${name} | Profile`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const navAny: any = navigator;
      if (typeof navAny?.share === 'function') {
        await navAny.share({ title, url });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareStatusById((s) => ({ ...s, [id]: 'Link copied' }));
        return;
      }

      setShareStatusById((s) => ({ ...s, [id]: 'Copy not supported' }));
    } catch {
      setShareStatusById((s) => ({ ...s, [id]: 'Share failed' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0f1a] to-[#1a1c2e]">
      <Navbar />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">UniSpace</h1>
            <p className="text-slate-400 mt-1">Browse public profiles and share them.</p>
          </div>

          {isLoading ? (
            <div className="py-16">
              <LoadingSpinner text="Loading profiles..." />
            </div>
          ) : error ? (
            <div className="card p-6">
              <p className="text-slate-300">{error}</p>
            </div>
          ) : users.length === 0 ? (
            <p className="text-slate-400 text-sm">No profiles found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((u) => (
                <div key={u.id} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-black flex-shrink-0">
                      {u.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-lg truncate">{u.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`badge border text-xs capitalize ${roleBadge[u.role] || 'bg-white/5 text-slate-300 border-white/10'}`}>{u.role}</span>
                      </div>
                    </div>
                  </div>

                  {shareStatusById[u.id] && (
                    <p className="text-slate-500 text-xs mt-3">{shareStatusById[u.id]}</p>
                  )}

                  <div className="flex gap-3 mt-5">
                    <Link to={`/profile/${u.id}`} className="flex-1 btn-primary text-sm py-2.5 text-center">
                      View Profile
                    </Link>
                    <button
                      onClick={() => handleShare(u.id, u.name)}
                      className="btn-secondary text-sm px-4 py-2.5 flex items-center justify-center gap-2"
                    >
                      <Share2 size={16} /> Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
