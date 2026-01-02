import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { useClerk } from '@clerk/clerk-react';
import {
  PieChart as ChartIcon, Users, AlertCircle, Star, LogOut, LayoutDashboard,
  ClipboardCheck, BadgeIndianRupee
} from 'lucide-react';

// Import Dashboard Components
import SIOverview from '../components/dashboard/SIOverview';
import SIAttendanceMonitor from '../components/inspector/SIAttendanceMonitor';
import SIPerformancePayroll from '../components/inspector/SIPerformancePayroll';
import SIIssueTracker from '../components/inspector/SIIssueTracker';
import SIWeeklyCredits from '../components/inspector/SIWeeklyCredits';

const SanitaryInspectorDashboard = () => {
  const { language } = useLanguage();
  const [activeMenu, setActiveMenu] = useState('Overview');
  const { signOut } = useClerk();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { icon: LayoutDashboard, label: language === 'en' ? 'Overview' : 'अवलोकन', id: 'Overview' },
    { icon: ClipboardCheck, label: language === 'en' ? 'Attendance Monitor' : 'उपस्थिति निगरानी', id: 'Attendance' },
    { icon: BadgeIndianRupee, label: language === 'en' ? 'Performance & Payroll' : 'प्रदर्शन और वेतन', id: 'Payroll' },
    { icon: AlertCircle, label: language === 'en' ? 'Issue Tracker' : 'मुद्दा ट्रैकर', id: 'Issues' },
    { icon: Star, label: language === 'en' ? 'Credit System' : 'क्रेडिट सिस्टम', id: 'Credits' },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'Overview':
        return <SIOverview language={language} />;
      case 'Attendance':
        return <SIAttendanceMonitor language={language} />;
      case 'Payroll':
        return <SIPerformancePayroll language={language} />;
      case 'Issues':
        return <SIIssueTracker language={language} />;
      case 'Credits':
        return <SIWeeklyCredits language={language} />;
      default:
        return <SIOverview language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-inter">
      <Navbar onSidebarToggle={toggleSidebar} />

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          w-64 bg-[#1e1b4b] dark:bg-[#0f0d24] h-[calc(100vh-104px)] 
          fixed lg:sticky top-[104px] left-0 transition-transform duration-300 z-40 overflow-y-auto custom-scrollbar
          border-r border-white/5
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4">
            {/* Identity */}
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                <ChartIcon className="text-white" size={22} />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">MCD Inspector</h2>
                <p className="text-gray-400 text-xs">{language === 'en' ? 'Sanitation Panel' : 'निरीक्षक कक्ष'}</p>
              </div>
            </div>

            {/* Workspace Info */}
            <div className="mb-6 px-2">
              <div className="bg-[#2d2a5e]/50 border border-white/5 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">
                  {language === 'en' ? 'Active Zone' : 'सक्रिय क्षेत्र'}
                </p>
                <p className="text-white font-semibold text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {language === 'en' ? 'Ward 42 - Rohini' : 'वार्ड 42 - रोहिणी'}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${activeMenu === item.id
                    ? 'bg-gradient-to-r from-[#6F42C1] to-[#5a35a0] text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <item.icon size={20} className={`flex-shrink-0 transition-transform duration-300 ${activeMenu === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {activeMenu === item.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                  )}
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-white/10">
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
                >
                  <LogOut size={20} className="flex-shrink-0" />
                  <span className="text-sm font-medium">{language === 'en' ? 'Logout' : 'लॉग आउट'}</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SanitaryInspectorDashboard;