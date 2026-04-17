import { FileText } from "lucide-react";

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 min-h-[80vh] transition-colors duration-500">
      <div className="text-center max-w-3xl mx-auto mb-20 relative">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">Thoughtful Thoughts</h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium transition-colors">
          Reflections on life, technology, politics, and the future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          { title: "Hello world!", date: "September 23, 2023", cat: "Stories", desc: "How time flies that since the year 2000, I have been in the world of my own living on ideas and business recipes formulated and sold to willing members of the public." },
          { title: "Why The Census Is Important", date: "August 2023", cat: "Politics", desc: "My views on national data gathering and its impact on planning." }
        ].map((post, i) => (
          <div key={i} className={`glass p-10 md:p-14 rounded-[3rem] hover:shadow-xl transition-all duration-300 group cursor-pointer ${i % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"}`}>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-amber-50 dark:bg-amber-900/40 text-accent dark:text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold border border-amber-100 dark:border-amber-800 tracking-wider uppercase transition-colors">{post.cat}</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold transition-colors">{post.date}</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 group-hover:text-accent dark:group-hover:text-amber-400 transition-colors">{post.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 font-medium leading-relaxed transition-colors">{post.desc}</p>
            <div className="flex items-center text-accent dark:text-amber-400 font-bold uppercase text-sm tracking-widest group-hover:translate-x-2 transition-transform">
              Read Document <FileText className="ml-2 w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
