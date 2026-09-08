import { useState } from 'react';
import BaseConverter from './components/BaseConverter';
import BitwiseEngine from './components/BitwiseEngine';
import MemoryEstimator from './components/MemoryEstimator';
import SubnetCalculator from './components/SubnetCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'base' | 'bitwise' | 'memory' | 'subnet'>('base');

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-4xl mx-auto flex flex-col justify-between">
      <div>
        {/* Header Aplikasi */}
        <header className="mb-6 border-b border-slate-700 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-sky-400 font-mono">&gt; DevStack_Calculator.exe</h1>
            <p className="text-slate-400 text-xs md:text-sm">Low-level logic & developer utilities</p>
          </div>
          <span className="text-xs px-2 py-1 rounded bg-slate-800 text-emerald-400 font-mono border border-slate-700">
            v1.0.0
          </span>
        </header>

        {/* Navigasi Tab */}
        <nav className="flex space-x-2 mb-6 border-b border-slate-700 overflow-x-auto pb-1">
          {[
            { id: 'base', label: 'Base Converter' },
            { id: 'bitwise', label: 'Bitwise Engine' },
            { id: 'memory', label: 'Memory Estimator' },
            { id: 'subnet', label: 'Subnet Calculator' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                  ? 'border-sky-400 text-sky-400 bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Area Konten Tab */}
        <main className="bg-slate-800 p-4 md:p-6 rounded-lg border border-slate-700 shadow-xl">
          {activeTab === 'base' && <BaseConverter />}
          {activeTab === 'bitwise' && <BitwiseEngine />}
          {activeTab === 'memory' && <MemoryEstimator />}
          {activeTab === 'subnet' && <SubnetCalculator />}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
        DevStack Calculator — Built with React, TypeScript & Tailwind CSS
      </footer>
    </div>
  );
}