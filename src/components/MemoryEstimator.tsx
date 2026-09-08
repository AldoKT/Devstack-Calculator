import { useState } from 'react';
import { convertBytes } from '../utils/networkAndMemory';

export default function MemoryEstimator() {
    const [bytesInput, setBytesInput] = useState<number>(1048576); // Default 1 MB

    // Estimator Array
    const [elementCount, setElementCount] = useState<number>(100000);
    const [dataTypeSize, setDataTypeSize] = useState<number>(8); // Default 64-bit / 8 bytes (number/pointer)

    const units = convertBytes(bytesInput);
    const estimatedArrayBytes = elementCount * dataTypeSize;
    const estimatedArrayUnits = convertBytes(estimatedArrayBytes);

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-bold text-sky-400 border-b border-slate-700 pb-2">
                &gt; Data Unit & Memory Estimator
            </h2>

            {/* Konversi Unit Memori */}
            <div className="bg-slate-900 p-4 rounded border border-slate-700 space-y-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase">1. Byte Unit Converter</h3>
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Enter size in Bytes (B):</label>
                    <input
                        type="number"
                        value={bytesInput}
                        onChange={(e) => setBytesInput(Number(e.target.value))}
                        className="w-full bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="bg-slate-800 p-2 rounded border border-slate-700">
                        <span className="text-slate-400 block">KB:</span>
                        <span className="text-emerald-400 font-bold">{units.KB} KB</span>
                    </div>
                    <div className="bg-slate-800 p-2 rounded border border-slate-700">
                        <span className="text-slate-400 block">MB:</span>
                        <span className="text-emerald-400 font-bold">{units.MB} MB</span>
                    </div>
                    <div className="bg-slate-800 p-2 rounded border border-slate-700">
                        <span className="text-slate-400 block">GB:</span>
                        <span className="text-emerald-400 font-bold">{units.GB} GB</span>
                    </div>
                    <div className="bg-slate-800 p-2 rounded border border-slate-700">
                        <span className="text-slate-400 block">TB:</span>
                        <span className="text-emerald-400 font-bold">{units.TB} TB</span>
                    </div>
                </div>
            </div>

            {/* Estimasi Alokasi Array */}
            <div className="bg-slate-900 p-4 rounded border border-slate-700 space-y-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase">2. Array Allocation Estimator</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">Number of Elements:</label>
                        <input
                            type="number"
                            value={elementCount}
                            onChange={(e) => setElementCount(Number(e.target.value))}
                            className="w-full bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">Data Type / Size per Element:</label>
                        <select
                            value={dataTypeSize}
                            onChange={(e) => setDataTypeSize(Number(e.target.value))}
                            className="w-full bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none"
                        >
                            <option value={1}>Boolean / Int8 (1 byte)</option>
                            <option value={2}>Int16 / UTF-16 Char (2 bytes)</option>
                            <option value={4}>Int32 / Float32 (4 bytes)</option>
                            <option value={8}>Int64 / Float64 / JS Number (8 bytes)</option>
                        </select>
                    </div>
                </div>

                <div className="bg-slate-800 p-3 rounded border border-slate-700 font-mono text-sm">
                    <span className="text-slate-400">Estimated RAM Overhead: </span>
                    <span className="text-emerald-400 font-bold">
                        {estimatedArrayUnits.B} Bytes (~{estimatedArrayUnits.MB} MB)
                    </span>
                </div>
            </div>
        </div>
    );
}