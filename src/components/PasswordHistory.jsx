import React, { useState } from 'react';
import { History, Copy, Check, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PasswordHistory = ({ history, onSelect, onClear }) => {
    const [copiedIndex, setCopiedIndex] = useState(null);

    if (history.length === 0) return null;

    const handleCopy = (e, pass, index) => {
        e.stopPropagation();
        navigator.clipboard.writeText(pass);
        setCopiedIndex(index);
        toast.success('Copied!', { duration: 1500 });
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    return (
        <div className="mt-8 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold tracking-widest">
                    <History size={14} />
                    <span>RECENT ({history.length})</span>
                </div>
                {onClear && (
                    <button
                        onClick={onClear}
                        className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-red-400/10"
                    >
                        <Trash2 size={12} />
                        Clear all
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-1.5 max-h-52 overflow-y-auto pr-1">
                {history.map((pass, index) => (
                    <div
                        key={`${pass}-${index}`}
                        onClick={() => onSelect(pass)}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-all duration-150"
                    >
                        <span className="font-mono text-gray-400 group-hover:text-white truncate text-xs sm:text-sm flex-1 min-w-0 mr-2">
                            {pass}
                        </span>
                        <button
                            onClick={(e) => handleCopy(e, pass, index)}
                            className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${copiedIndex === index ? 'text-moto-primary' : 'text-gray-600 hover:text-gray-300'}`}
                            title="Copy"
                        >
                            {copiedIndex === index ? <Check size={13} /> : <Copy size={13} />}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PasswordHistory;
