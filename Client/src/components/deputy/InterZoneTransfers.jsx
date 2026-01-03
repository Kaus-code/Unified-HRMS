import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, MapPin, Search, CheckCircle, XCircle, Clock, Plus, X, Loader } from 'lucide-react';

const InterZoneTransfers = ({ language = 'en', userZone }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Form state
    const [formData, setFormData] = useState({
        employeeId: '',
        targetZone: '',
        targetWard: '',
        reason: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!userZone) return;
        fetchTransfers();
    }, [userZone, refreshTrigger]);

    const fetchTransfers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/transfers/${userZone}`);
            const data = await response.json();
            if (data.success) {
                setTransfers(data.transfers);
            }
        } catch (error) {
            console.error("Error fetching transfers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTransfer = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatusMessage({ type: '', text: '' });

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/transfer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    requestedBy: userZone // In a real app this would be ID, but using Zone for context
                })
            });
            const data = await response.json();

            if (data.success) {
                setStatusMessage({ type: 'success', text: 'Transfer request created successfully!' });
                setFormData({ employeeId: '', targetZone: '', targetWard: '', reason: '' });
                setTimeout(() => {
                    setShowModal(false);
                    setRefreshTrigger(prev => prev + 1);
                    setStatusMessage({ type: '', text: '' });
                }, 1500);
            } else {
                setStatusMessage({ type: 'error', text: data.message || 'Failed to create request' });
            }
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'Network error occurred' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        if (!confirm(`Are you sure you want to ${status} this request?`)) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/transfer/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (data.success) {
                setRefreshTrigger(prev => prev + 1);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error updating transfer:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Denied': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        }
    };

    const filteredTransfers = transfers.filter(tr =>
        tr.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tr.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {language === 'en' ? 'Inter-Zone Transfers' : 'अंतर-क्षेत्र स्थानांतरण'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {language === 'en' ? 'Manage and approve employee movement across different wards' : 'विभिन्न वार्ड में कर्मचारी आवाजाही को प्रबंधित और अनुमोदित करें'}
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-2.5 bg-[#6F42C1] hover:bg-[#5a35a0] text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2 cursor-pointer"
                >
                    <Plus size={18} />
                    {language === 'en' ? 'New Transfer Request' : 'नया स्थानांतरण अनुरोध'}
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                {language === 'en' ? 'New Transfer Request' : 'नया स्थानांतरण अनुरोध'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTransfer} className="p-6 space-y-4">
                            {statusMessage.text && (
                                <div className={`p-3 rounded-lg text-sm ${statusMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                    {statusMessage.text}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee ID</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. EMP12345"
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
                                    value={formData.employeeId}
                                    onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Zone</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Rohini Zone"
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
                                        value={formData.targetZone}
                                        onChange={e => setFormData({ ...formData, targetZone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Ward</label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="e.g. 5"
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
                                        value={formData.targetWard}
                                        onChange={e => setFormData({ ...formData, targetWard: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
                                    value={formData.reason}
                                    onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-2.5 bg-[#6F42C1] hover:bg-[#5a35a0] text-white font-bold rounded-xl transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                                >
                                    {submitting && <Loader size={16} className="animate-spin" />}
                                    {language === 'en' ? 'Submit Request' : 'अनुरोध भेजें'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Transfer List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'Employee' : 'कर्मचारी'}</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'From → To' : 'कहाँ से → कहाँ तक'}</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'Reason' : 'कारण'}</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'Status' : 'स्थिति'}</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{language === 'en' ? 'Action' : 'कार्रवाई'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-500">
                                        <div className="flex justify-center items-center gap-2">
                                            <Loader className="animate-spin" size={20} /> Loading...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTransfers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-500">No transfer requests found.</td>
                                </tr>
                            ) : (
                                filteredTransfers.map((tr) => (
                                    <tr key={tr._id} className="hover:bg-gray-50 dark:hover:bg-gray-750/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 dark:text-white">{tr.employeeName}</div>
                                            <div className="text-xs text-gray-500">{tr.employeeId}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="text-xs">
                                                    <div className="text-gray-500">From</div>
                                                    <div className="font-semibold text-gray-700 dark:text-gray-300">{tr.currentZone} (Ward {tr.currentWard})</div>
                                                </div>
                                                <ArrowRightLeft size={14} className="text-purple-400 mx-1" />
                                                <div className="text-xs">
                                                    <div className="text-gray-500">To</div>
                                                    <div className="font-semibold text-purple-700 dark:text-purple-300">{tr.targetZone} (Ward {tr.targetWard})</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-[200px] truncate" title={tr.reason}>
                                            {tr.reason}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tr.status)}`}>
                                                {tr.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {tr.status === 'Pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleUpdateStatus(tr._id, 'Approved')}
                                                        className="p-2 bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white rounded-lg transition-all"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(tr._id, 'Denied')}
                                                        className="p-2 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                                        title="Deny"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">
                                                    {language === 'en' ? 'Resolved on' : 'निपटाया गया'} {tr.resolvedAt ? new Date(tr.resolvedAt).toLocaleDateString() : 'N/A'}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InterZoneTransfers;
