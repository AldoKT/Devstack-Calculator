import { useState } from 'react';

export default function BitwiseEngine() {
    const [numA, setNumA] = useState<number>(12);
    const [numB, setNumB] = useState<number>(5);
    const [operation, setOperation] = useState<'AND' | 'OR' | 'XOR' | 'NOT' | 'LSHIFT' | 'RSHIFT'>('AND');

    const calculateResult = () => {
        switch (operation) {
            case 'AND': return numA & numB;
            case 'OR': return numA | numB;
            case 'XOR': return numA ^ numB;
            case 'NOT': return ~numA;
            case 'LSHIFT': return numA << numB;
            case 'RSHIFT': return numA >> numB;
            default: return 0;
        }
    };

    const result = calculateResult();

    // Membentuk array 8 bit dari angka
    const getBits = (val: number) => {
        const bin = (val >>> 0).toString(2).padStart(8, '0').slice(-8);
        return bin.split('').map((bit) => parseInt(bit, 10));
    };

    const toggleBitA = (index: number) => {
        const currentBits = getBits(numA);
        currentBits[index] = currentBits[index] === 1 ? 0 : 1;
        setNumA(parseInt(currentBits.join(''), 2));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-bold text-sky-400 border-b border-slate-700 pb-2">
                &gt; Bitwise Operations & Bit Board
            </h2>

            {/* Input Angka & Operasi */}
            <div className="flex flex-wrap gap-4 items-center bg-slate-900 p-4 rounded border border-slate-700">
                <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Value A</label>
                    <input
                        type="number"
                        value={numA}
                        onChange={(e) => setNumA(Number(e.target.value))}
                        className="w-24 bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Operation</label>
                    <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value as any)}
                        className="bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none"
                    >
                        <option value="AND">AND (&)</option>
                        <option value="OR">OR (|)</option>
                        <option value="XOR">XOR (^)</option>
                        <option value="NOT">NOT (~A)</option>
                        <option value="LSHIFT">Shift Left (&lt;&lt;)</option>
                        <option value="RSHIFT">Shift Right (&gt;&gt;)</option>
                    </select>
                </div>

                {operation !== 'NOT' && (
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1">Value B / Shift</label>
                        <input
                            type="number"
                            value={numB}
                            onChange={(e) => setNumB(Number(e.target.value))}
                            className="w-24 bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none"
                        />
                    </div>
                )}
            </div>

            {/* Papan Bit Interactive (Toggle 0/1 untuk Value A) */}
            <div className="bg-slate-900 p-4 rounded border border-slate-700 space-y-2">
                <span className="text-xs font-semibold text-slate-400 block">
                    Interactive Bit Board (Click bit to toggle Value A):
                </span>
                <div className="flex space-x-2">
                    {getBits(numA).map((bit, idx) => (
                        <button
                            key={idx}
                            onClick={() => toggleBitA(idx)}
                            className={`w-10 h-10 font-bold rounded border transition-colors ${bit === 1
                                    ? 'bg-sky-500 text-slate-950 border-sky-400'
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                                }`}
                        >
                            {bit}
                        </button>
                    ))}
                </div>
            </div>

            {/* Output Hasil */}
            <div className="bg-slate-900 p-4 rounded border border-slate-700 space-y-1">
                <div className="text-xs text-slate-400 font-semibold">RESULT:</div>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                    DEC: {result} | BIN: {(result >>> 0).toString(2)}
                </div>
            </div>
        </div>
    );
}