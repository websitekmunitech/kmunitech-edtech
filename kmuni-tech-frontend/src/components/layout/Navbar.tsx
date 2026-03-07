import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Menu, X, ChevronDown, LogOut, Settings, LayoutDashboard, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [universeOpen, setUniverseOpen] = useState(false);
  const universeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openUniverse = () => {
    if (universeTimer.current) clearTimeout(universeTimer.current);
    setUniverseOpen(true);
  };
  const closeUniverseDelayed = () => {
    universeTimer.current = setTimeout(() => setUniverseOpen(false), 120);
  };

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

  const isUniverseActive = () =>
    ['/universe', '/courses', '/unilink', '/self-learn', '/unispace'].some(p =>
      location.pathname.startsWith(p)
    );

  const linkCls = (to: string) => {
    const active = isActive(to);
    return (
      'px-3.5 py-2 rounded-lg transition-all text-sm font-medium border ' +
      (active
        ? 'bg-indigo-600/20 border-indigo-500/30 text-white shadow-lg shadow-indigo-500/10'
        : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/10')
    );
  };

  const mobileLinkCls = (to: string) => {
    const active = isActive(to);
    return (
      'block px-4 py-3 rounded-xl transition-all border ' +
      (active
        ? 'bg-indigo-600/20 border-indigo-500/30 text-white'
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
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all">
              <img src={logoSrc} alt="KM UniTech logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-white font-bold text-lg">KM </span>
              <span className="text-indigo-400 font-bold text-lg">UniTech</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className={linkCls('/')}>Home</Link>
            <Link to="/about" className={linkCls('/about')}>About</Link>

            {/* Universe Dropdown */}
            <div className="relative" onMouseLeave={closeUniverseDelayed}>
              <button
                onMouseEnter={openUniverse}
                onClick={() => navigate('/universe')}
                className={
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all text-sm font-medium border ' +
                  (isUniverseActive()
                    ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-indigo-500/30 text-white shadow-lg shadow-indigo-500/10'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/10')
                }
              >
                <Sparkles size={14} className="text-indigo-400" />
                Universe
                <ChevronDown
                  size={13}
                  className={'transition-transform duration-200 ' + (universeOpen ? 'rotate-180' : '')}
                />
              </button>

              {universeOpen && (
                <div
                  onMouseEnter={openUniverse}
                  onMouseLeave={closeUniverseDelayed}
                  className="absolute top-full left-0 mt-1.5 w-64 bg-[#12141f] backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl shadow-indigo-500/20 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-white/5 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
                    <Link
                      to="/universe"
                      onClick={() => setUniverseOpen(false)}
                      className="flex items-center justify-between group"
                    >
                      <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={12} /> Universe Platform
                      </p>
                      <span className="text-indigo-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">View all →</span>
                    </Link>
                  </div>
                  <div className="p-2 space-y-0.5">
                    <Link
                      to="/courses"
                      onClick={() => setUniverseOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-indigo-500/10 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={16} className="text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Courses</div>
                        <div className="text-xs text-slate-500">Learn &amp; Upskill</div>
                      </div>
                    </Link>
                    <Link
                      to="/self-learn"
                      onClick={() => setUniverseOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-purple-500/10 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles size={16} className="text-purple-400" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Self Learn</div>
                        <div className="text-xs text-slate-500">Interactive Modules</div>
                      </div>
                    </Link>
                    <Link
                      to="/unilink"
                      onClick={() => setUniverseOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-blue-500/10 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sm">UniLink</div>
                        <div className="text-xs text-slate-500">Career Events</div>
                      </div>
                    </Link>
                    <Link
                      to="/unispace"
                      onClick={() => setUniverseOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-emerald-500/10 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sm">UniSpace</div>
                        <div className="text-xs text-slate-500">Social Connect</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/services" className={linkCls('/services')}>Services</Link>
            <Link to="/community" className={linkCls('/community')}>Community</Link>
            <Link to="/blog" className={linkCls('/blog')}>Blog</Link>
            <Link to="/roadmap" className={linkCls('/roadmap')}>Roadmap</Link>
            <Link to="/contact" className={linkCls('/contact')}>Contact</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-all border border-white/10 hover:border-indigo-500/30"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/30">
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
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
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
          <Link to="/about" className={mobileLinkCls('/about')}>About</Link>

          {/* Universe Section */}
          <div className="border border-indigo-500/20 rounded-xl p-3 bg-indigo-500/5 space-y-0.5">
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
              <Sparkles size={12} /> Universe Platform
            </p>
            <Link to="/courses" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all">
              📚 <span>Courses</span>
            </Link>
            <Link to="/self-learn" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all">
              ✨ <span>Self Learn</span>
            </Link>
            <Link to="/unilink" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all">
              💼 <span>UniLink Events</span>
            </Link>
            <Link to="/unispace" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all">
              👥 <span>UniSpace Connect</span>
            </Link>
          </div>

          <Link to="/services" className={mobileLinkCls('/services')}>Services</Link>
          <Link to="/community" className={mobileLinkCls('/community')}>Community</Link>
          <Link to="/blog" className={mobileLinkCls('/blog')}>Blog</Link>
          <Link to="/roadmap" className={mobileLinkCls('/roadmap')}>Roadmap</Link>
          <Link to="/contact" className={mobileLinkCls('/contact')}>Contact</Link>

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
              <Link to="/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center text-sm py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all">
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close open dropdowns */}
      {(dropdownOpen || universeOpen) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => { setDropdownOpen(false); setUniverseOpen(false); }}
        />
      )}
    </nav>
  );
}
