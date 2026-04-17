export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 pt-20 pb-10 mt-auto transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Brand & Info */}
          <div className="col-span-1">
            <a href="/" className="text-3xl font-extrabold tracking-tighter text-white inline-block mb-6 transition-colors">
              Akin<span className="text-accent">Fapohunda.</span>
            </a>
            <p className="text-slate-400 mt-2 max-w-sm text-lg">
              A Journey Through Life at 70. Federal Public Servant voluntarily retired in 2000, IT Project Management Consultant, and Teacher.
            </p>
            <div className="flex space-x-4 mt-8">
              <a href="https://web.facebook.com/profile.php?id=597433898" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-accent hover:text-white hover:-translate-y-1 transition-all">
                FB
              </a>
              <a href="https://twitter.com/AkinFapohunda" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-accent hover:text-white hover:-translate-y-1 transition-all">
                X
              </a>
              <a href="https://www.instagram.com/akinfapohunda/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-accent hover:text-white hover:-translate-y-1 transition-all">
                IG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:ml-auto">
            <h3 className="text-white font-bold mb-6 text-xl">Quick Links</h3>
            <ul className="space-y-4 text-slate-400">
              <li><a href="/" className="hover:text-accent hover:translate-x-1 inline-block transition-all">Home</a></li>
              <li><a href="/services" className="hover:text-accent hover:translate-x-1 inline-block transition-all">Business / Services</a></li>
              <li><a href="/blog" className="hover:text-accent hover:translate-x-1 inline-block transition-all">Thoughtful Thoughts</a></li>
              <li><a href="/contact" className="hover:text-accent hover:translate-x-1 inline-block transition-all">Contact Me</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1 md:ml-auto">
            <h3 className="text-white font-bold mb-6 text-xl">Contact</h3>
            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="tel:+2348033121004" className="hover:text-accent transition-colors block text-lg font-medium">+234 803 312 1004</a>
              </li>
              <li>
                <a href="mailto:director@aflon.edu.ng" className="hover:text-accent transition-colors block text-lg font-medium">director@aflon.edu.ng</a>
              </li>
              <li className="pt-6 mt-6 border-t border-white/10">
                 <p className="text-sm">Designed and developed by <span className="text-white font-bold">Ziggiphase</span></p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-base flex flex-col md:flex-row justify-between items-center transition-colors">
          <p>© {new Date().getFullYear()} Fapohunda. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-6 font-medium">
             <a href="https://aflon.edu.ng/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Aflon School</a>
             <a href="https://aflonweb.com.ng/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Aflon Web</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
