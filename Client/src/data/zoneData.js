// Mock data for 12 MCD Delhi zones
// Structure designed to be easily replaced with REST API data

export const zonePerformanceData = [
    {
        zone_id: "zone_1",
        zone_name: "City SP Zone",
        zone_name_hi: "सिटी एसपी जोन",
        performance_score: 82,
        complaints_resolved: 88,
        complaints_pending: 45,
        sanitation_score: 85,
        revenue_collected: 124.5,
        trend: "up",
        coordinates: [77.21, 28.65] // City SP
    },
    {
        zone_id: "zone_2",
        zone_name: "Central Zone",
        zone_name_hi: "केंद्रीय जोन",
        performance_score: 76,
        complaints_resolved: 82,
        complaints_pending: 67,
        sanitation_score: 78,
        revenue_collected: 156.2,
        trend: "up",
        coordinates: [77.25, 28.55] // Central
    },
    {
        zone_id: "zone_3",
        zone_name: "South Zone",
        zone_name_hi: "दक्षिण जोन",
        performance_score: 91,
        complaints_resolved: 94,
        complaints_pending: 23,
        sanitation_score: 92,
        revenue_collected: 198.7,
        trend: "up",
        coordinates: [77.20, 28.53] // South
    },
    {
        zone_id: "zone_4",
        zone_name: "Shahdara North Zone",
        zone_name_hi: "शाहदरा उत्तर जोन",
        performance_score: 58,
        complaints_resolved: 65,
        complaints_pending: 134,
        sanitation_score: 62,
        revenue_collected: 89.3,
        trend: "down",
        coordinates: [77.29, 28.69] // Shahdara North
    },
    {
        zone_id: "zone_5",
        zone_name: "Shahdara South Zone",
        zone_name_hi: "शाहदरा दक्षिण जोन",
        performance_score: 45,
        complaints_resolved: 52,
        complaints_pending: 189,
        sanitation_score: 48,
        revenue_collected: 67.8,
        trend: "down",
        coordinates: [77.30, 28.62] // Shahdara South
    },
    {
        zone_id: "zone_6",
        zone_name: "Karol Bagh Zone",
        zone_name_hi: "करोल बाग जोन",
        performance_score: 72,
        complaints_resolved: 78,
        complaints_pending: 89,
        sanitation_score: 75,
        revenue_collected: 143.6,
        trend: "stable",
        coordinates: [77.19, 28.64] // Karol Bagh
    },
    {
        zone_id: "zone_7",
        zone_name: "Rohini Zone",
        zone_name_hi: "रोहिणी जोन",
        performance_score: 87,
        complaints_resolved: 91,
        complaints_pending: 34,
        sanitation_score: 89,
        revenue_collected: 167.4,
        trend: "up",
        coordinates: [77.12, 28.71] // Rohini (adjusted)
    },
    {
        zone_id: "zone_8",
        zone_name: "Narela Zone",
        zone_name_hi: "नरेला जोन",
        performance_score: 42,
        complaints_resolved: 48,
        complaints_pending: 212,
        sanitation_score: 45,
        revenue_collected: 54.2,
        trend: "down",
        coordinates: [77.09, 28.84] // Narela
    },
    {
        zone_id: "zone_9",
        zone_name: "Civil Lines Zone",
        zone_name_hi: "सिविल लाइन्स जोन",
        performance_score: 79,
        complaints_resolved: 84,
        complaints_pending: 56,
        sanitation_score: 81,
        revenue_collected: 112.8,
        trend: "up",
        coordinates: [77.22, 28.68] // Civil Lines
    },
    {
        zone_id: "zone_10",
        zone_name: "Najafgarh Zone",
        zone_name_hi: "नजफगढ़ जोन",
        performance_score: 51,
        complaints_resolved: 58,
        complaints_pending: 167,
        sanitation_score: 54,
        revenue_collected: 78.9,
        trend: "stable",
        coordinates: [76.98, 28.61] // Najafgarh
    },
    {
        zone_id: "zone_11",
        zone_name: "West Zone",
        zone_name_hi: "पश्चिम जोन",
        performance_score: 68,
        complaints_resolved: 74,
        complaints_pending: 98,
        sanitation_score: 71,
        revenue_collected: 134.5,
        trend: "up",
        coordinates: [77.12, 28.64] // West Zone
    },
    {
        zone_id: "zone_12",
        zone_name: "Keshavpuram Zone",
        zone_name_hi: "केशवपुरम जोन",
        performance_score: 63,
        complaints_resolved: 69,
        complaints_pending: 112,
        sanitation_score: 66,
        revenue_collected: 98.6,
        trend: "stable",
        coordinates: [77.16, 28.68] // Keshavpuram
    }
];

// Helper function to get zone color based on performance score
export const getZoneColor = (score) => {
    if (score >= 75) return '#6F42C1'; // Primary Purple - Excellent
    if (score >= 50) return '#A074F0'; // Medium Purple - Average
    return '#D8B4FE'; // Light Purple - Needs Attention
};

// Helper function to get zone by ID
export const getZoneById = (zoneId) => {
    return zonePerformanceData.find(zone => zone.zone_id === zoneId);
};

// Helper function to get trend icon
export const getTrendDisplay = (trend) => {
    switch (trend) {
        case 'up': return { icon: '↑', color: '#22c55e', label: 'Improving' };
        case 'down': return { icon: '↓', color: '#ef4444', label: 'Declining' };
        default: return { icon: '→', color: '#6b7280', label: 'Stable' };
    }
};
