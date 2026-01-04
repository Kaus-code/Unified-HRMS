import React, { useState, useEffect } from 'react';
import { MessageSquare, Package, CheckCircle, XCircle, Clock, AlertCircle, Filter } from 'lucide-react';

const ZoneGrievance = ({ language = 'en', userZone }) => {
    const [activeTab, setActiveTab] = useState('grievances'); // 'grievances' | 'inventory'
    const [grievances, setGrievances] = useState([]);
    const [inventoryRequests, setInventoryRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        if (!userZone) return;
        fetchData();
    }, [userZone, activeTab, refreshTrigger]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'grievances') {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/grievances/${userZone}`);
                const data = await response.json();
                if (data.success) setGrievances(data.grievances);
            } else {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/inventory/${userZone}`);
                const data = await response.json();
                if (data.success) setInventoryRequests(data.requests);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateGrievanceStatus = async (id, status) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/grievance/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (response.ok) setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Error updating grievance:", error);
        }
    };

    const updateInventoryStatus = async (id, status) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/inventory/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (response.ok) setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Error updating inventory:", error);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 border-red-200';
            case 'High': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200';
            default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200';
        }
    };

    return (
        <div className="space-y-6 min-h-[600px]">
            {/* Header & Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {language === 'en' ? 'Grievances & Requests' : 'शिकायतें और अनुरोध'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {language === 'en' ? 'Manage staff concerns and approve resource allocations.' : 'कर्मचारी चिंताओं और संसाधन आवंटन का प्रबंधन करें।'}
                    </p>
                </div>

                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <button
                        onClick={() => setActiveTab('grievances')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'grievances' ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
                    >
                        <div className="flex items-center gap-2">
                            <MessageSquare size={18} />
                            {language === 'en' ? 'Staff Grievances' : 'कर्मचारी शिकायतें'}
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'inventory' ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
                    >
                        <div className="flex items-center gap-2">
                            <Package size={18} />
                            {language === 'en' ? 'Resource Requests' : 'संसाधन अनुरोध'}
                        </div>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex justify-center pt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <div className="space-y-4 animate-in fade-in duration-500">
                    {/* GRIEVANCES TAB */}
                    {activeTab === 'grievances' && (
                        grievances.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">No active grievances found.</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {grievances.map((gr) => (
                                    <div key={gr._id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-purple-200 transition-colors">
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getPriorityColor(gr.Priority || 'Medium')}`}>
                                                        {gr.Priority || 'Medium'}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{new Date(gr.date).toLocaleDateString()}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{gr.IssueType}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">{gr.Description}</p>
                                                <div className="mt-3 text-xs text-gray-500">Raised by ID: {gr.Eid}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {gr.Status !== 'Resolved' ? (
                                                    <button
                                                        onClick={() => updateGrievanceStatus(gr._id, 'Resolved')}
                                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                                                    >
                                                        <CheckCircle size={16} /> Mark Resolved
                                                    </button>
                                                ) : (
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                                                        <CheckCircle size={14} /> Resolved
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {/* INVENTORY TAB */}
                    {activeTab === 'inventory' && (
                        inventoryRequests.length === 0 ? (
                            <div className="text-center py-20">
                                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-400">No pending resource requests.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {inventoryRequests.map((req) => (
                                    <div key={req._id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>

                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                                                <Package size={20} />
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {req.status}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{req.itemName}</h3>
                                        <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">x{req.quantity}</p>

                                        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                                            <div className="flex justify-between">
                                                <span>Ward {req.ward}</span>
                                                <span>{req.urgency} Priority</span>
                                            </div>
                                            <p className="text-xs italic truncate">{req.description}</p>
                                        </div>

                                        {req.status === 'Pending' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => updateInventoryStatus(req._id, 'Approved')}
                                                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-colors"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => updateInventoryStatus(req._id, 'Rejected')}
                                                    className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg font-semibold text-sm transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default ZoneGrievance;
