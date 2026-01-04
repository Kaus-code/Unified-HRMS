import React, { useState, useEffect } from 'react';
import {
    User, Phone, Mail, MapPin, Search, Filter, Loader, AlertTriangle,
    CheckCircle, Clock, TrendingUp, X, Calendar, ClipboardList
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const InspectorProfileModal = ({ inspector, onClose, language = 'en' }) => {
    if (!inspector) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                {/* Header with Gradient */}
                <div className="relative h-32 bg-gradient-to-r from-indigo-600 to-purple-600">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors">
                        <X size={20} />
                    </button>
                    <div className="absolute -bottom-12 left-8 flex items-end gap-4">
                        <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 p-1 shadow-xl">
                            <div className="w-full h-full rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                {inspector.name[0]}
                            </div>
                        </div>
                        <div className="pb-2 translate-y-4">
                            <h2 className="text-2xl font-bold text-[#c5d2d7]">{inspector.name}</h2>
                            <p className="text-indigo-100 font-mono text-sm opacity-90">{inspector.employeeId}</p>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="pt-16 px-8 pb-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{inspector.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Phone</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{inspector.phone || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Assignment</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{inspector.Zone} • Ward {inspector.Ward}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Joined</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                    {inspector.joiningDate ? new Date(inspector.joiningDate).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <TrendingUp size={20} className="text-indigo-500" /> Performance Metrics
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-center">
                                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{inspector.stats?.sanitationScore || 0}%</div>
                                <div className="text-xs font-semibold text-indigo-800/60 dark:text-indigo-300">Sanitation Score</div>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{inspector.stats?.resolutionRate || 0}%</div>
                                <div className="text-xs font-semibold text-emerald-800/60 dark:text-emerald-300">Resolution Rate</div>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-800 text-center">
                                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{inspector.stats?.pendingIssues || 0}</div>
                                <div className="text-xs font-semibold text-amber-800/60 dark:text-amber-300">Pending Issues</div>
                            </div>
                        </div>
                    </div>

                    {/* Staff & Responsibility */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <User size={20} className="text-gray-500" /> Team Responsibility
                        </h3>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Staff Managed</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{inspector.stats?.staffCount || 0} Employees</p>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Grievances</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{inspector.stats?.totalIssues || 0} Recieved</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};


const DCInspectors = ({ language = 'en', userZone }) => {
    const [inspectors, setInspectors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterWard, setFilterWard] = useState('All');
    const [selectedInspector, setSelectedInspector] = useState(null);

    useEffect(() => {
        if (!userZone) return;
        fetchInspectors();
    }, [userZone]);

    const fetchInspectors = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/inspectors/${userZone}`);
            const data = await response.json();
            if (data.success) {
                setInspectors(data.inspectors);
            }
        } catch (error) {
            console.error("Error fetching inspectors:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredInspectors = inspectors.filter(ins => {
        const matchesSearch = ins.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ins.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesWard = filterWard === 'All' || ins.Ward?.toString() === filterWard;
        return matchesSearch && matchesWard;
    });

    const uniqueWards = [...new Set(inspectors.map(i => i.Ward))].filter(Boolean).sort((a, b) => a - b);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        {language === 'en' ? 'Sanitary Inspectors' : 'स्वच्छता निरीक्षक'}
                        <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                            {inspectors.length}
                        </span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {language === 'en'
                            ? `List of Sanitary Inspectors serving in ${userZone}`
                            : `${userZone} में कार्यरत स्वच्छता निरीक्षकों की सूची`}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={language === 'en' ? "Search inspector..." : "निरीक्षक खोजें..."}
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        value={filterWard}
                        onChange={(e) => setFilterWard(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="All">{language === 'en' ? 'All Wards' : 'सभी वार्ड'}</option>
                        {uniqueWards.map(w => (
                            <option key={w} value={w.toString()}>{language === 'en' ? `Ward ${w}` : `वार्ड ${w}`}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader className="animate-spin text-purple-600" size={40} />
                </div>
            ) : filteredInspectors.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <User className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
                    <p className="text-gray-500 dark:text-gray-400">{language === 'en' ? 'No inspectors found.' : 'कोई निरीक्षक नहीं मिला।'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInspectors.map((inspector) => (
                        <div key={inspector.employeeId} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">

                            {/* Card Header with Color Splash */}
                            <div className="h-24 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 relative">
                                <span className="absolute top-4 right-4 px-3 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-600">
                                    Ward {inspector.Ward}
                                </span>
                            </div>

                            {/* Info Section */}
                            <div className="px-6 pb-6 -mt-10 relative">
                                <div className="flex justify-between items-end mb-4">
                                    <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 p-1.5 shadow-lg">
                                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 flex items-center justify-center text-2xl font-bold text-purple-600 dark:text-purple-400">
                                            {inspector.name[0]}
                                        </div>
                                    </div>
                                    {/* Mini Score Badge */}
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 mb-0.5">Performance</p>
                                        <p className="text-lg font-bold text-emerald-600">{inspector.stats?.sanitationScore || 0}%</p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{inspector.name}</h3>
                                <p className="text-xs text-gray-500 font-mono mb-6">{inspector.employeeId}</p>

                                {/* Quick Stats Row */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-gray-50 dark:bg-gray-700/30 p-2.5 rounded-xl border border-gray-100 dark:border-gray-600/50">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Resolutions</p>
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{inspector.stats?.resolutionRate || 0}%</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/30 p-2.5 rounded-xl border border-gray-100 dark:border-gray-600/50">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Staff</p>
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{inspector.stats?.staffCount || 0}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedInspector(inspector)}
                                    className="w-full py-3 bg-gray-900 hover:bg-purple-600 dark:bg-white dark:hover:bg-purple-500 dark:text-gray-900 dark:hover:text-white text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-gray-200 dark:shadow-none"
                                >
                                    {language === 'en' ? 'View Profile' : 'प्रोफ़ाइल देखें'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Profile Modal */}
            {selectedInspector && (
                <InspectorProfileModal
                    inspector={selectedInspector}
                    onClose={() => setSelectedInspector(null)}
                    language={language}
                />
            )}
        </div>
    );
};

export default DCInspectors;
