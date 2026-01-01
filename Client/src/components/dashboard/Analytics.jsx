import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Analytics = ({ language }) => {
    const zoneData = [
        { zone: 'Rohini', attendance: 92, efficiency: 85, grievances: 12 },
        { zone: 'South', attendance: 88, efficiency: 78, grievances: 24 },
        { zone: 'Civil Lines', attendance: 95, efficiency: 90, grievances: 5 },
        { zone: 'West', attendance: 85, efficiency: 82, grievances: 18 },
        { zone: 'Shahdara', attendance: 89, efficiency: 75, grievances: 30 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Zonal Progress & Analytics' : 'क्षेत्रीय प्रगति और विश्लेषण'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Comparative view of zonal performance' : 'क्षेत्रीय प्रदर्शन का तुलनात्मक दृश्य'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
                        {language === 'en' ? 'Attendance vs Efficiency' : 'उपस्थिति बनाम दक्षता'}
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={zoneData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
                            <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', color: '#fff', border: 'none', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Bar dataKey="attendance" fill="#6F42C1" name="Attendance %" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="efficiency" fill="#14b8a6" name="Efficiency %" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
                        {language === 'en' ? 'Grievance Count by Zone' : 'जोन द्वारा शिकायत संख्या'}
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={zoneData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
                            <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', color: '#fff', border: 'none', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="grievances" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} name="Open Grievances" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
