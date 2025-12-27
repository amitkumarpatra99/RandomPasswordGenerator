import React from 'react';

const StrengthMeter = ({ score }) => {
    // Score 0-5
    const getColor = () => {
        if (score <= 2) return 'bg-red-500';
        if (score === 3) return 'bg-yellow-500';
        if (score >= 4) return 'bg-moto-primary';
        return 'bg-gray-700';
    };

    const getLabel = () => {
        if (score <= 2) return 'WEAK';
        if (score === 3) return 'MEDIUM';
        if (score >= 4) return 'STRONG';
        return '...';
    };

    return (
        <div className="mt-6 mb-6">
            <div className="flex justify-between items-center mb-2 text-sm text-gray-400 font-semibold tracking-wider">
                <span>STRENGTH</span>
                <span className={score >= 4 ? 'text-moto-primary' : score === 3 ? 'text-yellow-500' : 'text-red-500'}>
                    {getLabel()}
                </span>
            </div>
            <div className="flex gap-2 h-2">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className={`flex-1 rounded-full transition-all duration-500 ${score >= item ? getColor() : 'bg-white/10'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StrengthMeter;
