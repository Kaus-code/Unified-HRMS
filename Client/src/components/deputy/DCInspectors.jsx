import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Search, Filter, Loader, AlertTriangle } from 'lucide-react';

const DCInspectors = ({ language = 'en', userZone }) => {
    const [inspectors, setInspectors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterWard, setFilterWard] = useState('All');

    useEffect(() => {
        if (!userZone) return;
        fetchInspectors();
    }, [userZone]);

    const fetchInspectors = async () => {
        setLoading(true);
        try {
            // Remove " Zone" suffix for cleaner matching if needed, but backend regex handles it
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
                        <div key={inspector.employeeId} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group">

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-lg">
                                        {inspector.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">{inspector.name}</h3>
                                        <p className="text-xs text-gray-500 font-mono">{inspector.employeeId}</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg border border-blue-100 dark:border-blue-800">
                                    Ward {inspector.Ward}
                                </span>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="truncate">{inspector.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <Phone size={16} className="text-gray-400" />
                                    <span>{inspector.phone || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span>{inspector.Zone}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                                <button className="w-full py-2 bg-gray-50 dark:bg-gray-700/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl text-sm font-medium transition-colors">
                                    {language === 'en' ? 'View Profile' : 'प्रोफ़ाइल देखें'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DCInspectors;
