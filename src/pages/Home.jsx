import { motion, useScroll, useTransform, animate, useMotionValue, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Briefcase, GraduationCap, Quote, Play, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Counter Component using Framer Motion
function Counter({ from, to, label }) {
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 2,
      onUpdate: (value) => {
        setDisplayValue(Math.round(value));
      }
    });
    return controls.stop;
  }, [count, to]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-5xl md:text-6xl font-extrabold text-accent dark:text-amber-500 mb-2">{displayValue}+</span>
      <span className="text-sm font-bold tracking-widest uppercase text-slate-500">{label}</span>
    </div>
  );
}

// Kinetic Typography Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const wordVariant = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { 
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 10 } 
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("experience");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const scrollRef = useRef(null);

  const dummyVideos = [
    { id: "ZnHdkK4EhuE", title: "Nigeria Is Not One Nation; Trying to Make Us One Is Never Going to Work -Fapohunda" },
    { id: "Wp6ouX2Su7g", title: "'Nigeria Has Failed So Badly That Tinubu Is Now Running Multiple Budgets at Once' - Fapohunda" },
    { id: "tXN69RN9EF4", title: "Nigeria Will Be in Trouble in 2027 if Restructuring is Not Prioritised Today - Dr. Akin Fapohunda" },
    { id: "QqpsLCm3TjM", title: "\"Supreme Court has Been Destroyed, Judiciary Has Lost Its Dignity\" - Fapohunda" },
    { id: "NhxDn1dyvSg", title: "Where & How The Data Went Wrong.| Dr Akin Fapohunda #analysis #population #elections #datamanagement" },
    { id: "yEy2wJAHiFo", title: "The Data Measurement #Source And Its Credibility.| Akin Fapohunda #census #datamanagement #elections" },
    { id: "YW0E_rAbIl4", title: "June 12: Babangida Should Hide in Shame -  Akin Fapohunda" },
    { id: "s5iDJZ__2kA", title: "Eminent Patriot Of Nigeria Call For New Constitution - Akin Fapohunda" },
    { id: "IFTweRIZLkA", title: "Why The Census Is Important.|Dr Akin Fapohunda #population #census #shorts_ #analysis #npc #nigeria" },
    { id: "AlugAuOX17k", title: "PROF UKA EZENWE & DR AKIN FAPOHUNDA SPEAKS ON ELECTION POSTPONEMENT : HUMAN AND FINANCIAL COSTS - 2" },
    { id: "DrN3b1DfUUk", title: "Why I Drafted Bill to Return Nigeria to Regional Govt -  Dr Fapohunda" },
    { id: "X8MxtKi7gu0", title: "Eye On The Presidential Election Data.|Akin Fapohunda #data #2023elections #analysis #npc #subscribe" },
    { id: "ictc4lIeSIA", title: "Tinubu to Receive Controversial Regional Government Bill: Key Insights" },
    { id: "YZtf5XUXzKw", title: "Nigeria: Continuous Clamour  For Restructuring- Akin Fapohunda" },
    { id: "7gjpl3xZPG0", title: "Reformed Tax System In A Structured Nigeria - Akin Fapohunda" },
    { id: "ME9pvuFk-3k", title: "The Creation of the Ministry of Livestock Development is Purely a Political Move - Akin Fapohunda" },
    { id: "TqwfEUlgj4I", title: "Tinubu Is Not A Good Man, He's A Transactional Leader, Only Deațħ Can Stop Him In 2027 - Dr Fapounda" },
    { id: "kI05uRZs8No", title: "There is Extreme Centralization of Power in Abuja - Dr Akin Fapohunda" },
    { id: "6dtsHf8dlCc", title: "Clamour For Restructuring Nigeria -Fapohunda" },
    { id: "Kt7lIGwydvg", title: "Akin Fapohunda Speaks: The Blueprint for a True Nigerian Federation" },
    { id: "PAbtE4kO8XM", title: "Why It Seems We Do Not Believe In What We Do...|Dr Akin Fapohunda #process #presidentialelection" },
    { id: "t6O2S5IlbKw", title: "How Wrong The Population #Data Might Be.|Dr Akin Fapohunda #population  #datamanagement #analysis" },
    { id: "HYliSMCfm3E", title: "There is Extreme Centralization of Power in Abuja - Dr Akin Fapohunda " },
    { id: "K6L4BwHoPsI", title: "We Must Demolish To Rebuild, We Have Talked Enough - Dr Akin Fapohunda" },
    { id: "GAzixh23IoY", title: "Restructuring Nigeria: Scrapping 36 States for Regionalism" },
    { id: "-8dlON3LyYI", title: "Place And Value Of Technical Education, A Brief Remark - Dr Akin Fapohunda" },
    { id: "QBqzAyhoshI", title: "The Atrocities Of Religious Persecution In Northern Nigeria; \"Nigeria Not A Nation\" - Akin Fapohunda" },
    { id: "2X7CAHXknDw", title: "Proposed Draft Constitution To Change Nigeria From 36 States To 9 Regions, Interview With Proponent" },
    { id: "u-WgtHDGi30", title: "Eminent Nigerians Call for Overhaul of Nigerian Constitution -Fapohunda" },
    { id: "aHrXRiyqFLk", title: "Peter Obi Must Take Extra Security Precautions Or Else…” – Dr. Akin Fapohunda Warns" },
    { id: "0eLXky6St8c", title: "Why Afenifere And The Yoruba Nation Endorsed Peter Obi - Dr Akin Fapohunda" },

    { id: "mYCQMDlqORQ", title: "WHAT YORUBA NEED NOW AND HOW TO GET IT - DR. AKIN FAPOHUNDA (Sponsored by VoR)" },
    { id: "YqPFP7lWr_w", title: "Nigeria's Return to Regional Government and ANC's Coalition Deal in South Africa" },
    { id: "6CNJrBKaaQ0", title: "Constitution Review: South-South Pushes for Resource Control, State Police" },
    { id: "RzQydEmTLL4", title: "Impeachment Plot a Last Breath Survival Tactic from Pro-Wike Camp to Fubara - Fapohunda" },
    { id: "E5Oxckf1v1o", title: "Fapohunda, Abayomi Review Proposed Bill For A New Governance Model" },

    { id: "uoWi4Yfap-o", title: "Fapohunda's Divisive Bill: Uniting Yorubas, Splitting Igbos" },

    { id: "5dcLTZCnju4", title: "'I Wish Chukwuma Nzeogwu & Gideon Orkar Failed Coup Were Successful' - Dr Akin Fapohunda" },

    { id: "3izr8GPKruA", title: "STATE OF THE NATION WITH DR. AKIN FAPOHUNDA." },

    { id: "r_ZlRlnuRg8", title: "The Root of Our Problem is Almajiri, They are the Ones CarryinG AK47 About -Fapounda" },
  ];
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 200]);

  const experiences = [
    { year: "Aug 1976", title: "Government Staff", organization: "Federal Ministry of Agriculture" },
    { year: "1989", title: "Head of Computer & Info Services", organization: "Raw Materials Research & Development Council (RMRDC)" },
    { year: "1992", title: "Director, Planning, Research & Data Bank", organization: "National Agricultural Land Development Authority (NALDA)" },
    { year: "July 1999", title: "Director", organization: "Space Science Office" },
    { year: "2000+", title: "Executive Director", organization: "Digital Trust Ltd / Gte" },
    { year: "2004+", title: "Executive Director", organization: "Aflon Digital Institute" },
    { year: "2009", title: "Senior Lecturer", organization: "Multimedia Technology and Digital Image Processing at Bingham University" },
    { year: "2012", title: "IT Advisor", organization: "Elizade University" },
  ];

  const education = [
    { year: "1986", title: "Ph.D. in Digital Soil Variability Studies", organization: "University of Ibadan" },
    { year: "1982", title: "Remote Sensing & Digital Image Interpretation", organization: "International Institute for Aerospace Studies (ITC), Netherlands" },
    { year: "1980", title: "MSc. Remote Sensing & Environmental Monitoring", organization: "University of Wisconsin at Madison" },
    { year: "1972", title: "BSc. in Computer Science", organization: "University of Ibadan" },
    { year: "1959 - 1964", title: "Secondary School Education", organization: "Ilesa Grammar School" },
  ];

  const titleText = "A Journey Through Life at 70".split(" ");

  return (
    <div className="flex flex-col w-full transition-colors duration-500 antialiased overflow-hidden">
      {/* Hero Section with Parallax Background */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 bg-slate-50 dark:bg-[#030303] border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="text-accent font-bold tracking-[0.2em] uppercase mb-6 text-sm bg-accent/10 dark:bg-amber-50 inline-block px-4 py-2 rounded-full"
          >
             Welcome
          </motion.p>
          
          <motion.h1 
            variants={containerVariant} initial="hidden" animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 flex flex-wrap justify-center gap-x-4 gap-y-2 leading-tight"
          >
            {titleText.map((word, index) => (
              <motion.span key={index} variants={wordVariant} className={word === "70" ? "text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500" : ""}>
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Federal Public Servant, IT Consultant, Teacher, and Advocate for Service. Let's delve into my trajectory.
          </motion.p>
          
          {/* Micro-Interaction Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
            <a href="#about" className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-accent rounded-full hover:bg-amber-500 transition-all shadow-lg hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-1">
              Read My Story <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About & Statistics - Bento Grid Concept */}
      <section id="about" className="py-32 relative bg-white dark:bg-[#030303] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Bento Main Image */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:col-span-8 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden relative group min-h-[500px]"
            >
               <img src="/hero-portrait.jpg" alt="Akin Fapohunda" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
               <div className="absolute bottom-10 left-10 right-10 text-white">
                 <h2 className="text-4xl font-extrabold mb-4">Welcome to my world.</h2>
                 <p className="text-lg font-medium opacity-90 max-w-xl">"I stand before you today as a 70-year-old individual, humbled and grateful for the incredible journey life has offered me."</p>
               </div>
            </motion.div>

            {/* Bento Stacked Items */}
            <div className="lg:col-span-4 flex flex-col gap-8">
               <motion.div 
                 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                 className="flex-1 bg-accent/10 dark:bg-amber-50 rounded-[2.5rem] p-10 flex items-center justify-center border border-accent/20"
               >
                 <Counter from={0} to={27} label="Years in Public Service" />
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
                 className="flex-1 glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group"
               >
                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <Quote size={28} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Authored Books</h3>
                 <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Simplifying computer science for beginners.</p>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Full Biography Write-up */}
      <section className="py-16 md:py-24 relative bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="prose prose-lg md:prose-xl dark:prose-invert prose-slate mx-auto text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
             <p className="first-letter:text-5xl md:first-letter:text-7xl first-letter:font-black first-letter:text-accent dark:first-letter:text-amber-500 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
               Greetings, and welcome to my world! I stand before you today as a 70-year-old individual, humbled and grateful for the incredible journey life has offered me. My life’s story is a tapestry of experiences, blessings, and transformations, and I’m excited to share a glimpse of it with you.
             </p>
             <p className="mt-6">
               From the very beginning of my conscious existence, I’ve been fortunate and blessed beyond my wildest contemplations. Life’s challenges and uncertainties have always appeared as stepping stones, guiding me toward greater heights. One of the most remarkable chapters of my life was my journey through the Federal Public Service, where I consistently overcame obstacles and achieved technical excellence. In less than 27 years, I completed my course, reaching the pinnacle of my field.
             </p>
             <p className="mt-6">
               In the year 2000, my life took a different turn as I ventured into the realm of entrepreneurship and idea generation. Fortunate and favored by the Divine Creator, I embarked on a path of personal growth and innovation. It was during this time that I authored two books, simplifying the complex subject of computer science for both children and adult beginners, finding an eager audience in 1995.
             </p>
             <div className="my-12 relative">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-accent dark:bg-amber-500 rounded-full"></div>
                <p className="pl-8 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white italic leading-tight">
                   "My decision to shift from my certified academic field to Information Technology was a flash of inspiration, one that I consider a divine blessing. It set the stage for a remarkable journey."
                </p>
             </div>
             <p className="mt-6">
               I am, without a doubt, a product of the challenges, opportunities, and blessings that life has bestowed upon me. The thoughts and reflections you’ll find here are a testament to how my worldview has been constructed and transformed over time.
             </p>
             <p className="mt-6">
               Join me on this journey as we delve into the thoughts, ideas, and experiences that have shaped my 70 years of existence. Together, we’ll explore the wisdom that comes from a lifetime of learning and growth. Thank you for stepping into my world; I look forward to sharing it with you.
             </p>
           </div>
        </div>
      </section>

      {/* Media & Interventions - Horizontal Carousel */}
      <section className="py-24 relative bg-[#f8fafc] dark:bg-[#080d0f] transition-colors duration-500 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Media & Interventions</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl">Thoughts, interviews, and discourse on technology and governance.</p>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => { if(scrollRef.current) scrollRef.current.scrollBy({left:-400, behavior:'smooth'}) }} className="w-12 h-12 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all shrink-0"><ChevronRight className="w-6 h-6 rotate-180" /></button>
                 <button onClick={() => { if(scrollRef.current) scrollRef.current.scrollBy({left:400, behavior:'smooth'}) }} className="w-12 h-12 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all shrink-0"><ChevronRight className="w-6 h-6" /></button>
              </div>
           </div>
        </div>
        
        {/* Horizontal Scroll Snap Container */}
        <div ref={scrollRef} className="flex overflow-x-auto gap-6 px-4 lg:px-[10vw] pb-10 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
           {dummyVideos.map((vid, idx) => (
             <div 
               key={idx} 
               onClick={() => setSelectedVideo(vid.id)} 
               className="shrink-0 w-[300px] md:w-[400px] snap-center rounded-[2rem] overflow-hidden group cursor-pointer relative shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-800"
             >
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                  <img src={`https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={vid.title} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                     <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,87,34,0.5)]">
                       <Play className="w-8 h-8 text-white fill-white" />
                     </div>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900">
                   <h3 className="text-slate-900 dark:text-white font-bold text-lg line-clamp-2 leading-tight group-hover:text-accent transition-colors">{vid.title}</h3>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Bento Grid Picture Gallery (Scraped Authentic Images) */}
      <section className="py-32 relative bg-white dark:bg-[#030303] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">A Look Back</h2>
             <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Moments from my professional life and leadership journey.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-[800px] md:h-[600px]">
              <div className="md:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden group shadow-md border border-slate-200 dark:border-slate-700 relative">
                 <img src="https://fapohunda.org.ng/wp-content/uploads/2023/10/IMG_20200211_181921.jpg" alt="Gallery Image 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-500"></div>
              </div>
              <div className="rounded-[2rem] overflow-hidden group shadow-md border border-slate-200 dark:border-slate-700 relative">
                 <img src="https://fapohunda.org.ng/wp-content/uploads/2023/10/IMG_20191207_161234.jpg" alt="Gallery Image 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="rounded-[2rem] overflow-hidden group shadow-md border border-slate-200 dark:border-slate-700 relative">
                 <img src="https://fapohunda.org.ng/wp-content/uploads/2023/10/IMG-20180524-WA0289.jpg" alt="Gallery Image 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
           </div>
        </div>
      </section>

      {/* Trajectory Timeline - Minimalist Card List */}
      <section id="experience" className="py-32 relative bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between items-center gap-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">The Trajectory</h2>
            <div className="bg-slate-100 dark:bg-[#030303] p-2 rounded-full inline-flex border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setActiveTab("experience")}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "experience" ? "bg-white dark:bg-slate-800 text-accent shadow-md" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"}`}
              >
                Experience
              </button>
              <button 
                onClick={() => setActiveTab("education")}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === "education" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"}`}
              >
                Education
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {(activeTab === "experience" ? experiences : education).map((item, index) => (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="group glass p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between hover:scale-[1.02] transition-transform shadow-sm"
               >
                 <div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">{item.title}</h3>
                   <p className="text-slate-500 dark:text-slate-400 font-medium">{item.organization}</p>
                 </div>
                 <div className="mt-4 md:mt-0 px-6 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#030303] text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap group-hover:border-accent group-hover:text-accent transition-colors shadow-sm">
                    {item.year}
                 </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-10 backdrop-blur-md" 
            onClick={() => setSelectedVideo(null)}
          >
             <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative border border-slate-800/50" onClick={e => e.stopPropagation()}>
               <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-accent text-white rounded-full p-2 transition-colors">
                 <X className="w-6 h-6" />
               </button>
               <iframe 
                 width="100%" height="100%" 
                 src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} 
                 title="YouTube video player" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
               ></iframe>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
