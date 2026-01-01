import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, MoreVertical, Plus, Search, Filter, Briefcase, BadgeCheck, FileText } from 'lucide-react';

const Employees = ({ language }) => {
    const [employees] = useState([
        { id: 'MCD-001', name: 'Dr. Ankit Sharma', role: 'Medical Officer', dept: 'Health', location: 'Rohini Zone', email: 'ankit.s@mcd.gov.in', status: 'Active' },
        { id: 'MCD-045', name: 'Suman Kumari', role: 'Senior Inspector', dept: 'Sanitation', location: 'Civil Lines', email: 'suman.k@mcd.gov.in', status: 'On Leave' },
        { id: 'MCD-112', name: 'Rajesh Verma', role: 'Clerk', dept: 'Administration', location: 'Headquarters', email: 'rajesh.v@mcd.gov.in', status: 'Active' },
        { id: 'MCD-089', name: 'Priya Singh', role: 'Assistant Engineer', dept: 'Engineering', location: 'South Zone', email: 'priya.s@mcd.gov.in', status: 'Active' },
        { id: 'MCD-234', name: 'Mohit Gupta', role: 'Field Worker', dept: 'Sanitation', location: 'West Zone', email: 'mohit.g@mcd.gov.in', status: 'Active' }
    ]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide">
                        {language === 'en' ? 'Official Staff Directory' : 'आधिकारिक कर्मचारी निर्देशिका'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {language === 'en' ? 'Municipal Corporation of Delhi' : 'दिल्ली नगर निगम'}
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] text-white rounded hover:bg-[#334155] transition-all shadow-sm">
                    <Plus size={18} />
                    <span className="font-medium text-sm">{language === 'en' ? 'Add Official' : 'अधिकारी जोड़ें'}</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder={language === 'en' ? "Search by name, ID..." : "नाम, आईडी द्वारा खोजें..."}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>
                <div className="flex gap-3">
                    <select className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 focus:outline-none">
                        <option>All Departments</option>
                        <option>Health</option>
                        <option>Sanitation</option>
                        <option>Engineering</option>
                    </select>
                </div>
            </div>

            {/* Employee List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {employees.map((emp) => (
                    <div key={emp.id} className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        {/* Header Stripe */}
                        <div className={`h-1.5 w-full ${emp.status === 'Active' ? 'bg-green-600' : 'bg-amber-500'}`}></div>

                        <div className="p-5">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded flex items-center justify-center flex-shrink-0">
                                    <User className="text-gray-400" size={32} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">{emp.name}</h3>
                                            <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-0.5">ID: {emp.id}</div>
                                        </div>
                                        <span className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wider border rounded ${emp.status === 'Active'
                                                ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                                                : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                                            }`}>
                                            {emp.status}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-[#6F42C1] dark:text-[#a074f0] mt-1">{emp.role}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-y-3 text-sm">
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase">Department</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-200">{emp.dept}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase">Zone</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-200">{emp.location}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="block text-xs text-gray-500 uppercase">Email</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-200 flex items-center gap-1.5">
                                        <Mail size={12} /> {emp.email}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 flex gap-2">
                                <button className="flex-1 py-1.5 px-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                                    <FileText size={14} />
                                    {language === 'en' ? 'View Record' : 'रिकॉर्ड देखें'}
                                </button>
                                <button className="flex-1 py-1.5 px-3 bg-[#6F42C1] border border-[#6F42C1] rounded text-sm font-medium text-white hover:bg-[#5a32a3] transition-colors flex items-center justify-center gap-2">
                                    <Mail size={14} />
                                    {language === 'en' ? 'Email' : 'ईमेल'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employees;
