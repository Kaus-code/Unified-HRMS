import React from 'react';
import { Smartphone, ShieldCheck, ArrowRight, Download } from 'lucide-react';

const CallToAction = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="relative bg-[#6F42C1] rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl">

                    {/* Background Decorative Circles */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

                        {/* Left Side: Mobile App Pitch */}
                        <div className="lg:w-1/2 text-white">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                                <Smartphone size={14} /> Mobile First Governance
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Attendance & Payroll <br /> in your pocket.
                            </h2>
                            <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                                Download the official MCD HRMS mobile application to mark attendance via geofencing,
                                view digital payslips, and apply for leaves on the go.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="flex items-center gap-3 bg-white text-[#6F42C1] px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-lg">
                                    <Download size={20} />
                                    Get it on Play Store
                                </button>
                                <button className="flex items-center gap-3 bg-transparent border border-white/40 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
                                    iOS App coming soon
                                </button>
                            </div>
                        </div>

                        {/* Right Side: Admin/Employee Login Card */}
                        <div className="lg:w-2/5 w-full">
                            <div className="bg-white rounded-3xl p-8 shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Web Portal Access</h3>
                                <p className="text-gray-500 text-sm mb-6">Access your unified dashboard via secure SSO login.</p>

                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-purple-50 border border-gray-100 p-4 rounded-2xl group transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                <ShieldCheck className="text-[#6F42C1]" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-gray-900">Employee Login</div>
                                                <div className="text-xs text-gray-500">Access with Aadhaar or Bio-ID</div>
                                            </div>
                                        </div>
                                        <ArrowRight size={18} className="text-gray-300 group-hover:text-[#6F42C1] transition-colors" />
                                    </button>

                                    <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-purple-50 border border-gray-100 p-4 rounded-2xl group transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                <ShieldCheck className="text-[#6F42C1]" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-gray-900">Department Admin</div>
                                                <div className="text-xs text-gray-500">Authorized Personnel Only</div>
                                            </div>
                                        </div>
                                        <ArrowRight size={18} className="text-gray-300 group-hover:text-[#6F42C1] transition-colors" />
                                    </button>
                                </div>

                                <p className="mt-6 text-center text-xs text-gray-400">
                                    Protected by 256-bit SSL Encryption. <br /> Managed by MCD IT Cell.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;