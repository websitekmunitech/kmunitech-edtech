import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { GraduationCap, BookOpen, Users, Rocket, ArrowRight } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#0a0b14]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-blue-400">Products</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Innovative educational technology solutions designed to transform learning experiences
            </p>
          </div>

          {/* Main Product - Universe */}
          <div className="mb-16 bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-blue-500/30 rounded-3xl p-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/30 rounded-2xl mb-6">
                <GraduationCap className="text-blue-400" size={40} />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Universe <span className="text-blue-400">Platform</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                A comprehensive learning management system that brings together students, instructors, and institutions 
                in a unified ecosystem designed for the modern educational experience.
              </p>
              
              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left">
                  <BookOpen className="text-blue-400 mb-3" size={28} />
                  <h3 className="text-white font-semibold mb-2">Course Management</h3>
                  <p className="text-slate-400 text-sm">
                    Create, manage, and deliver engaging courses with intuitive tools and rich content options.
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left">
                  <Rocket className="text-green-400 mb-3" size={28} />
                  <h3 className="text-white font-semibold mb-2">Self-Learn Modules</h3>
                  <p className="text-slate-400 text-sm">
                    Interactive self-paced learning paths across HTML, CSS, JavaScript, Python, SQL, and more.
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left">
                  <Users className="text-green-400 mb-3" size={28} />
                  <h3 className="text-white font-semibold mb-2">UniSpace Community</h3>
                  <p className="text-slate-400 text-sm">
                    Connect with peers, share knowledge, and collaborate on projects in a vibrant learning community.
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left">
                  <GraduationCap className="text-yellow-400 mb-3" size={28} />
                  <h3 className="text-white font-semibold mb-2">Unilink Events</h3>
                  <p className="text-slate-400 text-sm">
                    Career fairs, networking events, and industry connections to bridge academia with opportunity.
                  </p>
                </div>
              </div>

              <Link 
                to="/courses" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                Explore Universe
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-slate-400 mb-8">More innovative products in development</p>
          </div>

          {/* Future Products */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                Q3 2026
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Universe Mobile</h3>
              <p className="text-slate-400 mb-4">
                Learn anywhere, anytime with our native mobile applications for iOS and Android.
              </p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>
                  Offline course access
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>
                  Push notifications for updates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>
                  Seamless sync across devices
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                Q4 2026
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Universe Enterprise</h3>
              <p className="text-slate-400 mb-4">
                Custom white-label solutions for organizations with advanced features and dedicated support.
              </p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"/>
                  Custom branding and domains
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"/>
                  Advanced analytics and reporting
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"/>
                  SSO and enterprise integrations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
