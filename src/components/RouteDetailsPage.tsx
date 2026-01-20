import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Clock, MapPin, Calendar, ChevronRight, Armchair, Check, Phone, ShieldCheck, Luggage, Zap, Utensils, ArrowRightLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog';
import { BookingForm } from './BookingForm';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getRouteById } from '../data/routes';

export function RouteDetailsPage() {
  const { routeId } = useParams<{ routeId: string }>();
  const [isReverse, setIsReverse] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const route = routeId ? getRouteById(routeId) : undefined;

  if (!route) {
    return <Navigate to="/routes" replace />;
  }

  const stops = isReverse ? route.returnStops : route.stops;
  const origin = isReverse ? route.destination : route.origin;
  const destination = isReverse ? route.origin : route.destination;
  const departureDay = isReverse ? route.returnDay : route.departureDay;

  const openRouteOnMap = () => {
    const originLocation = stops[0].location || stops[0].city;
    const destinationLocation = stops[stops.length - 1].location || stops[stops.length - 1].city;
    const waypoints = stops.slice(1, -1).map(stop => stop.location || stop.city).join('|');
    
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originLocation)}&destination=${encodeURIComponent(destinationLocation)}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-[#012141]">
      <Navbar />

      {/* Cinematic Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden group">
        <ImageWithFallback
          src={route.image}
          alt={`${route.origin} - ${route.destination}`}
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[20s]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#012141]/80 via-[#012141]/60 to-[#012141]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-100/80 text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/routes" className="hover:text-white transition-colors">Rute</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">{origin} - {destination}</span>
          </div>

          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-in fade-in slide-in-from-bottom-5 duration-700">
               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
               <span className="text-xs font-bold text-white uppercase tracking-widest">Cursă Internațională • {departureDay}</span>
            </div>

            <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 flex items-center flex-wrap gap-x-4 gap-y-2">
              <span>{origin}</span>
              <button
                onClick={() => setIsReverse(!isReverse)}
                className="text-blue-400 hover:text-blue-300 transition-all p-2 hover:bg-white/10 rounded-full group"
                title="Schimbă direcția"
              >
                <ArrowRightLeft className="w-8 h-8 md:w-12 md:h-12 transition-transform duration-500 group-hover:rotate-180" />
              </button>
              <span>{destination}</span>
            </h1>

            <p className="text-blue-50/90 text-lg md:text-xl font-light max-w-xl animate-in fade-in slide-in-from-bottom-7 duration-700 delay-200">
              Călătorește confortabil prin Comrat și Cahul. Flotă modernă, WiFi gratuit și servicii de top.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Left Column: Itinerary & Info - Order 2 on mobile, 1 on desktop */}
          <div className="lg:col-span-2 space-y-12 order-2 lg:order-1">

            {/* Spotlight Features Section */}
            <div className="bg-[#012141] rounded-2xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-1000 group-hover:bg-white/10"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#3870db]/30 rounded-full blur-2xl -ml-10 -mb-10 transition-all duration-1000 group-hover:bg-[#3870db]/40"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Title Section */}
                <div className="md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                    Ce include <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3870db] to-white">un bilet?</span>
                  </h2>
                  <p className="text-blue-200/80 text-sm">Tot ce ai nevoie pentru o călătorie perfectă, inclus în prețul standard.</p>
                </div>

                {/* Icons Grid */}
                <div className="md:w-2/3 w-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                    <div className="flex flex-col items-center text-center gap-3 group/icon">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white/20 group-hover/icon:scale-110 transition-all duration-300 ring-1 ring-white/10">
                        <Luggage className="w-7 h-7 text-blue-200" />
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-white">40 kg</span>
                        <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">Bagaj</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 group/icon">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white/20 group-hover/icon:scale-110 transition-all duration-300 ring-1 ring-white/10">
                        <Zap className="w-7 h-7 text-blue-200" />
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-white">Rapid</span>
                        <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">Traseu Optim</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 group/icon">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white/20 group-hover/icon:scale-110 transition-all duration-300 ring-1 ring-white/10">
                        <Armchair className="w-7 h-7 text-blue-200" />
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-white">Comfort</span>
                        <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">Scaune XL</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 group/icon">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white/20 group-hover/icon:scale-110 transition-all duration-300 ring-1 ring-white/10">
                        <Utensils className="w-7 h-7 text-blue-200" />
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-white">Masă</span>
                        <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">La Restaurant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <section className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                 <div>
                   <h2 className="text-[#012141] font-bold text-2xl">Itinerariul Călătoriei</h2>
                   <p className="text-gray-500 text-sm mt-1 text-center">Durată totală estimată: {route.duration}</p>
                 </div>
                 <Button 
                   variant="outline" 
                   className="hidden md:flex gap-2 text-[#3870db] border-blue-100 hover:bg-blue-50"
                   onClick={openRouteOnMap}
                 >
                   <MapPin className="w-4 h-4" /> Vezi pe hartă
                 </Button>
              </div>

              {/* Responsive Timeline Container */}
              <div className="relative">
                {/* Mobile Line (Vertical) */}
                <div className="md:hidden absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100">
                   <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#3870db] to-transparent opacity-50" />
                </div>

                {/* Desktop Line (Horizontal) */}
                <div className="hidden md:block absolute top-4 left-0 right-0 h-0.5 bg-gray-100">
                   <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-[#3870db] to-transparent opacity-50" />
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-${stops.length} gap-8 md:gap-4`}>
                  {stops.map((stop, index) => (
                    <div key={index} className="relative flex md:flex-col items-start md:items-center group">

                      {/* Node */}
                      <div className="relative z-10 shrink-0 mr-4 md:mr-0 md:mb-4">
                        <div className="w-9 h-9 rounded-full bg-white border-[3px] border-[#3870db] shadow-[0_0_0_4px_rgba(56,112,219,0.1)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_6px_rgba(56,112,219,0.2)]">
                          <div className="w-2 h-2 bg-[#012141] rounded-full" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="pt-1 md:pt-0 md:text-center w-full">
                         <div className="text-xs font-bold text-[#3870db] uppercase tracking-wider mb-1">
                           {index === 0 ? 'Plecare' : index === stops.length - 1 ? 'Sosire' : 'Tranzit'}
                         </div>
                         <h3 className="text-lg font-bold text-[#012141] mb-1 group-hover:text-[#3870db] transition-colors leading-tight">
                           {stop.city}
                         </h3>
                         {stop.location && (
                           <p className="text-xs text-gray-500 font-medium mb-2">{stop.location}</p>
                         )}
                         <div className="flex md:justify-center items-center gap-2 text-sm text-gray-500 bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-lg md:rounded-none w-fit md:w-full">
                           <Clock className="w-3.5 h-3.5 text-[#3870db]" />
                           <span className="font-medium">
                             {stop.time}
                             {index === stops.length - 1 && <span className="text-[#3870db]">*</span>}
                           </span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time variation disclaimer */}
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs text-amber-800">
                  <span className="text-[#3870db] font-bold">*</span> Orele de sosire sunt aproximative și pot varia în funcție de condițiile meteorologice și timpul de trecere a frontierelor.
                </p>
              </div>
            </section>

            {/* Support Box */}
            <div className="bg-[#012141] rounded-2xl p-6 text-center text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">Ai nevoie de ajutor?</h3>
              <p className="text-blue-200/80 text-sm mb-4">Echipa noastră este disponibilă pentru tine.</p>
              <a href="tel:+373000000" className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-medium">
                Sună Dispeceratul
              </a>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              <h2 className="text-[#012141] font-bold text-2xl mb-8">Întrebări Frecvente</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  { q: "Cât bagaj pot lua cu mine?", a: "Fiecare pasager are dreptul la un 2 bagaje de cală (max 40kg) și un bagaj de mână (max 5kg). Bagaje suplimentare pot fi transportate contra cost." },
                  { q: "Pot anula sau modifica rezervarea?", a: "Da, puteți anula sau modifica rezervarea cu până la 24 ore înainte de plecare fără costuri suplimentare. Nu există taxe de modificare." },
                  { q: "Ce documente am nevoie?", a: "Pașaport valabil cel puțin 6 luni. Pentru cetățenii unor țări poate fi necesară viză." },
                  { q: "Sunt pauze în timpul călătoriei?", a: "Da, pauze la fiecare 3-4 ore la stații amenajate." }
                ].map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-gray-100 rounded-xl px-4 hover:bg-gray-50 transition-colors">
                    <AccordionTrigger className="text-gray-900 hover:text-[#3870db] font-medium">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget - Order 1 on mobile, 2 on desktop */}
          <div className="lg:col-span-1 order-1 lg:order-2">
             <div className="lg:sticky lg:top-24 space-y-6">
               <Card className="p-6 rounded-2xl shadow-xl shadow-blue-900/10 border-t-4 border-t-[#3870db] bg-white">
                 <div className="text-center mb-8 relative">
                   <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Preț Standard</p>
                   <div className="flex items-center justify-center gap-1 text-[#012141]">
                     <span className="text-2xl font-bold">{route.currency}</span>
                     <span className="text-6xl font-bold tracking-tighter">{route.price}</span>
                   </div>
                   <p className="text-gray-500 text-sm">per persoană / sens</p>
                   {route.priceEquivalent && (
                     <p className="text-gray-400 text-xs mt-1">{route.priceEquivalent}</p>
                   )}
                 </div>

                 {/* Route Details - Compact Integration */}
                 <div className="mb-8 space-y-3 border-y border-gray-100 py-4 bg-gray-50/30 -mx-6 px-6">
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4 text-[#3870db]" />
                        <span className="text-sm font-medium">Tur</span>
                      </div>
                      <span className="text-sm font-bold text-[#012141]">{route.departureDay}</span>
                   </div>
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4 text-[#3870db]" />
                        <span className="text-sm font-medium">Retur</span>
                      </div>
                      <span className="text-sm font-bold text-[#012141]">{route.returnDay}</span>
                   </div>
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4 text-[#3870db]" />
                        <span className="text-sm font-medium">Durată</span>
                      </div>
                      <span className="text-sm font-bold text-[#012141]">~ {route.duration}</span>
                   </div>
                 </div>

                 <div className="mb-8">
                   <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                     <DialogTrigger asChild>
                       <Button className="w-full bg-[#3870db] hover:bg-[#2b5bb8] text-white shadow-lg shadow-blue-500/30 h-12 text-lg font-medium rounded-xl transition-all hover:-translate-y-0.5">
                         Rezervă Online
                       </Button>
                     </DialogTrigger>
                     <DialogContent className="p-0 border-none bg-transparent max-w-2xl shadow-none" aria-describedby={undefined}>
                       <div className="sr-only">
                         <DialogTitle>Rezervare Online</DialogTitle>
                       </div>
                       <BookingForm
                         route={route}
                         isReverse={isReverse}
                         onClose={() => setIsBookingOpen(false)}
                       />
                     </DialogContent>
                   </Dialog>
                   <Link to="/contact" className="block mt-3">
                     <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50 text-gray-600 h-12 rounded-xl">
                       <Phone className="w-4 h-4 mr-2" /> Contactează-ne
                     </Button>
                   </Link>
                 </div>

                 <div className="space-y-4 pt-6 border-t border-dashed border-gray-200">
                   <div className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3 text-green-600" />
                     </div>
                     <p className="text-sm text-gray-500 leading-snug">Confirmare pe email</p>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3 text-green-600" />
                     </div>
                     <p className="text-sm text-gray-500 leading-snug">Plată în numerar la șofer</p>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                       <ShieldCheck className="w-3 h-3 text-green-600" />
                     </div>
                     <p className="text-sm text-gray-500 leading-snug">Apel de confirmare cu 1-2 zile înainte</p>
                   </div>
                 </div>

                 {/* Contact Phone Numbers */}
                 <div className="mt-6 pt-6 border-t border-gray-100">
                   <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-semibold">Rezervări Telefonice</p>
                   <div className="space-y-2">
                     <a href="tel:+37369101912" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                       <div className="w-10 h-10 bg-[#3870db] rounded-full flex items-center justify-center shrink-0">
                         <Phone className="w-5 h-5 text-white" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-[#012141] group-hover:text-[#3870db] transition-colors">+373 69 10 19 12</p>
                         <p className="text-xs text-gray-500">Apelează acum</p>
                       </div>
                     </a>
                     <a href="tel:+37368501182" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                       <div className="w-10 h-10 bg-[#3870db] rounded-full flex items-center justify-center shrink-0">
                         <Phone className="w-5 h-5 text-white" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-[#012141] group-hover:text-[#3870db] transition-colors">+373 68 50 11 82</p>
                         <p className="text-xs text-gray-500">Apelează acum</p>
                       </div>
                     </a>
                   </div>
                 </div>
               </Card>
             </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
