import React from 'react';
import { History } from 'lucide-react';

const PasswordHistory = ({ history, onSelect, onClear }) => {
    if (history.length === 0) return null;

    return (
        <div className="mt-8 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                    <History size={16} />
                    <span>HISTORY</span>
                </div>
                {onClear && (
                    <button
                        onClick={onClear}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                    >
                        CLEAR
                    </button>
                )}
            </div>
            <div className="flex flex-col gap-2">
                {history.map((pass, index) => (
                    <div
                        key={index}
                        onClick={() => onSelect(pass)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors"
                    >
                        <span className="font-mono text-gray-300 group-hover:text-white truncate max-w-[250px] text-sm">
                            {pass}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PasswordHistory;
