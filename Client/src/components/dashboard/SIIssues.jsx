import React, { useState } from 'react';
import {
    Search, Filter, CheckCircle, Clock, AlertTriangle, MapPin, Camera
} from 'lucide-react';

const SIIssues = ({ language }) => {
    // Mock Issues Data
    const [issues, setIssues] = useState([
        {
            id: 'ISS-101',
            title: language === 'en' ? 'Garbage pile up near Market' : 'बाजार के पास कचरे का ढेर',
            location: 'Sector 3, Rohini',
            status: 'Pending',
            priority: 'High',
            reportedBy: 'Citizen',
            time: '2 hours ago',
            image: true
        },
        {
            id: 'ISS-102',
            title: language === 'en' ? 'Drain blockage' : 'नाली जाम',
            location: 'Block A, Lane 2',
            status: 'In Progress',
            priority: 'Medium',
            reportedBy: 'Staff',
            time: '5 hours ago',
            image: false
        },
        {
            id: 'ISS-103',
            title: language === 'en' ? 'Street cleaning pending' : 'सड़क की सफाई लंबित',
            location: 'Main Road',
            status: 'Resolved',
            priority: 'Low',
            reportedBy: 'Citizen',
            time: '1 day ago',
            image: true
        }
    ]);

    const handleStatusChange = (id, newStatus) => {
        setIssues(issues.map(issue =>
            issue.id === id ? { ...issue, status: newStatus } : issue
        ));
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Resolved': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-800';
            default: return 'bg-gray-100';
        }
    };

    const [selectedIssue, setSelectedIssue] = useState(null);

    const handleCardClick = (issue) => {
        setSelectedIssue(issue);
    };

    const closeIssueModal = () => {
        setSelectedIssue(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Reported Issues' : 'रिपोर्ट किए गए मुद्दे'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {language === 'en' ? 'Track and resolve issues reported by employees' : 'कर्मचारियों द्वारा रिपोर्ट की गई समस्याओं को ट्रैक और हल करें'}
                    </p>
                </div>
                <div className="flex gap-2">
                    {/* SI cannot raise issues, only resolve them */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {issues.map((issue) => (
                    <div
                        key={issue.id}
                        onClick={() => handleCardClick(issue)}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusStyle(issue.status)}`}>
                                {issue.status}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${issue.priority === 'High' ? 'text-red-600 bg-red-50 dark:bg-red-900/20' :
                                issue.priority === 'Medium' ? 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' :
                                    'text-green-600 bg-green-50 dark:bg-green-900/20'
                                }`}>
                                {issue.priority}
                            </span>
                        </div>

                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {issue.title}
                        </h3>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
                                <MapPin size={14} />
                                {issue.location}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
                                <Clock size={14} />
                                {issue.time}
                            </div>
                            {issue.image && (
                                <div className="flex items-center text-xs text-blue-500 gap-2">
                                    <Camera size={14} />
                                    {language === 'en' ? 'Photo attached' : 'फोटो संलग्न'}
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <span className="text-xs text-gray-400">ID: {issue.id}</span>

                            {issue.status !== 'Resolved' && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(issue.id, 'Resolved');
                                    }}
                                    className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-600 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                                >
                                    <CheckCircle size={14} />
                                    {language === 'en' ? 'Mark Solved' : 'हल करें'}
                                </button>
                            )}
                            {issue.status === 'Resolved' && (
                                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                    <CheckCircle size={14} /> {language === 'en' ? 'Solved' : 'हल किया'}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Issue Details Modal */}
            {selectedIssue && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            {/* Modal Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getStatusStyle(selectedIssue.status)}`}>
                                            {selectedIssue.status}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            ID: {selectedIssue.id}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {selectedIssue.title}
                                    </h3>
                                </div>
                                <button
                                    onClick={closeIssueModal}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="space-y-6">
                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-3">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="text-gray-400 mt-1" size={18} />
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold">Location</p>
                                                <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedIssue.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock className="text-gray-400 mt-1" size={18} />
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold">Time Reported</p>
                                                <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedIssue.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-3">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="text-gray-400 mt-1" size={18} />
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold">Priority</p>
                                                <p className={`text-sm font-medium ${selectedIssue.priority === 'High' ? 'text-red-600' : 'text-amber-600'}`}>
                                                    {selectedIssue.priority} Priority
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-4 h-4 mt-1 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white">i</div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold">Reported By</p>
                                                <p className="text-sm text-gray-900 dark:text-white font-medium">{selectedIssue.reportedBy}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description (Mock) */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Description</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {language === 'en'
                                            ? 'Detailed description of the issue would appear here. This typically includes specifics about the problem size, duration, and any immediate hazards observed.'
                                            : 'मुद्दे का विस्तृत विवरण यहां दिखाई देगा। इसमें आमतौर पर समस्या के आकार, अवधि और देखे गए किसी भी तत्काल खतरे के बारे में विवरण शामिल होता है।'}
                                    </p>
                                </div>

                                {/* Image Preview */}
                                {selectedIssue.image && (
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Attached Photo</h4>
                                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 flex-col gap-2">
                                            <Camera size={32} />
                                            <span className="text-xs">Image Preview Placeholder</span>
                                        </div>
                                    </div>
                                )}

                                {/* Actions in Modal */}
                                <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800 gap-3">
                                    <button
                                        onClick={closeIssueModal}
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors"
                                    >
                                        {language === 'en' ? 'Close' : 'बंद करें'}
                                    </button>
                                    {selectedIssue.status !== 'Resolved' && (
                                        <button
                                            onClick={() => {
                                                handleStatusChange(selectedIssue.id, 'Resolved');
                                                closeIssueModal();
                                            }}
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                                        >
                                            <CheckCircle size={16} />
                                            {language === 'en' ? 'Mark as Resolved' : 'हल के रूप में चिह्नित करें'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SIIssues;
