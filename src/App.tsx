import { useState } from 'react';
import BaseConverter from './components/BaseConverter';
import BitwiseEngine from './components/BitwiseEngine';
import MemoryEstimator from './components/MemoryEstimator';
import SubnetCalculator from './components/SubnetCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'base' | 'bitwise' | 'memory' | 'subnet'>('base');

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <header className="mb-8 border-b border-slate-700 pb-4">
        <h1 className="text-2xl font-bold text-sky-400">&gt; DevStack_Calculator.exe</h1>
        <p className="text-slate-400 text-sm">Low-level logic & developer utilities</p>
      </header>

      <nav className="flex space-x-2 mb-6 border-b border-slate-700">
        {[
          { id: 'base', label: 'Base Converter' },
          { id: 'bitwise', label: 'Bitwise Engine' },
          { id: 'memory', label: 'Memory Estimator' },
          { id: 'subnet', label: 'Subnet Calculator' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                ? 'border-sky-400 text-sky-400 bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl">
        {activeTab === 'base' && <BaseConverter />}
        {activeTab === 'bitwise' && <BitwiseEngine />}
        {activeTab === 'memory' && <MemoryEstimator />}
        {activeTab === 'subnet' && <SubnetCalculator />}
      </main>
    </div>
  );
}