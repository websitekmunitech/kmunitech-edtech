import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import {
  BookOpen,
  Sparkles,
  Briefcase,
  Users,
  ArrowRight,
  Star,
  Zap,
  Globe,
  CheckCircle,
  GraduationCap,
} from 'lucide-react';

const products = [
  {
    icon: BookOpen,
    color: 'blue',
    name: 'Courses',
    tagline: 'Learn from Industry Experts',
    description:
      'Access a rich library of professionally crafted courses spanning technology, business, design, and more. Learn at your own pace with video lessons, quizzes, and hands-on projects.',
    href: '/courses',
    features: ['HD video content', 'Downloadable resources', 'Completion certificates', 'Instructor Q&A', 'Progress tracking'],
    badge: 'Most Popular',
  },
  {
    icon: Sparkles,
    color: 'green',
    name: 'Self Learn',
    tagline: 'Interactive Bite-Sized Modules',
    description:
      'Master concepts through gamified, self-paced modules. Structured chapters, instant quizzes, and progress badges keep you motivated every step of the way.',
    href: '/self-learn',
    features: ['Structured learning paths', 'Interactive quizzes', 'Progress badges', 'Domain-based tracks', 'Offline-friendly'],
    badge: 'New',
  },
  {
    icon: Briefcase,
    color: 'sky',
    name: 'UniLink',
    tagline: 'Bridge the Gap to Your Career',
    description:
      'Connect with top companies through curated career events, hackathons, and placement drives. Get mentored, get hired, and grow your professional network inside Universe.',
    href: '/unilink',
    features: ['Campus placement drives', 'Hackathons & competitions', 'Mentor sessions', 'Resume review', 'Job board access'],
    badge: null,
  },
  {
    icon: Users,
    color: 'teal',
    name: 'UniSpace',
    tagline: 'Your Campus Social Network',
    description:
      'A safe, focused social layer for students and alumni to collaborate, share projects, find study partners, and build communities around shared interests.',
    href: '/unispace',
    features: ['Project showcase', 'Study groups', 'Alumni network', 'Event feeds', 'Direct messaging'],
    badge: 'Coming Soon',
  },
];

