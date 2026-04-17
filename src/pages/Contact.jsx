import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 min-h-[80vh] transition-colors duration-500">
      <div className="text-center max-w-3xl mx-auto mb-20 relative">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">Let's Connect</h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium transition-colors">
          I am actively involved in human development and mentorship. Use the links below to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] rounded-tl-none flex items-start gap-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-accent dark:text-amber-400 shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 transition-colors">Phone</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium transition-colors">Call me directly for urgent matters.</p>
              <a href="tel:+2348033121004" className="text-accent dark:text-amber-400 font-bold text-xl hover:underline transition-colors">+234 803 312 1004</a>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] rounded-bl-none flex items-start gap-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 flex items-center justify-center text-accent dark:text-amber-400 shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 transition-colors">Email</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium transition-colors">Drop me a message and I'll get back to you.</p>
              <a href="mailto:director@aflon.edu.ng" className="text-accent dark:text-amber-400 font-bold text-xl hover:underline transition-colors">director@aflon.edu.ng</a>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-12 rounded-[3.5rem] border border-slate-200 dark:border-slate-700 shadow-xl transition-colors duration-500">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-10 transition-colors">Send a Message</h2>
          <form className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 transition-colors">First Name</label>
                <input type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-accent dark:focus:border-amber-500 focus:ring-2 focus:ring-accent/20 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Last Name</label>
                <input type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-accent dark:focus:border-amber-500 focus:ring-2 focus:ring-accent/20 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Email</label>
              <input type="email" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-accent dark:focus:border-amber-500 focus:ring-2 focus:ring-accent/20 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Message</label>
              <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-accent dark:focus:border-amber-500 focus:ring-2 focus:ring-accent/20 transition-all resize-none"></textarea>
            </div>
            <button type="button" className="w-full bg-accent dark:bg-amber-500 text-white dark:text-slate-900 font-extrabold py-5 rounded-full hover:bg-amber-600 dark:hover:bg-amber-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
