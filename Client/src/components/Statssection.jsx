import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Users, Building2, CheckCircle2, MapPin } from 'lucide-react';

const StatsSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const stats = [
        {
            label: "Total Employees",
            value: 150000,
            suffix: "+",
            icon: <Users className="text-[#6F42C1]" size={28} />,
            description: "Registered municipal staff"
        },
        {
            label: "Active Departments",
            value: 32,
            suffix: "",
            icon: <Building2 className="text-[#6F42C1]" size={28} />,
            description: "Integrated directorates"
        },
        {
            label: "Grievance Resolution",
            value: 98.4,
            suffix: "%",
            decimals: 1,
            icon: <CheckCircle2 className="text-[#6F42C1]" size={28} />,
            description: "Average success rate"
        },
        {
            label: "Zonal Offices",
            value: 12,
            suffix: "",
            icon: <MapPin className="text-[#6F42C1]" size={28} />,
            description: "Across Delhi regions"
        }
    ];

    return (
        <section ref={ref} className="py-16 bg-white w-full">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        System Impact at a Glance
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Real-time monitoring of Delhi's municipal workforce through unified
                        digital governance and transparent data tracking.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group"
                        >
                            <div className="mb-4 p-4 bg-purple-50 rounded-xl group-hover:bg-[#6F42C1] group-hover:text-white transition-colors duration-300">
                                {React.cloneElement(stat.icon, {
                                    className: "group-hover:text-white transition-colors"
                                })}
                            </div>

                            <div className="text-4xl font-extrabold text-gray-900 mb-1">
                                {inView ? (
                                    <CountUp
                                        end={stat.value}
                                        duration={2.5}
                                        decimals={stat.decimals || 0}
                                        suffix={stat.suffix}
                                    />
                                ) : (
                                    "0"
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {stat.label}
                            </h3>

                            <p className="text-sm text-gray-500 italic">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;