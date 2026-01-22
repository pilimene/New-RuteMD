import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { ro, ru } from 'date-fns/locale';
import { routes } from '../data/routes';
import { useTranslation } from '../i18n';
import { isDateDisabled } from '../data/disabledDates';

export function BookingWidget() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dateLocale = language === 'ru' ? ru : ro;

  // Normalize city names for comparison (handles special characters)
  const normalizeCityName = (city: string): string => {
    return city
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/ș/g, 's')
      .replace(/ț/g, 't')
      .replace(/ă/g, 'a')
      .replace(/â/g, 'a')
      .replace(/î/g, 'i')
      .trim();
  };

  // Map select values to route city names
  const cityNameMap: Record<string, string> = {
    'chisinau': 'Chișinău',
    'istanbul': 'Istanbul',
    'varna': 'Varna',
    'burgas': 'Burgas',
  };

  // Reset date when route changes
  const handleFromChange = (value: string) => {
    setFrom(value);
    setSelectedDate(undefined);
  };

  const handleToChange = (value: string) => {
    setTo(value);
    setSelectedDate(undefined);
  };

  const handleSearch = () => {
    // Convert select values to actual city names
    const fromCity = cityNameMap[from] || from;
    const toCity = cityNameMap[to] || to;

    // First, try to find an exact direction match
    let matchingRoute = routes.find((r) => {
      const routeOrigin = normalizeCityName(r.origin);
      const routeDest = normalizeCityName(r.destination);
      const selectedFrom = normalizeCityName(fromCity);
      const selectedTo = normalizeCityName(toCity);

      // Exact match: origin matches from AND destination matches to
      return routeOrigin === selectedFrom && routeDest === selectedTo;
    });

    // If no exact match, try reverse direction
    if (!matchingRoute) {
      matchingRoute = routes.find((r) => {
        const routeOrigin = normalizeCityName(r.origin);
        const routeDest = normalizeCityName(r.destination);
        const selectedFrom = normalizeCityName(fromCity);
        const selectedTo = normalizeCityName(toCity);

        // Reverse match: origin matches to AND destination matches from
        return routeOrigin === selectedTo && routeDest === selectedFrom;
      });
    }

    if (matchingRoute) {
      navigate(`/route/${matchingRoute.id}`);
    } else {
      // If no exact match, go to routes page
      navigate('/routes');
    }
  };

  // Filter destinations based on "from" selection
  const getAvailableDestinations = () => {
    if (from === 'chisinau') {
      return ['istanbul', 'varna', 'burgas'];
    } else if (['istanbul', 'varna', 'burgas'].includes(from)) {
      return ['chisinau'];
    }
    return ['chisinau', 'istanbul', 'varna', 'burgas'];
  };

  // Convert Romanian day names to day numbers (0 = Sunday, 1 = Monday, etc.)
  const dayNameToNumber: Record<string, number> = {
    'duminică': 0,
    'duminica': 0, // without diacritics
    'luni': 1,
    'marți': 2,
    'marti': 2, // without diacritics
    'miercuri': 3,
    'joi': 4,
    'vineri': 5,
    'sâmbătă': 6,
    'sambata': 6, // without diacritics
  };

  // Get available dates based on selected route
  const getAvailableDates = useMemo(() => {
    if (!from || !to) return [];

    // Convert select values to actual city names
    const fromCity = cityNameMap[from] || from;
    const toCity = cityNameMap[to] || to;

    const matchingRoutes = routes.filter((r) => {
      const routeOrigin = normalizeCityName(r.origin);
      const routeDest = normalizeCityName(r.destination);
      const selectedFrom = normalizeCityName(fromCity);
      const selectedTo = normalizeCityName(toCity);

      return (
        (routeOrigin === selectedFrom && routeDest === selectedTo) ||
        (routeOrigin === selectedTo && routeDest === selectedFrom)
      );
    });

    if (matchingRoutes.length === 0) return [];

    const availableDays = new Set<number>();
    
    matchingRoutes.forEach(route => {
      // Check if route matches the direction
      const routeOrigin = normalizeCityName(route.origin);
      const routeDest = normalizeCityName(route.destination);
      const selectedFrom = normalizeCityName(fromCity);
      const selectedTo = normalizeCityName(toCity);
      
      const isForward = routeOrigin === selectedFrom && routeDest === selectedTo;
      const dayName = isForward ? route.departureDay : route.returnDay;
      
      // Normalize day name (remove diacritics for matching)
      const normalizedDayName = dayName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
      
      const dayNumber = dayNameToNumber[normalizedDayName];
      if (dayNumber !== undefined) {
        availableDays.add(dayNumber);
      }
    });

    if (availableDays.size === 0) {
      return [];
    }

    // Generate dates for the next 2 months that fall on available days
    const dates: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    
    // Calculate end date (2 months from now)
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 2);
    endDate.setHours(23, 59, 59, 999);

    // Generate dates starting from today
    for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateToCheck = new Date(d);
      dateToCheck.setHours(0, 0, 0, 0);
      const dayOfWeek = dateToCheck.getDay();
      
      if (availableDays.has(dayOfWeek)) {
        dates.push(new Date(dateToCheck));
      }
    }

    return dates;
  }, [from, to]);

  // Check if a date is available - simplified comparison
  const isDateAvailable = (date: Date | undefined) => {
    if (!date) return false;
    
    const availableDates = getAvailableDates;
    if (availableDates.length === 0) {
      return false;
    }
    
    // Compare dates by year, month, and day only
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    const isInAvailableDates = availableDates.some(availableDate => {
      return (
        availableDate.getFullYear() === year &&
        availableDate.getMonth() === month &&
        availableDate.getDate() === day
      );
    });
    
    if (!isInAvailableDates) return false;
    
    // Check if date is manually disabled
    const routeKey = from && to ? `${from}-${to}` : undefined;
    if (isDateDisabled(date, routeKey)) {
      return false;
    }
    
    return true;
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-2"
      >
        <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            {/* From */}
            <div className="md:col-span-6 lg:col-span-3">
              <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden" style={{ fontSize: '12px', lineHeight: '1rem', height: '16px' }}>{t.booking.from}</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group h-14 flex items-center">
                <Select value={from} onValueChange={handleFromChange}>
                  <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 text-base font-medium pl-4" style={{ height: '56px' }}>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-[#3870db]" />
                      <SelectValue placeholder={t.booking.selectLocation} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chisinau">{language === 'ru' ? 'Кишинёв' : 'Chișinău'}</SelectItem>
                    <SelectItem value="istanbul">{language === 'ru' ? 'Стамбул' : 'Istanbul'}</SelectItem>
                    <SelectItem value="varna">{language === 'ru' ? 'Варна' : 'Varna'}</SelectItem>
                    <SelectItem value="burgas">{language === 'ru' ? 'Бургас' : 'Burgas'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* To */}
            <div className="md:col-span-6 lg:col-span-3">
              <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden" style={{ fontSize: '12px', lineHeight: '1rem', height: '16px' }}>{t.booking.to}</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group h-14 flex items-center">
                <Select value={to} onValueChange={handleToChange}>
                  <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 text-base font-medium pl-4" style={{ height: '56px' }}>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-[#3870db]" />
                      <SelectValue placeholder={from ? t.booking.selectDestination : t.booking.selectLocationFirst} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableDestinations().map((dest) => (
                      <SelectItem key={dest} value={dest}>
                        {dest === 'chisinau' ? (language === 'ru' ? 'Кишинёв' : 'Chișinău') :
                         dest === 'istanbul' ? (language === 'ru' ? 'Стамбул' : 'Istanbul') :
                         dest === 'varna' ? (language === 'ru' ? 'Варна' : 'Varna') :
                         dest === 'burgas' ? (language === 'ru' ? 'Бургас' : 'Burgas') :
                         dest.charAt(0).toUpperCase() + dest.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date */}
            <div className="md:col-span-6 lg:col-span-3">
              <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden" style={{ fontSize: '12px', lineHeight: '1rem', height: '16px' }}>{t.booking.departureDate}</label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <div
                    className={`bg-gray-50 rounded-xl transition-colors relative h-14 flex items-center px-4 ${from && to ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                    style={{ height: '56px' }}
                    onClick={() => {
                      if (from && to) {
                        setIsCalendarOpen(true);
                      }
                    }}
                  >
                    <CalendarIcon className="w-5 h-5 mr-3 text-[#3870db]" />
                    <span className="text-base font-medium text-gray-900">
                      {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: dateLocale }) : from && to ? t.booking.selectDate : t.booking.selectRouteFirst}
                    </span>
                  </div>
                </PopoverTrigger>
                {from && to && (
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date: Date | undefined) => {
                        if (date && isDateAvailable(date)) {
                          setSelectedDate(date);
                          setIsCalendarOpen(false);
                        }
                      }}
                      disabled={(date: Date) => {
                        // Disable dates that are not available
                        const available = isDateAvailable(date);
                        return !available;
                      }}
                      locale={dateLocale}
                      weekStartsOn={1}
                      fromDate={new Date()} // Start from today
                      defaultMonth={new Date()} // Show current month by default
                      initialFocus
                    />
                  </PopoverContent>
                )}
              </Popover>
            </div>

            {/* Passengers */}
            <div className="md:col-span-6 lg:col-span-1">
              <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-2" style={{ fontSize: '12px', lineHeight: '1rem', minHeight: '16px' }}>{t.booking.passengers}</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors h-14 flex items-center">
                <Select defaultValue="1">
                  <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 text-base font-medium pl-3 text-center" style={{ height: '56px' }}>
                      <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-12 lg:col-span-2">
              <Button
                onClick={handleSearch}
                disabled={!from || !to}
                className="w-full h-14 bg-[#3870db] hover:bg-[#2b5bb8] text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-5 h-5 mr-2" />
                {t.booking.search}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
