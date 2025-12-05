import { Button } from './ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

const routes = [
  {
    city: 'Istanbul',
    image: 'https://images.unsplash.com/photo-1644321907471-85099c058e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: '$50',
    description: 'Orașul celor două continente',
    days: 'Zilnic',
  },
  {
    city: 'Varna',
    image: 'https://images.unsplash.com/photo-1725098944106-2eb5207812ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: '$40',
    description: 'Perla Mării Negre',
    days: 'L/M/V',
  },
  {
    city: 'Burgas',
    image: 'https://images.unsplash.com/photo-1609674771899-c96553ccd411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: '$45',
    description: 'Coastă pitorească',
    days: 'M/J/S',
  },
];

export function PopularRoutes() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div className="max-w-2xl">
            <span className="text-[#3870db] font-bold tracking-wider uppercase text-xs">Destinații</span>
            <h2 className="text-[#012141] text-3xl md:text-4xl font-bold leading-tight mt-1">
              Descoperă orașele conectate
            </h2>
          </div>
          <Button variant="ghost" className="hidden md:flex text-[#3870db] hover:text-[#2b5bb8] p-0 font-semibold group text-sm">
            Vezi toate rutele 
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[380px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <ImageWithFallback
                src={route.image}
                alt={route.city}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012141] via-[#012141]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <div className="absolute top-4 left-4">
                 <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                   {route.days}
                 </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="mb-3">
                    <div className="flex items-center text-white/80 mb-1 text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {route.description}
                    </div>
                    <h3 className="text-white text-3xl font-bold mb-1">{route.city}</h3>
                </div>
                
                <div className="flex items-center justify-between border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <div>
                    <span className="text-white/60 text-xs block">Preț bilet</span>
                    <span className="text-[#3870db] text-xl font-bold text-white">{route.price}</span>
                  </div>
                  <Button size="sm" className="bg-white text-[#012141] hover:bg-gray-100 rounded-full px-5 font-bold text-xs h-9">
                    Rezervă
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 md:hidden text-center">
            <Button variant="ghost" className="text-[#3870db] hover:text-[#2b5bb8] font-semibold group text-sm">
                Vezi toate rutele 
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
      </div>
    </section>
  );
}