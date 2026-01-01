import React from 'react';
import {
    Users, Briefcase, Clock, CheckCircle, TrendingUp, TrendingDown,
    Activity, ArrowUpRight, FileText, BarChart3, Search, Bell
} from 'lucide-react';
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const Overview = ({ language }) => {
    // Stats data with purple theme colors
    const stats = [
        {
            title: language === 'en' ? 'TOTAL EMPLOYEES' : 'कुल कर्मचारी',
            value: '1,50,847',
            change: '+2.5%',
            trend: 'up',
            icon: Users,
            color: '#6F42C1'
        },
        {
            title: language === 'en' ? 'ACTIVE VACANCIES' : 'सक्रिय रिक्तियां',
            value: '324',
            change: '-18%',
            trend: 'down',
            icon: Briefcase,
            color: '#14b8a6'
        },
        {
            title: language === 'en' ? 'PENDING APPROVALS' : 'लंबित अनुमोदन',
            value: '156',
            change: '+12',
            trend: 'up',
            icon: Clock,
            color: '#f59e0b'
        },
        {
            title: language === 'en' ? 'GRIEVANCES RESOLVED' : 'शिकायतें निपटाई गईं',
            value: '89.5%',
            change: '+5.2%',
            trend: 'up',
            icon: CheckCircle,
            color: '#10b981'
        },
    ];

    // Hiring/Recruitment trend data
    const hiringTrendData = [
        { month: 'Jan', hired: 120, transfers: 45 },
        { month: 'Feb', hired: 145, transfers: 52 },
        { month: 'Mar', hired: 180, transfers: 38 },
        { month: 'Apr', hired: 165, transfers: 61 },
        { month: 'May', hired: 210, transfers: 48 },
        { month: 'Jun', hired: 195, transfers: 55 },
        { month: 'Jul', hired: 230, transfers: 42 },
        { month: 'Aug', hired: 245, transfers: 67 },
        { month: 'Sep', hired: 198, transfers: 51 },
        { month: 'Oct', hired: 215, transfers: 58 },
        { month: 'Nov', hired: 178, transfers: 44 },
        { month: 'Dec', hired: 156, transfers: 39 },
    ];

    // Department distribution data
    const departmentData = [
        { name: language === 'en' ? 'Sanitation' : 'स्वच्छता', value: 42000, color: '#6F42C1' },
        { name: language === 'en' ? 'Engineering' : 'अभियांत्रिकी', value: 35000, color: '#8b5cf6' },
        { name: language === 'en' ? 'Health' : 'स्वास्थ्य', value: 28000, color: '#a074f0' },
        { name: language === 'en' ? 'Education' : 'शिक्षा', value: 25000, color: '#c4b5fd' },
    ];

    // Recent activities
    const recentActivities = [
        {
            action: language === 'en' ? "New circular published" : "नया परिपत्र प्रकाशित",
            time: "2 hours ago",
            icon: FileText
        },
        {
            action: language === 'en' ? "Transfer order approved for Zone 5" : "जोन 5 के लिए स्थानांतरण आदेश स्वीकृत",
            time: "4 hours ago",
            icon: CheckCircle
        },
        {
            action: language === 'en' ? "Payroll processed for December" : "दिसंबर के लिए वेतन प्रसंस्कृत",
            time: "1 day ago",
            icon: BarChart3
        },
        {
            action: language === 'en' ? "New employee batch onboarded (45)" : "नया कर्मचारी बैच शामिल (45)",
            time: "2 days ago",
            icon: Users
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Admin Dashboard' : 'व्यवस्थापक डैशबोर्ड'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {language === 'en' ? 'Welcome back! Here\'s your workforce overview.' : 'वापस स्वागत है! यहां आपका कार्यबल अवलोकन है।'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={language === 'en' ? 'Search employees...' : 'कर्मचारी खोजें...'}
                            className="w-64 pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F42C1] dark:focus:ring-[#a074f0] transition-all"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    <button className="relative p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Bell size={20} className="text-gray-600 dark:text-gray-300" />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-[#6F42C1]/30 dark:hover:border-[#a074f0]/30 transition-all duration-300">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    {stat.title}
                                </p>
                                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.value}
                                </p>
                                {stat.change && (
                                    <div className="flex items-center gap-1.5">
                                        {stat.trend === 'up' ? (
                                            <TrendingUp size={14} className="text-green-500" />
                                        ) : (
                                            <TrendingDown size={14} className="text-red-500" />
                                        )}
                                        <span className={`text-xs font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                            {stat.change}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {language === 'en' ? 'vs last month' : 'पिछले माह से'}
                                        </span>
                                    </div>
                                )}
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

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart - Hiring Trends */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {language === 'en' ? 'Recruitment & Transfers' : 'भर्ती और स्थानांतरण'}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {language === 'en' ? 'Monthly overview for 2025' : '2025 के लिए मासिक अवलोकन'}
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#6F42C1] dark:text-[#a074f0] hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                            <Activity size={16} />
                            {language === 'en' ? 'View Report' : 'रिपोर्ट देखें'}
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={hiringTrendData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="hired" name={language === 'en' ? 'Hired' : 'नियुक्त'} fill="#6F42C1" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="transfers" name={language === 'en' ? 'Transfers' : 'स्थानांतरण'} fill="#a074f0" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - Department Distribution */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        {language === 'en' ? 'Department Distribution' : 'विभाग वितरण'}
                    </h3>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie
                                data={departmentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={75}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {departmentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => value.toLocaleString()}
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {departmentData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.name}</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {Math.round((item.value / 130000) * 100)}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
                    {language === 'en' ? 'Recent Activity' : 'हाल की गतिविधि'}
                </h3>
                <div className="space-y-4">
                    {recentActivities.map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
                            <div className="w-9 h-9 rounded-lg bg-[#6F42C1]/10 dark:bg-[#a074f0]/20 flex items-center justify-center flex-shrink-0">
                                <activity.icon size={18} className="text-[#6F42C1] dark:text-[#a074f0]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-200">{activity.action}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2.5 text-sm font-medium text-[#6F42C1] dark:text-[#a074f0] border border-[#6F42C1]/20 dark:border-[#a074f0]/20 rounded-lg hover:bg-[#6F42C1]/5 dark:hover:bg-[#a074f0]/10 transition-colors">
                    {language === 'en' ? 'View All Activity' : 'सभी गतिविधि देखें'}
                </button>
            </div>
        </div>
    );
};

export default Overview;
