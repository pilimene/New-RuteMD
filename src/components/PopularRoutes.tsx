import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { routes as routesData } from '../data/routes';
import { useTranslation } from '../i18n';

export function PopularRoutes() {
  const { t, language } = useTranslation();

  const popularRoutes = routesData
    .filter((route) => route.origin === 'Chișinău')
    .map((route) => ({
      id: route.id,
      city: route.destination,
      image: route.image,
      price: `${route.price} ${route.currency}`,
      priceEquivalent: route.priceEquivalent,
      description: route.destination === 'Istanbul'
        ? t.popularRoutes.istanbul
        : route.destination === 'Varna'
        ? t.popularRoutes.varna
        : t.popularRoutes.burgas,
      days: t.popularRoutes.sunday,
    }));

  return (
    <section className="pt-12 sm:pt-16 pb-6 sm:pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div className="max-w-2xl">
            <span className="text-[#3870db] font-bold tracking-wider uppercase text-xs">{t.popularRoutes.badge}</span>
            <h2 className="text-[#012141] text-3xl md:text-4xl font-bold leading-tight mt-1">
              {t.popularRoutes.title}
            </h2>
          </div>
          <Link to={`/${language}/routes`}>
            <Button variant="ghost" className="hidden md:flex text-[#3870db] hover:text-[#2b5bb8] p-0 font-semibold group text-sm">
              {t.popularRoutes.viewAll}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularRoutes.map((route, index) => (
            <Link to={`/${language}/route/${route.id}`} key={route.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[380px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                <ImageWithFallback
                  src={route.image}
                  alt={`Autocar Chișinău ${route.city} - Bilete Online | RUTEMD`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#012141] via-[#012141]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                <div className="absolute top-4 left-4">
                   <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                     {route.days}
                   </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                  <div className="mb-3">
                      <div className="flex items-center text-white/80 mb-1 text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {route.description}
                      </div>
                      <h3 className="text-white text-3xl font-bold mb-1">{route.city}</h3>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/20 pt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <div>
                      <span className="text-white/60 text-xs block">{t.popularRoutes.priceFrom}</span>
                      <span className="text-white text-xl font-bold">{route.price}</span>
                      {route.priceEquivalent && (
                        <span className="text-white/60 text-xs block mt-0.5">{route.priceEquivalent}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-white text-[#012141] hover:bg-gray-100 rounded-full px-5 font-bold text-xs h-9">
                      {t.popularRoutes.book}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden text-center">
          <Link to={`/${language}/routes`}>
            <Button variant="ghost" className="text-[#3870db] hover:text-[#2b5bb8] font-semibold group text-sm">
              {t.popularRoutes.viewAll}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
