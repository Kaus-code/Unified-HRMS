import React, { useState } from 'react';
import { Plus, Briefcase, MapPin, Calendar, Trash2, Clock } from 'lucide-react';

const Notices = ({ language }) => {
    const [notices, setNotices] = useState([
        {
            id: 1,
            title: 'Senior Medical Officer',
            location: 'Rohini Zone',
            department: 'Health',
            deadline: '15 Days',
            posted: '2 days ago'
        },
        {
            id: 2,
            title: 'Sanitation Supervisor',
            location: 'Civil Lines',
            department: 'Sanitation',
            deadline: '10 Days',
            posted: '5 days ago'
        }
    ]);

    const [newNotice, setNewNotice] = useState({
        title: '',
        location: '',
        department: '',
        deadline: ''
    });

    const [showForm, setShowForm] = useState(false);

    const handleAddNotice = (e) => {
        e.preventDefault();
        const notice = {
            id: Date.now(),
            ...newNotice,
            posted: 'Just now'
        };
        setNotices([notice, ...notices]);
        setNewNotice({ title: '', location: '', department: '', deadline: '' });
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Notices & Vacancies' : 'सूचनाएं और रिक्तियां'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {language === 'en' ? 'Manage circulars and job postings' : 'परिपत्र और नौकरी पोस्टिंग प्रबंधित करें'}
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#6F42C1] text-white rounded-xl hover:bg-[#5a32a3] transition-colors"
                >
                    <Plus size={20} />
                    {language === 'en' ? 'Create New Notice' : 'नई सूचना बनाएं'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                        {language === 'en' ? 'Post New Vacancy' : 'नई रिक्ति पोस्ट करें'}
                    </h3>
                    <form onSubmit={handleAddNotice} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {language === 'en' ? 'Job Title / Notice Subject' : 'नौकरी का शीर्षक / सूचना विषय'}
                            </label>
                            <input
                                required
                                type="text"
                                value={newNotice.title}
                                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6F42C1]"
                                placeholder="e.g. Doctor, Clerk"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {language === 'en' ? 'Locality / Zone' : 'इलाका / क्षेत्र'}
                            </label>
                            <input
                                required
                                type="text"
                                value={newNotice.location}
                                onChange={(e) => setNewNotice({ ...newNotice, location: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6F42C1]"
                                placeholder="e.g. Rohini Sector 12"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {language === 'en' ? 'Department' : 'विभाग'}
                            </label>
                            <select
                                required
                                value={newNotice.department}
                                onChange={(e) => setNewNotice({ ...newNotice, department: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6F42C1]"
                            >
                                <option value="">Select Department</option>
                                <option value="Health">Health</option>
                                <option value="Sanitation">Sanitation</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {language === 'en' ? 'Time Limit (Days)' : 'समय सीमा (दिन)'}
                            </label>
                            <input
                                required
                                type="text"
                                value={newNotice.deadline}
                                onChange={(e) => setNewNotice({ ...newNotice, deadline: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6F42C1]"
                                placeholder="e.g. 15 Days"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            >
                                {language === 'en' ? 'Cancel' : 'रद्द करें'}
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#6F42C1] text-white rounded-lg hover:bg-[#5a32a3]"
                            >
                                {language === 'en' ? 'Publish Notice' : 'सूचना प्रकाशित करें'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {notices.map((notice) => (
                    <div key={notice.id} className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{notice.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={14} /> {notice.location}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span>{notice.department}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="flex items-center gap-1 text-orange-500">
                                        <Clock size={14} /> {notice.deadline} left
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <span className="text-xs text-gray-400 ml-auto md:ml-0">Posted {notice.posted}</span>
                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notices;
