import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generatePassword, generatePin, calculateStrength } from '../utils/passwordUtils';
import PasswordDisplay from './PasswordDisplay';
import StrengthMeter from './StrengthMeter';
import PasswordHistory from './PasswordHistory';
import { ArrowRight, Hash, KeyRound, Zap } from 'lucide-react';

const MODES = ['Password', 'PIN'];
const PIN_LENGTHS = [4, 6, 8];

const PasswordGenerator = () => {
    const [mode, setMode] = useState('Password');
    const [length, setLength] = useState(12);
    const [pinLength, setPinLength] = useState(4);
    const [options, setOptions] = useState({
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        excludeAmbiguous: false,
    });
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [history, setHistory] = useState([]);
    const [count, setCount] = useState(0);
    const isMounted = useRef(false);

    const generate = useCallback(() => {
        let newPassword;
        if (mode === 'PIN') {
            newPassword = generatePin(pinLength);
        } else {
            newPassword = generatePassword(length, options);
        }
        setPassword(newPassword);
        setStrength(calculateStrength(newPassword));
        setCount(c => c + 1);

        if (newPassword) {
            setHistory(prev => {
                const without = prev.filter(p => p !== newPassword);
                return [newPassword, ...without].slice(0, 10);
            });
        }
    }, [mode, length, pinLength, options]);

    // Load persisted state on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('passwordHistory');
        const savedCount = localStorage.getItem('passwordCount');
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        if (savedCount) setCount(parseInt(savedCount, 10));
        isMounted.current = true;
    }, []);

    // Persist history & count
    useEffect(() => {
        if (!isMounted.current) return;
        localStorage.setItem('passwordHistory', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        if (!isMounted.current) return;
        localStorage.setItem('passwordCount', String(count));
    }, [count]);

    // Auto-generate on any option / length / mode change (after first mount)
    useEffect(() => {
        if (!isMounted.current) return;
        generate();
    }, [mode, length, pinLength, options]);

    // Generate once on mount
    useEffect(() => {
        generate();
    }, []);

    // Keyboard shortcut – Enter to generate
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Enter') generate();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [generate]);

    const toggleOption = (key) => {
        // excludeAmbiguous is always toggleable
        if (key === 'excludeAmbiguous') {
            setOptions(prev => ({ ...prev, excludeAmbiguous: !prev.excludeAmbiguous }));
            return;
        }
        setOptions(prev => {
            const next = { ...prev, [key]: !prev[key] };
            const coreKeys = ['upper', 'lower', 'number', 'symbol'];
            if (!coreKeys.some(k => next[k])) return prev; // must keep at least one
            return next;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('passwordHistory');
    };

    return (
        <div className="glass p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl w-full mx-auto shadow-2xl backdrop-blur-xl border border-white/10 relative z-10 transition-all">

            {/* Mode Tabs */}
            <div className="flex gap-2 mb-6 p-1 rounded-xl bg-white/5 border border-white/10">
                {MODES.map(m => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200
                            ${mode === m
                                ? 'bg-moto-primary text-black shadow-lg shadow-moto-primary/30'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        {m === 'Password' ? <KeyRound size={15}/> : <Hash size={15}/>}
                        {m}
                    </button>
                ))}
            </div>

            {/* Stats badge */}
            {count > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                    <Zap size={11} className="text-moto-primary/70" />
                    <span>{count.toLocaleString()} password{count !== 1 ? 's' : ''} generated this session</span>
                </div>
            )}

            <PasswordDisplay password={password} onGenerate={generate} />

            {/* Controls */}
            <div className="space-y-6">

                {mode === 'PIN' ? (
                    /* PIN length selector */
                    <div>
                        <label className="text-gray-300 font-medium text-sm sm:text-base md:text-lg block mb-3">PIN Length</label>
                        <div className="flex gap-3">
                            {PIN_LENGTHS.map(len => (
                                <button
                                    key={len}
                                    onClick={() => setPinLength(len)}
                                    className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-200
                                        ${pinLength === len
                                            ? 'bg-moto-primary text-black shadow-lg shadow-moto-primary/30 scale-105'
                                            : 'bg-white/5 text-gray-300 border border-white/10 hover:border-moto-primary/40 hover:text-white'}`}
                                >
                                    {len}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Numeric PIN only — great for quick device locks.</p>
                    </div>
                ) : (
                    /* Password controls */
                    <>
                        {/* Length Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-gray-300 font-medium text-sm sm:text-base md:text-lg">Character Length</label>
                                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-moto-primary tabular-nums">{length}</span>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-moto-primary"
                            />
                            <div className="flex justify-between text-xs text-gray-600 mt-1">
                                <span>4</span><span>64</span>
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                            {[
                                { id: 'upper',  label: 'Uppercase', sub: 'A-Z' },
                                { id: 'lower',  label: 'Lowercase', sub: 'a-z' },
                                { id: 'number', label: 'Numbers',   sub: '0-9' },
                                { id: 'symbol', label: 'Symbols',   sub: '!@#' },
                            ].map(({ id, label, sub }) => (
                                <div
                                    key={id}
                                    onClick={() => toggleOption(id)}
                                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all duration-200
                                        ${options[id]
                                            ? 'bg-moto-primary/10 border-moto-primary/40'
                                            : 'bg-white/3 border-white/10 hover:border-white/20'}`}
                                >
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${options[id] ? 'bg-moto-primary border-moto-primary' : 'border-gray-500'}`}>
                                        {options[id] && (
                                            <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                                            </svg>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-gray-200 select-none">{label}</div>
                                        <div className="text-xs text-gray-500 select-none font-mono">{sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Exclude Ambiguous — full-width toggle */}
                        <div
                            onClick={() => toggleOption('excludeAmbiguous')}
                            className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all duration-200
                                ${options.excludeAmbiguous
                                    ? 'bg-moto-secondary/10 border-moto-secondary/40'
                                    : 'bg-white/3 border-white/10 hover:border-white/20'}`}
                        >
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${options.excludeAmbiguous ? 'bg-moto-secondary border-moto-secondary' : 'border-gray-500'}`}>
                                {options.excludeAmbiguous && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                )}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-200 select-none">Exclude Ambiguous</div>
                                <div className="text-xs text-gray-500 select-none font-mono">No l, 1, I, O, 0</div>
                            </div>
                        </div>
                    </>
                )}

                <StrengthMeter score={strength} password={password} />

                {/* Generate Button */}
                <button
                    onClick={generate}
                    className="w-full bg-moto-primary hover:bg-emerald-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-moto-primary/25 text-sm tracking-widest"
                >
                    GENERATE
                    <ArrowRight size={18} />
                </button>
                <p className="text-center text-xs text-gray-600">Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400 font-mono text-xs">Enter</kbd> to generate</p>
            </div>

            <PasswordHistory
                history={history}
                onSelect={(pass) => {
                    setPassword(pass);
                    setStrength(calculateStrength(pass));
                }}
                onClear={clearHistory}
            />
        </div>
    );
};

export default PasswordGenerator;
