import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  ChevronRight,
  ChevronDown,
  Users,
  Trophy,
  Briefcase,
  PartyPopper,
  Building2,
  CheckCircle2,
  Clock,
  Shield,
  Headphones,
  MapPin,
  Usb,
  Armchair,
  ChevronLeft,
  Tv,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent } from './ui/dialog';
import { motion } from 'motion/react';
import { useTranslation } from '../i18n';
import { fleetData } from '../data/fleet';
import { SEO } from './SEO';
import partnerLogo1 from '../assets/Logos partners/ISP_Eximbank_Color.png';
import partnerLogo2 from '../assets/Logos partners/logo3 (1).png';
import partnerLogo3 from '../assets/Logos partners/output-onlinepngtools (2).png';
import partnerLogo4 from '../assets/Logos partners/output-onlinepngtools (3).png';
import partnerLogo5 from '../assets/Logos partners/output-onlinepngtools (4).png';
import partnerLogo6 from '../assets/Logos partners/output-onlinepngtools (5).png';
import partnerLogo7 from '../assets/Logos partners/Ppe-apa-Delfin1.png';
import partnerLogo8 from '../assets/Logos partners/start (1).png';

export function BusCharterPage() {
  const { t, language } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  type AnalyticsWindow = Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const trackCharterLead = (params: { method: string; [key: string]: unknown }) => {
    if (typeof window === 'undefined') return;
    const analyticsWindow = window as AnalyticsWindow;
    const eventParams = { ...params };
    if (analyticsWindow.gtag) {
      analyticsWindow.gtag('event', 'charter_generate_lead', eventParams);
    } else {
      analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
      analyticsWindow.dataLayer.push({ event: 'charter_generate_lead', ...eventParams });
    }
  };

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>, phoneNumber: string) => {
    e.preventDefault();
    const analyticsWindow = window as AnalyticsWindow;
    const telUrl = (e.currentTarget.getAttribute('href') || `tel:${phoneNumber}`) as string;
    trackCharterLead({ method: 'phone_click', phone_number: phoneNumber });
    if (analyticsWindow.gtag) {
      analyticsWindow.gtag('event', 'phone_click', { phone_number: phoneNumber });
    }
    setTimeout(() => { window.location.href = telUrl; }, 250);
  };

  const handleContactClick = () => {
    trackCharterLead({ method: 'contact_cta', cta_label: 'contacteaza-ne' });
  };

  // SEO content based on language - Focus on CHARTER SERVICES
  const seoContent = {
    ro: {
      title: 'Autocare la Comandă Moldova | Închiriere Autocar cu Șofer – RUTEMD Chișinău',
      description: 'Închiriere autocare și microbuze la comandă în Moldova pentru grupuri, 22–56 locuri cu șofer. Rute internaționale pentru orice destinație. Solicită oferta!',
      keywords: 'autocare la comanda moldova, transport la comanda chisinau, servicii de transport la comanda, inchiriere autocar cu sofer, charter autocar moldova, transport persoane la comanda, inchiriere microbuz chisinau, arenda autocar moldova, autocar pentru grupuri, autocar la comanda europa, transport persoane moldova, rutemd charter'
    },
    ru: {
      title: 'Автобусы под Заказ Молдова | Аренда Автобуса с Водителем – RUTEMD Кишинёв',
      description: 'Аренда автобусов и микроавтобусов под заказ в Молдове для групп, 22–56 мест с водителем. Международные маршруты в любую точку. Запросите предложение!',
      keywords: 'пассажирские перевозки молдова, автобусы под заказ кишинёв, аренда автобуса с водителем, чартер автобуса молдова, перевозка пассажиров молдова, аренда микроавтобуса кишинёв, автобус для группы, заказ автобуса молдова, аренда автобуса кишинёв европа, международные пассажирские перевозки молдова, rutemd charter'
    }
  };

  const content = seoContent[language];
  const pageUrl = `https://www.rutemd.com/${language}/bus-charter`;
  const siteHome = `https://www.rutemd.com/${language}`;

  const serviceSchema = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    "name": language === 'ru'
      ? "Аренда автобусов под заказ и пассажирские перевозки RUTEMD"
      : "Autocare la comandă și închiriere autocar cu șofer RUTEMD",
    "alternateName": language === 'ru'
      ? ["Аренда автобуса", "Автобусы под заказ", "Чартер автобуса", "Пассажирские перевозки под заказ", "Аренда микроавтобуса"]
      : ["Închiriere autocar", "Arendă autocar", "Autocare la comandă", "Transport la comandă", "Charter autocar", "Închiriere microbuz"],
    "description": content.description,
    "provider": {
      "@type": "BusCompany",
      "name": "RUTEMD",
      "url": "https://www.rutemd.com"
    },
    "areaServed": [
      { "@type": "Country", "name": "Moldova" },
      { "@type": "Place", "name": language === 'ru' ? "Европа" : "Europa" },
      { "@type": "Country", "name": "Romania" },
      { "@type": "Country", "name": "Ukraine" },
      { "@type": "Country", "name": "Bulgaria" },
      { "@type": "Country", "name": "Turkey" },
      { "@type": "Country", "name": "Germany" },
      { "@type": "Country", "name": "Italy" },
      { "@type": "Country", "name": "Poland" },
      { "@type": "Country", "name": "Czechia" },
      { "@type": "Country", "name": "Hungary" },
      { "@type": "Country", "name": "Austria" },
      { "@type": "Country", "name": "France" }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": "130",
      "highPrice": "130",
      "offerCount": fleetData.length,
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31",
      "url": pageUrl,
      "itemOffered": fleetData.map(vehicle => ({
        "@type": "Service",
        "name": vehicle.type,
        "description": `${vehicle.seats} ${language === 'ru' ? 'мест' : 'locuri'}`,
        "provider": {
          "@type": "BusCompany",
          "name": "RUTEMD"
        },
        "offers": {
          "@type": "Offer",
          "price": "130",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2026-12-31",
          "url": pageUrl,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "1.3",
            "priceCurrency": "EUR",
            "unitCode": "KMT",
            "unitText": "km"
          }
        }
      }))
    },
    "serviceType": language === 'ru'
      ? [
          "Аренда автобусов под заказ",
          "Пассажирские перевозки для групп",
          "Транспорт для корпоративных мероприятий",
          "Аренда автобуса для спортивных команд",
          "Международные групповые поездки",
          "Экскурсии и организованные туры",
          "Перевозка сотрудников под заказ"
        ]
      : [
          "Închiriere autocare la comandă",
          "Transport la comandă pentru grupuri",
          "Transport evenimente corporate",
          "Închiriere autocar pentru echipe sportive",
          "Călătorii internaționale de grup",
          "Excursii și tururi organizate",
          "Transport persoane pentru angajați"
        ]
  };

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    "mainEntity": [
      { q: t.busCharter.faq1Q, a: t.busCharter.faq1A },
      { q: t.busCharter.faq2Q, a: t.busCharter.faq2A },
      { q: t.busCharter.faq3Q, a: t.busCharter.faq3A },
      { q: t.busCharter.faq4Q, a: t.busCharter.faq4A },
      { q: t.busCharter.faq5Q, a: t.busCharter.faq5A },
      { q: t.busCharter.faq6Q, a: t.busCharter.faq6A }
    ].map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  };

  const localBusinessSchema = {
    "@type": ["LocalBusiness", "TravelAgency"],
    "@id": "https://www.rutemd.com#organization",
    "name": "RUTEMD",
    "url": "https://www.rutemd.com",
    "telephone": "+37369101912",
    "email": "mdrute@gmail.com",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "blvd. Negruzzi 7, Hotelul Chișinău, etajul 2, of. 202",
      "addressLocality": "Chișinău",
      "addressCountry": "MD",
      "postalCode": "MD-2001"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.0167,
      "longitude": 28.8333
    },
    "areaServed": [
      { "@type": "Country", "name": "Romania" },
      { "@type": "Country", "name": "Bulgaria" },
      { "@type": "Country", "name": "Turkey" },
      { "@type": "Country", "name": "Germany" },
      { "@type": "Country", "name": "Italy" },
      { "@type": "Country", "name": "Poland" },
      { "@type": "Country", "name": "Ukraine" },
      { "@type": "Country", "name": "Czechia" },
      { "@type": "Country", "name": "Hungary" },
      { "@type": "Country", "name": "Austria" },
      { "@type": "Country", "name": "France" },
      { "@type": "Country", "name": "Moldova" }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ]
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": language === 'ru' ? "Главная" : "Acasă",
        "item": siteHome
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": language === 'ru' ? "Автобусы под Заказ" : "Autocare la Comandă",
        "item": pageUrl
      }
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, faqSchema, localBusinessSchema, breadcrumbSchema]
  };
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedBus, setSelectedBus] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(1);

  const services = [
    {
      icon: <MapPin className="w-8 h-8 text-[#3870db]" />,
      title: t.busCharter.service1Title,
      description: t.busCharter.service1Desc
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#3870db]" />,
      title: t.busCharter.service2Title,
      description: t.busCharter.service2Desc
    },
    {
      icon: <Trophy className="w-8 h-8 text-[#3870db]" />,
      title: t.busCharter.service3Title,
      description: t.busCharter.service3Desc
    },
    {
      icon: <Building2 className="w-8 h-8 text-[#3870db]" />,
      title: t.busCharter.service4Title,
      description: t.busCharter.service4Desc
    },
    {
      icon: <Users className="w-8 h-8 text-[#3870db]" />,
      title: t.busCharter.service5Title,
      description: t.busCharter.service5Desc
    },
    {
      icon: <PartyPopper className="w-8 h-8 text-[#3870db]" />,
      title: t.busCharter.service6Title,
      description: t.busCharter.service6Desc
    }
  ];

  const advantages = [
    t.busCharter.advantage1,
    t.busCharter.advantage2,
    t.busCharter.advantage3,
    t.busCharter.advantage4,
    t.busCharter.advantage5,
    t.busCharter.advantage6
  ];

  // Use shared fleet data
  const fleet = fleetData;

  const faqs = [
    {
      question: t.busCharter.faq1Q,
      answer: t.busCharter.faq1A
    },
    {
      question: t.busCharter.faq2Q,
      answer: t.busCharter.faq2A
    },
    {
      question: t.busCharter.faq3Q,
      answer: t.busCharter.faq3A
    },
    {
      question: t.busCharter.faq4Q,
      answer: t.busCharter.faq4A
    },
    {
      question: t.busCharter.faq5Q,
      answer: t.busCharter.faq5A
    },
    {
      question: t.busCharter.faq6Q,
      answer: t.busCharter.faq6A
    }
  ];
  
  const partners = [
    partnerLogo1,
    partnerLogo2,
    partnerLogo3,
    partnerLogo4,
    partnerLogo5,
    partnerLogo6,
    partnerLogo7,
    partnerLogo8
  ];

  const fleetAlt = (type: string, seats: string | number) =>
    t.busCharter.fleetAltTemplate
      .replace('{type}', type)
      .replace('{seats}', String(seats));
  const galleryAlt = (type: string, current: number, total: number) =>
    t.busCharter.galleryAltTemplate
      .replace('{type}', type)
      .replace('{current}', String(current))
      .replace('{total}', String(total));

  return (
    <main className="min-h-screen bg-[#f0f0f0]">
      <SEO 
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        canonicalUrl={pageUrl}
        structuredData={structuredData}
        lang={language}
      />
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-[#012141] py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-[14px] text-blue-200/60">
            <Link to="/" className="hover:text-white transition-colors">{t.busCharter.breadcrumbHome}</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="hover:text-white transition-colors">{t.busCharter.breadcrumbServices}</span>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-white font-medium">{t.busCharter.breadcrumbCharter}</span>
          </div>
        </div>
      </div>

      {/* Combined Hero & Fleet Showcase Section */}
      <section id="fleet" className="py-20 bg-gradient-to-r from-[#012141] to-[#001a30] relative overflow-hidden min-h-[900px] flex flex-col justify-center scroll-mt-28">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3870db] rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#3870db] rounded-full blur-[80px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Content Header */}
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white mb-6 font-bold text-5xl md:text-7xl leading-tight tracking-tight"
            >
              {t.busCharter.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3870db] to-white">{t.busCharter.titleHighlight}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/80 max-w-2xl mx-auto text-xl leading-relaxed font-light"
            >
              {t.busCharter.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-8 text-white/70"
            >
              <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <Clock className="w-5 h-5 text-[#3870db]" />
                <span>{t.busCharter.supportIncluded}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <Shield className="w-5 h-5 text-[#3870db]" />
                <span>{t.busCharter.modernCoaches}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#3870db]" />
                <span>{t.busCharter.flexiblePrices}</span>
              </div>
            </motion.div>
          </div>
          
          {/* Accessible fleet heading (visually subtle, crawlable) */}
          <h2 className="sr-only">{t.busCharter.fleetSectionTitle}</h2>

          {/* Interactive Fleet Carousel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            {/* Navigation Buttons */}
            <button
              onClick={() => setCenterIndex((prev) => (prev === 0 ? fleet.length - 1 : prev - 1))}
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition-all text-white border border-white/10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => setCenterIndex((prev) => (prev === fleet.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition-all text-white border border-white/10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Carousel Cards */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
              {fleet.map((vehicle, index) => {
                const distance = index - centerIndex;
                const absDistance = Math.abs(distance);
                
                const isCenter = distance === 0;
                const isVisible = absDistance <= 2;
                
                if (!isVisible) return null;
                
                const scale = isCenter ? 1 : 0.75 - (absDistance - 1) * 0.1;
                const opacity = isCenter ? 1 : 0.5 - (absDistance - 1) * 0.2;
                const zIndex = 10 - absDistance;
                const offsetX = distance * 320; // Increased spacing
                
                return (
                  <motion.div
                    key={index}
                    className="absolute cursor-pointer"
                    onClick={() => setCenterIndex(index)}
                    initial={false}
                    animate={{
                      x: `${offsetX}px`,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    style={{
                      width: '420px',
                    }}
                  >
                    <article className={`bg-white rounded-[30px] overflow-hidden transition-all duration-500 ${isCenter ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/20' : 'shadow-xl grayscale-[0.5]'}`}>
                      <div className="flex flex-col items-center gap-6 p-8">
                        {/* Image */}
                        <div className="relative w-full max-w-[340px] aspect-[4/3]">
                          <div className="absolute inset-0 bg-gray-100 rounded-2xl transform scale-[1.02]" />
                          <div className="relative w-full h-full rounded-2xl overflow-hidden ring-4 ring-gray-50 shadow-md">
                            <ImageWithFallback
                              src={vehicle.mainImage}
                              alt={fleetAlt(vehicle.type, vehicle.seats)}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="w-full text-center">
                          <h3 className="text-[#012141] text-3xl font-bold mb-2 tracking-tight">
                            {vehicle.type}
                          </h3>
                          <div className="flex items-center justify-center gap-2 text-gray-500 mb-6">
                            <Users className="w-5 h-5" />
                            <span className="text-lg font-medium">{vehicle.seats} {t.busCharter.seats}</span>
                          </div>
                          
                          {isCenter && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBus(index);
                                setCurrentImageIndex(0);
                              }}
                              className="bg-[#3870db] hover:bg-[#2b5bb8] text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-blue-500/30 transition-all"
                            >
                              {t.busCharter.viewGallery}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {fleet.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCenterIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === centerIndex ? 'bg-white w-12' : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bus Gallery Dialog - Moved logic outside loop for cleaner DOM */}
      <Dialog open={selectedBus !== null} onOpenChange={(open: boolean) => !open && setSelectedBus(null)}>
        <DialogContent className="max-w-6xl w-full h-full md:w-[95vw] md:h-[95vh] lg:h-[90vh] md:max-h-[95vh] lg:max-h-[90vh] bg-white border-none p-0 overflow-hidden rounded-none md:rounded-2xl flex flex-col m-0 md:m-4">
          {selectedBus !== null && (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Image Section - Full height on mobile, flexible on desktop */}
              <div className="relative flex-shrink-0 h-[50vh] md:h-[55vh] lg:flex-1 lg:min-h-[500px] bg-black flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={fleet[selectedBus].galleryImages[currentImageIndex]}
                  alt={galleryAlt(fleet[selectedBus].type, currentImageIndex + 1, fleet[selectedBus].galleryImages.length)}
                  className="w-full h-full object-contain"
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedBus(null)}
                  className="absolute top-4 right-4 z-[60] bg-black/80 hover:bg-black text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-xl"
                  aria-label={t.busCharter.close}
                >
                  <X className="w-6 h-6" />
                </button>
                
                {/* Navigation Arrows */}
                {fleet[selectedBus].galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === 0 ? fleet[selectedBus].galleryImages.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-[55] bg-black/80 hover:bg-black text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-xl hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === fleet[selectedBus].galleryImages.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-[55] bg-black/80 hover:bg-black text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-xl hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {fleet[selectedBus].galleryImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[55] bg-black/80 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
                    {currentImageIndex + 1} / {fleet[selectedBus].galleryImages.length}
                  </div>
                )}
              </div>

              {/* Content Section - Scrollable */}
              <div className="bg-white overflow-y-auto flex-1 min-h-0">
                {/* Bus Info */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#012141] mb-2">{fleet[selectedBus].type}</h3>
                  <p className="text-gray-600">{fleet[selectedBus].seats} {t.busCharter.passengerSeats}</p>
                </div>

                {/* Thumbnails */}
                {fleet[selectedBus].galleryImages.length > 1 && (
                  <div className="p-6 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">{t.busCharter.viewGallery}</h4>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                      {fleet[selectedBus].galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                            idx === currentImageIndex 
                              ? 'border-[#3870db] ring-2 ring-[#3870db]/20 scale-105' 
                              : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300'
                          }`}
                        >
                          <ImageWithFallback src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <Users className="w-8 h-8 mx-auto mb-3 text-[#3870db]" />
                      <div className="text-sm font-semibold text-gray-900">{fleet[selectedBus].seats} {t.busCharter.seats}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <Armchair className="w-8 h-8 mx-auto mb-3 text-[#3870db]" />
                      <div className="text-sm font-semibold text-gray-900">{t.busCharter.recliningSeats}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <Usb className="w-8 h-8 mx-auto mb-3 text-[#3870db]" />
                      <div className="text-sm font-semibold text-gray-900">{t.busCharter.usbPorts}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <Tv className="w-8 h-8 mx-auto mb-3 text-[#3870db]" />
                      <div className="text-sm font-semibold text-gray-900">{t.busCharter.multimedia}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Form & FAQ */}
      <section id="contact" className="py-12 bg-[#f0f0f0] border-t border-gray-100/50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <h2 id="quote-request" className="text-[#012141] mb-6 font-bold text-2xl md:text-3xl tracking-tight leading-tight scroll-mt-28">{t.busCharter.requestQuote}</h2>
              <p className="text-[#6a6a6a] mb-8">
                {t.busCharter.requestQuoteDesc}
              </p>
              <div className="space-y-10">
                <Card className="p-8 bg-white rounded-[20px] border-none shadow-lg overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#3870db]/5 rounded-bl-full -mr-8 -mt-8" />
                   
                   <div className="relative space-y-8">
                      {/* Phone */}
                      <div className="flex items-center gap-5 rounded-2xl bg-blue-50/70 border border-blue-100 p-4 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 ring-1 ring-blue-100">
                          <Headphones className="w-6 h-6 text-[#3870db]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t.busCharter.phoneReservations}</p>
                          <div className="space-y-1">
                            <a href="tel:+37369101912" onClick={(e) => handlePhoneClick(e, '+37369101912')} className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xl font-extrabold text-[#012141] shadow-sm ring-1 ring-blue-100 hover:text-[#3870db] hover:ring-[#3870db]/40 transition-colors">
                              +373 69 10 19 12
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Briefcase className="w-6 h-6 text-[#3870db]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t.busCharter.email}</p>
                          <a href="mailto:mdrute@gmail.com" className="text-lg font-semibold text-[#012141] hover:text-[#3870db] transition-colors">
                            mdrute@gmail.com
                          </a>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <MapPin className="w-6 h-6 text-[#3870db]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t.busCharter.ourOffice}</p>
                          <p className="text-lg font-semibold text-[#012141]">
                            Hotelul Chișinău, etajul 2, of. 202<br />
                            blvd. Negruzzi 7, Chișinău
                          </p>
                        </div>
                      </div>
                      
                      {/* Schedule */}
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Clock className="w-6 h-6 text-[#3870db]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t.busCharter.availabilityTitle}</p>
                          <p className="text-lg font-semibold text-[#012141]">
                            {t.busCharter.availabilityDesc}
                          </p>
                        </div>
                      </div>
                   </div>
                </Card>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 id="faq" className="text-[#012141] mb-6 font-bold text-2xl md:text-3xl tracking-tight leading-tight scroll-mt-28">{t.busCharter.faqTitle}</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-[15px] overflow-hidden shadow-sm border border-gray-100"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-[#012141] pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronDown className="w-5 h-5 text-[#3870db] flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6 text-[#6a6a6a] text-[15px] leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Intro + Why Choose RUTEMD – merged content-rich section */}
      <section id="about-charter" className="py-16 md:py-20 bg-white border-t border-gray-100/50 relative overflow-hidden scroll-mt-28">
        {/* Subtle background accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3870db]/[0.03] rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3870db]/[0.02] rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            {/* Left: SEO long-form content */}
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#3870db] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
                <Shield className="w-3.5 h-3.5" />
                {t.busCharter.breadcrumbCharter}
              </div>
              <h2 className="text-[#012141] font-bold text-2xl md:text-4xl tracking-tight mb-6 leading-tight">
                {t.busCharter.seoIntroTitle}
              </h2>
              <div className="space-y-5 text-[#3a3f47] text-[15px] md:text-base leading-relaxed">
                <p>{t.busCharter.seoIntroP1}</p>
                <p>{t.busCharter.seoIntroP2}</p>
                <p>{t.busCharter.seoIntroP3}</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="tel:+37369101912" onClick={(e) => handlePhoneClick(e, '+37369101912')}>
                  <Button className="bg-[#3870db] hover:bg-[#2b5bb8] text-white font-medium px-6 py-5 rounded-full shadow-lg shadow-blue-500/20">
                    {t.busCharter.seoIntroCtaText}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>
                <p className="text-sm text-gray-500">
                  {t.busCharter.seoNoticeText}{' '}
                  <Link to={`/${language}/routes`} className="text-[#3870db] hover:underline font-medium">
                    {t.busCharter.seoNoticeLink}
                  </Link>
                </p>
              </div>
            </div>

            {/* Right: Why Choose RUTEMD advantages */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="bg-gradient-to-br from-[#012141] to-[#001a30] rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-900/10 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#3870db]/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
                    <Trophy className="w-3.5 h-3.5 text-[#3870db]" />
                    RUTEMD
                  </div>
                  <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight mb-6 leading-snug">
                    {t.busCharter.whyChooseTitle}
                  </h3>

                  <ul className="space-y-3">
                    {advantages.map((advantage, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 p-3.5 rounded-xl transition-colors"
                      >
                        <div className="mt-0.5 bg-[#3870db]/20 p-1 rounded-full shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-[#3870db]" />
                        </div>
                        <span className="text-white/90 text-[14px] md:text-[15px] font-medium leading-snug">
                          {advantage}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services + Advantages Section */}
      <section id="services" className="py-12 bg-white border-t border-gray-100/50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-[#012141] font-bold text-2xl md:text-3xl tracking-tight">
                {t.busCharter.servicesTitle}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{t.busCharter.servicesSubtitle}</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gray-100 mx-8"></div>
            <Link to={`/${language}/contact`} onClick={handleContactClick}>
              <Button variant="ghost" className="text-[#3870db] hover:text-[#2b5bb8] text-sm font-medium group">
                {t.nav.contactUs} <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group flex items-start p-4 bg-gray-50/80 hover:bg-white rounded-xl border border-transparent hover:border-blue-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 cursor-default"
              >
                <div className="shrink-0 mr-4 bg-white p-2.5 rounded-lg shadow-sm border border-gray-100 group-hover:border-blue-100 group-hover:scale-105 transition-all duration-300">
                  <div className="scale-75 origin-center transform">
                    {service.icon}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-[#012141] font-bold text-sm mb-1 group-hover:text-[#3870db] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexibility – "We go anywhere" Section */}
      <section id="destinations" className="py-16 bg-[#f8f9fa] border-t border-gray-100/50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-[#012141] font-bold text-2xl md:text-3xl tracking-tight mb-3">
              {t.busCharter.flexTitle}
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              {t.busCharter.flexSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#3870db]" />
              </div>
              <h3 className="text-[#012141] font-semibold text-lg mb-2">{t.busCharter.flex1Title}</h3>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">{t.busCharter.flex1Desc}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#3870db]" />
              </div>
              <h3 className="text-[#012141] font-semibold text-lg mb-2">{t.busCharter.flex2Title}</h3>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">{t.busCharter.flex2Desc}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/60">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#3870db]" />
              </div>
              <h3 className="text-[#012141] font-semibold text-lg mb-2">{t.busCharter.flex3Title}</h3>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">{t.busCharter.flex3Desc}</p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
            {t.busCharter.flexOrigin}
          </p>
        </div>
      </section>

      {/* Indicative Pricing Section */}
      <section id="pricing" className="py-16 bg-white border-t border-gray-100/50 scroll-mt-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-[#012141] font-bold text-2xl md:text-3xl tracking-tight mb-3">
              {t.busCharter.priceTitle}
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
              {t.busCharter.priceSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100/60 text-center">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{t.busCharter.priceFromKm}</p>
              <p className="text-[#012141] text-3xl font-bold mb-2">1.3 €<span className="text-base font-medium text-gray-500">/km</span></p>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">{t.busCharter.priceFromKmDesc}</p>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100/60 text-center">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{t.busCharter.priceMinDay}</p>
              <p className="text-[#012141] text-3xl font-bold mb-2">130 €<span className="text-base font-medium text-gray-500">/day</span></p>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">{t.busCharter.priceMinDayDesc}</p>
            </div>
            <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100/60 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-[#012141] text-lg font-bold mb-2 leading-snug">
                {t.busCharter.priceInclusive}
              </p>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">{t.busCharter.priceInclusiveDesc}</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6 max-w-2xl mx-auto">
            {t.busCharter.priceNote}
          </p>

          <div className="text-center mt-8">
            <Link to={`/${language}/contact`} onClick={handleContactClick}>
              <Button className="bg-[#3870db] hover:bg-[#2b5bb8] text-white font-medium px-6 py-5 rounded-full">
                {t.busCharter.seoIntroCtaText}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section - Infinite Marquee */}
      <section id="partners" className="py-20 bg-white border-t border-gray-100 overflow-hidden scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
           <h2 className="text-[#012141] font-bold text-2xl md:text-3xl tracking-tight mb-2">
              {t.busCharter.partnersTitle}
            </h2>
            <div className="h-1 w-20 bg-[#3870db] mx-auto rounded-full mb-4"/>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
              {t.busCharter.partnersSubtitle}
            </p>
        </div>

        <div className="relative flex overflow-hidden group">
           {/* Gradients for fade effect */}
           <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
           <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />
           
           <motion.div 
             className="flex items-center gap-16 md:gap-24 min-w-full"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ 
               repeat: Infinity, 
               ease: "linear", 
               duration: isMobile ? 15 : 30 
             }}
           >
             {[...partners, ...partners].map((src, i) => {
                const logoIndex = i % partners.length;
                const isDelfinLogo = src === partnerLogo7;
                const isStartLogo = src === partnerLogo8;
                return (
                  <div 
                    key={i} 
                    className={`relative w-32 h-16 md:w-40 md:h-20 flex-shrink-0 transition-opacity duration-300 ${
                      isStartLogo 
                        ? 'opacity-100' 
                        : 'opacity-50 hover:opacity-100'
                    } ${
                      isDelfinLogo ? 'grayscale' : 'grayscale hover:grayscale-0'
                    }`}
                  >
                    <ImageWithFallback 
                      src={src} 
                      alt={t.busCharter.partnerAlt.replace('{index}', String(logoIndex + 1))}
                      className={`w-full h-full object-contain ${isStartLogo ? 'brightness-0' : ''}`}
                    />
                  </div>
                );
             })}
           </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}