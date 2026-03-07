import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Target, Eye, Lightbulb, Rocket } from 'lucide-react';

export default function VisionMissionPage() {
  return (
    <div className="min-h-screen bg-[#0a0b14]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vision & <span className="text-indigo-400">Mission</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Driving innovation and empowering the next generation of tech leaders
            </p>
          </div>

          {/* Vision Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Eye className="text-indigo-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                To be the leading force in transforming education through technology, creating a world where quality learning 
                is accessible to everyone, everywhere. We envision a future where innovative educational solutions bridge 
                gaps, unlock potential, and empower individuals to shape their own success stories.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Target className="text-purple-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                KM UniTech is dedicated to revolutionizing the educational landscape by delivering cutting-edge technology 
                solutions that make learning engaging, effective, and accessible to all. We strive to:
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Develop innovative educational platforms that adapt to individual learning styles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Foster communities of learners, educators, and industry professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Bridge the gap between academic knowledge and real-world industry requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Empower institutions with tools to deliver exceptional learning experiences</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-12">Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="text-yellow-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Innovation</h3>
                </div>
                <p className="text-slate-400">
                  We continuously push boundaries, embracing new technologies and creative solutions to transform education.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="text-indigo-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Excellence</h3>
                </div>
                <p className="text-slate-400">
                  We are committed to delivering the highest quality products and services that exceed expectations.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="text-green-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Accessibility</h3>
                </div>
                <p className="text-slate-400">
                  Education should be available to everyone, regardless of location, background, or circumstances.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="text-blue-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Integrity</h3>
                </div>
                <p className="text-slate-400">
                  We operate with transparency, honesty, and ethical practices in everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
