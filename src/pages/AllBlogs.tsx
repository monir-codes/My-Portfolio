import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MOCK_BLOGS = [
  {
    id: 1,
    title: "Mastering the MERN Stack: A Complete Guide",
    excerpt: "Learn how to build scalable and high-performance web applications using MongoDB, Express.js, React, and Node.js from scratch.",
    date: "Aug 15, 2026",
    readTime: "8 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 2,
    title: "Why React is the Future of Frontend UI",
    excerpt: "An in-depth analysis of why React continues to dominate the frontend ecosystem and how it has evolved with Server Components.",
    date: "Sep 02, 2026",
    readTime: "6 min read",
    category: "React",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: "Advanced Tailwind CSS Techniques",
    excerpt: "Move beyond basic utility classes. Learn how to build a scalable design system using Tailwind CSS, CSS variables, and plugins.",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000&auto=format&fit=crop",
    link: "#"
  }
];

export default function AllBlogs() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Technical Blog | Md. Moniruzzaman - Fullstack Developer</title>
        <meta name="description" content="Read the latest articles on web development, MERN stack, React, and modern UI/UX design by Md. Moniruzzaman." />
      </Helmet>
      
      {/* Framer Motion page wrapper for transitions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="min-h-screen pt-32 pb-24 px-8 md:px-10 lg:px-24 xl:px-32 relative text-white"
      >
        <div className="container mx-auto max-w-7xl relative z-10">
          
          {/* Header */}
          <div className="mb-16">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/50 hover:text-[#00FF00] transition-colors mb-6 font-bold uppercase tracking-widest text-xs"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-white">
              Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-emerald-500">Articles</span>
            </h1>
            <p className="text-white/60 max-w-2xl text-base md:text-lg">
              Thoughts, tutorials, and insights on web development, software engineering, and the tech industry.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_BLOGS.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex flex-col bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-[#00FF00]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,255,0,0.1)]"
              >
                {/* Image Section */}
                <div className="h-[240px] overflow-hidden bg-black relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase font-bold tracking-widest text-[#00FF00]">
                    {blog.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-transparent to-black/20">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><BookOpen size={14} /> {blog.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[#00FF00] transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                    {blog.excerpt}
                  </p>
                  
                  <button className="flex items-center gap-2 text-[#00FF00] font-bold text-sm uppercase tracking-widest group/btn mt-auto">
                    Read Article 
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </motion.div>
    </>
  );
}
