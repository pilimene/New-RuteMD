import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { routes, destinations } from '../data/routes';

export function BookingWidget() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSearch = () => {
    // Find matching route
    const matchingRoute = routes.find(
      (r) =>
        (r.origin.toLowerCase() === from && r.destination.toLowerCase() === to) ||
        (r.destination.toLowerCase() === from && r.origin.toLowerCase() === to)
    );

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
            <div className="md:col-span-3">
              <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden" style={{ fontSize: '12px', lineHeight: '1rem', height: '16px' }}>De la</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group h-14 flex items-center">
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 text-base font-medium pl-4" style={{ height: '56px' }}>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-[#3870db]" />
                      <SelectValue placeholder="Alege locația" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chisinau">Chișinău</SelectItem>
                    <SelectItem value="istanbul">Istanbul</SelectItem>
                    <SelectItem value="varna">Varna</SelectItem>
                    <SelectItem value="burgas">Burgas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* To */}
            <div className="md:col-span-3">
              <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden" style={{ fontSize: '12px', lineHeight: '1rem', height: '16px' }}>Până la</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group h-14 flex items-center">
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 text-base font-medium pl-4" style={{ height: '56px' }}>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-[#3870db]" />
                      <SelectValue placeholder={from ? "Alege destinația" : "Selectează mai întâi locația"} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableDestinations().map((dest) => (
                      <SelectItem key={dest} value={dest}>
                        {dest === 'chisinau' ? 'Chișinău' : dest.charAt(0).toUpperCase() + dest.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date */}
            <div className="md:col-span-3">
              <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden" style={{ fontSize: '12px', lineHeight: '1rem', height: '16px' }}>Data plecării</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative h-14 flex items-center px-4" style={{ height: '56px' }}>
                <Calendar className="w-5 h-5 mr-3 text-[#3870db]" />
                <input
                  type="date"
                  className="w-full bg-transparent border-none text-base font-medium focus:outline-none text-gray-900 placeholder-gray-500"
                  style={{ height: '100%' }}
                />
              </div>
            </div>

            {/* Passengers */}
            <div className="md:col-span-1">
              <label className="block font-semibold text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden" style={{ fontSize: '12px', lineHeight: '1rem', height: '16px' }}>Persoane</label>
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
            <div className="md:col-span-2">
              <Button
                onClick={handleSearch}
                disabled={!from || !to}
                className="w-full h-14 bg-[#3870db] hover:bg-[#2b5bb8] text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-5 h-5 mr-2" />
                Caută
              </Button>
            </div>
          </div>

          {/* Schedule info */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Tur: Duminică
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Retur: Miercuri
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
