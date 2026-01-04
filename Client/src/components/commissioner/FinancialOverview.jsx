import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Building2, PieChart as PieChartIcon } from 'lucide-react';
import {
    BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const FinancialOverview = ({ language }) => {
    const [financial, setFinancial] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFinancialData();
    }, []);

    const fetchFinancialData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/analytics/financial-summary`);
            const data = await response.json();

            if (data.success) {
                setFinancial(data.financial);
            }
        } catch (error) {
            console.error('Error fetching financial data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const COLORS = ['#6F42C1', '#8b5cf6', '#a074f0', '#c4b5fd', '#ddd6fe'];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    const budgetUtilization = financial ? (financial.budgetUtilized / financial.totalBudget) * 100 : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Financial Overview' : 'वित्तीय अवलोकन'}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {language === 'en' ? 'Budget allocation and payroll management' : 'बजट आवंटन और वेतन प्रबंधन'}
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                            <DollarSign size={24} className="text-white" />
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'en' ? 'Total Annual Budget' : 'कुल वार्षिक बजट'}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(financial?.totalBudget || 0)}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                            <TrendingUp size={24} className="text-white" />
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'en' ? 'Total Expenditure' : 'कुल व्यय'}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(financial?.totalExpenditure || 0)}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                            <PieChartIcon size={24} className="text-white" />
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'en' ? 'Budget Utilized' : 'उपयोगित बजट'}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {budgetUtilization.toFixed(1)}%
                    </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                            <Building2 size={24} className="text-white" />
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'en' ? 'Remaining Budget' : 'शेष बजट'}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(financial?.budgetRemaining || 0)}
                    </p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sector Allocation Pie Chart */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                        {language === 'en' ? 'Budget Allocation by Sector' : 'क्षेत्र के अनुसार बजट आवंटन'}
                    </h3>
                    <div className="flex flex-col md:flex-row items-center justify-center h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={financial?.sectorAllocation || []}
                                    dataKey="allocation"
                                    nameKey="sector"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                >
                                    {financial?.sectorAllocation?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1f2937', color: '#fff' }}
                                />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Expenditure vs Budget Bar Chart */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                        {language === 'en' ? 'Expenditure vs Budget' : 'व्यय बनाम बजट'}
                    </h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={financial?.sectorAllocation || []}
                                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                                layout="vertical"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="sector"
                                    type="category"
                                    width={100}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1f2937', color: '#fff' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="allocation" name="Allocated" fill="#e5e7eb" radius={[0, 4, 4, 0]} barSize={20} />
                                <Bar dataKey="utilized" name="Spent" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Zone-wise Breakdown Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'en' ? 'Zone-wise Financial Breakdown' : 'क्षेत्रवार वित्तीय विवरण'}
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {language === 'en' ? 'Zone' : 'क्षेत्र'}
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {language === 'en' ? 'Employees' : 'कर्मचारी'}
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {language === 'en' ? 'Payroll Cost' : 'वेतन लागत'}
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {language === 'en' ? 'Ops Cost (Est.)' : 'परिचालन लागत'}
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {language === 'en' ? 'Total Expense' : 'कुल व्यय'}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {financial?.payrollByZone?.map((zone, idx) => (
                                <tr key={idx} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                                        {zone.zone}
                                    </td>
                                    <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">
                                        {zone.employeeCount}
                                    </td>
                                    <td className="py-3 px-4 text-right font-medium text-gray-900 dark:text-white">
                                        {formatCurrency(zone.totalPayroll)}
                                    </td>
                                    <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">
                                        {formatCurrency(zone.totalPayroll * 1.5)} {/* Estimated Ops Cost */}
                                    </td>
                                    <td className="py-3 px-4 text-right font-semibold text-purple-600 dark:text-purple-400">
                                        {formatCurrency(zone.totalPayroll * 2.5)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinancialOverview;
