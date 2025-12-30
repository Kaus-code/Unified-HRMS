import React from 'react';
import {
    MapPinCheckInside,
    ReceiptIndianRupee,
    BookUser,
    MessageCircleQuestion,
    ArrowRightLeft,
    TrendingUp
} from 'lucide-react';

const FeaturesGrid = () => {
    const features = [
        {
            title: "Smart Geofenced Attendance",
            description: "GPS-based marking ensures staff can only clock-in within designated municipal zones, eliminating proxy attendance for field workers.",
            icon: <MapPinCheckInside size={32} />,
            colorTag: "efficiency"
        },
        {
            title: "One-Click Automated Payroll",
            description: "Seamlessly calculates salaries based on biometric data, leaves, and tax regimes, generating thousands of digital payslips instantly.",
            icon: <ReceiptIndianRupee size={32} />,
            colorTag: "speed"
        },
        {
            title: "Digital Service Books (e-SB)",
            description: "A unified, immutable digital record of an employee's entire career history, replacing fragile physical files and reducing delays.",
            icon: <BookUser size={32} />,
            colorTag: "transparency"
        },
        {
            title: "Transparent Transfer Policy",
            description: "Rule-based employee rotation and posting management that reduces manual intervention and ensures fair distribution of workforce.",
            icon: <ArrowRightLeft size={32} />,
            colorTag: "fairness"
        },
        {
            title: "Grievance Redressal Portal",
            description: "Empowers employees to file complaints regarding pay or leave online and track their resolution status in real-time.",
            icon: <MessageCircleQuestion size={32} />,
            colorTag: "empowerment"
        },
        {
            title: "Workforce Analytics & Reports",
            description: "Provides administration with dashboards on attendance trends, vacancy status, and budget utilization for data-driven planning.",
            icon: <TrendingUp size={32} />,
            colorTag: "insight"
        }
    ];

    return (
        <section className="py-20 bg-white font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[#6F42C1] font-bold uppercase tracking-wider text-sm mb-3 block">
                        Core Functionality
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Modernizing Municipal Operations
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        The MCD HRMS integrates fragmented manual processes into a single, secure,
                        and scalable digital platform designed for government needs.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-purple-100 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Hover Gradient Effect */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6F42C1] to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                            {/* Icon Container */}
                            <div className="mb-6 relative inline-block">
                                <div className="absolute inset-0 bg-purple-100 rounded-2xl rotate-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative bg-[#6F42C1] text-white p-5 rounded-2xl shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#6F42C1] transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {feature.description}
                            </p>

                            {/* Learn More Link */}
                            <a href="#" className="inline-flex items-center gap-2 font-semibold text-[#6F42C1] hover:underline decoration-2 underline-offset-4">
                                Learn more
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;