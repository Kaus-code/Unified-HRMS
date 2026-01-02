import React, { useState } from 'react';
import {
    Search, Filter, MoreVertical, Star, TrendingUp, AlertCircle, CheckCircle, DollarSign, Award
} from 'lucide-react';

const SIEmployees = ({ language }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Employee Data
    const employees = [
        {
            id: 'EMP001',
            name: language === 'en' ? 'Rajesh Kumar' : 'राजेश कुमार',
            designation: 'Sweeper',
            status: 'Present',
            qualityScore: 8.5,
            payrollStatus: 'Processed',
            lastPromotion: '2023-01-10'
        },
        {
            id: 'EMP002',
            name: language === 'en' ? 'Sita Devi' : 'सीता देवी',
            designation: 'Sweeper',
            status: 'Absent',
            qualityScore: 6.8,
            payrollStatus: 'Pending',
            lastPromotion: '2022-05-15'
        },
        {
            id: 'EMP003',
            name: language === 'en' ? 'Mohan Singh' : 'मोहन सिंह',
            designation: 'Driver',
            status: 'On Leave',
            qualityScore: 9.2,
            payrollStatus: 'Processed',
            lastPromotion: '2024-02-01'
        },
        {
            id: 'EMP004',
            name: language === 'en' ? 'Priya Sharma' : 'प्रिया शर्मा',
            designation: 'Supervisor',
            status: 'Present',
            qualityScore: 8.9,
            payrollStatus: 'Processed',
            lastPromotion: '2023-11-20'
        },
        {
            id: 'EMP005',
            name: language === 'en' ? 'Amit Verma' : 'अमित वर्मा',
            designation: 'Sweeper',
            status: 'Present',
            qualityScore: 4.5,
            payrollStatus: 'Hold',
            lastPromotion: 'Never'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400';
            case 'Absent': return 'text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400';
            case 'On Leave': return 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const handlePromotion = (name) => {
        alert(`Promotion request raised for ${name}`);
    };

    const [selectedEmp, setSelectedEmp] = useState(null);

    const handleRowClick = (emp) => {
        setSelectedEmp(emp);
    };

    const closeModal = () => {
        setSelectedEmp(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Ward Employees' : 'वार्ड कर्मचारी'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {language === 'en' ? 'Manage attendance, performance, and promotions' : 'उपस्थिति, प्रदर्शन और पदोन्नति का प्रबंधन करें'}
                    </p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={language === 'en' ? 'Search employee...' : 'कर्मचारी खोजें...'}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F42C1] dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Filter size={18} className="text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {language === 'en' ? 'Employee' : 'कर्मचारी'}
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {language === 'en' ? 'Status' : 'स्थिति'}
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {language === 'en' ? 'Quality Score' : 'गुणवत्ता स्कोर'}
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {language === 'en' ? 'Payroll' : 'वेतन'}
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {language === 'en' ? 'Actions' : 'कदम'}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {employees.map((emp) => (
                                <tr
                                    key={emp.id}
                                    onClick={() => handleRowClick(emp)}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1] font-bold text-sm">
                                                {emp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 dark:text-white text-sm">{emp.name}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{emp.designation} • {emp.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(emp.status)}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <Star size={14} className="text-amber-400 fill-amber-400" />
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{emp.qualityScore}</span>
                                            <span className="text-xs text-gray-500">/ 10.0</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {emp.payrollStatus === 'Processed' ? (
                                                <CheckCircle size={16} className="text-green-500" />
                                            ) : (
                                                <AlertCircle size={16} className="text-amber-500" />
                                            )}
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{emp.payrollStatus}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => handlePromotion(emp.name)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                title={language === 'en' ? 'Raise Promotion' : 'पदोन्नति बढ़ाएं'}
                                            >
                                                <Award size={18} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Employee Details Modal */}
            {selectedEmp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1] font-bold text-2xl">
                                        {selectedEmp.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedEmp.name}</h3>
                                        <p className="text-gray-500 dark:text-gray-400">{selectedEmp.designation} • {selectedEmp.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                >
                                    <MoreVertical className="rotate-90" size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            {language === 'en' ? 'Current Status' : 'वर्तमान स्थिति'}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEmp.status)}`}>
                                                {selectedEmp.status}
                                            </span>
                                            <span className="text-sm text-gray-400">
                                                • Last active: 20 mins ago
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                            {language === 'en' ? 'Performance' : 'प्रदर्शन'}
                                        </h4>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quality Score</span>
                                            <div className="flex items-center gap-1">
                                                <Star size={16} className="text-amber-400 fill-amber-400" />
                                                <span className="font-bold text-gray-900 dark:text-white">{selectedEmp.qualityScore}</span>
                                                <span className="text-xs text-gray-500">/ 10.0</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-amber-400 h-2 rounded-full"
                                                style={{ width: `${(selectedEmp.qualityScore / 10) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                            {language === 'en' ? 'Contact Details' : 'संपर्क विवरण'}
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Phone:</span>
                                                <span className="text-gray-900 dark:text-white">+91 98765 43210</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Ward:</span>
                                                <span className="text-gray-900 dark:text-white">Rohini - Zone 5</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Joined:</span>
                                                <span className="text-gray-900 dark:text-white">12 Mar, 2021</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            {language === 'en' ? 'Actions' : 'कदम'}
                                        </h4>
                                        <div className="flex gap-2">
                                            <button className="flex-1 py-2 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 rounded-lg text-sm font-medium transition-colors">
                                                Message
                                            </button>
                                            <button className="flex-1 py-2 bg-[#6F42C1]/10 text-[#6F42C1] hover:bg-[#6F42C1]/20 rounded-lg text-sm font-medium transition-colors">
                                                View Full Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors"
                                >
                                    {language === 'en' ? 'Close' : 'बंद करें'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SIEmployees;
