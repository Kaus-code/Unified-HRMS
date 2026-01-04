import React, { useState, useEffect } from 'react';
import {
    CheckCircle, XCircle, FileText, User, Calendar,
    MapPin, Loader, ExternalLink, RefreshCw, Clock, AlertTriangle, Briefcase, GraduationCap
} from 'lucide-react';

const DCRecruitment = ({ language, userZone }) => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const fetchCandidates = async () => {
        setLoading(true);
        try {
            // Fetch from global pending endpoint
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/recruitment/pending`);
            const data = await response.json();
            if (data.success) {
                setCandidates(data.candidates);
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
        // Optional: Poll every 30 seconds to keep list fresh in "First Come First Serve" scenario
        const interval = setInterval(fetchCandidates, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleApprove = async (candidateId) => {
        setProcessingId(candidateId);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/recruitment/approve`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ candidateId, zone: userZone })
            });
            const data = await response.json();
            if (data.success) {
                // Remove from list immediately to reflect "claimed" status
                setCandidates(prev => prev.filter(c => c._id !== candidateId));
                // Optionally show a toast or success message (simple alert for now)
                // alert(`Successfully hired ${data.user.name}!`); 
            } else {
                alert(data.message || "Failed to approve. Candidate might have been hired by another zone.");
                fetchCandidates(); // Refresh list if collision occurred
            }
        } catch (error) {
            console.error("Approval error:", error);
            alert("Server Error");
        } finally {
            setProcessingId(null);
        }
    };

    const [rejectModal, setRejectModal] = useState({ open: false, candidateId: null });
    const [rejectionReason, setRejectionReason] = useState('');
    const [isRejecting, setIsRejecting] = useState(false);

    const openRejectModal = (id) => {
        setRejectModal({ open: true, candidateId: id });
        setRejectionReason('');
    };

    const confirmReject = async () => {
        if (!rejectionReason.trim()) return alert("Please provide a reason.");
        setIsRejecting(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/recruitment/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ candidateId: rejectModal.candidateId, reason: rejectionReason })
            });
            const data = await response.json();
            if (data.success) {
                setCandidates(prev => prev.filter(c => c._id !== rejectModal.candidateId));
                setRejectModal({ open: false, candidateId: null });
            } else {
                alert(data.message || "Failed to reject");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsRejecting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300 relative">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        {language === 'en' ? 'Global Recruitment Pool' : 'वैश्विक भर्ती पूल'}
                        <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/30">
                            First Come First Serve
                        </span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {language === 'en'
                            ? 'Candidates approved here will be immediately assigned to your zone.'
                            : 'यहाँ स्वीकृत उम्मीदवारों को तुरंत आपके क्षेत्र में नियुक्त किया जाएगा।'}
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-700 dark:text-indigo-300 text-sm font-medium flex items-center gap-2">
                        <Clock size={16} />
                        Live Updates
                    </div>
                    <button
                        onClick={fetchCandidates}
                        className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
                        title="Refresh List"
                    >
                        <RefreshCw size={20} className={`text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* List Content */}
            {loading && candidates.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin text-indigo-600" size={40} />
                </div>
            ) : candidates.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <User className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Pending Candidates</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2">
                        {language === 'en' ? 'All applications have been processed. Great job!' : 'सभी आवेदनों का मूल्यांकन किया जा चुका है।'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {candidates.map((candidate) => (
                        <div
                            key={candidate._id}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-0 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                        >
                            <div className="flex h-full">
                                {/* Left Status Strip */}
                                <div className="w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600"></div>

                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl shadow-inner">
                                                {candidate.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{candidate.fullName}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-mono rounded">
                                                        {candidate.examId}
                                                    </span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <p className="text-xs text-gray-500 font-medium">{candidate.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">DOB</p>
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{new Date(candidate.dob).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    {/* Docs & Actions Grid */}
                                    <div className="mt-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Documents</p>
                                                <a
                                                    href={candidate.documentDriveLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                                                >
                                                    View Drive <ExternalLink size={12} />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                                                <GraduationCap size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Status</p>
                                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Exam Passed</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <button
                                            onClick={() => handleApprove(candidate._id)}
                                            disabled={processingId === candidate._id}
                                            className="flex-1 py-2.5 bg-gray-900 hover:bg-emerald-600 dark:bg-white dark:hover:bg-emerald-500 text-white dark:text-gray-900 hover:text-white dark:hover:text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                                        >
                                            {processingId === candidate._id ? (
                                                <Loader className="animate-spin" size={16} />
                                            ) : (
                                                <>
                                                    <Briefcase size={16} />
                                                    {language === 'en' ? 'Hire Candidate' : 'नियुक्त करें'}
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => openRejectModal(candidate._id)}
                                            className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-900/20 rounded-xl font-medium text-sm transition-colors"
                                            title="Reject Application"
                                        >
                                            <XCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reject Modal */}
            {rejectModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4 text-red-600">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Return Application</h3>
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                            Please provide a reason for returning this application. The candidate will be notified to correct their documents.
                        </p>

                        <textarea
                            className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none text-sm resize-none"
                            rows="4"
                            placeholder="Reason for return (e.g., Documents blurry, Certificate missing)..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        ></textarea>

                        <div className="flex gap-3 justify-end mt-6">
                            <button
                                onClick={() => setRejectModal({ open: false, candidateId: null })}
                                className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReject}
                                disabled={isRejecting}
                                className="px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold shadow-lg shadow-red-500/20 flex items-center gap-2 transition-all active:scale-95"
                            >
                                {isRejecting && <Loader className="animate-spin" size={16} />}
                                Confirm Return
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DCRecruitment;