const stats = [
  { value: '10K+', label: 'Active Learners' },
  { value: '200+', label: 'Courses Available' },
  { value: '50+', label: 'Partner Companies' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; iconText: string; badge: string; btn: string; glow: string }> = {
  blue: {
    bg: 'from-blue-600/15 to-blue-500/5',
    border: 'border-blue-500/25',
    icon: 'bg-blue-500/20',
    iconText: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    btn: 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30',
    glow: 'shadow-blue-500/20',
  },
  green: {
    bg: 'from-green-600/15 to-green-500/5',
    border: 'border-green-500/25',
    icon: 'bg-green-500/20',
    iconText: 'text-green-400',
    badge: 'bg-green-500/20 text-green-300 border-green-500/30',
    btn: 'bg-green-600 hover:bg-green-500 shadow-green-500/30',
    glow: 'shadow-green-500/20',
  },
  sky: {
    bg: 'from-sky-600/15 to-sky-500/5',
    border: 'border-sky-500/25',
    icon: 'bg-sky-500/20',
    iconText: 'text-sky-400',
    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    btn: 'bg-sky-600 hover:bg-sky-500 shadow-sky-500/30',
    glow: 'shadow-sky-500/20',
  },
  teal: {
    bg: 'from-teal-600/15 to-teal-500/5',
    border: 'border-teal-500/25',
    icon: 'bg-teal-500/20',
    iconText: 'text-teal-400',
    badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    btn: 'bg-teal-600 hover:bg-teal-500 shadow-teal-500/30',
    glow: 'shadow-teal-500/20',
  },
};

/** Universe logo as inline SVG — matches the brand logo (blue book + green page + orbit) */
function UniverseLogo({ size = 96 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 220"
      fill="none"
      width={size}
      height={size * (220 / 280)}
      aria-label="Universe logo"
    >
      <defs>
        <linearGradient id="ul-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2196F3" />
          <stop offset="100%" stopColor="#29ABE2" />
        </linearGradient>
        <linearGradient id="ul-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#8DC63F" />
        </linearGradient>
        <linearGradient id="ul-orbit" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#2196F3" />
          <stop offset="100%" stopColor="#4CAF50" />
        </linearGradient>
        <filter id="ul-shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#00000050" />
        </filter>
      </defs>
      {/* Orbit back arc */}
      <ellipse cx="140" cy="128" rx="105" ry="26" stroke="url(#ul-orbit)" strokeWidth="6" fill="none" opacity="0.5" />
      {/* Left page (blue) */}
      <path
        d="M140 50 L140 162 Q120 166 95 160 L80 154 Q72 150 72 142 L72 64 Q72 56 80 52 Q105 42 135 48 Q138 49 140 50Z"
        fill="url(#ul-blue)"
        filter="url(#ul-shadow)"
      />
      {/* Right page (green) */}
      <path
        d="M140 50 L140 162 Q160 166 185 160 L200 154 Q208 150 208 142 L208 64 Q208 56 200 52 Q175 42 145 48 Q142 49 140 50Z"
        fill="url(#ul-green)"
        filter="url(#ul-shadow)"
      />
      {/* Spine */}
      <path d="M140 48 L140 164" stroke="white" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
      {/* Orbit front arc */}
      <path d="M50 140 Q140 168 230 140" stroke="url(#ul-orbit)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9" />
      {/* Sparkle */}
      <path d="M205 42 L207.5 36 L210 42 L216 44.5 L210 47 L207.5 53 L205 47 L199 44.5 Z" fill="#8DC63F" />
      <circle cx="195" cy="34" r="2.5" fill="#8DC63F" opacity="0.7" />
    </svg>
  );
}

export default function UniversePage() {
  return (
    <div className="min-h-screen bg-[#060a0f]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glows — blue & green */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-green-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <UniverseLogo size={120} />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Sparkles size={14} />
            UniVerse&apos;s Flagship EdTech Product
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Uni</span>
            <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Verse</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-4 leading-relaxed">
            The all-in-one EdTech platform built for students, professionals, and institutions.
          </p>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-12">
            Learn, connect, and grow — in one unified space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white px-8 py-4 rounded-2xl text-base font-semibold shadow-2xl shadow-blue-500/30 hover:shadow-green-500/30 transition-all"
            >
              Start Learning Free <ArrowRight size={18} />
            </Link>
            <Link
              to="/unilink"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all"
            >
              Explore Career Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className="text-center">
                <div
                  className={
                    'text-4xl font-black bg-clip-text text-transparent mb-1 ' +
                    (i % 2 === 0
                      ? 'bg-gradient-to-r from-blue-400 to-sky-300'
                      : 'bg-gradient-to-r from-green-400 to-teal-300')
                  }
                >
                  {s.value}
                </div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Cards ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                succeed
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Four powerful tools. One platform. Designed to take you from learning to launching your career.
            </p>
          </div>

          <div className="space-y-8">
            {products.map((product, idx) => {
              const cls = colorMap[product.color];
              const Icon = product.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={product.name}
                  className={`bg-gradient-to-br ${cls.bg} border ${cls.border} rounded-3xl p-8 md:p-12 shadow-2xl ${cls.glow}`}
                >
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-center`}>
                    {/* Text side */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${cls.icon} ${cls.iconText} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                            {product.badge && (
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cls.badge}`}>
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm">{product.tagline}</p>
                        </div>
                      </div>

                      <p className="text-slate-300 text-base leading-relaxed">{product.description}</p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                            <CheckCircle size={14} className={cls.iconText} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Link
                        to={product.href}
                        className={`inline-flex items-center gap-2 ${cls.btn} text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all`}
                      >
                        Explore {product.name} <ArrowRight size={16} />
                      </Link>
                    </div>

                    {/* Visual card side */}
                    <div className="flex-shrink-0 w-full md:w-64">
                      <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${cls.bg} border ${cls.border} flex flex-col items-center justify-center gap-4 p-8`}>
                        <div className={`w-20 h-20 rounded-2xl ${cls.icon} ${cls.iconText} flex items-center justify-center`}>
                          <Icon size={44} />
                        </div>
                        <span className="text-white font-bold text-xl">{product.name}</span>
                        <span className="text-slate-400 text-xs text-center">{product.tagline}</span>
                        <div className="flex gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Universe ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why choose Universe?</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Built differently. Designed for real impact.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: 'All-in-One Ecosystem', desc: 'No switching between apps. Learning, networking, career growth — everything lives inside Universe.', color: 'blue' },
              { icon: Zap, title: 'Blazing Fast Experience', desc: 'Lightweight, mobile-first design ensures smooth learning even on slow connections.', color: 'green' },
              { icon: GraduationCap, title: 'Institution-Grade Quality', desc: 'Content reviewed by industry experts and academia. Trusted by 50+ partner organizations.', color: 'sky' },
            ].map(item => {
              const Icon = item.icon;
              const c = colorMap[item.color];
              return (
                <div
                  key={item.title}
                  className={`bg-white/5 border border-white/10 rounded-2xl p-8 hover:${c.border} hover:bg-gradient-to-br hover:${c.bg} transition-all`}
                >
                  <div className={`w-12 h-12 rounded-xl ${c.icon} ${c.iconText} flex items-center justify-center mb-5`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-br from-blue-600/20 via-[#060a0f] to-green-600/20 border border-blue-500/20 rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Corner glow */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-blue-600/15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-600/15 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

            <div className="relative">
              <div className="flex justify-center mb-6">
                <UniverseLogo size={72} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to join the Universe?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Free to start. No credit card required. Join thousands of learners already growing on Universe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-blue-500/30 transition-all"
                >
                  Create Free Account <ArrowRight size={18} />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
