import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Link } from 'react-router-dom';
import {
    Award,
    Target,
    Users,
    BookOpen,
    Heart,
    ArrowRight,
    Linkedin,
    Sparkles,
    Briefcase,
    Star,
    Zap,
    Globe,
    CheckCircle,
    GraduationCap,
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
} from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL;

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
            <ellipse cx="140" cy="128" rx="105" ry="26" stroke="url(#ul-orbit)" strokeWidth="6" fill="none" opacity="0.5" />
            <path
                d="M140 50 L140 162 Q120 166 95 160 L80 154 Q72 150 72 142 L72 64 Q72 56 80 52 Q105 42 135 48 Q138 49 140 50Z"
                fill="url(#ul-blue)"
                filter="url(#ul-shadow)"
            />
            <path
                d="M140 50 L140 162 Q160 166 185 160 L200 154 Q208 150 208 142 L208 64 Q208 56 200 52 Q175 42 145 48 Q142 49 140 50Z"
                fill="url(#ul-green)"
                filter="url(#ul-shadow)"
            />
            <path d="M140 48 L140 164" stroke="white" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
            <path d="M50 140 Q140 168 230 140" stroke="url(#ul-orbit)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9" />
            <path d="M205 42 L207.5 36 L210 42 L216 44.5 L210 47 L207.5 53 L205 47 L199 44.5 Z" fill="#8DC63F" />
            <circle cx="195" cy="34" r="2.5" fill="#8DC63F" opacity="0.7" />
        </svg>
    );
}

