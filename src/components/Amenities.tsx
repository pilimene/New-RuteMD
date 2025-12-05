import { Wifi, Wind, Armchair, Usb, Coffee, Luggage, Headphones, CreditCard } from 'lucide-react';

const amenities = [
  { icon: Wifi, label: 'WiFi Gratuit' },
  { icon: Wind, label: 'Aer Condiționat' },
  { icon: Armchair, label: 'Scaune Confortabile' },
  { icon: Usb, label: 'Prize USB' },
  { icon: Coffee, label: 'Pauze Regulate' },
  { icon: Luggage, label: 'Bagaje Incluse' },
  { icon: Headphones, label: 'Asistență 24/7' },
  { icon: CreditCard, label: 'Plată Flexibilă' },
];

export function Amenities() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-black mb-4 font-medium text-[64px] leading-none">
            Facilități & Servicii
          </h2>
          <p className="text-[#6a6a6a] max-w-2xl mx-auto text-[18px]">
            Tot ce aveți nevoie pentru o călătorie confortabilă și plăcută
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#3870db]/10 to-[#3870db]/5 mb-4 group-hover:from-[#3870db]/20 group-hover:to-[#3870db]/10 transition-all">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#3870db] group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-black text-[14px] md:text-[14px] font-normal">{amenity.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}