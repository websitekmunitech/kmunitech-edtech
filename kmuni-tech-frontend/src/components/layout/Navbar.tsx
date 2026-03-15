import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Menu, X, ChevronDown, LogOut, Settings, LayoutDashboard, Sparkles, Link2 } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => { logout(); navigate('/'); };

  const getDashboardPath = () => {
    if (!user) return '/';
    const map: Record<string, string> = {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard',
    };
    return map[user.role] || '/';
  };

  const getRoleColor = () => {
    const colors: Record<string, string> = {
      student: 'text-emerald-400',
      instructor: 'text-blue-400',
      admin: 'text-orange-400',
    };
    return user ? colors[user.role] : '';
  };

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(to + '/');
  };

  const linkCls = (to: string) => {
    const active = isActive(to);
    return (
      'px-3.5 py-2 rounded-lg transition-all text-sm font-medium border ' +
      (active
        ? 'bg-blue-600/20 border-blue-500/30 text-white shadow-lg shadow-blue-500/10'
        : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/10')
    );
  };

  const mobileLinkCls = (to: string) => {
    const active = isActive(to);
    return (
      'block px-4 py-3 rounded-xl transition-all border ' +
      (active
        ? 'bg-blue-600/20 border-blue-500/30 text-white'
        : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5')
    );
  };

  const logoSrc = `${import.meta.env.BASE_URL}kmunitech-logo.jpeg`;

  return (
    <nav
      className={
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' +
        ((isScrolled || mobileOpen)
          ? 'bg-[#0d0f1a]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20'
          : 'bg-transparent')
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all">
              <img src={logoSrc} alt="UniVerse logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-blue-400 font-bold text-lg">Uni</span>
              <span className="text-green-400 font-bold text-lg">Verse</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            <Link to="/" className={linkCls('/')}>Home</Link>
            <Link to="/courses" className={linkCls('/courses')}>
              <span className="flex items-center gap-1.5">
                <BookOpen size={13} className="text-blue-400" />
                Courses
              </span>
            </Link>
            <Link to="/self-learn" className={linkCls('/self-learn')}>
              <span className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-green-400" />
                Self Learn
              </span>
            </Link>
            <Link to="/self-learn/leaderboard" className={linkCls('/self-learn/leaderboard')}>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l3-3 3 3v13M5 21h14" />
                </svg>
                Leaderboard
              </span>
            </Link>
            <Link to="/unilink" className={linkCls('/unilink')}>
              <span className="flex items-center gap-1.5">
                <Link2 size={13} className="text-sky-400" />
                UniLink
              </span>
            </Link>
            <Link to="/unispace" className={linkCls('/unispace')}>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Uniprofile
              </span>
            </Link>
            <Link to="/about" className={linkCls('/about')}>About</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-all border border-white/10 hover:border-blue-500/30"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-semibold leading-none">{user.name.split(' ')[0]}</p>
                    <p className={'text-xs capitalize mt-0.5 ' + getRoleColor()}>{user.role}</p>
                  </div>
                  <ChevronDown size={14} className={'text-slate-400 transition-transform duration-200 ' + (dropdownOpen ? 'rotate-180' : '')} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#12141f] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white font-semibold text-sm">{user.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => { navigate(getDashboardPath()); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all"
                      >
                        <LayoutDashboard size={15} /> Dashboard
                      </button>
                      <button
                        onClick={() => { navigate('/' + user.role + '/settings'); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all"
                      >
                        <Settings size={15} /> Settings
                      </button>
                    </div>
                    <div className="p-2 border-t border-white/5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-all"
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5 border border-white/10 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0d0f1a]/98 border-t border-white/5 px-4 py-4 space-y-1 backdrop-blur-xl">
          <Link to="/" className={mobileLinkCls('/')}>Home</Link>
          <Link to="/courses" className={mobileLinkCls('/courses')}>
            <span className="flex items-center gap-2.5"><BookOpen size={15} className="text-blue-400" /> Courses</span>
          </Link>
          <Link to="/self-learn" className={mobileLinkCls('/self-learn')}>
            <span className="flex items-center gap-2.5"><Sparkles size={15} className="text-green-400" /> Self Learn</span>
          </Link>
          <Link to="/self-learn/leaderboard" className={mobileLinkCls('/self-learn/leaderboard')}>
            <span className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l3-3 3 3v13M5 21h14" />
              </svg>
              Leaderboard
            </span>
          </Link>
          <Link to="/unilink" className={mobileLinkCls('/unilink')}>
            <span className="flex items-center gap-2.5"><Link2 size={15} className="text-sky-400" /> UniLink</span>
          </Link>
          <Link to="/unispace" className={mobileLinkCls('/unispace')}>
            <span className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              UniSpace
            </span>
          </Link>
          <Link to="/about" className={mobileLinkCls('/about')}>About</Link>

          {isAuthenticated && user ? (
            <div className="space-y-1 pt-2 border-t border-white/5">
              <button
                onClick={() => navigate(getDashboardPath())}
                className="w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
              <Link to="/login" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-center text-sm py-3 rounded-xl font-medium transition-all">
                Log in
              </Link>
              <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-center text-sm py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all">
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close user dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
}
