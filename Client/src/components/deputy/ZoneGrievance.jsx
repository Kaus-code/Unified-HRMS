import React, { useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle, Clock, Trash2 } from 'lucide-react';

const ZoneGrievance = ({ language = 'en' }) => {
    const grievances = [
        { id: 'GR-901', raisedBy: 'SI Rakesh (ROHINI-A)', category: 'Sanitation Equipment', priority: 'High', description: 'Immediate requirement of 5 new waste collection trucks in Rohini Sector 3.', status: 'Pending', date: '2026-01-02' },
        { id: 'GR-902', raisedBy: 'SI Sunita (ROHINI-B)', category: 'Staff Shortage', priority: 'Urgent', description: 'Severe staff shortage affecting primary cleaning operations in the market area.', status: 'Reviewing', date: '2026-01-01' },
        { id: 'GR-905', raisedBy: 'SI Vinod (RITHALA)', category: 'Safety Gear', priority: 'Medium', description: 'Request for additional protective masks and gloves for staff.', status: 'Resolved', date: '2025-12-28' },
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Urgent': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
            case 'High': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
            default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {language === 'en' ? 'Ward Grievances (from SI)' : 'वार्ड शिकायतें (SI से)'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {language === 'en' ? 'Address concerns raised by Ward Sanitation Inspectors' : 'वार्ड सफाई निरीक्षकों द्वारा उठाई गई चिंताओं का समाधान करें'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-2">
                        <Clock size={18} className="text-amber-500" />
                        <span className="text-sm font-semibold">{grievances.filter(g => g.status !== 'Resolved').length} {language === 'en' ? 'Active' : 'सक्रिय'}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {grievances.map((gr) => (
                    <div key={gr.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transition-all">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getPriorityColor(gr.priority)}`}>
                                        {gr.priority}
                                    </span>
                                    <span className="text-xs text-gray-400">{gr.date}</span>
                                    <span className="text-xs font-mono text-purple-600 dark:text-purple-400">{gr.id}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{gr.category}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{gr.description}</p>

                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold">
                                        {gr.raisedBy[3]}
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        {language === 'en' ? 'Raised by:' : 'द्वारा उठाया गया:'} {gr.raisedBy}
                                    </span>
                                </div>
                            </div>

                            <div className="flex md:flex-col justify-end gap-2 shrink-0">
                                {gr.status !== 'Resolved' ? (
                                    <>
                                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#6F42C1] hover:bg-[#5a35a0] text-white rounded-xl text-sm font-medium transition-colors">
                                            <CheckCircle size={16} />
                                            {language === 'en' ? 'Resolve' : 'समाधान करें'}
                                        </button>
                                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors">
                                            <Clock size={16} />
                                            {language === 'en' ? 'Punt to Admin' : 'Admin को भेजें'}
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2 text-green-600 font-semibold px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                                        <CheckCircle size={18} />
                                        <span>{language === 'en' ? 'Resolved' : 'समाधान किया गया'}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZoneGrievance;