export default function AboutPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-[#0d0f1a]">
            <Navbar />

            <main className="pt-24 pb-20">
                
                {/* ─── Universe Platform Content (Moved Here) ───────────────── */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex justify-center mb-6">
                            <UniverseLogo size={120} />
                        </div>
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
                            <Sparkles size={14} />
                            UniVerse&apos;s Flagship EdTech Product
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Uni</span>
                            <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">Verse</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
                            The all-in-one EdTech platform built for students, professionals, and institutions.
                        </p>
                    </div>
                </section>

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

                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Everything you need to{' '}
                                <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                    succeed
                                </span>
                            </h3>
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
                                            <div className="flex-1 space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-14 h-14 rounded-2xl ${cls.icon} ${cls.iconText} flex items-center justify-center flex-shrink-0`}>
                                                        <Icon size={28} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="text-2xl font-bold text-white">{product.name}</h4>
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
                                                    {product.features.map((f) => (
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
{/* ─── Hero Section ────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="text-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
                            <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">Our Story & Mission</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                            Empowering the Next Generation of <span className="gradient-text">Tech Leaders</span>
                        </h1>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
                            UniVerse is a hybrid product- and service-based technology startup focused on IT education,
                            software upskilling, and digital solutions. We bridge the gap between academic education
                            and industry requirements.
                        </p>
                    </div>
                </section>

              

                {/* ─── Call to Action ────────────────────────────────────────── */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#0f1120] py-16 rounded-[2.5rem] border border-white/5">
                    <h2 className="text-3xl font-bold text-white mb-6">Join Our Growing Community</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                        Whether you're a student looking to upskill, a college seeking workshops, or a startup needing
                        solutions — UniVerse is your destination.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                            Explore Courses <ArrowRight size={18} />
                        </Link>
                        <a href="mailto:kmunitech@gmail.com" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center">
                            Contact Us
                        </a>
                    </div>
                </section>

                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Why choose Universe?</h3>
                            <p className="text-slate-400 text-lg max-w-xl mx-auto">Built differently. Designed for real impact.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: Globe, title: 'All-in-One Ecosystem', desc: 'No switching between apps. Learning, networking, career growth - everything lives inside Universe.', color: 'blue' },
                                { icon: Zap, title: 'Blazing Fast Experience', desc: 'Lightweight, mobile-first design ensures smooth learning even on slow connections.', color: 'green' },
                                { icon: GraduationCap, title: 'Institution-Grade Quality', desc: 'Content reviewed by industry experts and academia. Trusted by 50+ partner organizations.', color: 'sky' },
                            ].map((item) => {
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
                                        <h4 className="text-white font-semibold text-lg mb-3">{item.title}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
 {/* ─── CEO & Founder Section ───────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="bg-gradient-to-br from-[#1a1c2e] to-[#0d0f1a] border border-white/5 rounded-[3rem] overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Image Column */}
                            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden">
                                <img
                                    src={`${baseUrl}assetskmuni/pradosh-km.png`}
                                    alt="K.M.Pradosh"
                                    className="w-full h-full object-cover object-top filter brightness-90 hover:brightness-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-10 left-10">
                                    <p className="text-white font-bold text-3xl">Pradosh K.M</p>
                                    <p className="text-blue-400 font-medium tracking-widest uppercase text-sm">Ideator</p>
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className="p-10 lg:p-20">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                                    Leading with <span className="gradient-text">Vision and Purpose</span>
                                </h2>
                                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                                    <p>
                                        K.M.Pradosh, the Ideator of UniVerse, established the organization with a
                                        singular goal: to create a world where education is synonymous with impact.
                                    </p>
                                    <p>
                                        With deep expertise in software engineering and digital transformation, K.M.Pradosh envisioned
                                        UniVerse as more than just an ed-tech platform. He built it as a hybrid ecosystem
                                        where practical skills meet social responsibility.
                                    </p>
                                    <p>
                                        Under his leadership, UniVerse has grown from a visionary startup to an MSME-approved
                                        entity serving individuals, institutions, and startups across India. His philosophy
                                        of "Empowering through Upskilling" continues to drive our innovation in every domain.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <a
                                        href="https://www.linkedin.com/in/pradhosh-km-1b7838342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        <Linkedin size={18} /> Connect with me
                                    </a>
                                </div>

                                <div className="mt-12 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                                        <Award className="text-blue-400" size={20} />
                                        <span className="text-white font-semibold text-sm">Tech Visionary</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                                        <Users className="text-green-400" size={20} />
                                        <span className="text-white font-semibold text-sm">Impact Leader</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                  {/* ─── Vision & Values ─────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#12141f] border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Target className="text-blue-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                To build a unified platform for learning, innovation, and impact across diverse technology domains.
                                "All Domains, One Destination – UniVerse."
                            </p>
                        </div>

                        <div className="bg-[#12141f] border border-white/5 p-8 rounded-[2rem] hover:border-green-500/30 transition-all">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen className="text-green-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Practical Learning</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We deliver hands-on, practical training in UI/UX, Blockchain, SQL, and emerging technologies
                                through live webinars and structured internships.
                            </p>
                        </div>

                        <div className="bg-[#12141f] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Heart className="text-emerald-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Social Impact</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Growth shouldn't just be about metrics. We donate a significant portion of our funds
                                to NGOs and food distribution for underprivileged communities.
                            </p>
                        </div>
                    </div>
                </section>

               
                {/* ─── Contact Section ────────────────────────────────────── */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Get in <span className="text-blue-400">Touch</span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Contact Information */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Mail className="text-blue-400" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">Email</h3>
                                            <p className="text-slate-400 text-sm">contact@kmunitech.com</p>
                                            <p className="text-slate-400 text-sm">support@kmunitech.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Phone className="text-blue-400" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">Phone</h3>
                                            <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
                                            <p className="text-slate-400 text-sm">Mon-Fri, 9AM-6PM EST</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="text-blue-400" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">Office</h3>
                                            <p className="text-slate-400 text-sm">123 Innovation Drive</p>
                                            <p className="text-slate-400 text-sm">Tech Valley, CA 94025</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MessageSquare className="text-blue-400" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">Live Chat</h3>
                                            <p className="text-slate-400 text-sm mb-2">Get instant support</p>
                                            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                                                Start Chat →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="How can we help?"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                                placeholder="Tell us more about your inquiry..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Send size={18} />
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
