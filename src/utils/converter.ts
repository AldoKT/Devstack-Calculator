// Mengonversi input dari base apa pun ke desimal BigInt (aman untuk bit besar)
export const parseToDecimal = (value: string, base: number): bigint | null => {
    if (!value.trim()) return null;
    try {
        // Validasi input sesuai basisnya
        const cleanValue = value.trim();
        if (base === 2 && !/^[01]+$/.test(cleanValue)) return null;
        if (base === 8 && !/^[0-7]+$/.test(cleanValue)) return null;
        if (base === 10 && !/^-?\d+$/.test(cleanValue)) return null;
        if (base === 16 && !/^[0-9a-fA-F]+$/.test(cleanValue)) return null;

        if (base === 10) return BigInt(cleanValue);

        // Konversi basis 2, 8, 16 ke desimal
        return BigInt(parseInt(cleanValue, base));
    } catch {
        return null;
    }
};

// Mengonversi desimal ke semua format basis
export const convertDecimalToAll = (decimal: bigint | null) => {
    if (decimal === null) {
        return { dec: '', bin: '', hex: '', oct: '' };
    }

    const num = Number(decimal);
    return {
        dec: decimal.toString(10),
        bin: (num >>> 0).toString(2),
        hex: (num >>> 0).toString(16).toUpperCase(),
        oct: (num >>> 0).toString(8),
    };
};