import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Loader2, Award, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AllCertificates() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const apiUrl = import.meta.env.VITE_API_URL || "https://portfolio-server-ten-fawn.vercel.app";
    fetch(`${apiUrl}/api/certificates`)
      .then((res) => res.json())
      .then((data) => {
        setCertificates([...data].reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCertificates = certificates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(certificates.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>All Certificates | Moniruzzaman Rumman - Fullstack Developer</title>
        <meta name="description" content="Explore the professional certifications and achievements of Moniruzzaman Rumman." />
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
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-emerald-500">Certificates</span>
            </h1>
            <p className="text-white/60 max-w-2xl text-base md:text-lg">
              A collection of my professional achievements, awards, and continuous learning milestones in the tech industry.
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 className="w-12 h-12 text-[#00FF00] animate-spin" />
            </div>
          ) : certificates.length === 0 ? (
            <div className="py-32 text-center bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed">
              <Award className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No certificates found</h3>
              <p className="text-white/50">Check back later for updates.</p>
            </div>
          ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCertificates.map((cert: any, i: number) => (
                <motion.div
                  key={cert._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-[#00FF00]/40 transition-all hover:shadow-[0_10px_30px_rgba(0,255,0,0.1)] hover:-translate-y-2 flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Certificate Image or Gradient Graphic */}
                  <div className="aspect-[16/9] overflow-hidden bg-[#111] p-6 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    {cert.image ? (
                      <img 
                        src={cert.image} 
                        alt={cert.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative z-10 rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full border-2 border-white/10 rounded-xl relative overflow-hidden group-hover:scale-105 transition-transform duration-700 bg-gradient-to-br from-black to-white/5 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                        <div className="w-16 h-16 rounded-full bg-[#00FF00]/10 flex items-center justify-center mb-4 border border-[#00FF00]/30 shadow-[0_0_15px_rgba(0,255,0,0.2)]">
                          <Award className="text-[#00FF00]" size={28} />
                        </div>
                        <h3 className="text-xl font-black mb-2 tracking-tight text-white/90 line-clamp-2">{cert.title}</h3>
                        <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{cert.issuer}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Content details */}
                  <div className="p-6 md:p-8 relative z-10 bg-black/40 border-t border-white/5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-[#00FF00] transition-colors">{cert.title}</h4>
                      <p className="text-[#00FF00] text-xs font-bold uppercase tracking-widest">{cert.issuer} • {cert.date}</p>
                    </div>
                    
                    {cert.link && (
                      <button
                        onClick={() => window.open(cert.link, "_blank")}
                        className="mt-6 self-start flex items-center gap-2 p-3 bg-white/10 rounded-xl hover:bg-[#00FF00] hover:text-black transition-all text-sm font-bold uppercase tracking-widest"
                      >
                        View Credential <ExternalLink size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
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
      </div>
    </>
  );
}
