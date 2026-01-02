import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { useClerk } from '@clerk/clerk-react';
import {
  PieChart as ChartIcon, Users, AlertCircle, Star, LogOut, LayoutDashboard
} from 'lucide-react';

// Import Dashboard Components
import SIOverview from '../components/dashboard/SIOverview';
import SIEmployees from '../components/dashboard/SIEmployees';
import SIIssues from '../components/dashboard/SIIssues';
import SIQualityRating from '../components/dashboard/SIQualityRating';

const SanitaryInspectorDashboard = () => {
  const { language } = useLanguage();
  const [activeMenu, setActiveMenu] = useState('Overview');
  const { signOut } = useClerk();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { icon: LayoutDashboard, label: language === 'en' ? 'Overview' : 'अवलोकन', id: 'Overview' },
    { icon: Users, label: language === 'en' ? 'Monitor Employees' : 'कर्मचारियों की निगरानी', id: 'Employees' },
    { icon: AlertCircle, label: language === 'en' ? 'Issues & Grievances' : 'मुद्दे और शिकायतें', id: 'Issues' },
    { icon: Star, label: language === 'en' ? 'Quality Rating' : 'गुणवत्ता रेटिंग', id: 'QualityRating' },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'Overview':
        return <SIOverview language={language} />;
      case 'Employees':
        return <SIEmployees language={language} />;
      case 'Issues':
        return <SIIssues language={language} />;
      case 'QualityRating':
        return <SIQualityRating language={language} />;
      default:
        return <SIOverview language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar onSidebarToggle={toggleSidebar} />

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          w-64 bg-[#1e1b4b] dark:bg-[#0f0d24] h-[calc(100vh-104px)] 
          fixed lg:sticky top-[104px] left-0 transition-transform duration-300 z-40 overflow-y-auto custom-scrollbar
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4">
            {/* Identity */}
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 rounded-xl bg-[#6F42C1] flex items-center justify-center flex-shrink-0">
                <ChartIcon className="text-white" size={22} />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Sanitation</h2>
                <p className="text-gray-400 text-xs">{language === 'en' ? 'Inspector Panel' : 'निरीक्षक कक्ष'}</p>
              </div>
            </div>

            {/* Workspace Info */}
            <div className="mb-6">
              <div className="bg-[#2d2a5e] rounded-xl p-3">
                <p className="text-white font-semibold text-sm">{language === 'en' ? 'Ward 42 - Rohini' : 'वार्ड 42 - रोहिणी'}</p>
                <p className="text-gray-400 text-xs">{language === 'en' ? 'Active Ward' : 'सक्रिय वार्ड'}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${activeMenu === item.id
                    ? 'bg-[#6F42C1] text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-400 hover:bg-[#2d2a5e] hover:text-white'
                    }`}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}

              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 mt-4"
              >
                <LogOut size={20} className="flex-shrink-0" />
                <span className="text-sm font-medium">{language === 'en' ? 'Logout' : 'लॉग आउट'}</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SanitaryInspectorDashboard;