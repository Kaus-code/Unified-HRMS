import React, { useState, useEffect } from 'react';
import {
    Users, Star, TrendingUp, MapPin, Phone, Mail, Calendar,
    FileText, X, CheckCircle, AlertTriangle, ShieldAlert
} from 'lucide-react';

const DCManagement = ({ language }) => {
    const [dcs, setDcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDC, setSelectedDC] = useState(null);
    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [showMeetingModal, setShowMeetingModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    // Form States
    const [noticeForm, setNoticeForm] = useState({ subject: '', message: '', priority: 'Normal', type: 'General' });
    const [meetingForm, setMeetingForm] = useState({ subject: '', date: '', time: '', type: 'Online', link: '' });

    useEffect(() => {
        fetchDCs();
    }, []);

    const fetchDCs = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/commissioner/deputy-commissioners`);
            const data = await response.json();
            if (data.success) setDcs(data.deputyCommissioners);
        } catch (error) {
            console.error('Error fetching DCs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendNotice = async (e) => {
        e.preventDefault();
        try {
            // Mock Commissioner ID for now - replaced with real auth later
            const commissionerId = "65b2a123c456d789e012f345";

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/commissioner/deputy-commissioners/${selectedDC._id}/notice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...noticeForm, senderId: commissionerId })
            });
            const data = await response.json();
            if (data.success) {
                alert('Notice sent successfully!');
                setShowNoticeModal(false);
                setNoticeForm({ subject: '', message: '', priority: 'Normal', type: 'General' });
            }
        } catch (error) {
            console.error('Error sending notice:', error);
        }
    };

    const handleScheduleMeeting = async (e) => {
        e.preventDefault();
        try {
            // Mock Commissioner ID
            const commissionerId = "65b2a123c456d789e012f345";

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/commissioner/deputy-commissioners/${selectedDC._id}/meeting`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...meetingForm, organizerId: commissionerId })
            });
            const data = await response.json();
            if (data.success) {
                alert('Meeting scheduled successfully!');
                setShowMeetingModal(false);
                setMeetingForm({ subject: '', date: '', time: '', type: 'Online', link: '' });
            }
        } catch (error) {
            console.error('Error scheduling meeting:', error);
        }
    };

    const openActionModal = (dc, type) => {
        setSelectedDC(dc);
        if (type === 'notice') setShowNoticeModal(true);
        if (type === 'meeting') setShowMeetingModal(true);
        if (type === 'profile') setShowProfileModal(true);
    };

    if (loading) {
        return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {language === 'en' ? 'Deputy Commissioner Management' : 'उप आयुक्त प्रबंधन'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dcs.map((dc) => (
                    <div key={dc._id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all group">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl ring-2 ring-purple-100 dark:ring-purple-900">
                                {dc.name?.charAt(0) || 'D'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                    {dc.name}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    <MapPin size={14} className="text-purple-500" />
                                    <span>{dc.zone}</span>
                                </div>
                                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded textxs font-medium mt-2 ${dc.performance?.score >= 75 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        dc.performance?.score >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                    <Star size={12} fill="currentColor" />
                                    {dc.performance?.score || 0}% Score
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons Row */}
                        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                onClick={() => openActionModal(dc, 'notice')}
                                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                            >
                                <ShieldAlert size={20} />
                                <span className="text-xs font-medium">Notice</span>
                            </button>
                            <button
                                onClick={() => openActionModal(dc, 'meeting')}
                                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                <Calendar size={20} />
                                <span className="text-xs font-medium">Meet</span>
                            </button>
                            <button
                                onClick={() => openActionModal(dc, 'profile')}
                                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                            >
                                <FileText size={20} />
                                <span className="text-xs font-medium">Profile</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* SEND NOTICE MODAL */}
            {showNoticeModal && selectedDC && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <ShieldAlert className="text-red-500" /> Send Notice
                            </h3>
                            <button onClick={() => setShowNoticeModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSendNotice} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                                    value={noticeForm.subject}
                                    onChange={(e) => setNoticeForm({ ...noticeForm, subject: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <select
                                        className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                                        value={noticeForm.type}
                                        onChange={(e) => setNoticeForm({ ...noticeForm, type: e.target.value })}
                                    >
                                        <option>General</option>
                                        <option>Show Cause</option>
                                        <option>Directive</option>
                                        <option>Appreciation</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Priority</label>
                                    <select
                                        className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                                        value={noticeForm.priority}
                                        onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value })}
                                    >
                                        <option>Normal</option>
                                        <option>High</option>
                                        <option>Urgent</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                                    value={noticeForm.message}
                                    onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">
                                Send Official Notice
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* SCHEDULE MEETING MODAL */}
            {showMeetingModal && selectedDC && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Calendar className="text-blue-500" /> Schedule Meeting
                            </h3>
                            <button onClick={() => setShowMeetingModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleScheduleMeeting} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                                    value={meetingForm.subject}
                                    onChange={(e) => setMeetingForm({ ...meetingForm, subject: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                                        value={meetingForm.date}
                                        onChange={(e) => setMeetingForm({ ...meetingForm, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Time</label>
                                    <input
                                        type="time"
                                        required
                                        className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                                        value={meetingForm.time}
                                        onChange={(e) => setMeetingForm({ ...meetingForm, time: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select
                                    className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                                    value={meetingForm.type}
                                    onChange={(e) => setMeetingForm({ ...meetingForm, type: e.target.value })}
                                >
                                    <option>Online</option>
                                    <option>In-Person</option>
                                </select>
                            </div>
                            {meetingForm.type === 'Online' && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Meeting Link (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                                        placeholder="Zoom/Google Meet"
                                        value={meetingForm.link}
                                        onChange={(e) => setMeetingForm({ ...meetingForm, link: e.target.value })}
                                    />
                                </div>
                            )}
                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                                Schedule Meeting
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* PROFILE MODAL (Placeholder for Phase 2 Detailed View) */}
            {showProfileModal && selectedDC && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                                    {selectedDC.name?.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDC.name}</h2>
                                    <p className="text-purple-600 dark:text-purple-400 font-medium">{selectedDC.zone} Zone</p>
                                </div>
                            </div>
                            <button onClick={() => setShowProfileModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl text-center">
                                <p className="text-sm text-gray-500 mb-1">Performance</p>
                                <p className="text-2xl font-bold text-purple-600">{selectedDC.performance?.score}%</p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl text-center">
                                <p className="text-sm text-gray-500 mb-1">Wards</p>
                                <p className="text-2xl font-bold text-blue-600">{selectedDC.performance?.wardsManaged}</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl text-center">
                                <p className="text-sm text-gray-500 mb-1">Resolved</p>
                                <p className="text-2xl font-bold text-green-600">{selectedDC.performance?.grievancesResolved}</p>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl text-center">
                                <p className="text-sm text-gray-500 mb-1">Avg Ward Score</p>
                                <p className="text-2xl font-bold text-amber-600">{selectedDC.performance?.avgWardScore}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl text-center text-gray-500 text-sm">
                            <TrendingUp className="mx-auto mb-2 opacity-50" />
                            Detailed activity timeline and historical performance data will be rendered here.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DCManagement;
