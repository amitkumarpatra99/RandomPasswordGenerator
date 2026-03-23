import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const PasswordDisplay = ({ password, onGenerate }) => {
    const [copied, setCopied] = useState(false);
    const [flash, setFlash] = useState(false);

    // Flash animation on new password
    useEffect(() => {
        if (!password) return;
        setFlash(true);
        const t = setTimeout(() => setFlash(false), 400);
        return () => clearTimeout(t);
    }, [password]);

    const handleCopy = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        toast.success('Copied to clipboard!', { duration: 1800 });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`glass-input rounded-xl p-4 mb-6 flex items-center justify-between group relative overflow-hidden transition-all duration-300 ${flash ? 'ring-1 ring-moto-primary/50' : ''}`}>
            <div className="flex-1 overflow-x-auto scrollbar-hide mr-3 min-w-0">
                <p className={`text-sm sm:text-base md:text-lg lg:text-xl font-mono tracking-wider break-all transition-opacity duration-200 ${password ? 'text-white' : 'text-gray-500'} ${flash ? 'opacity-70' : 'opacity-100'}`}>
                    {password || 'Click Generate'}
                </p>
                {password && (
                    <p className="text-xs text-gray-600 mt-1 font-mono">{password.length} characters</p>
                )}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
                <button
                    onClick={onGenerate}
                    className="p-2.5 rounded-lg hover:bg-white/10 transition-all text-moto-secondary hover:text-white active:scale-90"
                    title="Regenerate"
                >
                    <RefreshCw size={18} />
                </button>

                <button
                    onClick={handleCopy}
                    className={`p-2.5 rounded-lg transition-all active:scale-90 ${copied ? 'bg-moto-primary/20 text-moto-primary' : 'hover:bg-white/10 text-gray-400 hover:text-moto-primary'}`}
                    title="Copy"
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordDisplay;
