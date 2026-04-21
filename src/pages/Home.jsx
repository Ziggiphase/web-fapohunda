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
    { id: "5dcLTZCnju4", title: "'I Wish Chukwuma Nzeogwu & Gideon Orkar Failed Coup Were Successful' - Dr Akin Fapohunda", channel: "Local Journo", date: "2026-03-20T04:11:13-07:00" },
    { id: "HYliSMCfm3E", title: "There is Extreme Centralization of Power in Abuja - Dr Akin Fapohunda ", channel: "PAPShow", date: "2026-03-15T11:30:06-07:00" },
    { id: "kI05uRZs8No", title: "There is Extreme Centralization of Power in Abuja - Dr Akin Fapohunda", channel: "PAPShow", date: "2026-03-15T11:30:00-07:00" },
    { id: "aHrXRiyqFLk", title: "Peter Obi Must Take Extra Security Precautions Or Else…” – Dr. Akin Fapohunda Warns", channel: "Active Citizens", date: "2026-03-10T21:15:33-07:00" },
    { id: "Kt7lIGwydvg", title: "Akin Fapohunda Speaks: The Blueprint for a True Nigerian Federation", channel: "Busuyi Oris", date: "2026-03-08T09:58:11-07:00" },
    { id: "QBqzAyhoshI", title: "The Atrocities Of Religious Persecution In Northern Nigeria; \"Nigeria Not A Nation\" - Akin Fapohunda", channel: "Maiyegun's Diary Politico", date: "2026-03-07T05:40:06-08:00" },
    { id: "Wp6ouX2Su7g", title: "'Nigeria Has Failed So Badly That Tinubu Is Now Running Multiple Budgets at Once' - Fapohunda", channel: "SYMFONI", date: "2026-01-20T08:45:55-08:00" },
    { id: "RzQydEmTLL4", title: "Impeachment Plot a Last Breath Survival Tactic from Pro-Wike Camp to Fubara - Fapohunda", channel: "Arise News", date: "2026-01-18T02:57:33-08:00" },
    { id: "QqpsLCm3TjM", title: "\"Supreme Court has Been Destroyed, Judiciary Has Lost Its Dignity\" - Fapohunda", channel: "SYMFONI", date: "2026-01-17T12:17:35-08:00" },
    { id: "TqwfEUlgj4I", title: "Tinubu Is Not A Good Man, He's A Transactional Leader, Only Deațħ Can Stop Him In 2027 - Dr Fapounda", channel: "SYMFONI", date: "2026-01-17T07:34:18-08:00" },
    { id: "r_ZlRlnuRg8", title: "The Root of Our Problem is Almajiri, They are the Ones CarryinG AK47 About -Fapounda", channel: "Arise News", date: "2025-12-05T01:49:34-08:00" },
    { id: "u-WgtHDGi30", title: "Eminent Nigerians Call for Overhaul of Nigerian Constitution -Fapohunda", channel: "Arise News", date: "2025-10-22T15:37:21-07:00" },
    { id: "ZnHdkK4EhuE", title: "Nigeria Is Not One Nation; Trying to Make Us One Is Never Going to Work -Fapohunda", channel: "Arise News", date: "2025-09-22T15:00:40-07:00" },
    { id: "6CNJrBKaaQ0", title: "Constitution Review: South-South Pushes for Resource Control, State Police", channel: "News Central TV", date: "2025-07-22T05:22:53-07:00" },
    { id: "s5iDJZ__2kA", title: "Eminent Patriot Of Nigeria Call For New Constitution - Akin Fapohunda", channel: "Arise News", date: "2025-07-20T11:26:45-07:00" },
    { id: "6dtsHf8dlCc", title: "Clamour For Restructuring Nigeria -Fapohunda", channel: "Arise News", date: "2025-04-30T16:30:26-07:00" },
    { id: "YW0E_rAbIl4", title: "June 12: Babangida Should Hide in Shame -  Akin Fapohunda", channel: "Arise News", date: "2025-02-23T11:12:09-08:00" },
    { id: "7gjpl3xZPG0", title: "Reformed Tax System In A Structured Nigeria - Akin Fapohunda", channel: "Arise News", date: "2025-01-05T03:52:19-08:00" },
    { id: "3izr8GPKruA", title: "STATE OF THE NATION WITH DR. AKIN FAPOHUNDA.", channel: "A NEW NIGERIA©", date: "2024-09-27T12:51:47-07:00" },
    { id: "ME9pvuFk-3k", title: "The Creation of the Ministry of Livestock Development is Purely a Political Move - Akin Fapohunda", channel: "Arise News", date: "2024-07-10T10:39:44-07:00" },
    { id: "uoWi4Yfap-o", title: "Fapohunda's Divisive Bill: Uniting Yorubas, Splitting Igbos", channel: "YangaLife", date: "2024-06-16T22:35:11-07:00" },
    { id: "tXN69RN9EF4", title: "Nigeria Will Be in Trouble in 2027 if Restructuring is Not Prioritised Today - Dr. Akin Fapohunda", channel: "Arise News", date: "2024-06-16T06:01:18-07:00" },
    { id: "YqPFP7lWr_w", title: "Nigeria's Return to Regional Government and ANC's Coalition Deal in South Africa", channel: "News Central TV", date: "2024-06-15T03:32:23-07:00" },
    { id: "ictc4lIeSIA", title: "Tinubu to Receive Controversial Regional Government Bill: Key Insights", channel: "News Central TV", date: "2024-06-15T03:08:05-07:00" },
    { id: "E5Oxckf1v1o", title: "Fapohunda, Abayomi Review Proposed Bill For A New Governance Model", channel: "Channels Television", date: "2024-06-10T04:50:48-07:00" },
    { id: "2X7CAHXknDw", title: "Proposed Draft Constitution To Change Nigeria From 36 States To 9 Regions, Interview With Proponent", channel: "Njenje Media TV", date: "2024-06-09T12:17:36-07:00" },
    { id: "YZtf5XUXzKw", title: "Nigeria: Continuous Clamour  For Restructuring- Akin Fapohunda", channel: "Arise News", date: "2024-06-04T09:53:42-07:00" },
    { id: "GAzixh23IoY", title: "Restructuring Nigeria: Scrapping 36 States for Regionalism", channel: "News Central TV", date: "2024-06-04T03:43:42-07:00" },
    { id: "DrN3b1DfUUk", title: "Why I Drafted Bill to Return Nigeria to Regional Govt -  Dr Fapohunda", channel: "Nigeria Info FM", date: "2024-06-03T20:20:31-07:00" },
    { id: "NhxDn1dyvSg", title: "Where & How The Data Went Wrong.| Dr Akin Fapohunda #analysis #population #elections #datamanagement", channel: "MONEYLINE WITH NANCY TV", date: "2023-03-06T11:25:28-08:00" },
    { id: "yEy2wJAHiFo", title: "The Data Measurement #Source And Its Credibility.| Akin Fapohunda #census #datamanagement #elections", channel: "MONEYLINE WITH NANCY TV", date: "2023-03-06T11:16:55-08:00" },
    { id: "t6O2S5IlbKw", title: "How Wrong The Population #Data Might Be.|Dr Akin Fapohunda #population  #datamanagement #analysis", channel: "MONEYLINE WITH NANCY TV", date: "2023-03-06T11:14:04-08:00" },
    { id: "PAbtE4kO8XM", title: "Why It Seems We Do Not Believe In What We Do...|Dr Akin Fapohunda #process #presidentialelection", channel: "MONEYLINE WITH NANCY TV", date: "2023-03-06T10:10:35-08:00" },
    { id: "IFTweRIZLkA", title: "Why The Census Is Important.|Dr Akin Fapohunda #population #census #shorts_ #analysis #npc #nigeria", channel: "MONEYLINE WITH NANCY TV", date: "2023-03-06T08:06:57-08:00" },
    { id: "X8MxtKi7gu0", title: "Eye On The Presidential Election Data.|Akin Fapohunda #data #2023elections #analysis #npc #subscribe", channel: "MONEYLINE WITH NANCY TV", date: "2023-03-06T05:38:10-08:00" },
    { id: "0eLXky6St8c", title: "Why Afenifere And The Yoruba Nation Endorsed Peter Obi - Dr Akin Fapohunda", channel: "Njenje Media TV", date: "2022-10-28T09:00:10-07:00" },
    { id: "mYCQMDlqORQ", title: "WHAT YORUBA NEED NOW AND HOW TO GET IT - DR. AKIN FAPOHUNDA (Sponsored by VoR)", channel: "IMPACT TELEVISION", date: "2022-08-15T10:12:11-07:00" },
    { id: "-8dlON3LyYI", title: "Place And Value Of Technical Education, A Brief Remark - Dr Akin Fapohunda", channel: "Njenje Media TV", date: "2022-06-26T00:44:11-07:00" },
    { id: "K6L4BwHoPsI", title: "We Must Demolish To Rebuild, We Have Talked Enough - Dr Akin Fapohunda", channel: "Njenje Media TV", date: "2021-03-08T08:00:05-08:00" },
    { id: "AlugAuOX17k", title: "PROF UKA EZENWE & DR AKIN FAPOHUNDA SPEAKS ON ELECTION POSTPONEMENT : HUMAN AND FINANCIAL COSTS - 2", channel: "MONEYLINE WITH NANCY TV", date: "2019-02-20T13:42:29-08:00" },
  ];
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 200]);

  const professionalPhases = [
    {
      title: "Phase 1: 1975 – 2000",
      subtitle: "Agricultural Excellence & Remote Sensing (Federal Public Sector)",
      description: "Dedicated to the scientific and administrative advancement of Nigeria’s agricultural and space science infrastructure.",
      color: "bg-blue-600",
      items: [
        { year: "1975", role: "B.Sc. in Agronomy/Agriculture", org: "University of Ibadan" },
        { year: "1976", role: "Commenced career", org: "Federal Ministry of Agriculture", detail: "Applying computational models to soil science and environmental monitoring." },
        { year: "1980", role: "M.Sc. in Remote Sensing & Environmental Monitoring", org: "University of Wisconsin-Madison, USA" },
        { year: "1986", role: "Ph.D. in Digital Soil Variability Studies", org: "University of Ibadan" },
        { year: "1989", role: "Pioneer Head of Computer and Information Services", org: "Raw Materials Research & Development Council (RMRDC)" },
        { year: "1992", role: "Pioneer Director de Plan., Res. & Data Bank", org: "National Agricultural Land Development Authority (NALDA)" },
        { year: "1999–2000", role: "Director, Space Science Office", org: "The Presidency", detail: "Laid foundational strategies for Nigeria's satellite and remote sensing capabilities." },
      ]
    },
    {
      title: "Phase 2: 2001 – 2025",
      subtitle: "IT Professionalism, Training & Project Management (Private Sector)",
      description: "A quarter-century focused on human capital development and digital literacy across Nigeria.",
      color: "bg-accent",
      items: [
        { year: "2001 - 2025", role: "Founder & Director", org: "Aflon Digital Group", detail: "Under his leadership, over 16,000 graduates were trained in diverse IT disciplines." },
        { year: "Consultant", role: "IT Competency Evaluation Consultant", org: "Office of the Head of Civil Service of the Federation (OHCSF)", detail: "Rigorous selection of Permanent Secretaries." },
        { year: "2009–2018", role: "Visiting Senior Lecturer", org: "Bingham University", detail: "Specialized in Multimedia Technology and Digital Image Processing." },
        { year: "Governance", role: "Elected Representative of NCS", org: "Computer Professionals Registration Council (CPN)", detail: "Chairman of the IT Curriculum Review Committee." },
        { year: "Author", role: "Technical Author & Publisher", org: "Bridging the digital divide for thousands of Nigerians through simplified computer science textbooks." },
      ]
    },
    {
      title: "Phase 3: Jan 2026 – Onwards",
      subtitle: "Promoting and Popularization of AI and Robotics",
      description: "Leading the 'Fourth Industrial Revolution' in Nigeria, championing Generative AI integration.",
      color: "bg-purple-600",
      items: [
        { year: "Current", role: "Director of Research and Strategy", org: "Afenifere", detail: "Secretary of the Eminent Elders Forum; Utilizes AI-driven data analytics for constitutional reforms." },
        { year: "Advocacy", role: "AI & Robotics Popularization", org: "Innovation Hubs", detail: "Establishing hubs for practical robotics applications in agriculture (Agri-Bots) and industrial automation." }
      ]
    }
  ];

  const credentials = [
    { title: "NASA Technology Application Centre", location: "USA", type: "Specialized Training" },
    { title: "International Institute for Aerospace Studies", location: "Netherlands", type: "Specialized Training" },
    { title: "Fellow of the Nigeria Computer Society (FNCS)", location: "Nigeria", type: "Professional Fellowship" }
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
            className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
          >
            A Visionary Leader in Agronomy, Remote Sensing, IT, and Artificial Intelligence with over 50 years of impactful service.
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
                 <h2 className="text-4xl font-extrabold mb-4">A Legacy of Service.</h2>
                 <p className="text-lg font-medium opacity-90 max-w-xl">"A multi-disciplinary professional with over 50 years of impactful service across the Nigerian Public and Private Sectors."</p>
               </div>
            </motion.div>

            {/* Bento Stacked Items */}
            <div className="lg:col-span-4 flex flex-col gap-8">
               <motion.div 
                 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                 className="flex-1 bg-accent/10 dark:bg-amber-50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center border border-accent/20"
               >
                 <Counter from={0} to={50} label="Years of Impact" />
                 <p className="text-[10px] uppercase font-black tracking-widest text-accent mt-2">Professional Service</p>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
                 className="flex-1 glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group"
               >
                 <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">16k+</div>
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Graduates Trained</h3>
                 <p className="text-slate-400 dark:text-slate-500 font-medium text-[10px]">Aflon Digital Group Human Capital Development.</p>
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
                <div className="p-6 bg-white dark:bg-slate-900 flex flex-col min-h-[140px]">
                   <h3 className="text-slate-900 dark:text-white font-bold text-base md:text-lg line-clamp-2 leading-tight group-hover:text-accent transition-colors mb-4">{vid.title}</h3>
                   <div className="flex items-center gap-2 mt-auto">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 dark:bg-amber-500/10 px-2 py-1 rounded-md transition-colors">{vid.channel}</span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{new Date(vid.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                   </div>
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
           
           <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-4 h-[600px] md:h-[600px]">
              <div className="col-span-2 row-span-2 rounded-[2rem] overflow-hidden group shadow-md border border-slate-200 dark:border-slate-700 relative">
                 <img src="/gallery-5.png" alt="Gallery Image 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-500"></div>
              </div>
              <div className="rounded-[2rem] overflow-hidden group shadow-md border border-slate-200 dark:border-slate-700 relative">
                 <img src="/gallery-2.jpg" alt="Gallery Image 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-500"></div>
              </div>
              <div className="rounded-[2rem] overflow-hidden group shadow-md border border-slate-200 dark:border-slate-700 relative">
                 <img src="/gallery-3.jpg" alt="Gallery Image 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-500"></div>
              </div>
              <div className="rounded-[2rem] overflow-hidden group shadow-md border border-slate-200 dark:border-slate-700 relative">
                 <img src="/gallery-4.jpg" alt="Gallery Image 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-500"></div>
              </div>
              <div className="rounded-[2rem] overflow-hidden group shadow-md border border-slate-200 dark:border-slate-700 relative">
                 <img src="/gallery-1.jpg" alt="Gallery Image 5" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-500"></div>
              </div>
           </div>
        </div>
      </section>

      {/* Trajectory Timeline - 3 Phase Storytelling */}
      <section id="experience" className="py-32 relative bg-slate-50 dark:bg-[#030303] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">Professional Trajectory</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto font-medium">A journey across the Nigerian Public and Private Sectors, spanning over five decades.</p>
          </div>

          <div className="space-y-32">
            {professionalPhases.map((phase, pIndex) => (
              <div key={pIndex} className="relative">
                {/* Phase Header */}
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-start md:items-center">
                   <div className={`${phase.color} text-white px-6 py-2 rounded-full font-black tracking-widest text-sm uppercase shadow-lg shadow-accent/20`}>
                     {phase.title}
                   </div>
                   <div className="flex-1">
                     <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{phase.subtitle}</h3>
                     <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{phase.description}</p>
                   </div>
                </div>

                {/* Phase Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {phase.items.map((item, iIndex) => (
                      <motion.div 
                        key={iIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: iIndex * 0.1 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group"
                      >
                         <div className="flex justify-between items-start mb-4">
                           <span className="text-accent dark:text-amber-500 font-black text-lg tracking-tighter">{item.year}</span>
                           <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                              {pIndex === 0 ? <Briefcase size={18} /> : pIndex === 1 ? <GraduationCap size={18} /> : <Play size={18} />}
                           </div>
                         </div>
                         <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-accent transition-colors">{item.role}</h4>
                         <p className="text-slate-600 dark:text-slate-400 font-bold text-sm mb-3">{item.org}</p>
                         {item.detail && <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">{item.detail}</p>}
                      </motion.div>
                   ))}
                </div>
              </div>
            ))}
          </div>

          {/* Credentials Section */}
          <div className="mt-32 pt-32 border-t border-slate-200 dark:border-slate-800">
             <div className="flex flex-col lg:flex-row gap-20">
                <div className="lg:w-1/3">
                   <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Educational & Professional Credentials</h3>
                   <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
                     Dr. Fapohunda is a technical writer and publisher of several books seeking to bring the knowledge of Computer Science to the level of everyone in Nigeria.
                   </p>
                   <div className="mt-10 flex items-center gap-4 text-slate-900 dark:text-white font-bold">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white shadow-lg">
                         <X className="w-6 h-6 rotate-45" />
                      </div>
                      Resides at Abuja, Nigeria
                   </div>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                   {credentials.map((cred, idx) => (
                      <div key={idx} className="glass p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-accent transition-colors group">
                         <span className="text-accent font-black text-xs uppercase tracking-[0.2em] mb-4 block">{cred.type}</span>
                         <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:translate-x-2 transition-transform">{cred.title}</h4>
                         <p className="text-slate-500 dark:text-slate-400 font-bold">{cred.location}</p>
                      </div>
                   ))}
                </div>
             </div>
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
