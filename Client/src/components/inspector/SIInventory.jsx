import React, { useState, useEffect } from 'react';
import { Package, Plus, X, Send, Trash2, ShoppingCart, AlertCircle, CheckCircle, Clock, Loader } from 'lucide-react';

const SIInventory = ({ language = 'en', currentUser }) => {
    const [inventory, setInventory] = useState([
        { id: 1, name: 'Broom', quantity: 45, minStock: 20, unit: 'pieces', category: 'Cleaning' },
        { id: 2, name: 'Dustpan', quantity: 30, minStock: 15, unit: 'pieces', category: 'Cleaning' },
        { id: 3, name: 'Rubber Gloves', quantity: 8, minStock: 25, unit: 'pairs', category: 'Safety' },
        { id: 4, name: 'Sanitizer (5L)', quantity: 12, minStock: 10, unit: 'bottles', category: 'Hygiene' },
        { id: 5, name: 'Garbage Bags (Large)', quantity: 150, minStock: 100, unit: 'pieces', category: 'Waste' },
        { id: 6, name: 'Face Masks', quantity: 200, minStock: 50, unit: 'pieces', category: 'Safety' },
        { id: 7, name: 'Mop', quantity: 18, minStock: 10, unit: 'pieces', category: 'Cleaning' },
        { id: 8, name: 'Disinfectant Spray', quantity: 25, minStock: 20, unit: 'bottles', category: 'Hygiene' }
    ]);

    const [requests, setRequests] = useState([
        { id: 1, item: 'Rubber Gloves', quantity: 50, status: 'Pending', date: '2026-01-01', priority: 'High' },
        { id: 2, item: 'Sanitizer (5L)', quantity: 20, status: 'Approved', date: '2025-12-28', priority: 'Medium' }
    ]);

    const [showRequestModal, setShowRequestModal] = useState(false);
    const [newRequest, setNewRequest] = useState({
        item: '',
        quantity: '',
        priority: 'Medium',
        notes: ''
    });

    const categories = ['All', 'Cleaning', 'Safety', 'Hygiene', 'Waste'];
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredInventory = activeCategory === 'All'
        ? inventory
        : inventory.filter(item => item.category === activeCategory);

    const getStockStatus = (item) => {
        if (item.quantity <= item.minStock) {
            return { color: 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800', label: 'Low Stock', icon: AlertCircle };
        } else if (item.quantity <= item.minStock * 1.5) {
            return { color: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800', label: 'Near Low', icon: Clock };
        }
        return { color: 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800', label: 'In Stock', icon: CheckCircle };
    };

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        const newReq = {
            id: requests.length + 1,
            item: newRequest.item,
            quantity: parseInt(newRequest.quantity),
            status: 'Pending',
            date: new Date().toISOString().split('T')[0],
            priority: newRequest.priority,
            notes: newRequest.notes
        };
        setRequests([newReq, ...requests]);
        setShowRequestModal(false);
        setNewRequest({ item: '', quantity: '', priority: 'Medium', notes: '' });
        alert(language === 'en' ? 'Request submitted successfully!' : 'अनुरोध सफलतापूर्वक सबमिट किया गया!');
    };

    const getRequestStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400';
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {language === 'en' ? 'Inventory Management' : 'सूची प्रबंधन'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {language === 'en' ? 'Track stock levels and request supplies' : 'स्टॉक स्तर ट्रैक करें और आपूर्ति का अनुरोध करें'}
                    </p>
                </div>
                <button
                    onClick={() => setShowRequestModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#6F42C1] hover:bg-[#5a32a3] text-white rounded-xl shadow-lg shadow-purple-500/20 transition-all font-medium"
                >
                    <Plus size={18} />
                    {language === 'en' ? 'Request Stock' : 'स्टॉक अनुरोध'}
                </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat
                            ? 'bg-[#6F42C1] text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Inventory List */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col max-h-[calc(100vh-340px)]">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {language === 'en' ? 'Current Stock' : 'वर्तमान स्टॉक'}
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {filteredInventory.map(item => {
                            const status = getStockStatus(item);
                            const StatusIcon = status.icon;
                            return (
                                <div key={item.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 dark:text-white">{item.name}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1 whitespace-nowrap ${status.color}`}>
                                            <StatusIcon size={12} />
                                            {status.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-gray-800 dark:text-white">{item.quantity}</span>
                                            <span className="text-sm text-gray-500">{item.unit}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Min. Stock</p>
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.minStock}</p>
                                        </div>
                                    </div>
                                    {/* Stock Level Bar */}
                                    <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${item.quantity <= item.minStock ? 'bg-red-500' :
                                                    item.quantity <= item.minStock * 1.5 ? 'bg-amber-500' : 'bg-green-500'
                                                }`}
                                            style={{ width: `${Math.min((item.quantity / (item.minStock * 2)) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Request History */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col max-h-[calc(100vh-340px)]">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <ShoppingCart size={20} />
                            {language === 'en' ? 'Recent Requests' : 'हाल के अनुरोध'}
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {requests.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">
                                <ShoppingCart className="mx-auto mb-2 h-10 w-10" />
                                <p className="text-sm">No requests yet</p>
                            </div>
                        ) : (
                            requests.map(req => (
                                <div key={req.id} className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-sm text-gray-800 dark:text-white">{req.item}</h4>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border whitespace-nowrap ${getRequestStatusColor(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs text-gray-500">Qty: {req.quantity}</p>
                                            <p className="text-xs text-gray-400">{req.date}</p>
                                        </div>
                                        {req.priority && (
                                            <span className={`text-xs px-1.5 py-0.5 rounded whitespace-nowrap ${req.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                    req.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                }`}>
                                                {req.priority}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Request Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                            <h3 className="text-xl font-bold dark:text-white">
                                {language === 'en' ? 'Request Stock' : 'स्टॉक अनुरोध'}
                            </h3>
                            <button onClick={() => setShowRequestModal(false)}>
                                <X className="dark:text-white" />
                            </button>
                        </div>
                        <form onSubmit={handleRequestSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                                    {language === 'en' ? 'Item' : 'वस्तु'}
                                </label>
                                <select
                                    required
                                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={newRequest.item}
                                    onChange={e => setNewRequest({ ...newRequest, item: e.target.value })}
                                >
                                    <option value="">Select Item</option>
                                    {inventory.map(item => (
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                                    {language === 'en' ? 'Quantity' : 'मात्रा'}
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={newRequest.quantity}
                                    onChange={e => setNewRequest({ ...newRequest, quantity: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                                    {language === 'en' ? 'Priority' : 'प्राथमिकता'}
                                </label>
                                <select
                                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={newRequest.priority}
                                    onChange={e => setNewRequest({ ...newRequest, priority: e.target.value })}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                                    {language === 'en' ? 'Notes (Optional)' : 'टिप्पणी (वैकल्पिक)'}
                                </label>
                                <textarea
                                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    rows="3"
                                    value={newRequest.notes}
                                    onChange={e => setNewRequest({ ...newRequest, notes: e.target.value })}
                                    placeholder="Any specific requirements..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#6F42C1] text-white rounded-xl font-bold hover:bg-[#5a32a3] shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                {language === 'en' ? 'Submit Request' : 'अनुरोध भेजें'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SIInventory;
