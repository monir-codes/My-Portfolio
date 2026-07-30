import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Github, ArrowLeft, Loader2, FolderKanban, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null); // State for Modal
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-server-ten-fawn.vercel.app";
    fetch(`${apiUrl}/api/my-projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects([...data].reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Add this to prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <>
      <Helmet>
        <title>All Projects | Moniruzzaman Rumman - Fullstack Developer</title>
        <meta name="description" content="Explore the full portfolio of projects built by Moniruzzaman Rumman, the best MERN stack developer. Discover my work in React, Node.js, and modern web applications." />
      </Helmet>
      <div className="min-h-screen pt-32 pb-24 px-8 md:px-10 lg:px-24 xl:px-32 relative text-white">
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
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-emerald-500">Projects</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-base md:text-lg">
            A comprehensive list of my work, ranging from full-stack web applications to UI/UX designs and modern frontend experiences.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-12 h-12 text-[#00FF00] animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="py-32 text-center bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed">
            <FolderKanban className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-white/50">Check back later for updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project: any, i: number) => (
              <motion.div
                key={project._id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setSelectedProject(project)}
                className="group w-full h-[450px] flex flex-col relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 transition-all cursor-pointer hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,255,0,0.1)] hover:-translate-y-2"
              >
                <div className="h-[220px] overflow-hidden bg-black relative shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase font-bold tracking-widest text-[#00FF00]">
                    {project.category || "Project"}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-black/40 to-transparent">
                  <h3 className="text-xl font-bold truncate group-hover:text-[#00FF00] transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech?.slice(0, 3).map((t: string) => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] uppercase font-bold tracking-wider text-white/40">
                        {t}
                      </span>
                    ))}
                    {project.tech?.length > 3 && (
                      <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] uppercase font-bold tracking-wider text-white/40">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- REFINED PROFESSIONAL MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop blur overlay */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Content */}
          <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-6xl h-[90vh] md:h-[85vh] overflow-hidden rounded-[2rem] shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 border border-white/10 rounded-full transition-all active:scale-90"
            >
              <X size={20} />
            </button>

            {/* === LEFT SIDE (Sidebar) === */}
            <div className="w-full md:w-[320px] lg:w-[380px] flex flex-col bg-[#111] border-b md:border-b-0 md:border-r border-white/10 shrink-0 h-[45%] md:h-full">
              {/* 1. Fixed Image Part */}
              <div className="p-6 md:p-10 pb-4 shrink-0">
                <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 2. Scrollable Tech Stacks Part */}
              <div className="flex-1 overflow-y-auto px-6 md:px-10 py-2 custom-scrollbar">
                <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#00FF00] font-bold mb-4 opacity-80 sticky top-0 bg-[#111] py-1">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2 pb-4">
                  {selectedProject.tech.map((t: string) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-semibold text-white/40 uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Fixed Buttons (Desktop Only) */}
              <div className="hidden md:flex p-8 border-t border-white/5 mt-auto bg-[#111] shrink-0">
                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={() => window.open(selectedProject.live, "_blank")}
                    className="w-full flex justify-center items-center gap-3 py-4 bg-[#00FF00] text-black font-bold rounded-xl hover:brightness-90 transition-all active:scale-[0.98]"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </button>
                  <button
                    onClick={() => window.open(selectedProject.repo, "_blank")}
                    className="w-full flex justify-center items-center gap-3 py-4 bg-white/5 border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-all active:scale-[0.98]"
                  >
                    <Github size={18} /> Source Code
                  </button>
                </div>
              </div>
            </div>

            {/* === RIGHT SIDE (Description) === */}
            <div className="flex-1 flex flex-col min-h-0 h-[55%] md:h-full bg-gradient-to-b from-transparent to-white/[0.02]">
              {/* Scrollable Text Box */}
              <div className="flex-1 overflow-y-auto p-6 md:p-14 custom-scrollbar">
                <div className="max-w-3xl">
                  <span className="text-white/30 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block">
                    Project Case Study
                  </span>
                  <h3 className="text-2xl md:text-5xl font-bold mb-6 md:mb-10 tracking-tight text-white leading-tight">
                    {selectedProject.title}
                  </h3>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/60 text-sm md:text-lg leading-[1.8] font-light whitespace-pre-line">
                      {selectedProject.desc}
                    </p>
                  </div>
                  <div className="h-10 md:h-20" />
                </div>
              </div>

              {/* Mobile Fixed Buttons Section */}
              <div className="md:hidden p-5 bg-[#0a0a0a] border-t border-white/10 shrink-0 shadow-2xl">
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(selectedProject.live, "_blank")}
                    className="flex-1 flex justify-center items-center gap-2 py-3.5 bg-[#00FF00] text-black text-sm font-bold rounded-xl active:scale-[0.98]"
                  >
                    <ExternalLink size={16} /> Live
                  </button>
                  <button
                    onClick={() => window.open(selectedProject.repo, "_blank")}
                    className="flex-1 flex justify-center items-center gap-2 py-3.5 bg-white/5 border border-white/10 text-sm font-bold rounded-xl active:scale-[0.98]"
                  >
                    <Github size={16} /> Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
