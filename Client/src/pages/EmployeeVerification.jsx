import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const EmployeeVerification = () => {
    const [employeeId, setEmployeeId] = useState('');
    const navigate = useNavigate();
    const { user } = useUser();

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!employeeId.trim()) return;

        // Get user's email from Clerk user object
        const email = user?.primaryEmailAddress?.emailAddress;

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employeeId, email }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('verifiedUser', JSON.stringify(data.user));
            const role = data.user.role;
            if (role === 'Commissioner') navigate('/admin');
            else if (role === 'Deputy Commissioner') navigate('/manager');
            else if (role === 'Sanitary Inspector') navigate('/sanitary-inspector');
            else navigate('/employee');
        } else {
            navigate('/');
            alert(data.message);
        }

    };


    return (
        <>
            <Navbar />
            <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700">

                    {/* Header Section */}
                    <div className="bg-[#6F42C1] px-6 py-8 text-center">
                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <ShieldCheck size={32} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">Employee Verification</h2>
                        <p className="text-purple-100 text-sm">Please enter your unique ID to continue</p>
                    </div>
                    {/* Form Section */}
                    <div className="p-8">
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div>
                                <label htmlFor="empId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Employee ID
                                </label>
                                <input
                                    type="text"
                                    id="empId"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    placeholder="e.g. MCD-2024-8899"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#6F42C1] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#6F42C1] hover:bg-[#5a32a3] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-purple-500/20"
                            >
                                <span>Verify Identity</span>
                                <ArrowRight size={18} />
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Having trouble? <a href="#" className="text-[#6F42C1] hover:underline">Contact HR Support</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EmployeeVerification;