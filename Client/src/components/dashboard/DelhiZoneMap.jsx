import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Minus, MapPin, AlertCircle } from 'lucide-react';
import { zonePerformanceData, getZoneColor, getTrendDisplay } from '../../data/zoneData';
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/ui/map';

const TrendIcon = ({ trend }) => {
    const trendInfo = getTrendDisplay(trend);
    if (trend === 'up') return <TrendingUp size={16} style={{ color: trendInfo.color }} />;
    if (trend === 'down') return <TrendingDown size={16} style={{ color: trendInfo.color }} />;
    return <Minus size={16} style={{ color: trendInfo.color }} />;
};

const DelhiZoneMap = ({ language = 'en' }) => {
    const [selectedZone, setSelectedZone] = useState(null);

    const closeModal = () => {
        setSelectedZone(null);
    };

    return (
        <div className="relative w-full">
            {/* Map Container */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 min-h-[400px] h-[500px] relative">
                <Map
                    center={[77.2090, 28.6139]}
                    zoom={10.5}
                >
                    <MapControls position="bottom-right" showZoom showCompass showLocate />

                    {zonePerformanceData.map((zone) => (
                        <MapMarker
                            key={zone.zone_id}
                            longitude={zone.coordinates[0]}
                            latitude={zone.coordinates[1]}
                            onClick={() => setSelectedZone(zone)}
                            className="cursor-pointer"
                        >
                            <MarkerContent>
                                <div className="group relative">
                                    <div
                                        className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 transition-transform transform group-hover:scale-110"
                                        style={{ borderColor: getZoneColor(zone.performance_score) }}
                                    >
                                        <MapPin
                                            size={24}
                                            fill={getZoneColor(zone.performance_score)}
                                            color={getZoneColor(zone.performance_score)}
                                        />
                                    </div>
                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                        {language === 'en' ? zone.zone_name : zone.zone_name_hi}
                                        <div className="font-bold text-center">{zone.performance_score}%</div>
                                    </div>
                                </div>
                            </MarkerContent>
                        </MapMarker>
                    ))}
                </Map>

                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-2 rounded-lg text-xs text-gray-500 italic z-10 shadow-sm border border-gray-200 dark:border-gray-700">
                    {language === 'en' ? '* Click markers for details' : '* विवरण के लिए मार्कर पर क्लिक करें'}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#6F42C1]"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Excellent (75-100)' : 'उत्कृष्ट (75-100)'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#A074F0]"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Average (50-74)' : 'औसत (50-74)'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#D8B4FE]"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Needs Attention (<50)' : 'ध्यान आवश्यक (<50)'}
                    </span>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedZone && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
                    <div
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div
                            className="p-4 text-white"
                            style={{ backgroundColor: getZoneColor(selectedZone.performance_score) }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <MapPin size={24} />
                                    <div>
                                        <h3 className="text-lg font-bold">
                                            {language === 'en' ? selectedZone.zone_name : selectedZone.zone_name_hi}
                                        </h3>
                                        <p className="text-sm opacity-90">
                                            {language === 'en' ? 'Zone Performance Details' : 'जोन प्रदर्शन विवरण'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-4xl font-bold">{selectedZone.performance_score}%</span>
                                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                                    <TrendIcon trend={selectedZone.trend} />
                                    <span className="text-xs font-medium">
                                        {getTrendDisplay(selectedZone.trend).label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 space-y-4">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        {language === 'en' ? 'Sanitation Score' : 'स्वच्छता स्कोर'}
                                    </p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {selectedZone.sanitation_score}%
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        {language === 'en' ? 'Revenue Collected' : 'राजस्व एकत्रित'}
                                    </p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        ₹{selectedZone.revenue_collected}Cr
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        {language === 'en' ? 'Complaints Resolved' : 'शिकायतें निपटाई'}
                                    </p>
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                        {selectedZone.complaints_resolved}%
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        {language === 'en' ? 'Complaints Pending' : 'शिकायतें लंबित'}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                                            {selectedZone.complaints_pending}
                                        </p>
                                        {selectedZone.complaints_pending > 100 && (
                                            <AlertCircle size={16} className="text-amber-500" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Performance Bar */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {language === 'en' ? 'Overall Performance' : 'समग्र प्रदर्शन'}
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {selectedZone.performance_score}%
                                    </span>
                                </div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${selectedZone.performance_score}%`,
                                            backgroundColor: getZoneColor(selectedZone.performance_score)
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full py-3 bg-[#6F42C1] hover:bg-[#5a35a0] text-white font-medium rounded-xl transition-colors">
                                {language === 'en' ? 'View Full Zone Report' : 'पूर्ण जोन रिपोर्ट देखें'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DelhiZoneMap;
