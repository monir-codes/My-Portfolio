import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, BookOpen, Clock, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AllBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${import.meta.env.VITE_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/blogs`)
      .then(r => r.json())
      .then(d => {
        setBlogs(d);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedBlog(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Technical Blog | Md. Moniruzzaman - Fullstack Developer</title>
        <meta name="description" content="Read the latest articles on web development, MERN stack, React, and modern UI/UX design by Md. Moniruzzaman." />
      </Helmet>
      
      {/* Article Reading Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative my-auto max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-[#00FF00] hover:text-black rounded-full text-white backdrop-blur-md transition-all"
              >
                <X size={24} />
              </button>
              
              {/* Modal Cover Image */}
              {selectedBlog.image && (
                <div className="w-full h-64 md:h-80 shrink-0 relative">
                  <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                </div>
              )}
              
              <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-[#00FF00] mb-4">
                  <span className="px-3 py-1 bg-[#00FF00]/10 rounded-full">{selectedBlog.category || "General"}</span>
                  <span className="text-white/40 flex items-center gap-1.5"><Clock size={14} /> {selectedBlog.date}</span>
                  <span className="text-white/40 flex items-center gap-1.5"><BookOpen size={14} /> {selectedBlog.readTime}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 tracking-tight leading-tight">{selectedBlog.title}</h2>
                
                <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/70 prose-headings:text-white prose-a:text-[#00FF00]">
                  {/* Using whitespace-pre-wrap to respect line breaks from the textarea */}
                  <div className="whitespace-pre-wrap text-white/80 leading-relaxed font-medium">
                    {selectedBlog.content}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1, 2, 3].map(i => (
                 <div key={i} className="h-96 rounded-3xl bg-white/5 animate-pulse" />
               ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="py-20 text-center border border-white/10 rounded-3xl border-dashed">
               <h3 className="text-2xl font-bold mb-2">No articles published</h3>
               <p className="text-white/50">Check back later for exciting tech content.</p>
            </div>
          ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog, i) => (
                <motion.article
                  key={blog._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  onClick={() => setSelectedBlog(blog)}
                  className="group flex flex-col bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-[#00FF00]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,255,0,0.1)] cursor-pointer"
                >
                  {/* Image Section */}
                  <div className="h-[240px] overflow-hidden bg-black relative">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 bg-gradient-to-br from-white/5 to-transparent">No Cover Image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase font-bold tracking-widest text-[#00FF00]">
                      {blog.category || "General"}
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

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 gap-2">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 disabled:opacity-50 hover:bg-[#00FF00]/20 hover:text-[#00FF00] hover:border-[#00FF00]/50 transition-all font-bold disabled:hover:bg-white/5 disabled:hover:text-white disabled:hover:border-white/10"
                >
                  Prev
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border font-bold transition-all ${
                      currentPage === i + 1 
                        ? "bg-[#00FF00] text-black border-[#00FF00]" 
                        : "bg-white/5 border-white/10 text-white hover:border-[#00FF00]/50 hover:text-[#00FF00]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 disabled:opacity-50 hover:bg-[#00FF00]/20 hover:text-[#00FF00] hover:border-[#00FF00]/50 transition-all font-bold disabled:hover:bg-white/5 disabled:hover:text-white disabled:hover:border-white/10"
                >
                  Next
                </button>
              </div>
            )}
            </>
          )}

        </div>
      </motion.div>
    </>
  );
}
