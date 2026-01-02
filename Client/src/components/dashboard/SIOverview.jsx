import React from 'react';
import {
    Users, ClipboardList, CheckCircle, AlertTriangle, Activity,
    TrendingUp, TrendingDown, Clock, MapPin
} from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

const SIOverview = ({ language }) => {
    // Stats specific to Sanitation Inspector
    const stats = [
        {
            title: language === 'en' ? 'WARD EMPLOYEES' : 'वार्ड कर्मचारी',
            value: '45',
            change: '42 Present',
            trend: 'up',
            icon: Users,
            color: '#6F42C1' // Purple
        },
        {
            title: language === 'en' ? 'PENDING ISSUES' : 'लंबित मुद्दे',
            value: '8',
            change: '+2 New',
            trend: 'down', // high pending is bad, but here we just show count
            icon: AlertTriangle,
            color: '#f59e0b' // Amber
        },
        {
            title: language === 'en' ? 'RESOLVED TODAY' : 'आज निपटाए गए',
            value: '12',
            change: '+5 vs yest',
            trend: 'up',
            icon: CheckCircle,
            color: '#10b981' // Green
        },
        {
            title: language === 'en' ? 'AVG QUALITY RATING' : 'औसत गुणवत्ता रेटिंग',
            value: '4.2',
            change: '+0.1%',
            trend: 'up',
            icon: Activity,
            color: '#3b82f6' // Blue
        },
    ];

    // Issue Status Distribution
    const issueData = [
        { name: language === 'en' ? 'Resolved' : 'हल किया गया', value: 65, color: '#10b981' },
        { name: language === 'en' ? 'Pending' : 'लंबित', value: 25, color: '#f59e0b' },
        { name: language === 'en' ? 'Critical' : 'महत्वपूर्ण', value: 10, color: '#ef4444' },
    ];

    // Recent Activities (simulated real-time monitoring)
    const recentActivities = [
        {
            action: language === 'en' ? "Garbage collection delayed at Block A" : "ब्लॉक ए में कचरा संग्रहण में देरी",
            time: "10 mins ago",
            icon: AlertTriangle,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            action: language === 'en' ? "Rajesh Kumar marked attendance similar to geo-fence" : "राजेश कुमार ने जियो-फेंस के भीतर उपस्थिति दर्ज की",
            time: "25 mins ago",
            icon: MapPin,
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            action: language === 'en' ? "Issue #402 marked as Resolved" : "मुद्दा #402 हल किया गया",
            time: "1 hour ago",
            icon: CheckCircle,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            action: language === 'en' ? "Quality check rating submitted for Team B" : "टीम बी के लिए गुणवत्ता जांच रेटिंग प्रस्तुत की गई",
            time: "2 hours ago",
            icon: ClipboardList,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Ward Overview' : 'वार्ड अवलोकन'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {language === 'en' ? 'Monitor your ward performance and issues.' : 'अपने वार्ड के प्रदर्शन और मुद्दों की निगरानी करें।'}
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    {stat.title}
                                </p>
                                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.value}
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <span className={`text-xs font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-amber-500'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${stat.color}15` }}
                            >
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
                        {language === 'en' ? 'Live Monitoring Log' : 'लाइव निगरानी लॉग'}
                    </h3>
                    <div className="space-y-4">
                        {recentActivities.map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors">
                                <div className={`w-9 h-9 rounded-lg ${activity.bg} flex items-center justify-center flex-shrink-0`}>
                                    <activity.icon size={18} className={activity.color} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{activity.action}</p>
                                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                        <Clock size={10} /> {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Issue Distribution */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {language === 'en' ? 'Issue Status' : 'मुद्दे की स्थिति'}
                    </h3>

                    <div className="flex-1 min-h-[200px] relative mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={issueData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    dataKey="value"
                                    strokeWidth={0}
                                >
                                    {issueData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#1f2937', color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">100%</span>
                        </div>
                    </div>

                    <div className="space-y-2 mt-4">
                        {issueData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SIOverview;
