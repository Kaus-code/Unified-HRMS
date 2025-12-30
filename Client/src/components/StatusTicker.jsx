import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ExternalLink, Megaphone } from 'lucide-react';

const StatusTicker = () => {
    // Content tailored for the MCD HRMS project
    const updates = [
        "Portal Update: New transfer policy circular issued by Commissioner (MCD).",
        "Attention: Mandatory biometric verification for field staff starts from Jan 1st.",
        "Payroll Alert: December salary slips are now available for download.",
        "New Feature: Employees can now track grievance status in real-time.",
        "Notification: Annual Performance Appraisal (APAR) window is now open for Grade A & B officers.",
        "Health Scheme: Updated list of empanelled hospitals for MCD employees released."
    ];

    // Doubling the array to create a seamless infinite scroll effect
    const duplicatedUpdates = [...updates, ...updates];

    return (
        <div className="w-full bg-purple-50 border-y border-purple-100 py-2.5 relative overflow-hidden flex items-center shadow-sm">
            {/* Fixed "Latest" Label */}
            <div className="flex-shrink-0 bg-[#6F42C1] text-white px-4 py-1.5 ml-4 rounded-md flex items-center gap-2 z-20 shadow-md">
                <Megaphone size={16} className="animate-pulse" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">Latest News</span>
            </div>

            {/* Ticker Container */}
            <div className="flex-grow overflow-hidden relative ml-4">
                <motion.div
                    className="flex whitespace-nowrap gap-12 items-center"
                    animate={{ x: [0, -2000] }} // Adjust value based on content length
                    transition={{
                        duration: 40, // Increase for slower, more readable speed
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {duplicatedUpdates.map((update, index) => (
                        <div key={index} className="flex items-center gap-3 group cursor-pointer">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#6F42C1]" />
                            <span className="text-sm md:text-base text-gray-700 font-medium group-hover:text-[#6F42C1] transition-colors">
                                {update}
                            </span>
                            <ExternalLink size={12} className="text-gray-400 group-hover:text-[#6F42C1] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Fades for a "Smooth" Edge Effect */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-purple-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-purple-50 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Accessibility Link */}
            <button className="flex-shrink-0 px-4 text-[#6F42C1] hover:underline text-xs font-bold border-l border-purple-200 hidden md:block">
                View All
            </button>
        </div>
    );
};

export default StatusTicker;
