import React from 'react';
import { Github, Code2, Lock } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full px-6 py-4 flex items-center justify-between z-50 backdrop-blur-xl bg-black/10 border-b border-white/10">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
          <Lock className="w-5 h-5 text-purple-300" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-tight">
          Password Gen
          <span className="hidden sm:inline">erator</span>
        </h1>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3">
        {/* GitHub Button */}
        <a
          href="https://github.com/amitkumarpatra99"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 active:scale-95"
        >
          <Github size={18} className="text-gray-300 group-hover:text-white transition-colors" />
          <span className="text-sm font-medium text-gray-300 group-hover:text-white hidden sm:block">
            GitHub
          </span>
        </a>

        {/* Developer Button */}
        <a
          href="https://mrpatra.vercel.app/"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 active:scale-95"
        >
          <Code2 size={18} />
          <span className="text-sm font-medium hidden sm:block">
            Developer
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;