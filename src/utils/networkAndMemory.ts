// --- LOGIKA MEMORY ESTIMATOR ---
export const convertBytes = (bytes: number) => {
    if (isNaN(bytes) || bytes < 0) return { B: '0', KB: '0', MB: '0', GB: '0', TB: '0' };

    return {
        B: bytes.toLocaleString(),
        KB: (bytes / 1024).toFixed(4),
        MB: (bytes / (1024 * 1024)).toFixed(4),
        GB: (bytes / (1024 * 1024 * 1024)).toFixed(6),
        TB: (bytes / (1024 * 1024 * 1024 * 1024)).toFixed(8),
    };
};

// --- LOGIKA SUBNET CALCULATOR ---
export const calculateSubnet = (ip: string, cidr: number) => {
    // Validasi format IP sederhana
    const ipParts = ip.split('.').map((p) => parseInt(p, 10));
    if (ipParts.length !== 4 || ipParts.some((p) => isNaN(p) || p < 0 || p > 255) || cidr < 0 || cidr > 32) {
        return null;
    }

    // Konversi IP ke integer 32-bit
    const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];

    // Hitung Subnet Mask
    const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;

    // Hitung Network ID & Broadcast ID
    const netNum = (ipNum & maskNum) >>> 0;
    const broadNum = (netNum | ~maskNum) >>> 0;

    // Format integer 32-bit kembali ke notasi string Dotted Decimal IP
    const numToIp = (num: number) => [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255,
    ].join('.');

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

    return {
        subnetMask: numToIp(maskNum),
        networkAddress: numToIp(netNum),
        broadcastAddress: numToIp(broadNum),
        firstUsableIp: cidr >= 31 ? numToIp(netNum) : numToIp(netNum + 1),
        lastUsableIp: cidr >= 31 ? numToIp(broadNum) : numToIp(broadNum - 1),
        totalHosts: totalHosts.toLocaleString(),
        usableHosts: usableHosts.toLocaleString(),
    };
};