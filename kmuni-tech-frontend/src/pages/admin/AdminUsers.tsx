import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Search, Key, Trash2, Edit3, UserPlus, UserCheck } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { adminApproveInstructor, adminDeleteUser, adminResetUserPassword, adminUpdateUser, fetchAdminUsers } from '../../utils/api';

const roleColors: Record<string, string> = {
  student: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  instructor: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  admin: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
};

const approvalColors = {
  pending: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20',
};

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [resetModal, setResetModal] = useState<string | null>(null);
  const [newPwd, setNewPwd] = useState('');
  const [editModal, setEditModal] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<User['role']>('student');
  const [editApproved, setEditApproved] = useState(true);
  const [actionError, setActionError] = useState('');
  const [isWorking, setIsWorking] = useState(false);

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
        setLoadError('');
        const load = async () => {
          const data = await fetchAdminUsers(token);
          if (!mounted) return;
          setUsers(data);
        };

        await load();
        if (!mounted) return;

        timer = setInterval(async () => {
          if (!mounted || !token || inFlight) return;
          // Avoid refreshing while an admin action is in progress
          if (isWorking) return;
          inFlight = true;
          try {
            await load();
          } catch {
            // keep last good data
          } finally {
            inFlight = false;
          }
        }, 15000);
      } catch (e: any) {
        if (!mounted) return;
        setLoadError(e?.message || 'Failed to load users');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, [token]);

  const selectedUser = useMemo(() => users.find(u => u.id === resetModal) || null, [users, resetModal]);
  const editingUser = useMemo(() => users.find(u => u.id === editModal) || null, [users, editModal]);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatJoined = (iso: string) => {
    if (!iso) return '—';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString();
  };

  const handleResetPassword = async () => {
    if (!token || !resetModal) return;
    if (!newPwd || newPwd.length < 6) {
      setActionError('Password must be at least 6 characters.');
      return;
    }

    try {
      setActionError('');
      setIsWorking(true);
      await adminResetUserPassword(resetModal, newPwd, token);
      setResetModal(null);
      setNewPwd('');
    } catch (e: any) {
      setActionError(e?.message || 'Failed to reset password');
    } finally {
      setIsWorking(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!token) return;
    const ok = window.confirm('Delete this user? This cannot be undone.');
    if (!ok) return;
    try {
      setActionError('');
      setIsWorking(true);
      await adminDeleteUser(userId, token);
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (e: any) {
      setActionError(e?.message || 'Failed to delete user');
    } finally {
      setIsWorking(false);
    }
  };

  const handleApproveInstructor = async (userId: string) => {
    if (!token) return;
    try {
      setActionError('');
      setIsWorking(true);
      await adminApproveInstructor(userId, token);
      setUsers(prev => prev.map(u => (u.id === userId ? { ...u, isApproved: true } : u)));
    } catch (e: any) {
      setActionError(e?.message || 'Failed to approve instructor');
    } finally {
      setIsWorking(false);
    }
  };

  const openEdit = (user: User) => {
    setActionError('');
    setEditModal(user.id);
    setEditName(user.name ?? '');
    setEditEmail(user.email ?? '');
    setEditRole(user.role);
    setEditApproved(user.role === 'instructor' ? Boolean(user.isApproved) : true);
  };

  const closeEdit = () => {
    if (isWorking) return;
    setEditModal(null);
  };

  const handleSaveUser = async () => {
    if (!token || !editModal) return;
    if (!editName.trim()) {
      setActionError('Name is required.');
      return;
    }
    if (!editEmail.trim() || !editEmail.includes('@')) {
      setActionError('Valid email is required.');
      return;
    }
    try {
      setActionError('');
      setIsWorking(true);
      const updated = await adminUpdateUser(editModal, {
        name: editName.trim(),
        email: editEmail.trim(),
        role: editRole,
        isApproved: editRole === 'instructor' ? editApproved : undefined,
      }, token);
      setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
      setEditModal(null);
    } catch (e: any) {
      setActionError(e?.message || 'Failed to update user');
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-white">User Management</h1><p className="text-slate-400 mt-1">Manage all platform users and their access</p></div>
        <button className="btn-primary flex items-center gap-2 text-sm"><UserPlus size={15} /> Add User</button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Search users by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {actionError && !resetModal && (
          <div className="px-5 py-3 border-b border-white/5 text-red-400 text-xs">
            {actionError}
          </div>
        )}
        {isLoading ? (
          <div className="p-8">
            <LoadingSpinner text="Loading users..." />
          </div>
        ) : loadError ? (
          <div className="p-8">
            <p className="text-slate-400 text-sm">{loadError}</p>
          </div>
        ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wide">User</th>
              <th className="text-left px-5 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Role</th>
              <th className="text-left px-5 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wide hidden lg:table-cell">Joined</th>
              <th className="text-right px-5 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/3">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-white/2 transition-all">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div><p className="text-white text-sm font-medium">{user.name}</p><p className="text-slate-500 text-xs">{user.email}</p></div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <span className={`badge ${roleColors[user.role]} capitalize text-xs`}>{user.role}</span>
                    {user.role === 'instructor' && user.isApproved === false && (
                      <span className={`badge ${approvalColors.pending} text-xs`}>Pending</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-500 text-xs hidden lg:table-cell">{formatJoined(user.createdAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    {user.role === 'instructor' && user.isApproved === false && (
                      <button
                        disabled={isWorking}
                        onClick={() => handleApproveInstructor(user.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 rounded-lg text-emerald-300 text-xs font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <UserCheck size={12} /> Approve
                      </button>
                    )}
                    <button onClick={() => { setResetModal(user.id); setNewPwd(''); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-lg text-indigo-400 text-xs font-medium transition-all">
                      <Key size={12} /> Reset PWD
                    </button>
                    <button
                      disabled={isWorking}
                      onClick={() => openEdit(user)}
                      className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    ><Edit3 size={14} /></button>
                    <button
                      disabled={isWorking}
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    ><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      {/* Reset Password Modal */}
      {resetModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-md animate-slide-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-orange-500/15 border border-orange-500/20 rounded-xl flex items-center justify-center"><Key size={18} className="text-orange-400" /></div>
              <div><h3 className="text-white font-bold">Reset Password</h3><p className="text-slate-500 text-sm">For {selectedUser?.name}</p></div>
            </div>
            <div className="mb-5">
              <label className="block text-slate-300 text-sm font-medium mb-2">New Password</label>
              <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Enter new password" className="input-field" />
            </div>
            {actionError && <p className="text-red-400 text-xs mb-4">{actionError}</p>}
            <div className="flex gap-3">
              <button onClick={() => setResetModal(null)} className="flex-1 btn-secondary text-sm py-2.5">Cancel</button>
              <button
                disabled={isWorking}
                onClick={handleResetPassword}
                className="flex-1 btn-primary text-sm py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >Reset Password</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-md animate-slide-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-indigo-500/15 border border-indigo-500/20 rounded-xl flex items-center justify-center"><Edit3 size={18} className="text-indigo-400" /></div>
              <div><h3 className="text-white font-bold">Edit User</h3><p className="text-slate-500 text-sm">{editingUser?.email}</p></div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                <input value={editName} onChange={e => setEditName(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <input value={editEmail} onChange={e => setEditEmail(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Role</label>
                <select value={editRole} onChange={e => setEditRole(e.target.value as User['role'])} className="input-field">
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {editRole === 'instructor' && (
                <label className="flex items-center gap-2 text-slate-300 text-sm">
                  <input
                    type="checkbox"
                    checked={editApproved}
                    onChange={e => setEditApproved(e.target.checked)}
                  />
                  Approved
                </label>
              )}
            </div>

            {actionError && <p className="text-red-400 text-xs mt-4">{actionError}</p>}

            <div className="flex gap-3 mt-6">
              <button disabled={isWorking} onClick={closeEdit} className="flex-1 btn-secondary text-sm py-2.5 disabled:opacity-60 disabled:cursor-not-allowed">Cancel</button>
              <button
                disabled={isWorking}
                onClick={handleSaveUser}
                className="flex-1 btn-primary text-sm py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >Save</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
