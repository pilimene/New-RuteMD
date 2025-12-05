import { useState } from 'react';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function BookingWidget() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

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
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">De la</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 text-base font-medium pl-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-[#3870db]" />
                      <SelectValue placeholder="Alege locația" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chisinau">Chișinău</SelectItem>
                    <SelectItem value="varna">Varna</SelectItem>
                    <SelectItem value="burgas">Burgas</SelectItem>
                    <SelectItem value="istanbul">Istanbul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* To */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Până la</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 text-base font-medium pl-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-[#3870db]" />
                      <SelectValue placeholder="Alege destinația" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chisinau">Chișinău</SelectItem>
                    <SelectItem value="varna">Varna</SelectItem>
                    <SelectItem value="burgas">Burgas</SelectItem>
                    <SelectItem value="istanbul">Istanbul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Data plecării</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative h-14 flex items-center px-4">
                <Calendar className="w-5 h-5 mr-3 text-[#3870db]" />
                <input
                  type="date"
                  className="w-full bg-transparent border-none text-base font-medium focus:outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Passengers */}
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Persoane</label>
              <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Select defaultValue="1">
                  <SelectTrigger className="w-full h-14 border-none bg-transparent focus:ring-0 text-base font-medium pl-3 text-center">
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
              <Button className="w-full h-14 bg-[#3870db] hover:bg-[#2b5bb8] text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all">
                <Search className="w-5 h-5 mr-2" />
                Caută
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
