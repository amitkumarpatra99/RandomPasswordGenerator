
export const generatePassword = (length, { upper, lower, number, symbol, excludeAmbiguous }) => {
    let charSet = '';
    if (lower) charSet += 'abcdefghijklmnopqrstuvwxyz';
    if (upper) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (number) charSet += '0123456789';
    if (symbol) charSet += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (excludeAmbiguous) {
        // Exclude: I, l, 1, O, 0
        charSet = charSet.replace(/[Il1O0]/g, '');
    }

    if (!charSet) return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }
    return password;
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
