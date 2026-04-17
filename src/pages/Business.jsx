import { useState } from "react";
import { ArrowUpRight, Code, BookOpen, Presentation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Business() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = ["/acair-1.png", "/acair-2.png", "/acair-3.png"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 min-h-[80vh] transition-colors duration-500">
      <div className="text-center max-w-3xl mx-auto mb-20 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 drop-shadow-sm tracking-tight transition-colors">Business & Services</h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium transition-colors">
          My personal ideas, my views of the world, and links to my business undertakings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 relative z-10">
        {/* AFLON / ACAIR Direct Link Card (Creative Collage Spanning Full Width) */}
        <div className="lg:col-span-2 group block bg-slate-900 dark:bg-[#080d0f] p-10 md:p-14 rounded-[3rem] rounded-tl-none shadow-xl border border-slate-800 dark:border-slate-800/50 relative overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            {/* Text Content */}
            <div className="flex-1 w-full lg:w-1/3">
              <div className="inline-block bg-accent dark:bg-amber-500/20 text-white dark:text-amber-400 border dark:border-amber-500/30 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 transition-colors shadow-sm">
                Premier Institute
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight group-hover:text-amber-100 transition-colors">Innovating Minds, Automating the Future.</h2>
              <p className="text-slate-400 dark:text-slate-500 text-xl mb-10 leading-relaxed transition-colors">
                Bridging the gap between technology and community development. We provide world-class training in AI & Robotics.
              </p>
              <a href="https://acair.edu.ng/" target="_blank" rel="noreferrer" className="inline-flex items-center text-accent dark:text-amber-400 font-bold text-xl hover:translate-x-2 transition-transform bg-white/5 py-4 px-8 rounded-full border border-white/10 hover:bg-white/10">
                Explore ACAIR <ArrowUpRight className="ml-3 w-6 h-6" />
              </a>
            </div>
            
            {/* Creative Image Collage */}
            <div className="flex-1 w-full lg:w-2/3 grid grid-cols-3 grid-rows-2 gap-4 h-[400px] md:h-[500px]">
              {/* Image 1 : The biggest one taking up 2 columns and 2 rows */}
              <div className="col-span-2 row-span-2 rounded-[2rem] overflow-hidden border border-slate-700/50 relative shadow-2xl z-10 hover:z-20 hover:scale-105 transition-all duration-500 bg-slate-800 cursor-zoom-in" onClick={() => setSelectedImage(images[0])}>
                 <img src={images[0]} alt="ACAIR Main" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                 <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                    <p className="text-white font-bold bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full inline-block text-sm">Empowering Nigeria's Future</p>
                 </div>
              </div>
              {/* Image 2 */}
              <div className="col-span-1 row-span-1 rounded-[1.5rem] overflow-hidden border border-slate-800 relative shadow-lg hover:scale-105 transition-all duration-500 z-10 bg-slate-800 cursor-zoom-in" onClick={() => setSelectedImage(images[1])}>
                 <img src={images[1]} alt="ACAIR Secondary" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              {/* Image 3 */}
              <div className="col-span-1 row-span-1 rounded-[1.5rem] overflow-hidden border border-slate-800 relative shadow-lg hover:scale-105 transition-all duration-500 z-10 bg-slate-800 flex flex-col items-center justify-center cursor-zoom-in" onClick={() => setSelectedImage(images[2])}>
                 <img src={images[2]} alt="ACAIR Tertiary" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity absolute inset-0" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 pointer-events-none"></div>
                 <div className="absolute bottom-4 left-4 pointer-events-none">
                     <span className="text-white font-bold text-[10px] bg-accent px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">+ Explore Facilities</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content section rendered with images rather than icons */}
        <div className="flex flex-col gap-10">
            {/* IT Consulting */}
            <div className="glass p-8 md:p-12 rounded-[3rem] rounded-tr-none hover:shadow-xl transition-all duration-300 group overflow-hidden">
               <div className="rounded-[2rem] overflow-hidden mb-8 h-56 relative bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                 <img src="/it-consulting.png" alt="IT Consulting" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">IT Consulting & Management</h3>
               <p className="text-slate-600 dark:text-slate-400 font-medium transition-colors text-lg">
                 Delivering strategic technological direction, master-class infrastructure planning, and cutting-edge operational frameworks. Bridging years of public administration with the latest state-of-the-art tech.
               </p>
            </div>

            {/* Mentorship */}
            <div className="glass p-8 md:p-12 rounded-[3rem] rounded-bl-none hover:shadow-xl transition-all duration-300 group overflow-hidden">
               <div className="rounded-[2rem] overflow-hidden mb-8 h-56 relative bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                 <img src="/mentorship.png" alt="Mentorship & Human Development" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Development & Mentorship</h3>
               <p className="text-slate-600 dark:text-slate-400 font-medium transition-colors text-lg">
                 Actively involved in human development globally. Mentoring the next generation of technologists and leaders by sharing raw industry experience, political foresight, and ethical frameworks.
               </p>
            </div>
        </div>
      </div>
      
      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-10 cursor-zoom-out backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
             <motion.img 
               src={selectedImage} 
               alt="Enlarged view"
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
               className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800"
               onClick={(e) => e.stopPropagation()} /* Prevents closing when clicking the image itself */
             />
             <button 
               className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors"
               onClick={() => setSelectedImage(null)}
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
