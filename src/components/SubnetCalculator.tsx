import { useState } from 'react';
import { calculateSubnet } from '../utils/networkAndMemory';

export default function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.1');
  const [cidr, setCidr] = useState<number>(24);

  const result = calculateSubnet(ipAddress, cidr);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-sky-400 border-b border-slate-700 pb-2">
        &gt; Subnet & IP Calculator (IPv4)
      </h2>

      {/* Input IP & CIDR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 p-4 rounded border border-slate-700">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-400 mb-1">IP Address</label>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="192.168.1.1"
            className="w-full bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Subnet Bits (CIDR)</label>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-mono">/</span>
            <input
              type="number"
              min={0}
              max={32}
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-full bg-slate-800 text-sky-300 font-mono p-2 rounded border border-slate-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Hasil Kalkulasi Subnet */}
      {result ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-900 p-4 rounded border border-slate-700 space-y-2">
            <div>
              <span className="text-slate-400 block">Subnet Mask:</span>
              <span className="text-emerald-400 font-bold text-sm">{result.subnetMask}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Network Address (ID):</span>
              <span className="text-sky-300 font-bold text-sm">{result.networkAddress}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Broadcast Address:</span>
              <span className="text-sky-300 font-bold text-sm">{result.broadcastAddress}</span>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-700 space-y-2">
            <div>
              <span className="text-slate-400 block">Usable IP Range:</span>
              <span className="text-sky-300 font-bold text-sm">
                {result.firstUsableIp} - {result.lastUsableIp}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Usable Hosts:</span>
              <span className="text-emerald-400 font-bold text-sm">{result.usableHosts}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Total IPs:</span>
              <span className="text-slate-300 font-bold text-sm">{result.totalHosts}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-900/30 text-red-400 p-3 rounded border border-red-700 font-mono text-xs">
          Invalid IP Address or CIDR notation. Please enter a valid IPv4 address (e.g. 192.168.1.1/24).
        </div>
      )}
    </div>
  );
}