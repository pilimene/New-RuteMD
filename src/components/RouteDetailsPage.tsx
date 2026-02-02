import { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useSearchParams } from 'react-router-dom';
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
import { useTranslation } from '../i18n';
import { SEO } from './SEO';

export function RouteDetailsPage() {
  const { routeId } = useParams<{ routeId: string }>();
  const [searchParams] = useSearchParams();
  const [isReverse, setIsReverse] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { t, language } = useTranslation();

  const route = routeId ? getRouteById(routeId) : undefined;

  // Scroll to section based on query parameter (for Google Ads sitelinks)
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && route) {
      // Map section names to element IDs (allows multiple names for same section)
      const sectionMap: Record<string, string> = {
        'schedule': 'schedule',
        'itinerary': 'schedule',
        'price': 'price',
        'booking': 'price',
        'ticket-includes': 'ticket-includes',
        'amenities': 'ticket-includes',
      };
      
      const elementId = sectionMap[section] || section;
      
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          // Get element position and scroll with offset for navbar (approx 80-100px)
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 100; // Offset for sticky navbar
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchParams, route]);

  if (!route) {
    return <Navigate to={`/${language}/routes`} replace />;
  }

  const stops = isReverse ? route.returnStops : route.stops;
  const origin = isReverse ? route.destination : route.origin;
  const destination = isReverse ? route.origin : route.destination;
  const departureDay = isReverse ? route.returnDay : route.departureDay;

  // SEO content based on language and route
  const destinationCountry = route.destination === 'Istanbul' ? 
    (language === 'ru' ? 'Турция' : 'Turcia') : 
    (language === 'ru' ? 'Болгария' : 'Bulgaria');

  const seoContent = {
    ro: {
      title: `Autocar ${route.origin} - ${route.destination} | ${route.price} ${route.currency} | Bilete Online`,
      description: `Transport cu autocarul ${route.origin} - ${route.destination}. Plecare ${route.departureDay}, durată ${route.duration}. Bilete de la ${route.price} ${route.currency}. Autocare Mercedes premium, bagaj 40kg inclus. Rezervă online acum!`,
      keywords: `autocar ${route.origin.toLowerCase()} ${route.destination.toLowerCase()}, bilete autocar ${route.origin.toLowerCase()} ${route.destination.toLowerCase()}, transport ${route.origin.toLowerCase()} ${route.destination.toLowerCase()}, curse autocar ${route.origin.toLowerCase()}, bilete ${route.destination.toLowerCase()}, ${route.origin.toLowerCase()} ${destinationCountry.toLowerCase()}, rutemd`
    },
    ru: {
      title: `Автобус ${route.origin} - ${route.destination} | ${route.price} ${route.currency} | Билеты Онлайн`,
      description: `Автобусные перевозки ${route.origin} - ${route.destination}. Отправление ${route.departureDay}, продолжительность ${route.duration}. Билеты от ${route.price} ${route.currency}. Премиум автобусы Mercedes, багаж 40кг включен. Бронируйте онлайн!`,
      keywords: `автобус ${route.origin.toLowerCase()} ${route.destination.toLowerCase()}, билеты автобус ${route.origin.toLowerCase()} ${route.destination.toLowerCase()}, перевозки ${route.origin.toLowerCase()} ${route.destination.toLowerCase()}, рейсы автобус ${route.origin.toLowerCase()}, билеты ${route.destination.toLowerCase()}, ${route.origin.toLowerCase()} ${destinationCountry.toLowerCase()}, rutemd`
    }
  };

  const content = seoContent[language];

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>, phoneNumber: string, label: 'md' | 'tr') => {
    e.preventDefault();
    const telUrl = (e.currentTarget.getAttribute('href') || `tel:${phoneNumber}`) as string;

    if (typeof window === 'undefined') return;

    const params = {
      route_id: route.id,
      route: `${origin} - ${destination}`,
      origin,
      destination,
      phone_number: phoneNumber,
      link_type: label,
    };
    if (window.gtag) {
      window.gtag('event', 'phone_click', params);
      window.gtag('event', 'generate_lead', { method: 'phone_click', ...params });
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'phone_click', ...params });
      window.dataLayer.push({ event: 'generate_lead', method: 'phone_click', ...params });
    }
    // Open tel: after a short delay so GA has time to send the event (fixes mobile/quick navigation)
    setTimeout(() => {
      window.location.href = telUrl;
    }, 250);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TripAction",
    "name": `${route.origin} - ${route.destination}`,
    "description": content.description,
    "provider": {
      "@type": "BusCompany",
      "name": "RUTEMD",
      "url": "https://rutemd.md"
    },
    "fromLocation": {
      "@type": "City",
      "name": route.origin,
      "containedInPlace": {
        "@type": "Country",
        "name": "Moldova"
      }
    },
    "toLocation": {
      "@type": "City",
      "name": route.destination,
      "containedInPlace": {
        "@type": "Country",
        "name": route.destination === 'Istanbul' ? 'Turkey' : 'Bulgaria'
      }
    },
    "offers": {
      "@type": "Offer",
      "price": route.price,
      "priceCurrency": route.currency,
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0],
      "url": `https://rutemd.md/route/${routeId}`
    },
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": route.stops.map((stop, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Place",
          "name": stop.city,
          "address": stop.location
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": language === 'ru' ? "Главная" : "Acasă",
          "item": "https://rutemd.md/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": language === 'ru' ? "Маршруты" : "Rute",
          "item": "https://rutemd.md/routes"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${route.origin} - ${route.destination}`,
          "item": `https://rutemd.md/route/${routeId}`
        }
      ]
    }
  };

  const translateCity = (city: string) => {
    if (language !== 'ru') return city;
    const cityMap: Record<string, string> = {
      'Chișinău': 'Кишинёв',
      'Istanbul': 'Стамбул',
      'Varna': 'Варна',
      'Burgas': 'Бургас',
    };
    return cityMap[city] || city;
  };

  const translateDay = (day: string) => {
    const dayMap: Record<string, string> = {
      'Duminică': t.days.sunday,
      'Miercuri': t.days.wednesday,
      'Vineri': t.days.friday,
      'Luni': t.days.monday,
      'Marți': t.days.tuesday,
      'Joi': t.days.thursday,
      'Sâmbătă': t.days.saturday,
    };
    return dayMap[day] || day;
  };

  const translateTime = (time: string) => {
    if (language === 'ru') {
      return time.replace('(+1 zi)', '(+1 день)');
    }
    return time;
  };

  const openRouteOnMap = () => {
    const originLocation = stops[0].location || stops[0].city;
    const destinationLocation = stops[stops.length - 1].location || stops[stops.length - 1].city;
    
    // Get waypoints from stops
    let waypoints = stops.slice(1, -1).map(stop => stop.location || stop.city);
    
    // If destination is Istanbul, add Varna and Burgas as waypoints
    if (stops[stops.length - 1].city === 'Istanbul') {
      // Add Varna and Burgas after the existing waypoints (before Istanbul)
      waypoints.push('Varna, Bulgaria', 'Burgas, Bulgaria');
    }
    
    const waypointsString = waypoints.join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originLocation)}&destination=${encodeURIComponent(destinationLocation)}${waypointsString ? `&waypoints=${encodeURIComponent(waypointsString)}` : ''}`;
    window.open(url, '_blank');
  };

  const faqItems = [
    { q: t.routeDetails.faq1Q, a: t.routeDetails.faq1A },
    { q: t.routeDetails.faq2Q, a: t.routeDetails.faq2A },
    { q: t.routeDetails.faq3Q, a: t.routeDetails.faq3A },
    { q: t.routeDetails.faq4Q, a: t.routeDetails.faq4A },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-[#012141]">
      <SEO 
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        canonicalUrl={`https://rutemd.md/route/${routeId}`}
        structuredData={structuredData}
        lang={language}
      />
      <Navbar />

      {/* Cinematic Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden group">
        <ImageWithFallback
          src={route.image}
          alt={`Autocar ${route.origin} ${route.destination} - Transport ${route.price} ${route.currency} | RUTEMD`}
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[20s]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#012141]/80 via-[#012141]/60 to-[#012141]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-100/80 text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link to={`/${language}`} className="hover:text-white transition-colors">{t.routeDetails.breadcrumbHome}</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/${language}/routes`} className="hover:text-white transition-colors">{t.routeDetails.breadcrumbRoutes}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">{translateCity(origin)} - {translateCity(destination)}</span>
          </div>

          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-in fade-in slide-in-from-bottom-5 duration-700">
               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
               <span className="text-xs font-bold text-white uppercase tracking-widest">{t.routeDetails.internationalRoute} • {translateDay(departureDay)}</span>
            </div>

            <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <div className="flex max-[320px]:flex-col flex-row items-center max-[320px]:gap-2 gap-x-4">
                <span className="max-[320px]:text-center text-left">{translateCity(origin)}</span>
                <button
                  onClick={() => setIsReverse(!isReverse)}
                  className="text-blue-400 hover:text-blue-300 transition-all p-2 hover:bg-white/10 rounded-full group shrink-0"
                  title={t.routeDetails.changeDirection}
                >
                  <ArrowRightLeft className="w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12 transition-transform duration-500 group-hover:rotate-180" />
                </button>
                <span className="max-[320px]:text-center text-left">{translateCity(destination)}</span>
              </div>
            </h1>

            <p className="text-blue-50/90 text-lg md:text-xl font-light max-w-xl animate-in fade-in slide-in-from-bottom-7 duration-700 delay-200">
              {t.routeDetails.comfortDescription}
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
            <div id="ticket-includes" className="bg-[#012141] rounded-2xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-1000 group-hover:bg-white/10"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#3870db]/30 rounded-full blur-2xl -ml-10 -mb-10 transition-all duration-1000 group-hover:bg-[#3870db]/40"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Title Section */}
                <div className="md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                    {t.routeDetails.ticketIncludes} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3870db] to-white">{t.routeDetails.ticketIncludesHighlight}</span>
                  </h2>
                  <p className="text-blue-200/80 text-sm">{t.routeDetails.ticketIncludesDesc}</p>
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
                        <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">{t.routeDetails.luggage}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 group/icon">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white/20 group-hover/icon:scale-110 transition-all duration-300 ring-1 ring-white/10">
                        <Zap className="w-7 h-7 text-blue-200" />
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-white">{t.routeDetails.fast}</span>
                        <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">{t.routeDetails.optimalRoute}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 group/icon">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white/20 group-hover/icon:scale-110 transition-all duration-300 ring-1 ring-white/10">
                        <Armchair className="w-7 h-7 text-blue-200" />
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-white">{t.routeDetails.comfort}</span>
                        <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">{t.routeDetails.seatsXL}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 group/icon">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover/icon:bg-white/20 group-hover/icon:scale-110 transition-all duration-300 ring-1 ring-white/10">
                        <Utensils className="w-7 h-7 text-blue-200" />
                      </div>
                      <div>
                        <span className="block text-lg font-bold text-white">{t.routeDetails.meal}</span>
                        <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">{t.routeDetails.atRestaurant}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <section id="schedule" className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                 <div>
                   <h2 className="text-[#012141] font-bold text-2xl">{t.routeDetails.itinerary}</h2>
                   <p className="text-gray-500 text-sm mt-1 text-center md:text-left">{t.routeDetails.totalDuration}: {route.duration}</p>
                 </div>
                 <Button
                   variant="outline"
                   className="hidden md:flex gap-2 text-[#3870db] border-blue-100 hover:bg-blue-50"
                   onClick={openRouteOnMap}
                 >
                   <MapPin className="w-4 h-4" /> {t.routeDetails.viewOnMap}
                 </Button>
              </div>
              
              {/* Mobile View on Map Button */}
              <Button
                variant="outline"
                className="md:hidden w-full gap-2 text-[#3870db] border-blue-100 hover:bg-blue-50 mb-8"
                onClick={openRouteOnMap}
              >
                <MapPin className="w-4 h-4" /> {t.routeDetails.viewOnMap}
              </Button>

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
                           {index === 0 ? t.routeDetails.departure : index === stops.length - 1 ? t.routeDetails.arrival : t.routeDetails.transit}
                         </div>
                         <h3 className="text-lg font-bold text-[#012141] mb-1 group-hover:text-[#3870db] transition-colors leading-tight">
                           {translateCity(stop.city)}
                         </h3>
                         {stop.location && (
                           <p className="text-xs text-gray-500 font-medium mb-2">{stop.location}</p>
                         )}
                         <div className="flex md:justify-center items-center gap-2 text-sm text-gray-500 bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-lg md:rounded-none w-fit md:w-full">
                           <Clock className="w-3.5 h-3.5 text-[#3870db]" />
                           <span className="font-medium">
                             {translateTime(stop.time)}
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
                  <span className="text-[#3870db] font-bold">*</span> {t.routeDetails.timeDisclaimer}
                </p>
              </div>
            </section>

            {/* Support Box */}
            <div className="hidden md:block bg-[#012141] rounded-2xl p-6 text-center text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">{t.routeDetails.needHelp}</h3>
              <p className="text-blue-200/80 text-sm mb-4">{t.routeDetails.teamAvailable}</p>
              <a href="tel:+373000000" className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-medium">
                {t.routeDetails.callDispatch}
              </a>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              <h2 className="text-[#012141] font-bold text-2xl mb-8">{t.routeDetails.faqTitle}</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqItems.map((item, i) => (
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
               <Card id="price" className="p-6 rounded-2xl shadow-xl shadow-blue-900/10 border-t-4 border-t-[#3870db] bg-white">
                 <div className="text-center mb-8 relative">
                   <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{t.routeDetails.standardPrice}</p>
                   <div className="flex items-center justify-center gap-1 text-[#012141]">
                     <span className="text-2xl font-bold">{route.currency}</span>
                     <span className="text-6xl font-bold tracking-tighter">{route.price}</span>
                   </div>
                   <p className="text-gray-500 text-sm">{t.routeDetails.perPerson}</p>
                   {route.priceEquivalent && (
                     <p className="text-gray-400 text-xs mt-1">{route.priceEquivalent}</p>
                   )}
                 </div>

                 {/* Route Details - Compact Integration */}
                 <div className="mb-8 space-y-3 border-y border-gray-100 py-4 bg-gray-50/30 -mx-6 px-6">
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4 text-[#3870db]" />
                        <span className="text-sm font-medium">{t.routeDetails.tour}</span>
                      </div>
                      <span className="text-sm font-bold text-[#012141]">{translateDay(route.departureDay)}</span>
                   </div>
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4 text-[#3870db]" />
                        <span className="text-sm font-medium">{t.routeDetails.return}</span>
                      </div>
                      <span className="text-sm font-bold text-[#012141]">{translateDay(route.returnDay)}</span>
                   </div>
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4 text-[#3870db]" />
                        <span className="text-sm font-medium">{t.routeDetails.duration}</span>
                      </div>
                      <span className="text-sm font-bold text-[#012141]">~ {route.duration}</span>
                   </div>
                 </div>

                 <div className="mb-8">
                   <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                     <DialogTrigger asChild>
                       <Button className="w-full bg-[#3870db] hover:bg-[#2b5bb8] text-white shadow-lg shadow-blue-500/30 h-12 text-lg font-medium rounded-xl transition-all hover:-translate-y-0.5">
                         {t.routeDetails.bookOnline}
                       </Button>
                     </DialogTrigger>
                     <DialogContent className="p-0 border-none bg-transparent max-w-2xl shadow-none" aria-describedby={undefined}>
                       <div className="sr-only">
                         <DialogTitle>{t.routeDetails.onlineBooking}</DialogTitle>
                       </div>
                       <BookingForm
                         route={route}
                         isReverse={isReverse}
                         onClose={() => setIsBookingOpen(false)}
                       />
                    </DialogContent>
                  </Dialog>
                  
                  {/* Contact Phone Numbers */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-semibold">{t.routeDetails.phoneReservations}</p>
                    <div className="space-y-2">
                      <a
                        href="tel:+37368501182"
                        onClick={(e) => handlePhoneClick(e, '+37368501182', 'md')}
                        className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                      >
                        <div className="w-10 h-10 bg-[#3870db] rounded-full flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#012141] group-hover:text-[#3870db] transition-colors">+373 68 50 11 82</p>
                          <p className="text-xs text-gray-500">{t.routeDetails.callNow}</p>
                        </div>
                      </a>
                      <a
                        href="tel:+905358223890"
                        onClick={(e) => handlePhoneClick(e, '+905358223890', 'tr')}
                        className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                      >
                        <div className="w-10 h-10 bg-[#3870db] rounded-full flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#012141] group-hover:text-[#3870db] transition-colors">+90 5358223890</p>
                          <p className="text-xs text-gray-500">{t.routeDetails.callNow}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-dashed border-gray-200">
                   <div className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3 text-green-600" />
                     </div>
                     <p className="text-sm text-gray-500 leading-snug">{t.routeDetails.emailConfirmation}</p>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3 text-green-600" />
                     </div>
                     <p className="text-sm text-gray-500 leading-snug">{t.routeDetails.cashPayment}</p>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                       <ShieldCheck className="w-3 h-3 text-green-600" />
                     </div>
                     <p className="text-sm text-gray-500 leading-snug">{t.routeDetails.confirmationCall}</p>
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
