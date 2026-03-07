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
    color: 'indigo',
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
    color: 'purple',
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
    color: 'blue',
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
    color: 'emerald',
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

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; btn: string; glow: string }> = {
  indigo: {
    bg: 'from-indigo-600/15 to-indigo-500/5',
    border: 'border-indigo-500/25',
    icon: 'bg-indigo-500/20 text-indigo-400',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    btn: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/30',
    glow: 'shadow-indigo-500/20',
  },
  purple: {
    bg: 'from-purple-600/15 to-purple-500/5',
    border: 'border-purple-500/25',
    icon: 'bg-purple-500/20 text-purple-400',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    btn: 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/30',
    glow: 'shadow-purple-500/20',
  },
  blue: {
    bg: 'from-blue-600/15 to-blue-500/5',
    border: 'border-blue-500/25',
    icon: 'bg-blue-500/20 text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    btn: 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30',
    glow: 'shadow-blue-500/20',
  },
  emerald: {
    bg: 'from-emerald-600/15 to-emerald-500/5',
    border: 'border-emerald-500/25',
    icon: 'bg-emerald-500/20 text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    btn: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30',
    glow: 'shadow-emerald-500/20',
  },
};

export default function UniversePage() {
  return (
    <div className="min-h-screen bg-[#0a0b14]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Sparkles size={15} />
            KM UniTech's Flagship Product
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Universe
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            The all-in-one EdTech platform built for students, professionals, and institutions — learn, connect, and grow in one unified space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl text-base font-semibold shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
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
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {s.value}
                </div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is Universe ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                succeed
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Universe brings together four powerful tools under one roof — designed to take you from learning to launching your career.
            </p>
          </div>

          {/* Product Cards */}
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
                    {/* Left: text */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${cls.icon} flex items-center justify-center flex-shrink-0`}>
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
                            <CheckCircle size={14} className={cls.icon.split(' ')[1]} />
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

                    {/* Right: visual placeholder */}
                    <div className="flex-shrink-0 w-full md:w-72">
                      <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${cls.bg} border ${cls.border} flex flex-col items-center justify-center gap-4 p-8`}>
                        <div className={`w-20 h-20 rounded-2xl ${cls.icon} flex items-center justify-center`}>
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
      <section className="py-20 bg-white/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why choose Universe?</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Built differently. Designed for real impact.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: 'All-in-One Ecosystem', desc: 'No switching between apps. Learning, networking, career growth — everything lives inside Universe.' },
              { icon: Zap, title: 'Blazing Fast Experience', desc: 'Lightweight, mobile-first design ensures smooth learning even on slow connections.' },
              { icon: GraduationCap, title: 'Institution-Grade Quality', desc: 'Content reviewed by industry experts and academia. Trusted by 50+ partner organizations.' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-5">
                    <Icon size={24} className="text-indigo-400" />
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
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-3xl p-12 md:p-16">
            <Sparkles className="text-indigo-400 mx-auto mb-6" size={40} />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to join the Universe?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Free to start. No credit card required. Join thousands of learners already growing on Universe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-indigo-500/30 transition-all"
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
      </section>

      <Footer />
    </div>
  );
}
