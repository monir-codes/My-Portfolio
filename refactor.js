const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Replace Projects state and functions
code = code.replace(
  /const redirectToRepo = \(\) => \{[\s\S]*?\};/,
  `const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const redirectToAllProjects = () => {
    navigate('/projects');
  };

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };`
);

// 2. Remove swiper style
code = code.replace(
  /<style>\{`[\s\S]*?`\}<\/style>/,
  ''
);

// 3. Replace onClick button
code = code.replace(
  /onClick={redirectToRepo}/,
  'onClick={redirectToAllProjects}'
);

// 4. Replace Swiper component with Custom Scroll
const swiperRegex = /<Swiper[\s\S]*?<\/Swiper>/;
const customScroll = `
        <div className="relative group/scroll">
          <button 
            onClick={scrollLeft}
            className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 border border-white/20 rounded-full text-white backdrop-blur-md opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-[#00FF00] hover:text-black hover:border-transparent hidden sm:block shadow-xl"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 border border-white/20 rounded-full text-white backdrop-blur-md opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-[#00FF00] hover:text-black hover:border-transparent hidden sm:block shadow-xl"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory hide-scrollbar relative z-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project: any, i: number) => (
              <div 
                key={i} 
                className="snap-center shrink-0 w-[85vw] sm:w-[400px] lg:w-[450px]"
              >
                <div
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
                </div>
              </div>
            ))}
          </div>
        </div>
`;
code = code.replace(swiperRegex, customScroll);

// 5. Replace App with Home and routing
const appRegex = /export default function App\(\) \{[\s\S]*?return \([\s\S]*?<div className="relative bg-\[#030303\]">[\s\S]*?<Background3D \/>[\s\S]*?\{\/\* Progress Bar \*\/\}[\s\S]*?<motion\.div[\s\S]*?\/>[\s\S]*?<Navbar \/>[\s\S]*?<main>[\s\S]*?<Hero \/>[\s\S]*?<About \/>[\s\S]*?<Skills \/>[\s\S]*?<Experience \/>[\s\S]*?<Projects \/>[\s\S]*?<Certificates \/>[\s\S]*?<Contact \/>[\s\S]*?<\/main>[\s\S]*?<Footer \/>[\s\S]*?<ScrollToTop \/>[\s\S]*?\{\/\* Custom Cursor \*\/\}[\s\S]*?<div className="fixed inset-0 pointer-events-none z-\[9999\] hidden lg:block">[\s\S]*?<motion\.div[\s\S]*?\/>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?\);[\s\S]*?\}/;

const newApp = `const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <BrowserRouter>
      <div className="relative bg-[#030303]">
        <Background3D />
        
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#00FF00] origin-left z-[100]"
          style={{ scaleX }}
        />

        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
          </Routes>
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
    </BrowserRouter>
  );
}`;

code = code.replace(appRegex, newApp);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated successfully');`;
