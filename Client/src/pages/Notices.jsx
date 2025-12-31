import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { Search, Download, Calendar, Building2, FileText, AlertCircle, Bell, Users, Filter, ChevronLeft, ChevronRight, Eye, Tag } from 'lucide-react'

const Notices = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy notices data
  const notices = [
    {
      id: 1,
      title: language === 'en' ? "Revised Transfer Policy for Grade-A Officers - 2025" : "ग्रेड-ए अधिकारियों के लिए संशोधित स्थानांतरण नीति - 2025",
      department: language === 'en' ? "Human Resources" : "मानव संसाधन",
      date: "2025-01-15",
      category: "transfer",
      priority: "high",
      description: language === 'en'
        ? "This circular outlines the revised transfer policy applicable to all Grade-A officers effective from February 2025. All departments are required to comply with these guidelines."
        : "यह परिपत्र फरवरी 2025 से सभी ग्रेड-ए अधिकारियों पर लागू संशोधित स्थानांतरण नीति की रूपरेखा प्रस्तुत करता है।",
      fileSize: "2.4 MB",
      views: 1245
    },
    {
      id: 2,
      title: language === 'en' ? "Holiday Calendar for Financial Year 2025-26" : "वित्तीय वर्ष 2025-26 के लिए छुट्टी कैलेंडर",
      department: language === 'en' ? "General Administration" : "सामान्य प्रशासन",
      date: "2025-01-10",
      category: "general",
      priority: "normal",
      description: language === 'en'
        ? "Official list of gazetted and restricted holidays for all MCD employees for the upcoming financial year 2025-26."
        : "आगामी वित्तीय वर्ष 2025-26 के लिए सभी एमसीडी कर्मचारियों के लिए राजपत्रित और प्रतिबंधित छुट्टियों की आधिकारिक सूची।",
      fileSize: "1.1 MB",
      views: 3420
    },
    {
      id: 3,
      title: language === 'en' ? "Mandatory Biometric Verification for Field Staff" : "फील्ड स्टाफ के लिए अनिवार्य बायोमेट्रिक सत्यापन",
      department: language === 'en' ? "IT Cell" : "आईटी सेल",
      date: "2025-01-08",
      category: "circular",
      priority: "urgent",
      description: language === 'en'
        ? "All field staff are required to complete biometric verification by January 31, 2025. Failure to comply may result in payroll discrepancies."
        : "सभी फील्ड स्टाफ को 31 जनवरी, 2025 तक बायोमेट्रिक सत्यापन पूरा करना होगा।",
      fileSize: "856 KB",
      views: 5678
    },
    {
      id: 4,
      title: language === 'en' ? "New Empanelled Hospital List for Employee Health Scheme" : "कर्मचारी स्वास्थ्य योजना के लिए नई सूचीबद्ध अस्पताल सूची",
      department: language === 'en' ? "Health Department" : "स्वास्थ्य विभाग",
      date: "2025-01-05",
      category: "welfare",
      priority: "normal",
      description: language === 'en'
        ? "Updated list of empanelled hospitals and healthcare facilities available for MCD employees and their dependents under the Employee Health Scheme."
        : "कर्मचारी स्वास्थ्य योजना के तहत एमसीडी कर्मचारियों और उनके आश्रितों के लिए उपलब्ध सूचीबद्ध अस्पतालों की अद्यतन सूची।",
      fileSize: "3.2 MB",
      views: 2156
    },
    {
      id: 5,
      title: language === 'en' ? "Annual Performance Appraisal (APAR) Submission Deadline" : "वार्षिक प्रदर्शन मूल्यांकन (APAR) जमा करने की अंतिम तिथि",
      department: language === 'en' ? "Human Resources" : "मानव संसाधन",
      date: "2025-01-02",
      category: "deadline",
      priority: "high",
      description: language === 'en'
        ? "Reminder: All Grade-A and Grade-B officers must complete their APAR self-assessment by January 31, 2025. Supervisory review deadline is February 15, 2025."
        : "अनुस्मारक: सभी ग्रेड-ए और ग्रेड-बी अधिकारियों को 31 जनवरी, 2025 तक अपना एपीएआर स्व-मूल्यांकन पूरा करना होगा।",
      fileSize: "524 KB",
      views: 4532
    },
    {
      id: 6,
      title: language === 'en' ? "Tender Notice: Procurement of IT Equipment for Zonal Offices" : "निविदा सूचना: क्षेत्रीय कार्यालयों के लिए आईटी उपकरण की खरीद",
      department: language === 'en' ? "Procurement Division" : "खरीद प्रभाग",
      date: "2024-12-28",
      category: "tender",
      priority: "normal",
      description: language === 'en'
        ? "Sealed tenders are invited for the supply and installation of desktop computers, printers, and networking equipment for 12 zonal offices."
        : "12 क्षेत्रीय कार्यालयों के लिए डेस्कटॉप कंप्यूटर, प्रिंटर और नेटवर्किंग उपकरण की आपूर्ति और स्थापना के लिए सील निविदाएं आमंत्रित हैं।",
      fileSize: "1.8 MB",
      views: 876
    },
    {
      id: 7,
      title: language === 'en' ? "Workshop on Digital Service Book (e-SB) Module" : "डिजिटल सेवा पुस्तक (e-SB) मॉड्यूल पर कार्यशाला",
      department: language === 'en' ? "Training Cell" : "प्रशिक्षण प्रकोष्ठ",
      date: "2024-12-25",
      category: "training",
      priority: "normal",
      description: language === 'en'
        ? "A two-day workshop on the Digital Service Book module will be conducted for all nodal officers. Registration is mandatory."
        : "डिजिटल सेवा पुस्तक मॉड्यूल पर सभी नोडल अधिकारियों के लिए दो दिवसीय कार्यशाला आयोजित की जाएगी।",
      fileSize: "678 KB",
      views: 1234
    },
    {
      id: 8,
      title: language === 'en' ? "Revised Pay Fixation Guidelines Post 7th Pay Commission" : "7वें वेतन आयोग के बाद संशोधित वेतन निर्धारण दिशानिर्देश",
      department: language === 'en' ? "Finance Department" : "वित्त विभाग",
      date: "2024-12-20",
      category: "payroll",
      priority: "high",
      description: language === 'en'
        ? "Clarification on pay fixation for employees who were promoted after implementation of 7th Pay Commission recommendations."
        : "7वें वेतन आयोग की सिफारिशों के लागू होने के बाद पदोन्नत कर्मचारियों के लिए वेतन निर्धारण पर स्पष्टीकरण।",
      fileSize: "1.5 MB",
      views: 3987
    }
  ];

  // Categories with icons
  const categories = [
    { id: 'all', label: language === 'en' ? 'All Notices' : 'सभी सूचनाएं', icon: FileText },
    { id: 'circular', label: language === 'en' ? 'Circulars' : 'परिपत्र', icon: Bell },
    { id: 'transfer', label: language === 'en' ? 'Transfer Orders' : 'स्थानांतरण आदेश', icon: Users },
    { id: 'tender', label: language === 'en' ? 'Tenders' : 'निविदाएं', icon: Tag },
    { id: 'welfare', label: language === 'en' ? 'Welfare Schemes' : 'कल्याण योजनाएं', icon: AlertCircle },
  ];

  // Filter notices based on category and search
  const filteredNotices = notices.filter(notice => {
    const matchesCategory = activeCategory === 'all' || notice.category === activeCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Priority badge styles
  const getPriorityBadge = (priority) => {
    const styles = {
      urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
      high: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
      normal: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
    };
    const labels = {
      urgent: language === 'en' ? 'Urgent' : 'अत्यावश्यक',
      high: language === 'en' ? 'Important' : 'महत्वपूर्ण',
      normal: language === 'en' ? 'General' : 'सामान्य'
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${styles[priority]}`}>
        {labels[priority]}
      </span>
    );
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section with Purple Gradient */}
      <section className="relative bg-gradient-to-br from-[#6F42C1] via-[#7c4dce] to-[#8b5cf6] dark:from-[#5a32a3] dark:via-[#6639b5] dark:to-[#7c4dce] text-white py-12 md:py-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6 opacity-80" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><a href="/" className="hover:underline">{language === 'en' ? 'Home' : 'होम'}</a></li>
              <li>/</li>
              <li className="font-medium">{language === 'en' ? 'Public Notices' : 'सार्वजनिक सूचनाएं'}</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                {language === 'en' ? 'Public Notices & Circulars' : 'सार्वजनिक सूचनाएं और परिपत्र'}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                {language === 'en'
                  ? 'Stay updated with the latest circulars, notifications, and important announcements from MCD departments.'
                  : 'एमसीडी विभागों से नवीनतम परिपत्रों, अधिसूचनाओं और महत्वपूर्ण घोषणाओं से अपडेट रहें।'}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{notices.length}</div>
                <div className="text-sm text-white/70">{language === 'en' ? 'Total Notices' : 'कुल सूचनाएं'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm text-white/70">{language === 'en' ? 'This Week' : 'इस सप्ताह'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">

          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 md:p-6 mb-8 transition-colors">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search Input */}
              <div className="relative flex-grow max-w-xl">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search notices by title or department...' : 'शीर्षक या विभाग द्वारा सूचनाएं खोजें...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6F42C1] dark:focus:ring-[#a074f0] focus:border-transparent transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>

              {/* Filter Button */}
              <button className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Filter size={18} />
                <span>{language === 'en' ? 'Advanced Filter' : 'उन्नत फ़िल्टर'}</span>
              </button>
            </div>

            {/* Category Tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.id
                        ? 'bg-[#6F42C1] dark:bg-[#a074f0] text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    <Icon size={16} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notices List */}
          <div className="space-y-4">
            {filteredNotices.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-800">
                <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'No notices found' : 'कोई सूचनाएं नहीं मिलीं'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === 'en' ? 'Try adjusting your search or filter criteria.' : 'अपनी खोज या फ़िल्टर मानदंड समायोजित करने का प्रयास करें।'}
                </p>
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <article
                  key={notice.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 md:p-6 hover:shadow-lg hover:border-[#6F42C1]/30 dark:hover:border-[#a074f0]/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Notice Content */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {getPriorityBadge(notice.priority)}
                        <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                          <Building2 size={14} />
                          {notice.department}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={14} />
                          {formatDate(notice.date)}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#6F42C1] dark:group-hover:text-[#a074f0] transition-colors cursor-pointer">
                        {notice.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                        {notice.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {notice.views.toLocaleString()} {language === 'en' ? 'views' : 'दृश्य'}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText size={14} />
                          PDF • {notice.fileSize}
                        </span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <div className="flex lg:flex-col gap-3 lg:items-end">
                      <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#6F42C1] dark:bg-[#a074f0] text-white rounded-lg font-medium hover:bg-[#5a32a3] dark:hover:bg-[#8b5cf6] transition-colors shadow-md hover:shadow-lg">
                        <Download size={16} />
                        <span>{language === 'en' ? 'Download' : 'डाउनलोड'}</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[#6F42C1] dark:border-[#a074f0] text-[#6F42C1] dark:text-[#a074f0] rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                        <Eye size={16} />
                        <span>{language === 'en' ? 'View' : 'देखें'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredNotices.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === 'en'
                  ? `Showing ${filteredNotices.length} of ${notices.length} notices`
                  : `${notices.length} में से ${filteredNotices.length} सूचनाएं दिखाई जा रही हैं`}
              </p>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={20} />
                </button>

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
                        ? 'bg-[#6F42C1] dark:bg-[#a074f0] text-white'
                        : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="mt-12 bg-gradient-to-r from-[#6F42C1]/10 via-[#7c4dce]/10 to-[#8b5cf6]/10 dark:from-[#6F42C1]/20 dark:via-[#7c4dce]/20 dark:to-[#8b5cf6]/20 rounded-xl p-6 md:p-8 border border-[#6F42C1]/20 dark:border-[#a074f0]/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#6F42C1] dark:bg-[#a074f0] flex items-center justify-center">
                <Bell className="text-white" size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Subscribe to Notifications' : 'सूचनाओं के लिए सदस्यता लें'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en'
                    ? 'Get instant email alerts when new notices or circulars are published. Enter your registered email to subscribe.'
                    : 'नई सूचनाएं या परिपत्र प्रकाशित होने पर तुरंत ईमेल अलर्ट प्राप्त करें।'}
                </p>
              </div>
              <button className="flex-shrink-0 px-6 py-3 bg-[#6F42C1] dark:bg-[#a074f0] text-white rounded-lg font-semibold hover:bg-[#5a32a3] dark:hover:bg-[#8b5cf6] transition-colors shadow-md">
                {language === 'en' ? 'Subscribe Now' : 'अभी सदस्यता लें'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Notices