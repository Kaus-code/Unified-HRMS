
import React, { useState } from 'react';
import { Star, Search, Users, Trophy, Award, AlertTriangle } from 'lucide-react';

const SIWeeklyCredits = ({ language = 'en' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [creditValue, setCreditValue] = useState(9);

    // Validating active week logic (mock)
    const activeWeek = 2; // Current active week (1-4)
    const canAssignCredits = true;

    const employees = [
        { id: 'W-101', name: 'Raju Singh', role: 'Sweeper', credit: 8, history: [7, 8, 0, 0] },
        { id: 'W-102', name: 'Mukesh Kumar', role: 'Garbage Collector', credit: 0, history: [8, 0, 0, 0] },
        { id: 'W-103', name: 'Sunita Devi', role: 'Sweeper', credit: 9, history: [9, 9, 0, 0] },
        { id: 'W-104', name: 'Vikram Malhotra', role: 'Driver', credit: 0, history: [7, 0, 0, 0] },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">
                            {language === 'en' ? 'Weekly Credit System' : 'साप्ताहिक क्रेडिट सिस्टम'}
                        </h2>
                        <p className="text-orange-50 text-sm max-w-lg">
                            {language === 'en'
                                ? 'Award performance credits (1-10) to motivate staff. Credits can be assigned once per week.'
                                : 'कर्मचारियों को प्रेरित करने के लिए प्रदर्शन क्रेडिट (1-10) प्रदान करें। क्रेडिट सप्ताह में एक बार दिए जा सकते हैं।'}
                        </p>
                    </div>
                    <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <p className="text-xs uppercase tracking-widest font-bold opacity-80">Current Cycle</p>
                        <p className="text-3xl font-bold">Week {activeWeek}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Manual Assignment */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <Trophy className="text-amber-500" size={20} />
                            {language === 'en' ? 'Top Performer Assignment' : 'शीर्ष कलाकार असाइनमेंट'}
                        </h3>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by ID or Name..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 rounded-xl px-4 border border-gray-200 dark:border-gray-700">
                            <span className="text-sm text-gray-500">Credit:</span>
                            <select
                                className="bg-transparent font-bold text-gray-800 dark:text-white outline-none"
                                value={creditValue}
                                onChange={(e) => setCreditValue(e.target.value)}
                            >
                                {[...Array(11).keys()].map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 rounded-xl transition-colors">
                            Assign
                        </button>
                    </div>

                    <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Assignments</p>
                        {employees.filter(e => e.credit > 0).map(emp => (
                            <div key={emp.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold text-xs">
                                        {emp.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-800 dark:text-white">{emp.name}</p>
                                        <p className="text-xs text-gray-500">{emp.id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star size={14} className="fill-amber-400 text-amber-400" />
                                    <span className="font-bold text-gray-800 dark:text-white">{emp.credit}/10</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bulk Action */}
                <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-lg p-6 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

                    <div>
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                            <Users size={24} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Bulk Credit</h3>
                        <p className="text-indigo-200 text-sm mb-6">
                            Assign standard credits to all remaining employees who haven't received a score this week.
                        </p>

                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 mb-6">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-indigo-200">Standard Credit</span>
                                <span className="font-bold text-white text-lg">7.0</span>
                            </div>
                            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-indigo-400 w-[70%] h-full rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                        <Award size={18} />
                        Apply to All Remaining
                    </button>

                    <div className="mt-4 flex items-center gap-2 text-xs text-indigo-300 justify-center">
                        <AlertTriangle size={12} />
                        <span>Action cannot be undone for this week</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SIWeeklyCredits;
