import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser } from '@clerk/clerk-react';
import {
    Search, CheckCircle, UploadCloud, FileText, Shield,
    Loader, AlertCircle, ArrowRight, UserCheck
} from 'lucide-react';
import { Building2 } from 'lucide-react';

const RecruitmentPage = () => {
    const { user, isLoaded } = useUser();
    const [step, setStep] = useState(1); // 1: Verify, 2: Upload, 3: Success
    const [isLoading, setIsLoading] = useState(false);
    const [exams, setExams] = useState([]);

    // Form States
    const [formData, setFormData] = useState({
        examId: '',
        enrollmentNumber: '',
        dob: '',
        email: ''
    });

    const [candidate, setCandidate] = useState(null);
    const [driveLink, setDriveLink] = useState('');

    useEffect(() => {
        fetchExams();
    }, []);

    useEffect(() => {
        if (isLoaded && user) {
            const email = user.primaryEmailAddress?.emailAddress;
            setFormData(prev => ({
                ...prev,
                email: email || ''
            }));

            if (email) {
                checkExistingApplication(email);
            }
        }
    }, [isLoaded, user]);

    const checkExistingApplication = async (email) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/recruitment/application/${email}`);
            const data = await response.json();

            if (data.success && data.candidate) {
                setCandidate(data.candidate);
                // If they have "Submitted" or "Approved", show success page immediately
                if (['Submitted', 'Approved', 'Rejected'].includes(data.candidate.verificationStatus)) {
                    setStep(3);
                } else if (data.candidate.verificationStatus === 'Verified') {
                    // Start at docs upload if they were verified but never submitted
                    setStep(2);
                }
            }
        } catch (error) {
            console.error("Failed to check existing application", error);
        }
    };

    const fetchExams = async () => {
        try {
            console.log("Fetching exams from:", `${import.meta.env.VITE_BACKEND_URI}/api/recruitment`);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/recruitment`);
            const data = await response.json();
            console.log("Exams Data:", data);
            if (data.success) {
                setExams(data.data);
            } else {
                console.error("Failed to load exams:", data.message);
            }
        } catch (error) {
            console.error("Failed to fetch exams connection error", error);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating "Scanning" effect as requested
        setTimeout(async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/recruitment/check-status`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();

                if (data.success) {
                    setCandidate(data.candidate);
                    if (data.candidate.verificationStatus === 'Submitted' || data.candidate.verificationStatus === 'Approved') {
                        setStep(3); // Already done
                    } else {
                        setStep(2); // Go to docs
                    }
                } else {
                    alert(data.message || "Verification Failed");
                }
            } catch (error) {
                console.error(error);
                alert("System Error during verification");
            } finally {
                setIsLoading(false);
            }
        }, 1500); // Fake delay for "Scanning" UX
    };

    const handleSubmitDocuments = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/recruitment/submit-documents`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    enrollmentNumber: candidate.enrollmentNumber,
                    driveLink: driveLink
                })
            });
            const data = await res.json();
            if (data.success) {
                setCandidate(prev => ({ ...prev, verificationStatus: 'Submitted' }));
                setStep(3);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Submission failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans flex flex-col transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-[#0f0d24] text-white pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Shield size={16} className="text-green-400" />
                        <span className="text-sm font-medium tracking-wide">Official Government Recruitment Portal</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 animate-in fade-in zoom-in duration-700 delay-100">
                        Verify. Submit. Join.
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Securely verify your candidacy status and submit required documentation for final processing by the Staff Selection Commission.
                    </p>
                </div>

                {/* Decorative Blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Main Content Card - Overlapping Hero */}
            <main className="flex-grow max-w-4xl mx-auto px-6 -mt-24 w-full z-20 mb-20">
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden backdrop-blur-xl">

                    {/* Progress Bar */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 p-4">
                        <div className="flex items-center justify-center gap-4 text-sm font-medium">
                            <span className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-purple-100 dark:bg-purple-900/30 font-bold' : 'bg-gray-100 dark:bg-gray-800'}`}>1</div>
                                Identity
                            </span>
                            <div className={`w-12 h-1 rounded-full ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                            <span className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-purple-100 dark:bg-purple-900/30 font-bold' : 'bg-gray-100 dark:bg-gray-800'}`}>2</div>
                                Documents
                            </span>
                            <div className={`w-12 h-1 rounded-full ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                            <span className={`flex items-center gap-2 ${step >= 3 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-purple-100 dark:bg-purple-900/30 font-bold' : 'bg-gray-100 dark:bg-gray-800'}`}>3</div>
                                Status
                            </span>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 min-h-[400px]">

                        {/* Step 1: Verification Form */}
                        {step === 1 && (
                            <form onSubmit={handleVerify} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check Application Status</h2>
                                    <p className="text-gray-500 dark:text-gray-400">Enter your details exactly as extracted from your exam report card.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Examination</label>
                                        <select
                                            required
                                            value={formData.examId}
                                            onChange={e => setFormData({ ...formData, examId: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                                        >
                                            <option value="">Select Exam...</option>
                                            {exams.map(ex => (
                                                <option key={ex.examId} value={ex.examId}>{ex.examName} ({ex.year})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Enrollment Number</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="EN123456"
                                            value={formData.enrollmentNumber}
                                            onChange={e => setFormData({ ...formData, enrollmentNumber: e.target.value.toUpperCase() })}
                                            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all uppercase dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date of Birth</label>
                                        <input
                                            required
                                            type="date"
                                            value={formData.dob}
                                            onChange={e => setFormData({ ...formData, dob: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Registered Email</label>
                                        <input
                                            required
                                            type="email"
                                            disabled
                                            placeholder="Loading email..."
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 cursor-not-allowed focus:ring-0 outline-none transition-all text-gray-500 dark:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 mt-6 bg-[#6F42C1] hover:bg-[#5a32a3] text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader className="animate-spin" /> Verifying Records...
                                        </>
                                    ) : (
                                        <>
                                            Verify Identity <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Step 2: Documents */}
                        {step === 2 && candidate && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800 flex items-start gap-4">
                                    <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-full">
                                        <UserCheck className="text-green-600 dark:text-green-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">Identity Verified</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                                            Welcome, <span className="font-semibold text-gray-900 dark:text-white">{candidate.fullName}</span>.
                                            You have qualified for the <span className="font-semibold">{exams.find(e => e.examId === candidate.examId)?.examName}</span> position.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                        <FileText size={20} className="text-purple-600" />
                                        Required Documents
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {exams.find(e => e.examId === candidate.examId)?.requiredDocuments?.map((doc, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                                <CheckCircle size={16} className="text-purple-500" />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{doc}</span>
                                            </div>
                                        )) || <p className="text-sm text-gray-500">Standard documents required.</p>}
                                    </div>
                                </div>

                                <form onSubmit={handleSubmitDocuments} className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                                        Upload Documents via Google Drive
                                    </label>
                                    <p className="text-xs text-gray-500 mb-4">
                                        Please create a folder in your Google Drive containing all the above documents, enable "Anyone with the link can view", and paste the link below.
                                    </p>

                                    <div className="relative mb-6">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <UploadCloud className="text-gray-400" size={20} />
                                        </div>
                                        <input
                                            type="url"
                                            required
                                            placeholder="https://drive.google.com/drive/folders/..."
                                            value={driveLink}
                                            onChange={e => setDriveLink(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 bg-[#6F42C1] hover:bg-[#5a32a3] text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? <Loader className="animate-spin" /> : "Submit Application"}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Step 3: Success Status */}
                        {step === 3 && candidate && (
                            <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
                                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield size={48} className="text-green-600 dark:text-green-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Application Submitted</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-8">
                                    Your application and documents have been securely transmitted to the Deputy Commissioner for final approval.
                                </p>

                                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 inline-block text-left w-full max-w-md">
                                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                                        <span className="text-sm text-gray-500">Candidate Name</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{candidate.fullName}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                                        <span className="text-sm text-gray-500">Status</span>
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">Under Review</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Reference ID</span>
                                        <span className="font-mono text-gray-900 dark:text-white">{candidate._id?.substring(0, 8).toUpperCase()}</span>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button onClick={() => window.location.reload()} className="text-purple-600 font-medium hover:underline">
                                        Check Another Application
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RecruitmentPage;
