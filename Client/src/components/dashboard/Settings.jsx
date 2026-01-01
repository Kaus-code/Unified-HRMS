import React, { useState } from 'react';
import { Moon, Sun, Bell, Lock, Globe, Shield, User, Smartphone, LogOut } from 'lucide-react';

const Settings = ({ language }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [notifications, setNotifications] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(false);
    const [twoFactor, setTwoFactor] = useState(true);

    const tabs = [
        { id: 'general', label: language === 'en' ? 'General' : 'सामान्य', icon: User },
        { id: 'security', label: language === 'en' ? 'Security' : 'सुरक्षा', icon: Shield },
        { id: 'notifications', label: language === 'en' ? 'Notifications' : 'सूचनाएं', icon: Bell },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Settings' : 'सेटिंग्स'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Manage your account and preferences' : 'अपना खाता और वरीयताएँ प्रबंधित करें'}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Sidebar */}
                <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-[#6F42C1] text-white shadow-lg shadow-purple-500/20'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mt-auto">
                        <LogOut size={18} />
                        {language === 'en' ? 'Sign Out' : 'साइन आउट'}
                    </button>
                </div>

                {/* Settings Content */}
                <div className="flex-1 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    {language === 'en' ? 'Profile Information' : 'प्रोफ़ाइल जानकारी'}
                                </h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-gray-500">
                                            <User />
                                        </div>
                                        <button className="px-4 py-2 text-sm font-medium text-[#6F42C1] border border-[#6F42C1] rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/10">
                                            Change Photo
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                            <input type="text" defaultValue="Admin User" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                            <input type="email" defaultValue="admin@mcd.gov.in" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    {language === 'en' ? 'Preferences' : 'वरीयताएँ'}
                                </h3>
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-3">
                                        <Globe size={20} className="text-gray-500" />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Language</p>
                                            <p className="text-xs text-gray-500">Select your preferred language</p>
                                        </div>
                                    </div>
                                    <select className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm dark:text-white">
                                        <option>English</option>
                                        <option>Hindi</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                                    {language === 'en' ? 'Notification Preferences' : 'अधिसूचना वरीयताएँ'}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Bell className="text-[#6F42C1]" size={22} />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                                                <p className="text-xs text-gray-500">Receive notifications on your dashboard</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#6F42C1]"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Mail className="text-[#6F42C1]" size={22} />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">Email Alerts</p>
                                                <p className="text-xs text-gray-500">Receive daily digest of activities</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#6F42C1]"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                                    {language === 'en' ? 'Security Settings' : 'सुरक्षा सेटिंग्स'}
                                </h3>
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="text-[#6F42C1]" size={22} />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                                            <p className="text-xs text-gray-500">Add an extra layer of security</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#6F42C1]"></div>
                                    </label>
                                </div>

                                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Lock className="text-gray-500" size={20} />
                                        <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <input type="password" placeholder="Current Password" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white" />
                                        <input type="password" placeholder="New Password" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white" />
                                        <button className="w-full py-2 bg-[#6F42C1] text-white rounded-lg hover:bg-[#5a32a3] mt-2">Update Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
