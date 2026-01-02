
import React, { useState } from 'react';
import { Search, UserCheck, AlertTriangle, Clock, MapPin } from 'lucide-react';

const SIAttendanceMonitor = ({ language = 'en' }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const attendanceData = [
        { id: 'W-101', name: 'Raju Singh', role: 'Sweeper', location: 'Block A, Market', status: 'Present', checkIn: '06:05 AM', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop' },
        { id: 'W-102', name: 'Mukesh Kumar', role: 'Garbage Collector', location: 'Sector 3 Park', status: 'Late', checkIn: '06:45 AM', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop' },
        { id: 'W-103', name: 'Sunita Devi', role: 'Sweeper', location: 'Main Road', status: 'Absent', checkIn: '--', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
        { id: 'W-104', name: 'Vikram Malhotra', role: 'Driver', location: 'Depot', status: 'Present', checkIn: '05:50 AM', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop' },
        { id: 'W-105', name: 'Anita Roy', role: 'Sweeper', location: 'School Lane', status: 'Present', checkIn: '06:00 AM', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
        { id: 'W-106', name: 'Karan Singh', role: 'Helper', location: 'Market Cluster', status: 'On Leave', checkIn: '--', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
    ];

    const filteredData = attendanceData.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Present': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'Absent': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            case 'Late': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {language === 'en' ? 'Today\'s Attendance' : 'आज की उपस्थिति'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {language === 'en' ? 'Live monitoring of field staff' : 'फील्ड स्टाफ की लाइव निगरानी'}
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={language === 'en' ? "Search worker..." : "कर्मचारी खोजें..."}
                        className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 w-64 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Attendance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((worker) => (
                    <div key={worker.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">

                        {/* Status Stripe */}
                        <div className={`absolute top-0 left-0 w-1 h-full ${worker.status === 'Present' ? 'bg-green-500' :
                                worker.status === 'Absent' ? 'bg-red-500' :
                                    worker.status === 'Late' ? 'bg-amber-500' : 'bg-gray-400'
                            }`}></div>

                        <div className="flex items-start gap-4 pl-2">
                            <img src={worker.image} alt={worker.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm" />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 dark:text-white">{worker.name}</h3>
                                <p className="text-xs text-gray-500 font-mono mb-1">{worker.id} • {worker.role}</p>

                                <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 mb-3">
                                    <MapPin size={12} />
                                    <span className="truncate">{worker.location}</span>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getStatusStyle(worker.status)}`}>
                                        {worker.status}
                                    </span>
                                    {worker.checkIn !== '--' && (
                                        <div className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                                            <Clock size={12} />
                                            {worker.checkIn}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SIAttendanceMonitor;
