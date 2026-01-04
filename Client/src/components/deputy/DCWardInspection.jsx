import React, { useState, useEffect } from 'react';
import {
    Search, Filter, MapPin, AlertCircle, TrendingUp, TrendingDown,
    MoreHorizontal, ArrowUpRight, CheckCircle2, Clock
} from 'lucide-react';

const DCWardInspection = ({ language = 'en', userZone }) => {
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('critical');
    const [selectedWard, setSelectedWard] = useState(null);

    useEffect(() => {
        if (!userZone) return;

        const fetchWards = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/wards/${userZone}`);
                const data = await response.json();

                if (data.success) {
                    // Normalize data structure
                    const formattedWards = data.wards.map(ward => ({
                        id: ward.wardNumber,
                        name: ward.wardName,
                        zone: ward.zoneName,
                        score: ward.score || 0,
                        sanitation: ward.sanitation || 0,
                        resolved: ward.resolved || 0,
                        pending: ward.pending || 0,
                        trend: ward.trend || 'stable',
                        staffActive: Math.floor(Math.random() * 20) + 10, // Mock for now if not in API
                        totalStaff: 35 // Mock
                    }));
                    setWards(formattedWards);
                }
            } catch (error) {
                console.error("Error fetching wards:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWards();
    }, [userZone]);

    // Filtering and Sorting
    const filteredWards = wards
        .filter(ward =>
            ward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ward.id.toString().includes(searchTerm)
        )
        .sort((a, b) => {
            if (sortBy === 'critical') return a.score - b.score; // Lowest score first
            if (sortBy === 'performance') return b.score - a.score; // Highest score first
            if (sortBy === 'complaints') return b.pending - a.pending; // Most pending complaints first
            return 0;
        });

    const getHealthColor = (score) => {
        if (score >= 75) return 'text-emerald-500 bg-emerald-50 border-emerald-100';
        if (score >= 50) return 'text-amber-500 bg-amber-50 border-amber-100';
        return 'text-red-500 bg-red-50 border-red-100';
    };

    const getProgressColor = (score) => {
        if (score >= 75) return 'bg-emerald-500';
        if (score >= 50) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Ward Inspection Grid' : 'वार्ड निरीक्षण ग्रिड'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'en' ? `Monitoring ${wards.length} wards in ${userZone}` : `${userZone} में ${wards.length} वार्डों की निगरानी`}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={language === 'en' ? 'Search wards...' : 'वार्ड खोजें...'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="pl-9 pr-8 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none appearance-none cursor-pointer"
                        >
                            <option value="critical">{language === 'en' ? 'Critical (Low Score)' : 'गंभीर (कम स्कोर)'}</option>
                            <option value="performance">{language === 'en' ? 'Top Performance' : 'शीर्ष प्रदर्शन'}</option>
                            <option value="complaints">{language === 'en' ? 'High Complaints' : 'अधिक शिकायतें'}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredWards.map(ward => (
                        <div key={ward.id} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-900/50 transition-all duration-300">

                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getHealthColor(ward.score)}`}>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                                            {ward.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {ward.id}</p>
                                    </div>
                                </div>
                                {/* Score Badge */}
                                <div className="flex flex-col items-end">
                                    <span className={`text-lg font-extrabold ${ward.score >= 75 ? 'text-emerald-500' : ward.score >= 50 ? 'text-amber-500' : 'text-red-500'
                                        }`}>
                                        {ward.score}%
                                    </span>
                                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Score</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-5">
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-gray-600 dark:text-gray-300 font-medium">Sanitation Level</span>
                                    <span className="text-gray-900 dark:text-white font-bold">{ward.sanitation}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(ward.sanitation)}`}
                                        style={{ width: `${ward.sanitation}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CheckCircle2 size={14} className="text-emerald-500" />
                                        <span className="text-xs text-gray-500">Resolved</span>
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-white">{ward.resolved}%</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Clock size={14} className="text-amber-500" />
                                        <span className="text-xs text-gray-500">Pending</span>
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-white">{ward.pending}</p>
                                </div>
                            </div>

                            {/* Footer / Action */}
                            <button
                                onClick={() => setSelectedWard(ward)}
                                className="w-full py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 hover:border-purple-200 transition-all flex items-center justify-center gap-2 group/btn"
                            >
                                <span>{language === 'en' ? 'View Digital Log' : 'डिजिटल लॉग देखें'}</span>
                                <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>

                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredWards.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 text-center text-gray-400">
                    <AlertCircle size={48} className="mb-4 opacity-50" />
                    <p>No wards found matching your search.</p>
                </div>
            )}

            {/* Digital Log Modal */}
            {selectedWard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedWard(null)}>
                    <div
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <MapPin size={20} className="text-purple-500" />
                                    {selectedWard.name} - Digital Log
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Ward ID: {selectedWard.id} • {selectedWard.zone}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedWard(null)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="text-gray-500">✕</div>
                            </button>
                        </div>

                        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-6">
                                {/* Current Status Summary */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/50">
                                        <p className="text-xs text-purple-600 dark:text-purple-300 font-medium mb-1">Sanitation Score</p>
                                        <p className="text-2xl font-bold text-purple-700 dark:text-purple-200">{selectedWard.score}%</p>
                                    </div>
                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/50">
                                        <p className="text-xs text-amber-600 dark:text-amber-300 font-medium mb-1">Pending Issues</p>
                                        <p className="text-2xl font-bold text-amber-700 dark:text-amber-200">{selectedWard.pending}</p>
                                    </div>
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                        <p className="text-xs text-emerald-600 dark:text-emerald-300 font-medium mb-1">Active Staff</p>
                                        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-200">{selectedWard.staffActive}/{selectedWard.totalStaff}</p>
                                    </div>
                                </div>

                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Recent Activity Log</h4>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <div className="mt-1">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                    <Clock size={16} />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Sanitation Inspection Completed</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Inspector Rajesh Kumar verified sector 4 cleanliness.</p>
                                                <p className="text-[10px] text-gray-400 mt-2">{item * 2} hours ago</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <div className="mt-1">
                                            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                                <AlertCircle size={16} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">High Priority Grievance Reported</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Garbage overflow near market area reported by citizen.</p>
                                            <p className="text-[10px] text-gray-400 mt-2">Yesterday at 10:30 AM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DCWardInspection;
