import React, { useState } from 'react';
import { Star, Save, User, Search, CheckSquare, Square } from 'lucide-react';

const SIQualityRating = ({ language }) => {
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const employees = [
        { id: 1, name: 'Rajesh Kumar', role: 'Sweeper' },
        { id: 2, name: 'Sita Devi', role: 'Sweeper' },
        { id: 3, name: 'Mohan Singh', role: 'Driver' },
        { id: 4, name: 'Priya Sharma', role: 'Supervisor' },
        { id: 5, name: 'Amit Verma', role: 'Sweeper' },
        { id: 6, name: 'Vikram Singh', role: 'Driver' },
    ];

    const toggleEmployee = (empId) => {
        setSelectedEmployees(prev =>
            prev.includes(empId)
                ? prev.filter(id => id !== empId)
                : [...prev, empId]
        );
        // Reset rating if we are starting a fresh selection cycle, 
        // but typically we want to keep the rating if we are just adjusting the group.
    };

    const toggleAll = () => {
        const filtered = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const filteredIds = filtered.map(e => e.id);

        const allSelected = filteredIds.every(id => selectedEmployees.includes(id));

        if (allSelected) {
            setSelectedEmployees(prev => prev.filter(id => !filteredIds.includes(id)));
        } else {
            setSelectedEmployees(prev => [...new Set([...prev, ...filteredIds])]);
        }
    };

    const handleSubmit = () => {
        if (selectedEmployees.length === 0) return;
        const names = employees.filter(e => selectedEmployees.includes(e.id)).map(e => e.name).join(', ');
        alert(`Rating of ${rating}/10 submitted for: ${names}`);
        setRating(0);
        setFeedback('');
        setSelectedEmployees([]);
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Quality Assurance Rating' : 'गुणवत्ता आश्वासन रेटिंग'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {language === 'en' ? 'Rate employee performance (1-10 scale)' : 'कर्मचारी के प्रदर्शन को रेट करें (1-10 पैमाना)'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Employee List Section */}
                <div className="md:col-span-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[600px]">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 space-y-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {language === 'en' ? 'Select Employees' : 'कर्मचारी चुनें'}
                        </h3>
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder={language === 'en' ? "Search by name..." : "नाम से खोजें..."}
                                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F42C1]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* Select All */}
                        <button
                            onClick={toggleAll}
                            className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-[#6F42C1] transition-colors"
                        >
                            <CheckSquare size={14} />
                            {language === 'en' ? 'Select All Filtered' : 'सभी फ़िल्टर किए गए चुनें'}
                        </button>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-800 overflow-y-auto flex-1 custom-scrollbar">
                        {filteredEmployees.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                {language === 'en' ? 'No employees found' : 'कोई कर्मचारी नहीं मिला'}
                            </div>
                        ) : (
                            filteredEmployees.map((emp) => {
                                const isSelected = selectedEmployees.includes(emp.id);
                                return (
                                    <div
                                        key={emp.id}
                                        onClick={() => toggleEmployee(emp.id)}
                                        className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer
                                            ${isSelected ? 'bg-purple-50 dark:bg-purple-900/10' : ''}
                                        `}
                                    >
                                        <div className={`text-[#6F42C1] transition-all duration-200 ${isSelected ? 'opacity-100 scale-110' : 'opacity-30 scale-100'}`}>
                                            {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                                        </div>

                                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 flex-shrink-0">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className={`font-medium ${isSelected ? 'text-[#6F42C1]' : 'text-gray-900 dark:text-white'}`}>
                                                {emp.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{emp.role}</p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 text-xs text-center text-gray-500">
                        {selectedEmployees.length} {language === 'en' ? 'selected' : 'चयनित'}
                    </div>
                </div>

                {/* Rating Area */}
                <div className="md:col-span-7 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#6F42C1]/5 rounded-bl-full pointer-events-none"></div>

                    {selectedEmployees.length === 0 ? (
                        <div className="text-gray-400 max-w-sm">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <User size={32} className="opacity-40" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {language === 'en' ? 'No Selection' : 'कोई चयन नहीं'}
                            </h3>
                            <p>{language === 'en' ? 'Search and select one or more employees from the list to assign a quality rating.' : 'गुणवत्ता रेटिंग देने के लिए सूची से एक या अधिक कर्मचारियों को खोजें और चुनें।'}</p>
                        </div>
                    ) : (
                        <div className="w-full max-w-lg animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="mb-6">
                                <div className="flex items-center justify-center -space-x-3 mb-4">
                                    {selectedEmployees.slice(0, 5).map((id, idx) => (
                                        <div key={id} className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-[#6F42C1] flex items-center justify-center text-white font-bold text-sm shadow-md z-[5-idx]">
                                            {employees.find(e => e.id === id)?.name.charAt(0)}
                                        </div>
                                    ))}
                                    {selectedEmployees.length > 5 && (
                                        <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 font-bold text-xs shadow-md z-0">
                                            +{selectedEmployees.length - 5}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {language === 'en' ? `Rating ${selectedEmployees.length} Employee(s)` : `${selectedEmployees.length} कर्मचारी(ओं) को रेटिंग`}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {language === 'en' ? 'Assign a score out of 10' : '10 में से एक अंक निर्धारित करें'}
                                </p>
                            </div>

                            {/* 10 Star Rating */}
                            <div className="flex justify-center gap-1 mb-8 flex-wrap max-w-sm mx-auto">
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`transition-transform hover:scale-110 p-1 ${star <= rating ? 'text-amber-400' : 'text-gray-200 dark:text-gray-700'}`}
                                    >
                                        <Star size={28} fill={star <= rating ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-center gap-2 mb-6">
                                <span className="text-4xl font-bold text-[#6F42C1]">{rating || 0}</span>
                                <span className="text-xl text-gray-400 font-medium">/ 10</span>
                            </div>

                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder={language === 'en' ? 'Optional feedback for chosen employees...' : 'चयनित कर्मचारियों के लिए वैकल्पिक प्रतिक्रिया...'}
                                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6F42C1] min-h-[120px] mb-6 resize-none"
                            ></textarea>

                            <button
                                onClick={handleSubmit}
                                disabled={rating === 0}
                                className="w-full py-3.5 bg-[#6F42C1] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a32a3] text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                            >
                                <Save size={20} />
                                {language === 'en' ? 'Submit Group Rating' : 'समूह रेटिंग जमा करें'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SIQualityRating;
