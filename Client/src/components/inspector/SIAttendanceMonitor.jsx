import React, { useState, useEffect } from 'react';
import { Search, UserCheck, AlertTriangle, Clock, MapPin, RefreshCw, Loader, X, Calendar, Award, TrendingUp, Phone, Mail, Briefcase, Home } from 'lucide-react';

const SIAttendanceMonitor = ({ language = 'en', currentUser }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const fetchAttendance = async () => {
        if (!currentUser?.Ward) return;
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/attendance/ward/${currentUser.Ward}/today`);
            const data = await response.json();
            if (data.success) {
                setAttendanceData(data.attendance || []);
            }
        } catch (error) {
            console.error("Error fetching attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchEmployeeDetails = async (employeeId) => {
        setLoadingDetails(true);
        try {
            // Fetch detailed employee info
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/verify/employee/${employeeId}`);
            const data = await response.json();

            if (data.success && data.user) {
                setEmployeeDetails(data.user);
            } else {
                // Fallback: use basic info from selected employee
                setEmployeeDetails({
                    employeeId: employeeId,
                    name: selectedEmployee.name,
                    role: selectedEmployee.role,
                    Ward: currentUser?.Ward,
                    email: `${employeeId.toLowerCase()}@mcd.gov.in`,
                    employmentStatus: 'Permanent',
                    baseSalary: 25000
                });
            }
        } catch (error) {
            console.error("Error fetching employee details:", error);
            // Set fallback data on error
            setEmployeeDetails({
                employeeId: employeeId,
                name: selectedEmployee.name,
                role: selectedEmployee.role,
                Ward: currentUser?.Ward,
                email: `${employeeId.toLowerCase()}@mcd.gov.in`,
                employmentStatus: 'Permanent',
                baseSalary: 25000
            });
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
        // Set immediate fallback data first
        setEmployeeDetails({
            employeeId: employee.id,
            name: employee.name,
            role: employee.role,
            Ward: currentUser?.Ward,
            email: `${employee.id.toLowerCase()}@mcd.gov.in`,
            employmentStatus: 'Permanent',
            baseSalary: 25000
        });
        // Then try to fetch detailed info
        fetchEmployeeDetails(employee.id);
    };

    const closeModal = () => {
        setSelectedEmployee(null);
        setEmployeeDetails(null);
    };

    useEffect(() => {
        fetchAttendance();
    }, [currentUser]);

    const filteredData = attendanceData.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Present': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'Absent': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            case 'Late': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        {language === 'en' ? 'Today\'s Attendance' : 'आज की उपस्थिति'}
                        {loading && <Loader className="animate-spin text-gray-400" size={16} />}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        {language === 'en' ? 'Live monitoring of field staff' : 'फील्ड स्टाफ की लाइव निगरानी'}
                    </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 md:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={language === 'en' ? "Search worker..." : "कर्मचारी खोजें..."}
                            className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={fetchAttendance}
                        disabled={loading}
                        className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <RefreshCw size={20} className={`text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Attendance Cards Grid */}
            {loading && attendanceData.length === 0 ? (
                <div className="text-center py-20 text-gray-500">Loading attendance data...</div>
            ) : filteredData.length === 0 ? (
                <div className="text-center py-20 text-gray-400">No staff found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredData.map((worker) => (
                        <div
                            key={worker.id}
                            onClick={() => handleEmployeeClick(worker)}
                            className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group cursor-pointer"
                        >
                            {/* Status Stripe */}
                            <div className={`absolute top-0 left-0 w-1 h-full ${worker.status === 'Present' ? 'bg-green-500' :
                                worker.status === 'Absent' ? 'bg-red-500' :
                                    worker.status === 'Late' ? 'bg-amber-500' : 'bg-gray-400'
                                }`}></div>

                            <div className="flex items-start gap-4 pl-2">
                                <img src={worker.image} alt={worker.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm group-hover:scale-110 transition-transform" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 dark:text-white">{worker.name}</h3>
                                    <p className="text-xs text-gray-500 font-mono mb-1">{worker.id} • {worker.role}</p>

                                    <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 mb-3">
                                        <MapPin size={12} />
                                        <span className="truncate max-w-[150px]">{worker.location}</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getStatusStyle(worker.status)}`}>
                                            {worker.status}
                                        </span>
                                        {worker.checkIn !== '--' && (
                                            <div className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                                                <Clock size={12} />
                                                {worker.checkIn}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Employee Details Modal */}
            {selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <div className="flex items-start gap-4">
                                <img
                                    src={selectedEmployee.image}
                                    alt={selectedEmployee.name}
                                    className="w-20 h-20 rounded-xl object-cover border-4 border-white/30 shadow-lg"
                                />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold mb-1">{selectedEmployee.name}</h2>
                                    <p className="text-purple-100 text-sm font-mono">{selectedEmployee.id}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedEmployee.status === 'Present' ? 'bg-green-500 text-white' :
                                            selectedEmployee.status === 'Absent' ? 'bg-red-500 text-white' :
                                                'bg-amber-500 text-white'
                                            }`}>
                                            {selectedEmployee.status}
                                        </span>
                                        {selectedEmployee.checkIn !== '--' && (
                                            <span className="text-sm text-purple-100">
                                                Check-in: {selectedEmployee.checkIn}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            {loadingDetails ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader className="animate-spin text-gray-400" size={32} />
                                </div>
                            ) : employeeDetails ? (
                                <div className="space-y-6">
                                    {/* Basic Info */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                            {language === 'en' ? 'Basic Information' : 'बुनियादी जानकारी'}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                                <Briefcase className="text-purple-500" size={20} />
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{employeeDetails.role || selectedEmployee.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                                <Home className="text-blue-500" size={20} />
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Ward</p>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{employeeDetails.Ward || 'N/A'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                                <Mail className="text-green-500" size={20} />
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                                    <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">{employeeDetails.email || 'N/A'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                                <Calendar className="text-orange-500" size={20} />
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Employment</p>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{employeeDetails.employmentStatus || 'Permanent'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location Info */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                            {language === 'en' ? 'Current Location' : 'वर्तमान स्थान'}
                                        </h3>
                                        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                            <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedEmployee.location}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last updated: Today at {selectedEmployee.checkIn}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Performance Stats */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                            {language === 'en' ? 'Performance Metrics' : 'प्रदर्शन मेट्रिक्स'}
                                        </h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                                <TrendingUp className="text-purple-500 mx-auto mb-2" size={24} />
                                                <p className="text-2xl font-bold text-gray-800 dark:text-white">85%</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Attendance</p>
                                            </div>
                                            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                                                <Award className="text-green-500 mx-auto mb-2" size={24} />
                                                <p className="text-2xl font-bold text-gray-800 dark:text-white">7.5</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Credits</p>
                                            </div>
                                            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl border border-amber-200 dark:border-amber-800">
                                                <Clock className="text-amber-500 mx-auto mb-2" size={24} />
                                                <p className="text-2xl font-bold text-gray-800 dark:text-white">22</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Days</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    {employeeDetails.baseSalary && (
                                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Base Salary</span>
                                                <span className="font-bold text-lg text-gray-800 dark:text-white">₹{employeeDetails.baseSalary.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    Unable to load employee details
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                            >
                                {language === 'en' ? 'Close' : 'बंद करें'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SIAttendanceMonitor;
