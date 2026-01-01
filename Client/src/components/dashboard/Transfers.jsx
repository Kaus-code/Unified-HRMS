import React, { useState } from 'react';
import { RefreshCw, MapPin, User, ArrowRight, Search } from 'lucide-react';

const Transfers = ({ language }) => {
    const [filter, setFilter] = useState('');

    const employees = [
        { id: 1, name: 'Amit Verma', role: 'Junior Engineer', current: 'Rohini Zone', empId: 'MCD-2023-112' },
        { id: 2, name: 'Sarah Khan', role: 'Medical Officer', current: 'South Zone', empId: 'MCD-2022-098' },
        { id: 3, name: 'Rajesh Kumar', role: 'Sanitation Inspector', current: 'Civil Lines', empId: 'MCD-2020-456' },
        { id: 4, name: 'Priya Singh', role: 'Clerk', current: 'Karol Bagh', empId: 'MCD-2019-231' }
    ];

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(filter.toLowerCase()) ||
        emp.empId.toLowerCase().includes(filter.toLowerCase())
    );

    const [selectedEmp, setSelectedEmp] = useState(null);
    const [targetZone, setTargetZone] = useState('');

    const handleTransfer = () => {
        if (!selectedEmp || !targetZone) return;
        alert(`Transfer initiated for ${selectedEmp.name} to ${targetZone}`);
        setSelectedEmp(null);
        setTargetZone('');
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Employee Transfers' : 'कर्मचारी स्थानांतरण'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Manage and execute inter-zonal transfers' : 'अंतर-क्षेत्रीय स्थानांतरण प्रबंधित और निष्पादित करें'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder={language === 'en' ? "Search employee..." : "कर्मचारी खोजें..."}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6F42C1]"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    <div className="space-y-3">
                        {filteredEmployees.map((emp) => (
                            <div
                                key={emp.id}
                                onClick={() => setSelectedEmp(emp)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedEmp?.id === emp.id
                                    ? 'border-[#6F42C1] bg-purple-50 dark:bg-purple-900/20'
                                    : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{emp.name}</p>
                                            <p className="text-xs text-gray-500">{emp.empId} • {emp.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <MapPin size={14} />
                                        {emp.current}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Panel */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 h-fit">
                    <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                        {language === 'en' ? 'Transfer Action' : 'स्थानांतरण कार्रवाई'}
                    </h3>

                    {selectedEmp ? (
                        <div className="space-y-4">
                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-xs text-gray-400">Selected Employee</span>
                                <p className="font-semibold dark:text-white">{selectedEmp.name}</p>
                                <p className="text-sm text-gray-500">{selectedEmp.current}</p>
                            </div>

                            <div className="flex flex-col items-center text-gray-400">
                                <ArrowRight className="rotate-90" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {language === 'en' ? 'Move to Zone' : 'जोन में ले जाएं'}
                                </label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6F42C1]"
                                    value={targetZone}
                                    onChange={(e) => setTargetZone(e.target.value)}
                                >
                                    <option value="">Select Zone</option>
                                    <option value="Shahdara Zone">Shahdara Zone</option>
                                    <option value="South Zone">South Zone</option>
                                    <option value="West Zone">West Zone</option>
                                    <option value="Narela Zone">Narela Zone</option>
                                </select>
                            </div>

                            <button
                                onClick={handleTransfer}
                                disabled={!targetZone}
                                className="w-full py-2.5 bg-[#6F42C1] disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 transition-all hover:bg-[#5a32a3]"
                            >
                                {language === 'en' ? 'Confirm Transfer' : 'स्थानांतरण की पुष्टि करें'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-400">
                            <RefreshCw size={40} className="mx-auto mb-2 opacity-20" />
                            <p className="text-sm">Select an employee from the list to initiate transfer</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transfers;
