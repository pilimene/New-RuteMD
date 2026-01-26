import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { ChevronRight, Shield, Heart, Target, Trophy, Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import aboutUsImage from '../assets/about us 1.jpg';
import aboutUsHeroImage from '../assets/about us 2.jpg';
import { useTranslation } from '../i18n';
import { fleetData } from '../data/fleet';
import { SEO } from './SEO';

export function AboutPage() {
  const { t, language } = useTranslation();

  // SEO content based on language
  const seoContent = {
    ro: {
      title: 'Despre Noi - RUTEMD | Transport Internațional & Închiriere Autocare Moldova',
      description: 'RUTEMD din 1998 - curse regulate Moldova-Turcia & Bulgaria (Chișinău-Istanbul, Varna, Burgas) + închiriere autocare pentru evenimente, echipe sportive, teatru. Flotă Mercedes premium, 28+ ani experiență.',
      keywords: 'despre rutemd, companie transport moldova, transport international moldova, inchiriere autocare moldova, autocare evenimente, autocare echipe sportive, transport moldova turcia bulgaria, autocare mercedes chisinau, rutemd 1998, companie autocare moldova'
    },
    ru: {
      title: 'О нас - RUTEMD | Международные Перевозки и Аренда Автобусов Молдова',
      description: 'RUTEMD с 1998 года - регулярные рейсы Молдова-Турция и Болгария (Кишинёв-Стамбул, Варна, Бургас) + аренда автобусов для мероприятий, спортивных команд, театра. Парк Mercedes премиум, 28+ лет опыта.',
      keywords: 'о rutemd, транспортная компания молдова, международные перевозки молдова, аренда автобусов молдова, автобусы для мероприятий, автобусы для спортивных команд, перевозки молдова турция болгария, автобусы мерседес кишинев, rutemd 1998, автобусная компания молдова'
    }
  };

  const content = seoContent[language];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": content.title,
    "description": content.description,
    "url": "https://rutemd.md/about",
    "inLanguage": language === 'ru' ? 'ru-RU' : 'ro-RO',
    "mainEntity": {
      "@type": "BusCompany",
      "name": "RUTEMD",
      "foundingDate": "1998",
      "url": "https://rutemd.md",
      "logo": "https://rutemd.md/logo.png",
      "description": content.description,
      "areaServed": [
        {
          "@type": "Country",
          "name": "Moldova"
        },
        {
          "@type": "Country",
          "name": "Turkey"
        },
        {
          "@type": "Country",
          "name": "Bulgaria"
        }
      ],
      "knowsAbout": [
        language === 'ru' ? "Международные автобусные перевозки" : "Transport internațional cu autocarul",
        language === 'ru' ? "Пассажирские перевозки Молдова-Турция" : "Transport pasageri Moldova-Turcia",
        language === 'ru' ? "Пассажирские перевозки Молдова-Болгария" : "Transport pasageri Moldova-Bulgaria",
        language === 'ru' ? "Аренда автобусов для мероприятий" : "Închiriere autocare pentru evenimente",
        language === 'ru' ? "Аренда автобусов для спортивных команд" : "Închiriere autocare pentru echipe sportive"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": language === 'ru' ? "Автобусные маршруты" : "Rute autocar",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": language === 'ru' ? "Кишинёв - Стамбул" : "Chișinău - Istanbul"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": language === 'ru' ? "Кишинёв - Варна" : "Chișinău - Varna"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": language === 'ru' ? "Кишинёв - Бургас" : "Chișinău - Burgas"
            }
          }
        ]
      }
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
          "name": language === 'ru' ? "О нас" : "Despre Noi",
          "item": "https://rutemd.md/about"
        }
      ]
    }
  };

  const values = [
    {
      icon: Shield,
      title: t.aboutPage.valueSafety,
      description: t.aboutPage.valueSafetyDesc,
    },
    {
      icon: Heart,
      title: t.aboutPage.valuePassion,
      description: t.aboutPage.valuePassionDesc,
    },
    {
      icon: Target,
      title: t.aboutPage.valueProfessionalism,
      description: t.aboutPage.valueProfessionalismDesc,
    },
  ];

  // Use real fleet data - show first 3 vehicles
  const fleet = fleetData.slice(1, 4).map(vehicle => ({
    name: vehicle.type,
    capacity: `${vehicle.seats} ${t.aboutPage.seats}`,
    year: vehicle.year || '',
    image: vehicle.mainImage,
    features: [t.aboutPage.recliningSeats, t.aboutPage.usbPorts, t.aboutPage.multimedia, t.aboutPage.premiumComfort],
  }));

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-[#012141]">
      <SEO 
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        canonicalUrl="https://rutemd.md/about"
        structuredData={structuredData}
        lang={language}
      />
      <Navbar />

      {/* Cinematic Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden group">
        <ImageWithFallback
          src={aboutUsHeroImage}
          alt="RUTEMD - Transport Moldova Turcia Bulgaria | Flotă Autocare Mercedes Premium"
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[20s]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#012141]/80 via-[#012141]/60 to-[#012141]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-100/80 text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link to="/" className="hover:text-white transition-colors">{t.aboutPage.breadcrumbHome}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">{t.aboutPage.breadcrumbAbout}</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-in fade-in slide-in-from-bottom-5 duration-700">
               <div className="w-2 h-2 rounded-full bg-[#3870db] animate-pulse" />
               <span className="text-xs font-bold text-white uppercase tracking-widest">{t.aboutPage.badge}</span>
            </div>

            <h1 className="text-white font-bold text-4xl md:text-6xl tracking-tight leading-none animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {t.aboutPage.title} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3870db] to-blue-200">{t.aboutPage.titleHighlight}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-24">
        
        {/* Intro Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12 mb-20">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
               <h2 className="text-[#012141] text-3xl font-bold leading-tight">
                 {t.aboutPage.introTitle} <span className="text-[#3870db]">{t.aboutPage.introTitleHighlight}</span> {t.aboutPage.introTitleEnd}
               </h2>
               <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                 <p>
                   {t.aboutPage.introParagraph1}
                 </p>
                 <p>
                   {t.aboutPage.introParagraph2}
                 </p>
               </div>
               
               {/* Stats Row */}
               <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-100">
                 <div>
                   <div className="text-[#3870db] text-4xl font-bold mb-1">28+</div>
                   <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">{t.aboutPage.yearsExperience}</div>
                 </div>
                 <div>
                   <div className="text-[#3870db] text-4xl font-bold mb-1">50k+</div>
                   <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">{t.aboutPage.passengers}</div>
                 </div>
                 <div>
                   <div className="text-[#3870db] text-4xl font-bold mb-1">100%</div>
                   <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">{t.aboutPage.safetyRate}</div>
                 </div>
               </div>
             </div>

             <div className="relative">
                <div className="absolute -inset-4 bg-[#3870db]/10 rounded-3xl -rotate-3"></div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <ImageWithFallback
                    src={aboutUsImage}
                    alt="Professional Driver"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 max-w-[200px]">
                     <div className="flex items-center gap-3 mb-2">
                       <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                         <Trophy className="w-5 h-5 text-green-600" />
                       </div>
                       <div>
                         <div className="text-xs text-gray-500">{t.aboutPage.certification}</div>
                         <div className="text-sm font-bold text-[#012141]">EURO VI</div>
                       </div>
                     </div>
                     <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full w-full bg-green-500"></div>
                     </div>
                  </div>
                </div>
             </div>
           </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-[#012141] text-3xl font-bold mb-4">{t.aboutPage.valuesTitle}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t.aboutPage.valuesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#3870db]/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#3870db] transition-all duration-300">
                    <Icon className="w-7 h-7 text-[#3870db] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#012141] mb-3">{value.title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fleet Section */}
        <div className="mb-24">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
             <div>
               <h2 className="text-[#012141] text-3xl font-bold mb-4">{t.aboutPage.fleetTitle}</h2>
               <p className="text-gray-500 max-w-xl">{t.aboutPage.fleetSubtitle}</p>
             </div>
             <Link to="/bus-charter">
               <Button variant="outline" className="hidden md:flex border-[#3870db] text-[#3870db] hover:bg-blue-50">
                 {t.aboutPage.viewFleet} <ChevronRight className="w-4 h-4 ml-2" />
               </Button>
             </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {fleet.map((bus, index) => (
               <div key={index} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300">
                 <div className="relative h-56 overflow-hidden">
                   <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-[#012141] uppercase tracking-wider shadow-sm">
                     {t.aboutPage.premiumClass}
                   </div>
                   <ImageWithFallback
                     src={bus.image}
                     alt={bus.name}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                 </div>
                 
                 <div className="p-6">
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h3 className="text-lg font-bold text-[#012141]">{bus.name}</h3>
                       <p className="text-gray-500 text-sm">{t.aboutPage.manufacturingYear}: {bus.year}</p>
                     </div>
                     <div className="bg-blue-50 text-[#3870db] px-3 py-1 rounded-lg text-sm font-bold">
                       {bus.capacity}
                     </div>
                   </div>
                   
                   <div className="space-y-3">
                      {bus.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3870db]" />
                          {feature}
                        </div>
                      ))}
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Final CTA */}
        <div className="relative rounded-3xl overflow-hidden bg-[#012141]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="relative z-10 px-8 py-16 md:py-20 text-center">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.aboutPage.ctaTitle}</h2>
             <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
               {t.aboutPage.ctaSubtitle}
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/routes">
                 <Button className="bg-[#3870db] hover:bg-[#2b5bb8] text-white h-12 px-8 text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1">
                   {t.aboutPage.bookTicketNow}
                 </Button>
               </Link>
               <Link to="/contact">
                 <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-lg rounded-xl">
                   <Phone className="w-4 h-4 mr-2" /> {t.aboutPage.contactDispatch}
                 </Button>
               </Link>
             </div>
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}