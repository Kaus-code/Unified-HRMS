import React, { useState } from 'react';
import { UploadCloud, FileText, ExternalLink, CheckCircle2 } from 'lucide-react';

const DocumentUpload = ({ candidateData, onSubmitDocuments }) => {
    const [driveLink, setDriveLink] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleDriveSubmit = async () => {
        if (!driveLink) return alert("Please enter a valid Google Drive Link");
        setSubmitting(true);
        try {
            const res = await fetch('http://localhost:3000/api/verification/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: candidateData.email,
                    examId: candidateData.examId,
                    driveLink
                })
            });
            const data = await res.json();
            if (data.success) {
                onSubmitDocuments();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Submission error. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-w-2xl mx-auto">
            <div className="bg-[#6F42C1] dark:bg-[#5a32a3] p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-200" />
                        Document Submission
                    </h3>
                    <p className="text-purple-200 text-xs mt-1">Ref: {candidateData.examId} / {candidateData.enrollmentNumber}</p>
                </div>
                <div className="hidden sm:block">
                    <span className="bg-green-500/20 text-green-100 text-xs px-3 py-1 rounded-full border border-green-500/30 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Identity Verified
                    </span>
                </div>
            </div>

            <div className="p-8 space-y-8">
                {/* Instructions Box */}
                <div className="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-lg border-l-4 border-[#6F42C1]">
                    <h4 className="font-semibold text-[#6F42C1] dark:text-purple-300 mb-2 text-sm">Submission Guidelines:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 list-disc pl-4">
                        <li>Create a folder on <strong>Google Drive</strong> named <code>{candidateData.enrollmentNumber}_Documents</code>.</li>
                        <li>Upload clean scans of 10th, 12th, and Graduation Certificates.</li>
                        <li>Set folder access to <strong>"Anyone with the link can view"</strong>.</li>
                        <li>Paste the folder link below for Authority Review.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                        Google Drive Folder Link <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ExternalLink className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="url"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#6F42C1] focus:border-transparent outline-none transition-all placeholder-gray-400"
                            placeholder="https://drive.google.com/drive/folders/..."
                            value={driveLink}
                            onChange={(e) => setDriveLink(e.target.value)}
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                        onClick={handleDriveSubmit}
                        disabled={submitting}
                        className="w-full bg-[#6F42C1] hover:bg-[#5a32a3] text-white py-3.5 rounded-lg font-bold shadow-md hover:shadow-lg transform active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <UploadCloud className="h-5 w-5 animate-bounce" /> Processing Submission...
                            </>
                        ) : (
                            <>
                                <UploadCloud className="h-5 w-5" /> secure_submit_documents()
                            </>
                        )}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-2">
                        IP Address recorded for security audit purposes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DocumentUpload;
