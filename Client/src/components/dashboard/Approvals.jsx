import React from 'react';
import { Check, X, Clock, FileText } from 'lucide-react';

const Approvals = ({ language }) => {
    const requests = [
        {
            id: 1,
            name: 'Dr. Ankit Sharma',
            type: 'Promotion',
            from: 'Senior Resident',
            to: 'Chief Medical Officer',
            date: '28 Dec 2025',
            status: 'pending'
        },
        {
            id: 2,
            name: 'Priya Singh',
            type: 'Promotion',
            from: 'Assistant Engineer',
            to: 'Executive Engineer',
            date: '25 Dec 2025',
            status: 'pending'
        },
        {
            id: 3,
            name: 'Ravi Kumar',
            type: 'Salary Increment',
            from: 'L-10',
            to: 'L-11',
            date: '20 Dec 2025',
            status: 'pending'
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Approvals & Promotions' : 'अनुमोदन और पदोन्नति'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Review requests from HODs' : 'HODs से अनुरोधों की समीक्षा करें'}
                </p>
            </div>

            <div className="space-y-4">
                {requests.map((req) => (
                    <div key={req.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-[#6F42C1] dark:text-[#a074f0] rounded-full flex items-center justify-center font-bold text-lg">
                                {req.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{req.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded text-xs font-semibold">
                                        {req.type}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} /> {req.date}
                                    </span>
                                </div>
                                <div className="mt-2 text-sm flex items-center gap-2">
                                    <span className="text-gray-500">{req.from}</span>
                                    <span className="text-gray-300">→</span>
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">{req.to}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                                <X size={18} />
                                {language === 'en' ? 'Reject' : 'अस्वीकार'}
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-[#6F42C1] text-white hover:bg-[#5a32a3] rounded-xl shadow-lg shadow-purple-500/20 transition-colors">
                                <Check size={18} />
                                {language === 'en' ? 'Approve' : 'स्वीकृत'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Approvals;
