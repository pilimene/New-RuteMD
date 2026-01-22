import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Card } from './ui/card';
import { ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { routes } from '../data/routes';
import { useTranslation } from '../i18n';
import { SEO } from './SEO';

export function RouteSelectionPage() {
  const { t, language } = useTranslation();

  // SEO content based on language - Focus on ALL routes
  const seoContent = {
    ro: {
      title: 'Rute Autocar Moldova - Turcia & Bulgaria | Chișinău - Istanbul, Varna, Burgas',
      description: 'Curse regulate cu autocarul din Moldova către Turcia și Bulgaria. Chișinău - Istanbul (1000 MDL), Varna (800 MDL), Burgas (800 MDL). Plecări săptămânale, autocare Mercedes premium. Rezervă acum!',
      keywords: 'rute autocar moldova, autocar chisinau istanbul, autocar chisinau varna, autocar chisinau burgas, transport moldova turcia, transport moldova bulgaria, curse regulate chisinau, bilete autocar turcia, bilete autocar bulgaria, rutemd'
    },
    ru: {
      title: 'Автобусные Маршруты Молдова - Турция и Болгария | Кишинёв - Стамбул, Варна, Бургас',
      description: 'Регулярные автобусные рейсы из Молдовы в Турцию и Болгарию. Кишинёв - Стамбул (1000 MDL), Варна (800 MDL), Бургас (800 MDL). Еженедельные отправления, премиум автобусы Mercedes. Бронируйте!',
      keywords: 'автобусные маршруты молдова, автобус кишинев стамбул, автобус кишинев варна, автобус кишинев бургас, перевозки молдова турция, перевозки молдова болгария, регулярные рейсы кишинев, билеты автобус турция, билеты автобус болгария, rutemd'
    }
  };

  const content = seoContent[language];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": content.title,
    "description": content.description,
    "url": "https://rutemd.md/routes",
    "inLanguage": language === 'ru' ? 'ru-RU' : 'ro-RO',
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
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": language === 'ru' ? "Доступные маршруты" : "Rute disponibile",
      "itemListElement": routes.map((route, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TripAction",
          "name": `${route.origin} - ${route.destination}`,
          "fromLocation": {
            "@type": "City",
            "name": route.origin
          },
          "toLocation": {
            "@type": "City",
            "name": route.destination
          }
        }
      }))
    }
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

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <SEO 
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        canonicalUrl="https://rutemd.md/routes"
        structuredData={structuredData}
        lang={language}
      />
      <Navbar />

      <div className="bg-white border-b border-black/10 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-[14px] font-medium tracking-wide">
            <Link to="/" className="text-gray-500 hover:text-[#3870db] transition-colors flex items-center">
               {t.routeSelection.breadcrumbHome}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="text-[#012141]">{t.routeSelection.breadcrumbRoutes}</span>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-[#012141] font-bold text-4xl md:text-5xl tracking-tight mb-4">
              {t.routeSelection.title}
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t.routeSelection.subtitle}
            </p>
          </div>

          {/* Turcia */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 className="text-[#012141] font-bold text-3xl mb-8 flex items-center gap-3 px-1">
              <div className="w-1.5 h-8 bg-[#3870db] rounded-full" />
              {t.routeSelection.turkey}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {routes.filter(r => r.destination === 'Istanbul' || r.origin === 'Istanbul').map((route) => (
                <Link to={`/route/${route.id}`} key={route.id} className="group">
                  <Card className="overflow-hidden rounded-[24px] border-none shadow-lg hover:shadow-2xl transition-all duration-500 h-[400px] relative group-hover:-translate-y-1">
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={route.image}
                        alt={`Autocar ${route.origin} ${route.destination} - ${route.price} ${route.currency} | RUTEMD`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#012141]/90 group-hover:to-[#012141] transition-colors duration-500" />
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                         <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                           <span className="text-sm font-medium flex items-center gap-2">
                             <Calendar className="w-4 h-4" /> {translateDay(route.departureDay)}
                           </span>
                         </div>
                         <div className="bg-[#3870db] px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                           <span className="text-sm font-bold flex items-center gap-1">
                             <span className="text-xs opacity-80">{t.routeSelection.from}</span>
                             {route.currency}{route.price}
                           </span>
                         </div>
                      </div>

                      <div>
                        <div className="mb-4 opacity-80 text-sm font-medium tracking-wider uppercase text-blue-200">
                          {t.routeSelection.via} • {route.duration}
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                          <h2 className="text-3xl md:text-4xl font-bold">{translateCity(route.origin)}</h2>
                          <ChevronRight className="w-8 h-8 text-[#3870db]" />
                          <h2 className="text-3xl md:text-4xl font-bold">{translateCity(route.destination)}</h2>
                        </div>

                        <div className="w-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white hover:text-[#012141] transition-all duration-300 rounded-xl py-4 flex items-center justify-center font-bold gap-2 group/btn">
                          {t.routeSelection.viewDetails}
                          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Bulgaria */}
          <div style={{ marginTop: '4rem' }}>
            <h2 className="text-[#012141] font-bold text-3xl mb-8 flex items-center gap-3 px-1">
              <div className="w-1.5 h-8 bg-[#3870db] rounded-full" />
              {t.routeSelection.bulgaria}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {routes
                .filter(r => r.destination === 'Varna' || r.destination === 'Burgas' || r.origin === 'Varna' || r.origin === 'Burgas')
                .sort((a, b) => {
                  // Group by city (Varna first, then Burgas), outbound before return
                  const cityA = a.destination === 'Varna' || a.origin === 'Varna' ? 'Varna' : 'Burgas';
                  const cityB = b.destination === 'Varna' || b.origin === 'Varna' ? 'Varna' : 'Burgas';
                  if (cityA !== cityB) {
                    // Varna comes before Burgas
                    return cityA === 'Varna' ? -1 : 1;
                  }
                  // Within same city, outbound (from Chișinău) comes first
                  return a.origin === 'Chișinău' ? -1 : 1;
                })
                .map((route) => (
                <Link to={`/route/${route.id}`} key={route.id} className="group">
                  <Card className="overflow-hidden rounded-[24px] border-none shadow-lg hover:shadow-2xl transition-all duration-500 h-[400px] relative group-hover:-translate-y-1">
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={route.image}
                        alt={`Autocar ${route.origin} ${route.destination} - ${route.price} ${route.currency} | RUTEMD`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#012141]/90 group-hover:to-[#012141] transition-colors duration-500" />
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                         <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                           <span className="text-sm font-medium flex items-center gap-2">
                             <Calendar className="w-4 h-4" /> {translateDay(route.departureDay)}
                           </span>
                         </div>
                         <div className="bg-[#3870db] px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                           <span className="text-sm font-bold flex items-center gap-1">
                             <span className="text-xs opacity-80">{t.routeSelection.from}</span>
                             {route.currency}{route.price}
                           </span>
                         </div>
                      </div>

                      <div>
                        <div className="mb-4 opacity-80 text-sm font-medium tracking-wider uppercase text-blue-200">
                          {t.routeSelection.via} • {route.duration}
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                          <h2 className="text-3xl md:text-4xl font-bold">{translateCity(route.origin)}</h2>
                          <ChevronRight className="w-8 h-8 text-[#3870db]" />
                          <h2 className="text-3xl md:text-4xl font-bold">{translateCity(route.destination)}</h2>
                        </div>

                        <div className="w-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white hover:text-[#012141] transition-all duration-300 rounded-xl py-4 flex items-center justify-center font-bold gap-2 group/btn">
                          {t.routeSelection.viewDetails}
                          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
