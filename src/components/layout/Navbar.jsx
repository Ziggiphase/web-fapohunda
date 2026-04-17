import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Menu, X, ExternalLink, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../ThemeProvider";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Business", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Me", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-500 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-white transition-colors duration-500">
              Akin<span className="text-accent">Fapohunda.</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-end w-full">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "relative px-3 py-2 text-sm font-semibold transition-all hover:text-accent dark:hover:text-amber-400 group",
                    location.pathname === link.path
                      ? "text-accent dark:text-amber-400"
                      : "text-slate-600 dark:text-slate-300"
                  )}
                >
                  {link.name}
                  {location.pathname === link.path ? (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full" />
                  ) : (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              ))}
              
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2 transition-colors duration-500"></div>
              
              {/* External Links */}
              <a href="https://aflon.edu.ng/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-amber-400 flex items-center gap-1 transition-colors duration-300">
                Aflon School
              </a>
              <a href="https://acair.edu.ng/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-amber-400 flex items-center gap-1 transition-colors duration-300">
                ACAIR <ExternalLink size={12} />
              </a>

              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-full text-slate-500 hover:text-amber-500 hover:bg-amber-50 dark:text-slate-400 dark:hover:text-amber-300 dark:hover:bg-slate-800 transition-all focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link
                to="/contact"
                className="ml-4 px-6 py-2.5 rounded-[2rem] bg-accent text-white font-medium hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-accent/20 transform hover:-translate-y-0.5"
              >
                Let's Talk
              </Link>
            </div>
          </div>

          {/* Mobile menu controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:text-amber-500 dark:text-slate-400 transition-all focus:outline-none"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-accent bg-amber-50 dark:bg-slate-800/50"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a href="https://aflon.edu.ng/" className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium">Aflon School</a>
            <a href="https://acair.edu.ng/" className="block px-3 py-2 text-slate-600 dark:text-slate-300 font-medium">ACAIR</a>
          </div>
        </div>
      )}
    </nav>
  );
}
