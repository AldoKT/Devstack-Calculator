import { useState } from 'react';
import { parseToDecimal, convertDecimalToAll } from '../utils/converter';

export default function BaseConverter() {
    const [inputVal, setInputVal] = useState<string>('');
    const [currentBase, setCurrentBase] = useState<number>(10);

    const decimalVal = parseToDecimal(inputVal, currentBase);
    const results = convertDecimalToAll(decimalVal);

    const handleInputChange = (val: string, base: number) => {
        setInputVal(val);
        setCurrentBase(base);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-bold text-sky-400 border-b border-slate-700 pb-2">
                &gt; Number Base Converter
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Decimal Input */}
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">DECIMAL (Base 10)</label>
                    <input
                        type="text"
                        value={currentBase === 10 ? inputVal : results.dec}
                        onChange={(e) => handleInputChange(e.target.value, 10)}
                        placeholder="e.g. 255"
                        className="w-full bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none focus:border-sky-400"
                    />
                </div>

                {/* Binary Input */}
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">BINARY (Base 2)</label>
                    <input
                        type="text"
                        value={currentBase === 2 ? inputVal : results.bin}
                        onChange={(e) => handleInputChange(e.target.value, 2)}
                        placeholder="e.g. 11111111"
                        className="w-full bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none focus:border-sky-400"
                    />
                </div>

                {/* Hexadecimal Input */}
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">HEXADECIMAL (Base 16)</label>
                    <input
                        type="text"
                        value={currentBase === 16 ? inputVal : results.hex}
                        onChange={(e) => handleInputChange(e.target.value, 16)}
                        placeholder="e.g. FF"
                        className="w-full bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none focus:border-sky-400"
                    />
                </div>

                {/* Octal Input */}
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">OCTAL (Base 8)</label>
                    <input
                        type="text"
                        value={currentBase === 8 ? inputVal : results.oct}
                        onChange={(e) => handleInputChange(e.target.value, 8)}
                        placeholder="e.g. 377"
                        className="w-full bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none focus:border-sky-400"
                    />
                </div>
            </div>
        </div>
    );
}