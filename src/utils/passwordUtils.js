
export const generatePassword = (length, { upper, lower, number, symbol, excludeAmbiguous }) => {
    const sets = {
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        number: '0123456789',
        symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let charSet = '';
    const required = [];

    if (lower) { charSet += sets.lower; required.push(sets.lower); }
    if (upper) { charSet += sets.upper; required.push(sets.upper); }
    if (number) { charSet += sets.number; required.push(sets.number); }
    if (symbol) { charSet += sets.symbol; required.push(sets.symbol); }

    if (excludeAmbiguous) {
        charSet = charSet.replace(/[Il1O0]/g, '');
    }

    if (!charSet) return '';

    // Guarantee at least one char from each required set
    let passwordChars = required.map(set => {
        const filtered = excludeAmbiguous ? set.replace(/[Il1O0]/g, '') : set;
        if (!filtered) return '';
        return filtered[Math.floor(Math.random() * filtered.length)];
    }).filter(Boolean);

    // Fill the rest randomly
    for (let i = passwordChars.length; i < length; i++) {
        passwordChars.push(charSet[Math.floor(Math.random() * charSet.length)]);
    }

    // Shuffle
    for (let i = passwordChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    return passwordChars.join('');
};

export const generatePin = (length = 4) => {
    let pin = '';
    for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10);
    }
    return pin;
};

export const calculateStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    if (password.length > 8) score += 1;
    if (password.length > 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return Math.min(score, 5); // 0-5
};

export const estimateCrackTime = (password) => {
    if (!password) return '';
    // Determine charset size
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^A-Za-z0-9]/.test(password)) poolSize += 32;

    if (poolSize === 0) return '';

    const combinations = Math.pow(poolSize, password.length);
    // Assume attacker can do 10 billion guesses/sec (modern GPU)
    const guessesPerSec = 1e10;
    const seconds = combinations / guessesPerSec / 2; // avg half the keyspace

    if (seconds < 1) return 'Instant';
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} min`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hrs`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3.154e9) return `${Math.round(seconds / 31536000)} yrs`;
    if (seconds < 3.154e12) return `${(seconds / 3.154e9).toFixed(1)}K yrs`;
    return '∞ (centuries)';
};
