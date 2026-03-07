import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { CheckCircle, Circle, Clock } from 'lucide-react';

export default function RoadmapPage() {
  const roadmapItems = [
    {
      quarter: 'Q1 2026',
      status: 'completed',
      items: [
        { title: 'Universe Platform Launch', description: 'Complete overhaul of the learning management system with enhanced UI/UX' },
        { title: 'Self-Learn Module', description: 'Interactive self-paced learning paths across multiple domains' },
        { title: 'UniSpace Social Connect', description: 'Community platform for students, instructors, and professionals' }
      ]
    },
    {
      quarter: 'Q2 2026',
      status: 'in-progress',
      items: [
        { title: 'AI-Powered Recommendations', description: 'Personalized course and content suggestions based on learning patterns' },
        { title: 'Mobile App Release', description: 'Native iOS and Android applications for learning on-the-go' },
        { title: 'Advanced Analytics Dashboard', description: 'Comprehensive insights for instructors and administrators' }
      ]
    },
    {
      quarter: 'Q3 2026',
      status: 'planned',
      items: [
        { title: 'Virtual Labs Integration', description: 'Hands-on coding environments and simulation tools' },
        { title: 'Gamification System', description: 'Points, badges, and leaderboards to increase engagement' },
        { title: 'Multi-language Support', description: 'Platform available in 10+ languages' }
      ]
    },
    {
      quarter: 'Q4 2026',
      status: 'planned',
      items: [
        { title: 'Enterprise Solutions', description: 'Custom white-label solutions for large organizations' },
        { title: 'AR/VR Learning Experiences', description: 'Immersive learning modules for select courses' },
        { title: 'Blockchain Certifications', description: 'Verifiable, tamper-proof digital credentials' }
      ]
    },
    {
      quarter: '2027 & Beyond',
      status: 'future',
      items: [
        { title: 'Global Partnerships', description: 'Collaborations with top universities and corporations worldwide' },
        { title: 'AI Teaching Assistants', description: '24/7 intelligent tutoring and support' },
        { title: 'Adaptive Learning AI', description: 'Dynamic curriculum that adapts to individual learning styles' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-400" size={28} />;
      case 'in-progress':
        return <Clock className="text-yellow-400" size={28} />;
      default:
        return <Circle className="text-slate-500" size={28} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/30 bg-green-500/10';
      case 'in-progress':
        return 'border-yellow-500/30 bg-yellow-500/10';
      default:
        return 'border-white/10 bg-white/5';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Product <span className="text-indigo-400">Roadmap</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our journey to transform education through technology
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 justify-center mb-12 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={20} />
              <span className="text-slate-300 text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-yellow-400" size={20} />
              <span className="text-slate-300 text-sm">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="text-slate-500" size={20} />
              <span className="text-slate-300 text-sm">Planned</span>
            </div>
          </div>

          {/* Roadmap Timeline */}
          <div className="space-y-8">
            {roadmapItems.map((phase, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < roadmapItems.length - 1 && (
                  <div className="absolute left-[13px] top-16 bottom-0 w-0.5 bg-white/10"></div>
                )}
                
                <div className={`border rounded-2xl p-6 ${getStatusColor(phase.status)}`}>
                  <div className="flex items-start gap-4 mb-6">
                    {getStatusIcon(phase.status)}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{phase.quarter}</h3>
                      <p className="text-sm text-slate-400 capitalize">{phase.status.replace('-', ' ')}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 ml-11">
                    {phase.items.map((item, idx) => (
                      <div key={idx} className="border-l-2 border-indigo-500/30 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-slate-400 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6">
            <p className="text-slate-300">
              <span className="font-semibold text-white">Note:</span> This roadmap is subject to change based on user feedback, 
              market demands, and technological advancements. We're committed to continuous improvement and innovation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
