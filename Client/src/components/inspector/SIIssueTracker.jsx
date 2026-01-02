
import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, RefreshCw, Filter } from 'lucide-react';

const SIIssueTracker = ({ language = 'en' }) => {
    const [filter, setFilter] = useState('All');

    const issues = [
        { id: 'ISS-201', title: 'Broken Broom Inventory', reporter: 'Raju Singh', status: 'Pending', severity: 'High', date: '2 hrs ago' },
        { id: 'ISS-202', title: 'Garbage Truck Breakdown', reporter: 'Mukesh Kumar', status: 'In Progress', severity: 'Critical', date: '5 hrs ago' },
        { id: 'ISS-204', title: 'Uniform Request', reporter: 'Anita Roy', status: 'Resolved', severity: 'Low', date: '1 day ago' },
        { id: 'ISS-205', title: 'Waterlogging at Sector 4', reporter: 'Public Complaint', status: 'Pending', severity: 'Medium', date: '30 mins ago' },
        { id: 'ISS-208', title: 'Safety Gloves Shortage', reporter: 'Team Lead', status: 'In Progress', severity: 'High', date: '3 hrs ago' },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Resolved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Critical': return 'text-red-500';
            case 'High': return 'text-orange-500';
            case 'Medium': return 'text-yellow-500';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {language === 'en' ? 'Issue Tracker' : 'मुद्दा ट्रैकर'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {language === 'en' ? 'Manage and resolve field issues' : 'क्षेत्रीय मुद्दों का प्रबंधन और समाधान करें'}
                    </p>
                </div>
                <div className="flex gap-2">
                    {['All', 'Pending', 'In Progress', 'Resolved'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === tab
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.filter(i => filter === 'All' || i.status === filter).map(issue => (
                    <div key={issue.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyles(issue.status)}`}>
                                {issue.status}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">{issue.id}</span>
                        </div>

                        <h3 className="font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">{issue.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 flex-1">Rep: <span className="font-medium text-gray-700 dark:text-gray-300">{issue.reporter}</span></p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 text-xs font-medium">
                                <AlertCircle size={14} className={getSeverityColor(issue.severity)} />
                                <span className={getSeverityColor(issue.severity)}>{issue.severity}</span>
                            </div>
                            <span className="text-xs text-gray-400">{issue.date}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex gap-2">
                            {issue.status === 'Pending' && (
                                <button className="flex-1 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center justify-center gap-1">
                                    <Clock size={14} /> Start
                                </button>
                            )}
                            {issue.status !== 'Resolved' && (
                                <button className="flex-1 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl text-xs font-bold hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors flex items-center justify-center gap-1">
                                    <CheckCircle size={14} /> Resolve
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SIIssueTracker;
