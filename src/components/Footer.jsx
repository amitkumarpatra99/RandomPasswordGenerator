import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-6 flex flex-col items-center justify-center gap-3 border-t border-white/10 bg-black/10 backdrop-blur-xl relative z-50">
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Made with</span>
                <Heart size={16} className="text-pink-500 fill-pink-500 animate-pulse" />
                <span>by</span>
                
                <a 
                    href="#"
                    className="flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 cursor-pointer"
                >
                    <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold text-xs tracking-wider">
                        MR PATRA
                    </span>
                </a>
            </div>
            
            <div className="text-xs text-gray-600 font-medium">
                © 2025 All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;