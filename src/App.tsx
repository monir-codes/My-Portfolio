/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Layers,
  Cpu,
  Globe,
  MessageSquare,
  ChevronRight,
  Menu,
  X,
  Terminal,
  Server,
  Layout,
  Figma,
  GitBranch,
  Cloud,
  PenTool,
  Wind,
  Zap,
  Search,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { useInView } from "react-intersection-observer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CountUp from "react-countup";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="bg-mesh" />
      <div className="bg-grid absolute inset-0 opacity-20" />
      <div className="scanline" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black" />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Smooth Scroll Function
  const handleMobileClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Menu bondho hobe

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem) {
      // Alpo somoy wait kora bhalo jno menu close animation shuru hote pare
      setTimeout(() => {
        elem.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          MONIR<span className="text-[#00FF00]">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium hover:text-[#00FF00] transition-colors uppercase tracking-widest"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleMobileClick(e, link.href)} // Function call add kora hoyeche
                  className="text-lg font-medium hover:text-[#00FF00] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const redirectToGithub = () => {
    window.open(
      "https://github.com/monir-codes",
      "_blank",
      "noopener,noreferrer",
    );
  };
  const redirectToLinkedin = () => {
    window.open(
      "https://www.linkedin.com/in/moniruzzaman-rumman/",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const redirectToMail = () => {
    window.location.href = "mailto:moniruzzamanrumman@gmail.com";
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#00FF00]/30 rounded-full text-[#00FF00] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-8 bg-[#00FF00]/5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF00]"></span>
            </span>
            MERN Stack Specialist
          </motion.div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-8 text-white">
            MD. MONIR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] via-emerald-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,255,0,0.3)]">
              UZZAMAN
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-lg mx-auto lg:mx-0 mb-10 font-light leading-relaxed">
            Professional{" "}
            <span className="text-[#00FF00] font-semibold">
              MERN Stack Developer
            </span>
            . I build high-performance web applications with modern architecture
            and exceptional user interfaces.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(0,255,0,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(
                  "https://github.com/monir-codes?tab=repositories",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              className="px-10 py-4 bg-[#00FF00] text-black font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-shadow"
            >
              View Projects <ChevronRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => redirectToMail()}
              className="px-10 py-4 border border-white/20 font-bold uppercase tracking-widest rounded-xl flex items-center justify-center backdrop-blur-md"
            >
              Contact Me
            </motion.button>
          </div>

          <div className="mt-14 flex gap-8 text-white/40 justify-center lg:justify-start">
            <Github
              onClick={() => redirectToGithub()}
              className="hover:text-[#00FF00] cursor-pointer transition-all hover:scale-110"
            />
            <Linkedin
              onClick={() => redirectToLinkedin()}
              className="hover:text-[#00FF00] cursor-pointer transition-all hover:scale-110"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ y }}
          className="relative order-1 lg:order-2 mb-12 lg:mb-0"
        >
          <div className="relative w-full aspect-square max-w-[280px] sm:max-w-md mx-auto">
            {/* Profile Picture Placeholder */}
            <div className="absolute inset-0 border-2 border-[#00FF00]/20 rounded-full rotate-6 animate-float" />
            <div className="absolute inset-0 border-2 border-white/10 rounded-full -rotate-3 animate-float delay-700" />
            <div className="absolute inset-4 bg-gradient-to-br from-[#00FF00]/20 to-blue-500/20 rounded-full overflow-hidden backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,0,0.15)]">
              <img
                src="https://i.postimg.cc/fLZwBwzf/Picsart-26-01-27-17-04-44-604.jpg"
                alt="MD. Moniruzzaman"
                className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating Tech Badges */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-0 -right-4 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl z-20"
            >
              <Layout className="text-[#00FF00]" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute bottom-10 -left-8 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl z-20"
            >
              <Database className="text-blue-400" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute top-1/2 -left-12 p-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl z-20"
            >
              <Code2 className="text-emerald-400" size={20} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Crafting Digital <br />
              <span className="italic font-display text-[#00FF00] text-shadow-glow">
                Experiences
              </span>
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Hello! I'm{" "}
                <span className="text-white font-bold">MD. Moniruzzaman</span>,
                a dedicated MERN Stack Developer with a passion for building
                robust and user-centric web applications. With expertise in
                MongoDB, Express.js, React, and Node.js, I bridge the gap
                between complex backend logic and intuitive frontend design.
              </p>
              <p>
                My journey in tech is driven by a constant desire to learn and
                implement the latest industry standards. I don't just write
                code; I architect solutions that solve real-world problems and
                provide seamless user experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-4xl font-bold text-[#00FF00]">
                  {inView && <CountUp end={3} duration={2} />}+
                </h4>
                <p className="text-sm text-white/50 uppercase tracking-widest">
                  Years Experience
                </p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-[#00FF00]">
                  {inView && <CountUp end={50} duration={2} />}+
                </h4>
                <p className="text-sm text-white/50 uppercase tracking-widest">
                  Projects Completed
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              {
                icon: <Terminal />,
                title: "Clean Code",
                desc: "Maintainable & readable",
              },
              { icon: <Cpu />, title: "Performance", desc: "Optimized speed" },
              {
                icon: <Layers />,
                title: "Scalability",
                desc: "Built for growth",
              },
              {
                icon: <Globe />,
                title: "SEO Friendly",
                desc: "Search optimized",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 md:p-8 bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-[#00FF00]/30 transition-all group"
              >
                <div className="text-[#00FF00] mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: "React.js", level: 95, icon: <Layout className="text-cyan-400" /> },
    { name: "Node.js", level: 90, icon: <Server className="text-green-500" /> },
    {
      name: "MongoDB",
      level: 95,
      icon: <Database className="text-emerald-600" />,
    },
    {
      name: "Express.js",
      level: 88,
      icon: <Terminal className="text-white" />,
    },
    {
      name: "TypeScript",
      level: 85,
      icon: <Code2 className="text-blue-500" />,
    },
    { name: "Tailwind", level: 98, icon: <Wind className="text-sky-400" /> },
    { name: "Framer", level: 90, icon: <Zap className="text-purple-400" /> },
    { name: "Swiper", level: 92, icon: <Layers className="text-indigo-500" /> },
    {
      name: "Firebase",
      level: 89,
      icon: <Cloud className="text-orange-500" />,
    },
    { name: "GitHub", level: 92, icon: <Github className="text-white" /> },
    { name: "Git", level: 90, icon: <GitBranch className="text-red-500" /> },
    { name: "WordPress", level: 63, icon: <Globe className="text-blue-600" /> },
    { name: "SEO", level: 80, icon: <Search className="text-yellow-500" /> },
    { name: "AI", level: 92, icon: <Cpu className="text-pink-500" /> },
    { name: "Figma", level: 85, icon: <Figma className="text-purple-500" /> },
    { name: "Canva", level: 80, icon: <PenTool className="text-blue-400" /> },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical Arsenal
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            The technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl relative group overflow-hidden hover:bg-[#00FF00]/5 transition-colors"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                {React.cloneElement(skill.icon as React.ReactElement, {
                  size: 80,
                })}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black rounded-xl border border-white/10">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold">{skill.name}</h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Proficiency</span>
                  <span className="text-[#00FF00]">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#00FF00] to-emerald-400"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // State for Modal

  useEffect(() => {
    fetch("https://portfolio-server-ten-fawn.vercel.app/api/my-projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const redirectToRepo = () => {
    window.open(
      "https://github.com/monir-codes?tab=repositories",
      "_blank",
      "noopener,noreferrer",
    );
  };

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
    <section id="projects" className="py-24 relative text-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Featured Work
            </h2>
            <p className="text-white/50 max-w-xl">
              A selection of my recent projects where I've pushed the boundaries
              of web development.
            </p>
          </div>
          <button
            onClick={redirectToRepo}
            className="px-6 py-3 border border-white/20 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            View All Projects
          </button>
        </div>

        {/* Swiper Section */}
        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 2.5 },
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="pb-20"
        >
          {projects.map((project, i) => (
            <SwiperSlide key={i} className="max-w-3xl">
              <div
                onClick={() => setSelectedProject(project)} // Open Modal on Click
                className="group cursor-pointer relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 transition-all hover:border-white/20"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0 mr-4">
                      <span className="text-[#00FF00] text-xs font-bold uppercase tracking-widest mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold truncate">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            project.live,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        className="p-2 bg-white/10 rounded-full hover:bg-[#00FF00] hover:text-black transition-colors"
                      >
                        <Github size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            project.repo,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        className="p-2 bg-white/10 rounded-full hover:bg-[#00FF00] hover:text-black transition-colors"
                      >
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </div>

                  <p className="text-white/60 mb-6 leading-relaxed line-clamp-2">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-black border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-wider text-white/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
            <div className="w-full md:w-[380px] flex flex-col bg-[#111] border-b md:border-b-0 md:border-r border-white/10 shrink-0 h-[45%] md:h-full">
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
                  {selectedProject.tech.map((t) => (
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
    </section>
  );
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "success">(
    "idle",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    const SERVICE_ID = "service_ekwd70a";
    const TEMPLATE_ID = "template_m8ohl45";
    const PUBLIC_KEY = "OfHiEz9mLrL1ao1U1";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY)
      .then(
        (result) => {
          setFormState("success");
          toast.success("Message sent successfully! 🚀", {
            style: {
              background: "#111",
              color: "#00FF00",
              border: "1px solid #333",
            },
          });
          formRef.current?.reset();
        },
        (error) => {
          setFormState("idle");
          toast.error("Failed to send message. Please try again.", {
            style: {
              background: "#111",
              color: "#FF4B4B",
              border: "1px solid #333",
            },
          });
        },
      );
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* 2. Toaster component-ti ekhane add korun jeno toast dekhate pare */}
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl p-6 sm:p-10 md:p-16 lg:p-20 rounded-[30px] md:rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden lg:block">
            <MessageSquare size={300} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
            {/* Left Side: Info */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tighter leading-tight text-center lg:text-left">
                Let's build <br className="hidden sm:block" />
                something{" "}
                <span className="text-[#00FF00] drop-shadow-[0_0_10px_rgba(0,255,0,0.3)]">
                  great
                </span>
                .
              </h2>
              <p className="text-white/60 text-base sm:text-lg mb-10 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                Have a project in mind? Reach out and I'll get back to you
                within 24 hours.
              </p>

              <div className="space-y-6 max-w-sm mx-auto lg:mx-0">
                <a
                  href="mailto:monir.webdev@gmail.com"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[#00FF00]/10 rounded-2xl flex items-center justify-center text-[#00FF00] group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-bold">
                      Email Me
                    </p>
                    <p className="text-sm sm:text-lg font-medium text-white/90">
                      monir.webdev@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="bg-black/30 p-5 sm:p-8 rounded-2xl border border-white/5">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-16 h-16 bg-[#00FF00]/20 rounded-full flex items-center justify-center text-[#00FF00] mb-6">
                      <ChevronRight size={40} className="rotate-[-90deg]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-white/60 mb-8">Talk to you soon!</p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="text-[#00FF00] font-bold uppercase text-xs hover:underline"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/40 ml-1">
                          Full Name
                        </label>
                        <input
                          name="from_name"
                          required
                          type="text"
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-[#00FF00] outline-none transition-all placeholder:text-white/20 text-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/40 ml-1">
                          Email
                        </label>
                        <input
                          name="reply_to"
                          required
                          type="email"
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-[#00FF00] outline-none transition-all placeholder:text-white/20 text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1">
                        Subject
                      </label>
                      <input
                        name="subject"
                        required
                        type="text"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-[#00FF00] outline-none transition-all placeholder:text-white/20 text-white"
                        placeholder="Project Inquiry"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-white/40 ml-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-[#00FF00] outline-none transition-all resize-none placeholder:text-white/20 text-white"
                        placeholder="Tell me about your project..."
                      ></textarea>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      disabled={formState === "sending"}
                      className="w-full py-4 bg-[#00FF00] text-black font-bold uppercase text-xs rounded-xl shadow-[0_0_20px_rgba(0,255,0,0.2)] disabled:opacity-50"
                    >
                      {formState === "sending" ? "Sending..." : "Send Message"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const redirectToGithub = () => {
    window.open(
      "https://github.com/monir-codes",
      "_blank",
      "noopener,noreferrer",
    );
  };
  const redirectToLinkedin = () => {
    window.open(
      "https://www.linkedin.com/in/moniruzzaman-rumman/",
      "_blank",
      "noopener,noreferrer",
    );
  };
  const redirectToMail = () => {
    window.location.href = "mailto:monir.webdev@gmail.com";
  };
  return (
    <footer className="py-12 border-t border-white/5 relative">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-bold tracking-tighter">
          MONIR<span className="text-[#00FF00]">.</span>
        </div>

        <p className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} MD. Moniruzzaman. All rights
          reserved.
        </p>

        <div className="flex gap-6 text-white/40">
          {/* Button diye wrap kora holo */}
          <button
            onClick={redirectToGithub}
            className="hover:text-[#00FF00] cursor-pointer transition-colors outline-none"
            aria-label="GitHub"
          >
            <Github size={20} />
          </button>

          <button
            onClick={() => redirectToLinkedin()}
            className="hover:text-[#00FF00] cursor-pointer transition-colors outline-none"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </button>
          <button
            onClick={() => redirectToMail()}
            className="hover:text-[#00FF00] cursor-pointer transition-colors outline-none"
            aria-label="LinkedIn"
          >
            <Mail size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-[90] p-4 bg-[#00FF00] text-black rounded-full shadow-[0_0_20px_rgba(0,255,0,0.4)] hover:scale-110 transition-transform"
        >
          <ChevronRight size={24} className="-rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative bg-[#030303]">
      <Background3D />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#00FF00] origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />

      {/* Custom Cursor */}
      <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
        <motion.div
          className="w-8 h-8 border border-[#00FF00]/50 rounded-full absolute"
          animate={{
            x: -16,
            y: -16,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 150 }}
        />
      </div>
    </div>
  );
}
