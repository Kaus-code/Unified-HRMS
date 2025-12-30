import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full font-sans" role="contentinfo">
            {/* Main Footer Section */}
            <div className="bg-white pt-12 pb-8 px-4 md:px-8 lg:px-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 justify-between">

                    {/* Left Section - MCD Branding */}
                    <div className="flex-shrink-0 lg:w-1/4">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/logo.png" alt="MCD Logo" className="h-12 w-auto object-contain" />
                                <div className="h-10 w-px bg-gray-300"></div>
                                <div className="text-[#6F42C1] font-bold leading-tight">
                                    MCD<br />HRMS
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                The Unified Human Resource Management System for the Municipal Corporation of Delhi.
                                Streamlining governance through digital transparency and employee empowerment.
                            </p>

                            {/* Contact Info - Vital for Gov Sites */}
                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Phone size={14} className="text-[#6F42C1]" /> <span>Toll Free: 1800-11-XXXX</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Mail size={14} className="text-[#6F42C1]" /> <span>helpdesk-hrms@mcd.nic.in</span>
                                </div>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-3">
                                <a href="#" target="_blank" rel="noreferrer" aria-label="MCD Twitter Handle"
                                    className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#6F42C1] hover:text-white transition-all duration-300">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" target="_blank" rel="noreferrer" aria-label="MCD Facebook Page"
                                    className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#6F42C1] hover:text-white transition-all duration-300">
                                    <Facebook size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section - Functional Categories */}
                    <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-8 lg:px-6">
                        {/* HR Services */}
                        <div className="flex flex-col space-y-4">
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider underline decoration-[#6F42C1] decoration-2 underline-offset-8">HR Services</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {['Attendance Portal', 'Payroll & Slips', 'Transfer Orders', 'Performance Appraisal', 'Grievance Filing'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-[#6F42C1] transition-colors hover:underline underline-offset-4">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Citizen Corner */}
                        <div className="flex flex-col space-y-4">
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider underline decoration-[#6F42C1] decoration-2 underline-offset-8">Citizens</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {['Public Notices', 'Tender Portal', 'Property Tax', 'Birth/Death Certs', 'Health Licenses'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-[#6F42C1] transition-colors hover:underline underline-offset-4">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="flex flex-col space-y-4">
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider underline decoration-[#6F42C1] decoration-2 underline-offset-8">Resources</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {['User Manuals', 'Office Orders', 'Policy Documents', 'Forms & Formats', 'Open Data'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-[#6F42C1] transition-colors hover:underline underline-offset-4">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="flex flex-col space-y-4">
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider underline decoration-[#6F42C1] decoration-2 underline-offset-8">Support</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {['Technical FAQ', 'Nodal Officers', 'Contact Directory', 'Site Map', 'Accessibility Help'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-[#6F42C1] transition-colors hover:underline underline-offset-4">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Far Right Section - Gov Compliance */}
                    <div className="flex-shrink-0 lg:w-1/5 flex flex-col items-start lg:items-end space-y-6">
                        <div className="flex flex-col items-start lg:items-end w-full">
                            <span className="text-xs font-semibold text-gray-400 uppercase mb-3">Project Initiative By</span>
                            <div className="flex flex-col gap-4 items-start lg:items-end">
                                {/* Digital India & MCD Combo */}
                                <div className="h-14 w-40 bg-white rounded p-2 flex items-center justify-center">
                                    <img src="/digitalIndia.png" alt="Digital India Logo" className="h-full w-auto object-contain" />
                                </div>
                                <div className="h-14 w-40 bg-white rounded p-2 flex items-center justify-center">
                                    <img src="/embelem.png" alt="State Emblem" className="h-full w-auto object-contain" />
                                </div>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-4 leading-tight font-medium text-center">
                                Municipal Corporation of Delhi,<br />
                                Civic Centre, Minto Road,<br />
                                New Delhi - 110002
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Strip - Unified Gov Style */}
            <div className="bg-[#6F42C1] text-white py-4 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-4">
                    <div className="opacity-90 text-center md:text-left">
                        © 2025 - Municipal Corporation of Delhi (MCD). All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-4 opacity-90">
                        <a href="#" className="hover:underline">Terms of Service</a>
                        <span className="hidden sm:block h-3 w-px bg-white/40"></span>
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <span className="hidden sm:block h-3 w-px bg-white/40"></span>
                        <a href="#" className="hover:underline">Hyperlinking Policy</a>
                        <span className="hidden sm:block h-3 w-px bg-white/40"></span>
                        <a href="#" className="hover:underline">Copyright Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;