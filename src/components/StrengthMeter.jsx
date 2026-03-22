import React from 'react';
import { estimateCrackTime } from '../utils/passwordUtils';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const LEVELS = [
    { max: 1, label: 'Very Weak', color: 'text-red-500',    bar: 'bg-red-500',    icon: ShieldAlert },
    { max: 2, label: 'Weak',      color: 'text-orange-400', bar: 'bg-orange-400', icon: ShieldAlert },
    { max: 3, label: 'Fair',      color: 'text-yellow-400', bar: 'bg-yellow-400', icon: Shield      },
    { max: 4, label: 'Strong',    color: 'text-blue-400',   bar: 'bg-blue-400',   icon: ShieldCheck },
    { max: 5, label: 'Very Strong', color: 'text-moto-primary', bar: 'bg-moto-primary', icon: ShieldCheck },
];

const StrengthMeter = ({ score, password }) => {
    const level = LEVELS.find(l => score <= l.max) || LEVELS[LEVELS.length - 1];
    const Icon = level.icon;
    const crackTime = estimateCrackTime(password);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold tracking-wider">
                <div className="flex items-center gap-1.5 text-gray-400">
                    <Icon size={14} className={level.color} />
                    <span>STRENGTH</span>
                </div>
                <div className="flex items-center gap-3">
                    {crackTime && (
                        <span className="text-xs font-normal text-gray-500">
                            ~{crackTime} to crack
                        </span>
                    )}
                    <span className={`${level.color} transition-colors duration-500`}>
                        {score > 0 ? level.label.toUpperCase() : '...'}
                    </span>
                </div>
            </div>
            <div className="flex gap-1.5 h-1.5">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className={`flex-1 rounded-full transition-all duration-500 ${
                            score >= item ? level.bar : 'bg-white/10'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StrengthMeter;
