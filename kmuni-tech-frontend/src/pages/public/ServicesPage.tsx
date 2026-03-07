import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { GraduationCap, Users, Code, Briefcase, BookOpen, Award } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: GraduationCap,
      title: 'Educational Platform Solutions',
      description: 'Comprehensive learning management systems tailored for educational institutions, featuring course management, student tracking, and analytics.',
      features: ['Custom LMS Development', 'Student Portal Integration', 'Assessment Tools', 'Analytics Dashboard']
    },
    {
      icon: Users,
      title: 'Corporate Training Programs',
      description: 'Customized training solutions for organizations looking to upskill their workforce with the latest technologies and industry practices.',
      features: ['Technical Training', 'Leadership Development', 'Certification Programs', 'On-site & Remote Training']
    },
    {
      icon: Code,
      title: 'Technology Consulting',
      description: 'Expert guidance on implementing educational technology solutions that align with your organizational goals and enhance learning outcomes.',
      features: ['Technology Assessment', 'Implementation Strategy', 'System Integration', 'Ongoing Support']
    },
    {
      icon: Briefcase,
      title: 'Industry-Academia Partnerships',
      description: 'Bridging the gap between academic learning and industry requirements through collaborative programs and real-world project exposure.',
      features: ['Internship Programs', 'Industry Projects', 'Guest Lectures', 'Career Guidance']
    },
    {
      icon: BookOpen,
      title: 'Content Development',
      description: 'High-quality educational content creation including courses, tutorials, documentation, and interactive learning materials.',
      features: ['Course Design', 'Video Production', 'Interactive Labs', 'Assessment Creation']
    },
    {
      icon: Award,
      title: 'Certification Services',
      description: 'Professional certification programs that validate skills and knowledge, recognized by industry leaders and employers.',
      features: ['Skill Certifications', 'Progress Tracking', 'Digital Badges', 'Industry Recognition']
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-blue-400">Services</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive solutions for education, training, and technology transformation
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="text-blue-400" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Learning Experience?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Get in touch with our team to discuss how we can help you achieve your educational and training goals.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
