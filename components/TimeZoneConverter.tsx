import React, { useState, useEffect, useMemo } from 'react';

// Fix: Intl.supportedValuesOf is a new API and may not be available in all environments or TS versions.
// Provide a fallback list of common IANA time zones and a runtime check.
const FALLBACK_TIME_ZONES = [
    'UTC', 'GMT', 'Africa/Abidjan', 'Africa/Accra', 'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Nairobi', 'America/Adak', 'America/Anchorage', 'America/Argentina/Buenos_Aires', 'America/Asuncion', 'America/Bogota', 'America/Boise', 'America/Caracas', 'America/Chicago', 'America/Costa_Rica', 'America/Denver', 'America/Edmonton', 'America/El_Salvador', 'America/Halifax', 'America/Havana', 'America/Indiana/Indianapolis', 'America/Jamaica', 'America/Juneau', 'America/La_Paz', 'America/Lima', 'America/Los_Angeles', 'America/Managua', 'America/Mexico_City', 'America/Montevideo', 'America/New_York', 'America/Phoenix', 'America/Puerto_Rico', 'America/Regina', 'America/Santiago', 'America/Sao_Paulo', 'America/St_Johns', 'America/Tijuana', 'America/Toronto', 'America/Vancouver', 'America/Winnipeg', 'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/Mawson', 'Asia/Almaty', 'Asia/Baghdad', 'Asia/Bangkok', 'Asia/Beirut', 'Asia/Colombo', 'Asia/Dhaka', 'Asia/Dubai', 'Asia/Ho_Chi_Minh', 'Asia/Hong_Kong', 'Asia/Jakarta', 'Asia/Jayapura', 'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Karachi', 'Asia/Kathmandu', 'Asia/Kolkata', 'Asia/Kuala_Lumpur', 'Asia/Manila', 'Asia/Nicosia', 'Asia/Pyongyang', 'Asia/Qatar', 'Asia/Riyadh', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Taipei', 'Asia/Tashkent', 'Asia/Tehran', 'Asia/Tokyo', 'Asia/Yangon', 'Asia/Yerevan', 'Atlantic/Azores', 'Atlantic/Bermuda', 'Atlantic/Canary', 'Atlantic/Cape_Verde', 'Atlantic/Reykjavik', 'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Darwin', 'Australia/Hobart', 'Australia/Lord_Howe', 'Australia/Melbourne', 'Australia/Perth', 'Australia/Sydney', 'Europe/Amsterdam', 'Europe/Athens', 'Europe/Belgrade', 'Europe/Berlin', 'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest', 'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Helsinki', 'Europe/Istanbul', 'Europe/Kiev', 'Europe/Lisbon', 'Europe/London', 'Europe/Madrid', 'Europe/Minsk', 'Europe/Moscow', 'Europe/Oslo', 'Europe/Paris', 'Europe/Prague', 'Europe/Riga', 'Europe/Rome', 'Europe/Sofia', 'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Vienna', 'Europe/Warsaw', 'Europe/Zurich', 'Indian/Maldives', 'Indian/Mauritius', 'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Chatham', 'Pacific/Easter', 'Pacific/Fiji', 'Pacific/Galapagos', 'Pacific/Guam', 'Pacific/Honolulu', 'Pacific/Kiritimati', 'Pacific/Noumea', 'Pacific/Pago_Pago', 'Pacific/Port_Moresby', 'Pacific/Tahiti', 'Pacific/Tongatapu'
];

const allTimeZones = (typeof (Intl as any).supportedValuesOf === 'function')
    ? (Intl as any).supportedValuesOf('timeZone')
    : FALLBACK_TIME_ZONES;

const TimeZoneCard: React.FC<{ timeZone: string; currentTime: Date; onRemove: (tz: string) => void }> = ({ timeZone, currentTime, onRemove }) => {
    const formatTime = (options: Intl.DateTimeFormatOptions) => {
        try {
            return new Intl.DateTimeFormat('en-US', { ...options, timeZone }).format(currentTime);
        } catch (e) {
            return "Invalid TimeZone";
        }
    };

    const location = timeZone.split('/').pop()?.replace(/_/g, ' ') || timeZone;
    const timeString = formatTime({ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const dateString = formatTime({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const offsetString = formatTime({ timeZoneName: 'longOffset' }).split(' ').pop();

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 flex flex-col relative">
            <button
                onClick={() => onRemove(timeZone)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition"
                aria-label={`Remove ${timeZone}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-white">{location}</h3>
                <p className="text-xs text-gray-400 font-mono mb-2">{timeZone}</p>
                <p className="text-4xl font-mono font-semibold text-indigo-300 tracking-wider">{timeString}</p>
                <p className="text-sm text-gray-300">{dateString}</p>
            </div>
            <p className="text-right text-sm font-semibold text-gray-400 mt-2">{offsetString}</p>
        </div>
    );
};

const TimeZoneConverter: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>(() => {
        const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const defaultZones = ['UTC', localTz, 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
        return [...new Set(defaultZones)]; // Ensure no duplicates
    });
    const [search, setSearch] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const addZone = (tz: string) => {
        if (!selectedTimeZones.includes(tz)) {
            setSelectedTimeZones(prev => [...prev, tz]);
        }
        setIsAdding(false);
        setSearch('');
    };

    const removeZone = (tz: string) => {
        setSelectedTimeZones(prev => prev.filter(zone => zone !== tz));
    };

    const filteredTimeZones = useMemo(() => {
        if (!search) return [];
        return allTimeZones
            .filter(tz => tz.toLowerCase().includes(search.toLowerCase()))
            .filter(tz => !selectedTimeZones.includes(tz)) // Don't show already selected zones
            .slice(0, 100); // Limit results for performance
    }, [search, selectedTimeZones]);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Time Zone Converter</h2>
                 <div className="relative">
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 flex items-center space-x-2"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>Add Time Zone</span>
                    </button>
                    {isAdding && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                             <input
                                type="text"
                                placeholder="Search for a time zone..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-gray-900 p-3 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-b border-gray-700"
                            />
                            <ul className="max-h-60 overflow-y-auto">
                                {filteredTimeZones.map(tz => (
                                    <li key={tz}>
                                        <button
                                            onClick={() => addZone(tz)}
                                            className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white transition"
                                        >
                                            {tz}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedTimeZones.map(tz => (
                    <TimeZoneCard
                        key={tz}
                        timeZone={tz}
                        currentTime={currentTime}
                        onRemove={removeZone}
                    />
                ))}
            </div>
        </div>
    );
};

export default TimeZoneConverter;