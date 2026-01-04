import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, MapPin, Search, CheckCircle, User, Briefcase, Calendar, Loader } from 'lucide-react';

const InterZoneTransfers = ({ language = 'en', userZone }) => {
    // Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [searchError, setSearchError] = useState('');

    // Transfer State
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');
    const [reason, setReason] = useState('');
    const [transferring, setTransferring] = useState(false);

    // Load Wards on Mount
    useEffect(() => {
        if (userZone) {
            fetchWards();
        }
    }, [userZone]);

    const fetchWards = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/wards/${userZone}`);
            const data = await response.json();
            if (data.success) {
                setWards(data.wards);
            }
        } catch (error) {
            console.error("Error fetching wards:", error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        setEmployee(null);
        setSearchError('');

        try {
            // Reusing the search logic but we need EXACT match for transfer safety usually, 
            // but the route supports partial. Let's use the same robust search route.
            // We want to find ONE specific person to transfer.
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/employees/${userZone}?search=${searchTerm}`);
            const data = await response.json();

            if (data.success && data.employees.length > 0) {
                // Suggest the first match or strict match? 
                // For now, if multiple, take first, but ideally we show list. 
                // Simplification: strict match ID preference if listed.
                const exactMatch = data.employees.find(e => e.employeeId.toLowerCase() === searchTerm.toLowerCase());
                setEmployee(exactMatch || data.employees[0]);
            } else {
                setSearchError(language === 'en' ? 'No employee found.' : 'कोई कर्मचारी नहीं मिला।');
            }
        } catch (error) {
            setSearchError('Network Error');
        } finally {
            setLoading(false);
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        if (!employee || !selectedWard) return;

        if (!confirm(language === 'en'
            ? `Are you sure you want to transfer ${employee.name} to Ward ${selectedWard}?`
            : `क्या आप सुनिश्चित हैं कि आप ${employee.name} को वार्ड ${selectedWard} में स्थानांतरित करना चाहते हैं?`)) {
            return;
        }

        setTransferring(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/reassign`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId: employee.employeeId,
                    targetWard: selectedWard,
                    targetZone: userZone,
                    reason: reason || 'Administrative Transfer'
                })
            });

            const data = await response.json();
            if (data.success) {
                alert(language === 'en' ? 'Transfer Successful!' : 'स्थानांतरण सफल रहा!');
                // Reset
                setEmployee(null);
                setSearchTerm('');
                setSelectedWard('');
                setReason('');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Transfer failed:', error);
            alert('Transfer failed');
        } finally {
            setTransferring(false);
        }
    };

    return (
        <div className="space-y-8 min-h-[600px]">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {language === 'en' ? 'Intra-Zone Transfer Console' : 'आंतरिक क्षेत्र स्थानांतरण'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Reassign employees to different wards within your zone.' : 'कर्मचारियों को अपने क्षेत्र के भीतर विभिन्न वार्डों में पुन: असाइन करें।'}
                </p>
            </div>

            {/* Step 1: Search */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <ArrowRightLeft size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Find Employee' : 'कर्मचारी खोजें'}
                    </h3>
                </div>

                <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Enter Employee ID..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-purple-500 focus:bg-white dark:focus:bg-gray-900 transition-all outline-none text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? '...' : (language === 'en' ? 'Find' : 'खोजें')}
                        </button>
                    </div>
                    {searchError && <p className="text-red-500 text-center mt-3 animate-pulse">{searchError}</p>}
                </form>
            </div>

            {/* Step 2: Transfer Form (Visible if Employee Found) */}
            {employee && (
                <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Employee Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-purple-600 to-indigo-600"></div>
                            <div className="relative mt-8 flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl font-bold text-gray-400 shadow-xl mb-4">
                                    {employee.name.charAt(0)}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{employee.name}</h3>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold mt-2">
                                    {employee.role}
                                </span>

                                <div className="w-full mt-6 space-y-3">
                                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <span className="text-gray-500 text-sm">Employee ID</span>
                                        <span className="font-mono font-medium text-gray-900 dark:text-white">{employee.employeeId}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <span className="text-gray-500 text-sm">Current Ward</span>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-red-500" />
                                            <span className="font-medium text-gray-900 dark:text-white">Ward {employee.Ward}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <span className="text-gray-500 text-sm">Since</span>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-blue-500" />
                                            <span className="font-medium text-gray-900 dark:text-white">{new Date(employee.joiningDate).getFullYear()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Module */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 flex flex-col justify-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <ArrowRightLeft className="text-green-500" />
                                {language === 'en' ? 'Select New Assignment' : 'नई नियुक्ति चुनें'}
                            </h3>

                            <form onSubmit={handleTransfer} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {language === 'en' ? 'Target Ward' : 'लक्ष्य वार्ड'}
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <select
                                            required
                                            value={selectedWard}
                                            onChange={(e) => setSelectedWard(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="">Select a Ward...</option>
                                            {wards.map(w => (
                                                <option key={w.wardNumber} value={w.wardNumber}>
                                                    Ward {w.wardNumber} - {w.wardName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {language === 'en' ? 'Transfer Reason' : 'स्थानांतरण का कारण'}
                                    </label>
                                    <textarea
                                        rows="2"
                                        placeholder="Reason for reassignment..."
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={transferring || !selectedWard}
                                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-xl"
                                >
                                    {transferring ? 'Processing...' : (language === 'en' ? 'Confirm Transfer' : 'स्थानांतरण की पुष्टि करें')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterZoneTransfers;
