import React, { useState, useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';
import { MapPin, TrendingUp, Users, CheckCircle, AlertTriangle, BarChart3, Building2, IndianRupee, Trash2, HardHat, ShieldAlert } from 'lucide-react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const ZonePerformanceAnalytics = ({ language }) => {
    const [zones, setZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchZoneData();
    }, []);

    const fetchZoneData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/analytics/zone-comparison`);
            const data = await response.json();

            if (data.success) {
                setZones(data.zones);
            }
        } catch (error) {
            console.error('Error fetching zone data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPerformanceColor = (score) => {
        if (score >= 75) return 'text-green-600 dark:text-green-400';
        if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getPerformanceBg = (score) => {
        if (score >= 75) return 'bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700';
        if (score >= 50) return 'bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700';
        return 'bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700';
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 dark:bg-gray-800 text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700">
                    <p className="font-semibold text-sm">{payload[0].payload.zone}</p>
                    <p className="text-xs text-gray-300 mt-1">
                        Score: <span className="font-bold text-purple-400">{payload[0].value}%</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-4 w-96" />
                    </div>
                </div>
                <Skeleton className="h-[400px] rounded-2xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-64 rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Zone Performance Analytics' : 'क्षेत्र प्रदर्शन विश्लेषण'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {language === 'en' ? 'Comprehensive analysis of all zones across Delhi' : 'दिल्ली भर के सभी क्षेत्रों का व्यापक विश्लेषण'}
                    </p>
                </div>
            </div>

            {/* Performance Overview Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {language === 'en' ? 'Zone Performance Comparison' : 'क्षेत्र प्रदर्शन तुलना'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {language === 'en' ? 'Average ward scores by zone' : 'क्षेत्र के अनुसार औसत वार्ड स्कोर'}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-400">75+</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-400">50-74</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-400">&lt;50</span>
                        </div>
                    </div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={zones} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.1} />
                            <XAxis
                                dataKey="zone"
                                angle={-45}
                                textAnchor="end"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 11 }}
                                height={80}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                domain={[0, 100]}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Bar
                                dataKey="avgScore"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1500}
                            >
                                {zones.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={
                                        entry.avgScore >= 75 ? '#22c55e' : // Green-500
                                            entry.avgScore >= 50 ? '#eab308' : // Yellow-500
                                                '#ef4444' // Red-500
                                    } />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Zone Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {zones.map((zone, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedZone(zone)}
                        className={`group relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl p-4 border cursor-pointer transition-all duration-300 ${selectedZone?.zone === zone.zone
                            ? 'border-purple-500 shadow-md ring-1 ring-purple-500'
                            : 'border-gray-200 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md'
                            }`}
                    >
                        {/* Performance Badge */}
                        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full border text-xs font-bold ${getPerformanceBg(zone.avgScore)}`}>
                            {zone.avgScore}%
                        </div>

                        {/* Zone Info */}
                        <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                                <MapPin size={18} className="text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                                <h3 className="text-base font-bold text-gray-900 dark:text-white truncate pr-16">
                                    {zone.zone}
                                </h3>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {zone.wardCount} {language === 'en' ? 'Wards' : 'वार्ड'} • {zone.staffCount} {language === 'en' ? 'Staff' : 'कर्मचारी'}
                            </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2.5 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <CheckCircle size={12} className="text-purple-600 dark:text-purple-400" />
                                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase">
                                        {language === 'en' ? 'Resolved' : 'हल'}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                    {zone.resolvedIssues}
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2.5 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <AlertTriangle size={12} className="text-blue-600 dark:text-blue-400" />
                                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase">
                                        {language === 'en' ? 'Issues' : 'मुद्दे'}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                    {zone.totalIssues}
                                </p>
                            </div>
                        </div>

                        {/* Resolution Rate Bar */}
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                    {language === 'en' ? 'Resolution' : 'समाधान'}
                                </span>
                                <span className={`text-[10px] font-bold ${getPerformanceColor(zone.resolutionRate)}`}>
                                    {zone.resolutionRate}%
                                </span>
                            </div>
                            <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${zone.resolutionRate}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal - Detailed Zone View */}
            {selectedZone && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <MapPin size={20} className="text-purple-600 dark:text-purple-400" />
                                    {selectedZone.zone}
                                </h3>
                                <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mt-1">
                                    DC: {selectedZone.dcName || 'Not Assigned'}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedZone(null)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <span className="sr-only">Close</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Score Banner */}
                            <div className={`p-5 rounded-2xl flex items-center justify-between shadow-sm ${getPerformanceBg(selectedZone.avgScore)}`}>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                                        {language === 'en' ? 'Overall Performance Score' : 'समग्र प्रदर्शन स्कोर'}
                                    </p>
                                    <p className="text-4xl font-black">
                                        {selectedZone.avgScore}/100
                                    </p>
                                </div>
                                <div className="hidden md:block">
                                    <div className="bg-white/30 p-3 rounded-xl backdrop-blur-sm">
                                        <TrendingUp size={32} />
                                    </div>
                                </div>
                            </div>

                            {/* Detailed DC Reports Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* 1. Revenue & Finance */}
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                                        <IndianRupee size={18} className="text-green-600 dark:text-green-400" />
                                        <h4 className="font-bold text-gray-900 dark:text-white">Revenue & Finance</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Property Tax</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">₹{selectedZone.detailedReport?.revenue?.propertyTax?.collected.toFixed(1)}Cr <span className="text-xs text-gray-500 font-normal">/ ₹{selectedZone.detailedReport?.revenue?.propertyTax?.target.toFixed(1)}Cr</span></span>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${(selectedZone.detailedReport?.revenue?.propertyTax?.collected / selectedZone.detailedReport?.revenue?.propertyTax?.target) * 100}%` }}></div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm pt-1">
                                            <span className="text-gray-600 dark:text-gray-400">Licensing Fees</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">₹{selectedZone.detailedReport?.revenue?.licensing?.collected.toFixed(1)}Cr</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Sanitation (Swachh Bharat) */}
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                                        <Trash2 size={18} className="text-blue-600 dark:text-blue-400" />
                                        <h4 className="font-bold text-gray-900 dark:text-white">Sanitation</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                                            <p className="text-xs text-gray-500">Garbage Lifted</p>
                                            <p className="font-bold text-lg">{selectedZone.detailedReport?.sanitation?.garbageLifted.toFixed(0)} <span className="text-xs font-normal">MT</span></p>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                                            <p className="text-xs text-gray-500">Staff Attendance</p>
                                            <p className="font-bold text-lg text-green-600">{selectedZone.detailedReport?.sanitation?.attendance}%</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Engineering & Works */}
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                                        <HardHat size={18} className="text-amber-600 dark:text-amber-400" />
                                        <h4 className="font-bold text-gray-900 dark:text-white">Engineering</h4>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Unauthorized Const. Booked</span>
                                            <span className="font-bold text-red-500">{selectedZone.detailedReport?.engineering?.unauthorizedConstruction?.booked}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Demolition Actions</span>
                                            <span className="font-bold text-gray-900 dark:text-white">{selectedZone.detailedReport?.engineering?.unauthorizedConstruction?.demolished}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Sealing Actions</span>
                                            <span className="font-bold text-gray-900 dark:text-white">{selectedZone.detailedReport?.engineering?.unauthorizedConstruction?.sealed}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Public Health */}
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                                        <ShieldAlert size={18} className="text-red-600 dark:text-red-400" />
                                        <h4 className="font-bold text-gray-900 dark:text-white">Public Health</h4>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                                            <span className="text-gray-700 dark:text-gray-300">Vector Breeding Detected</span>
                                            <span className="font-bold text-red-600 dark:text-red-400">{selectedZone.detailedReport?.health?.vectorControl?.breedingFound}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2">
                                            <span className="text-gray-600 dark:text-gray-400">Houses Checked</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">{selectedZone.detailedReport?.health?.vectorControl?.housesChecked.toLocaleString()}</span>
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

export default ZonePerformanceAnalytics;
