import React, { useState } from 'react';
import {
    Search, ShieldAlert, AlertTriangle,
    DollarSign, X, User, MapPin, Calendar, Briefcase, CheckCircle2, UserX
} from 'lucide-react';

// UI Components
const SearchBar = ({ handleSearch, searchTerm, setSearchTerm, language, loading, centered = false }) => (
    <form onSubmit={handleSearch} className={`relative flex items-center transition-all duration-500 ${centered ? 'w-full max-w-2xl mx-auto transform scale-100' : 'w-full'}`}>
        <div className="relative w-full group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-red-500 rounded-2xl opacity-30 group-hover:opacity-100 blur transition duration-200 ${centered ? 'opacity-70' : 'opacity-0'}`}></div>
            <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
                <Search className="ml-4 text-gray-400" size={24} />
                <input
                    type="text"
                    placeholder={language === 'en' ? 'Enter Employee ID (e.g. MCD101)...' : 'कर्मचारी आईडी दर्ज करें...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-4 md:py-5 rounded-2xl bg-transparent outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400"
                    autoFocus={centered}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="mr-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
                >
                    {loading ? '...' : (language === 'en' ? 'Search' : 'खोजें')}
                </button>
            </div>
        </div>
    </form>
);

const DCDisciplinary = ({ language = 'en', userZone }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    // Modal & Selection States
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [fineModalOpen, setFineModalOpen] = useState(false);
    const [fineAmount, setFineAmount] = useState('');
    const [fineReason, setFineReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        setHasSearched(true);
        setSelectedEmployee(null); // Reset selection on new search
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/employees/${userZone}?search=${searchTerm}`);
            const data = await response.json();

            if (data.success) {
                setEmployees(data.employees);
                // If exact match (ID), auto-select? Maybe better to let user choose if multiple names match.
                // But strict ID match usually returns 1.
                if (data.employees.length === 1) {
                    setSelectedEmployee(data.employees[0]);
                }
            }
        } catch (error) {
            console.error("Error searching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImposeFine = async (e) => {
        e.preventDefault();
        if (!selectedEmployee || !fineAmount) return;

        setActionLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/deputy/fine`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId: selectedEmployee.employeeId,
                    amount: fineAmount,
                    reason: fineReason
                })
            });
            const data = await response.json();

            if (data.success) {
                alert(language === 'en' ? 'Fine imposed successfully' : 'जुर्माना सफलतापूर्वक लगाया गया');
                setFineModalOpen(false);
                setFineAmount('');
                setFineReason('');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error imposing fine:", error);
            alert("Failed to impose fine");
        } finally {
            setActionLoading(false);
        }
    };



    return (
        <div className="min-h-[600px] flex flex-col relative w-full">

            {/* Top Bar (Only visible if searched) */}
            {hasSearched && (
                <div className="mb-8 flex justify-between items-center animate-in slide-in-from-top duration-300">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Disciplinary Console</h2>
                        <p className="text-gray-500">Managing {userZone}</p>
                    </div>
                    <button
                        onClick={() => { setHasSearched(false); setSelectedEmployee(null); setSearchTerm(''); }}
                        className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white underline"
                    >
                        Clear Search
                    </button>
                </div>
            )}

            {/* Centered Initial Search */}
            {!hasSearched && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                    <div className="mb-8 animate-in zoom-in-50 duration-500">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-transform">
                            <ShieldAlert size={40} className="text-red-500" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                            Employee Disciplinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">Actions</span>
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Search for an employee by their official ID to view their profile, history, and impose penalties directly.
                        </p>
                    </div>

                    <SearchBar
                        handleSearch={handleSearch}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        language={language}
                        loading={loading}
                        centered={true}
                    />

                    {/* Quick Tips */}
                    <div className="mt-12 flex gap-8 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-green-500" />
                            <span>Instant Payroll Sync</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldAlert size={16} className="text-purple-500" />
                            <span>Secure Logging</span>
                        </div>
                    </div>
                </div>
            )}


            {/* Search Results / Profile View */}
            {hasSearched && (
                <div className="flex-1 w-full max-w-6xl mx-auto animate-in fade-in duration-500">
                    {/* Re-search bar at top if results list is shown or profile */}
                    {!selectedEmployee && (
                        <div className="max-w-xl mx-auto mb-10">
                            <SearchBar
                                handleSearch={handleSearch}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                language={language}
                                loading={loading}
                            />
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center pt-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                        </div>
                    ) : employees.length === 0 ? (
                        <div className="text-center pt-20">
                            <UserX size={64} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-500">No employees found in {userZone}</h3>
                            <p className="text-gray-400">Try searching with a different ID or name.</p>
                        </div>
                    ) : !selectedEmployee ? (
                        // Multiple Results List
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {employees.map(emp => (
                                <div key={emp.employeeId} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-red-500 transition-colors cursor-pointer group" onClick={() => setSelectedEmployee(emp)}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-lg text-gray-600 dark:text-gray-300 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 group-hover:text-red-500 transition-colors">
                                            {emp.name.charAt(0)}
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${emp.employmentStatus === 'Permanent' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {emp.employmentStatus}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{emp.name}</h3>
                                    <p className="text-sm text-gray-500">{emp.employeeId}</p>
                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between text-sm text-gray-500">
                                        <span>Ward {emp.Ward}</span>
                                        <span>{emp.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Detailed Profile View
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: ID Card / Basic Info */}
                            <div className="lg:col-span-1">
                                <button onClick={() => setSelectedEmployee(null)} className="mb-4 flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    ← Back to Results
                                </button>
                                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-gray-900 to-gray-800"></div>
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-white ring-4 ring-gray-100 dark:ring-gray-800 shadow-xl overflow-hidden mb-4 flex items-center justify-center text-4xl font-bold text-gray-400">
                                            {selectedEmployee.name.charAt(0)}
                                        </div>
                                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{selectedEmployee.name}</h2>
                                        <p className="text-gray-500 font-medium">{selectedEmployee.role}</p>
                                        <div className="mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-mono text-gray-600 dark:text-gray-400">
                                            ID: {selectedEmployee.employeeId}
                                        </div>
                                    </div>

                                    <div className="mt-8 space-y-4">
                                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                            <Briefcase size={20} />
                                            <span>{selectedEmployee.department || 'Sanitation Dept'}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                            <MapPin size={20} />
                                            <span>Ward {selectedEmployee.Ward} • {selectedEmployee.Zone}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                                            <Calendar size={20} />
                                            <span>Joined {new Date(selectedEmployee.joiningDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Actions & Stats */}
                            <div className="lg:col-span-2 space-y-6">

                                {/* Action Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setFineModalOpen(true)}
                                        className="p-6 bg-red-50 dark:bg-red-900/10 border-2 border-red-100 dark:border-red-900/30 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group text-left"
                                    >
                                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 mb-4 group-hover:scale-110 transition-transform">
                                            <DollarSign size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Impose Fine</h3>
                                        <p className="text-sm text-gray-500 mt-1">Deduct amount from this month's payroll.</p>
                                    </button>

                                    <button className="p-6 bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-100 dark:border-amber-900/30 rounded-2xl hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors group text-left">
                                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                                            <AlertTriangle size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Issue Warning</h3>
                                        <p className="text-sm text-gray-500 mt-1">Send an official warning letter.</p>
                                    </button>
                                </div>

                                {/* History Placeholder */}
                                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Disciplinary History</h3>
                                    <div className="space-y-6 relative">
                                        <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800"></div>
                                        {/* Mock history items */}
                                        <div className="flex gap-4">
                                            <div className="z-10 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 border-4 border-white dark:border-gray-900 flex items-center justify-center text-green-600">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">Clean Record Verified</p>
                                                <p className="text-xs text-gray-500">System check completed on {new Date().toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Fine Modal */}
            {fineModalOpen && selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <DollarSign className="text-red-500" />
                                Impose Salary Fine
                            </h3>
                            <button onClick={() => setFineModalOpen(false)} className="text-gray-500 hover:bg-gray-100 rounded-full p-2">✕</button>
                        </div>
                        <form onSubmit={handleImposeFine} className="p-6 space-y-4">
                            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmployee.name}</p>
                                <p className="text-xs text-gray-500">ID: {selectedEmployee.employeeId}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Fine Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    value={fineAmount}
                                    onChange={(e) => setFineAmount(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none"
                                    placeholder="e.g. 500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Reason for Fine
                                </label>
                                <textarea
                                    required
                                    rows="3"
                                    value={fineReason}
                                    onChange={(e) => setFineReason(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                                    placeholder="Policy violation, misconduct, etc."
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {actionLoading ? 'Processing...' : 'Confirm Deduction'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DCDisciplinary;
