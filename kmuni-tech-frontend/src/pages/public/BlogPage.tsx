import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const blogPosts = [
    {
      title: 'The Future of EdTech: Trends Shaping 2026',
      excerpt: 'Explore the latest trends in educational technology and how they are transforming the learning landscape.',
      author: 'UniVerse Team',
      date: 'March 5, 2026',
      category: 'Industry Insights',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop'
    },
    {
      title: 'Building a Culture of Continuous Learning',
      excerpt: 'How organizations can foster an environment that encourages ongoing skill development and growth.',
      author: 'Sarah Johnson',
      date: 'March 1, 2026',
      category: 'Best Practices',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop'
    },
    {
      title: 'AI in Education: Opportunities and Challenges',
      excerpt: 'A deep dive into how artificial intelligence is revolutionizing personalized learning experiences.',
      author: 'Dr. Michael Chen',
      date: 'February 28, 2026',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop'
    },
    {
      title: 'Bridging the Skills Gap with Industry Partnerships',
      excerpt: 'Learn how academia and industry collaboration can prepare students for real-world challenges.',
      author: 'Emily Rodriguez',
      date: 'February 25, 2026',
      category: 'Partnerships',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop'
    },
    {
      title: 'The Rise of Micro-Learning and Skill-Based Education',
      excerpt: 'Why bite-sized, focused learning modules are becoming the preferred choice for modern learners.',
      author: 'James Wilson',
      date: 'February 20, 2026',
      category: 'Learning Design',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop'
    },
    {
      title: 'Creating Inclusive Learning Environments',
      excerpt: 'Strategies for ensuring accessibility and equity in digital education platforms.',
      author: 'Lisa Martinez',
      date: 'February 15, 2026',
      category: 'Accessibility',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop'
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
              Blog & <span className="text-blue-400">Insights</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Exploring the latest trends, best practices, and innovations in educational technology
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-blue-400 font-semibold mb-3 uppercase tracking-wide">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 text-white px-8 py-3 rounded-xl font-medium transition-all">
              Load More Articles
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
