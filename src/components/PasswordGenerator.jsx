import React, { useState, useEffect } from 'react';
import { generatePassword, calculateStrength } from '../utils/passwordUtils';
import PasswordDisplay from './PasswordDisplay';
import StrengthMeter from './StrengthMeter';
import PasswordHistory from './PasswordHistory';
import { ArrowRight } from 'lucide-react';

const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [options, setOptions] = useState({
        upper: true,
        lower: true,
        number: true,
        symbol: true
    });
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [history, setHistory] = useState([]);

    const handleGenerate = () => {
        const newPassword = generatePassword(length, options);
        setPassword(newPassword);
        setStrength(calculateStrength(newPassword));

        if (newPassword) {
            setHistory(prev => {
                const newHistory = [newPassword, ...prev].slice(0, 5);
                return newHistory;
            });
        }
    };

    // Generate on mount
    useEffect(() => {
        handleGenerate();
    }, []);

    const toggleOption = (key) => {
        setOptions(prev => {
            const next = { ...prev, [key]: !prev[key] };
            // Prevent deselecting all
            if (!Object.values(next).some(Boolean)) {
                return prev;
            }
            return next;
        });
    };

    return (
        <div className="glass p-8 rounded-3xl w-full max-w-md mx-auto shadow-2xl backdrop-blur-xl border border-white/10 relative z-10">
            <PasswordDisplay password={password} onGenerate={handleGenerate} />

            {/* Controls */}
            <div className="space-y-6">

                {/* Length Slider */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-gray-300 font-medium">Character Length</label>
                        <span className="text-2xl font-bold text-moto-primary">{length}</span>
                    </div>
                    <input
                        type="range"
                        min="4"
                        max="50"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-moto-primary hover:accent-moto-secondary transition-colors"
                    />
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: 'upper', label: 'Uppercase (A-Z)' },
                        { id: 'lower', label: 'Lowercase (a-z)' },
                        { id: 'number', label: 'Numbers (0-9)' },
                        { id: 'symbol', label: 'Symbols (!@#)' },
                    ].map(({ id, label }) => (
                        <div key={id} className="flex items-center space-x-3 cursor-pointer" onClick={() => toggleOption(id)}>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${options[id] ? 'bg-moto-primary border-moto-primary' : 'border-gray-500 bg-transparent'}`}>
                                {options[id] && <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                            </div>
                            <span className="text-gray-300 text-sm select-none">{label}</span>
                        </div>
                    ))}
                </div>

                <StrengthMeter score={strength} />

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    className="w-full bg-moto-primary hover:bg-emerald-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-moto-primary/25"
                >
                    GENERATE
                    <ArrowRight size={20} />
                </button>
            </div>

            <PasswordHistory history={history} onSelect={(pass) => {
                setPassword(pass);
                setStrength(calculateStrength(pass));
            }} />
        </div>
    );
};

export default PasswordGenerator;
