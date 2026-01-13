import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const PasswordDisplay = ({ password, onGenerate }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        toast.success('Password copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-input rounded-xl p-4 mb-6 flex items-center justify-between group relative overflow-hidden">
            <div className="flex-1 overflow-x-auto scrollbar-hide mr-4">
                <p className={`text-lg sm:text-2xl font-mono tracking-wider ${password ? 'text-white' : 'text-gray-500'}`}>
                    {password || 'CLICK GENERATE'}
                </p>
            </div>

            <div className="flex items-center gap-2">
                {/* Generate Button (Refresh icon) */}
                <button
                    onClick={onGenerate}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-moto-secondary hover:text-white"
                    title="Regenerate"
                >
                    <RefreshCw size={20} />
                </button>

                <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-moto-primary/20 transition-all text-moto-primary"
                    title="Copy"
                >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordDisplay;
