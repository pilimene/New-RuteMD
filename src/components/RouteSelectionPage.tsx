import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Card } from './ui/card';
import { ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { routes } from '../data/routes';

export function RouteSelectionPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Navbar />

      <div className="bg-white border-b border-black/10 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-[14px] font-medium tracking-wide">
            <Link to="/" className="text-gray-500 hover:text-[#3870db] transition-colors flex items-center">
               Acasă
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="text-[#012141]">Alege Ruta</span>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-[#012141] font-bold text-4xl md:text-5xl tracking-tight mb-4">
              Alege Destinația
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Oferim transport regulat către cele mai populare destinații. Plecări în fiecare Duminică, retur Miercuri.
            </p>
          </div>

          {/* Turcia */}
          <div className="mb-16">
            <h2 className="text-[#012141] font-bold text-3xl mb-8 flex items-center gap-3 px-1">
              <div className="w-1.5 h-8 bg-[#3870db] rounded-full" />
              Turcia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {routes.filter(r => r.destination === 'Istanbul').map((route) => (
                <Link to={`/route/${route.id}`} key={route.id} className="group">
                  <Card className="overflow-hidden rounded-[24px] border-none shadow-lg hover:shadow-2xl transition-all duration-500 h-[400px] relative group-hover:-translate-y-1">
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={route.image}
                        alt={`${route.origin} - ${route.destination}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#012141]/90 group-hover:to-[#012141] transition-colors duration-500" />
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                         <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                           <span className="text-sm font-medium flex items-center gap-2">
                             <Calendar className="w-4 h-4" /> {route.departureDay}
                           </span>
                         </div>
                         <div className="bg-[#3870db] px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                           <span className="text-sm font-bold flex items-center gap-1">
                             <span className="text-xs opacity-80">de la</span>
                             {route.currency}{route.price}
                           </span>
                         </div>
                      </div>

                      <div>
                        <div className="mb-4 opacity-80 text-sm font-medium tracking-wider uppercase text-blue-200">
                          Via Comrat, Cahul • {route.duration}
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                          <h2 className="text-3xl md:text-4xl font-bold">{route.origin}</h2>
                          <ChevronRight className="w-8 h-8 text-[#3870db]" />
                          <h2 className="text-3xl md:text-4xl font-bold">{route.destination}</h2>
                        </div>

                        <div className="w-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white hover:text-[#012141] transition-all duration-300 rounded-xl py-4 flex items-center justify-center font-bold gap-2 group/btn">
                          Vezi Detalii și Program
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
          <div>
            <h2 className="text-[#012141] font-bold text-3xl mb-8 flex items-center gap-3 px-1">
              <div className="w-1.5 h-8 bg-[#3870db] rounded-full" />
              Bulgaria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {routes.filter(r => r.destination === 'Varna' || r.destination === 'Burgas').map((route) => (
                <Link to={`/route/${route.id}`} key={route.id} className="group">
                  <Card className="overflow-hidden rounded-[24px] border-none shadow-lg hover:shadow-2xl transition-all duration-500 h-[400px] relative group-hover:-translate-y-1">
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={route.image}
                        alt={`${route.origin} - ${route.destination}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#012141]/90 group-hover:to-[#012141] transition-colors duration-500" />
                    </div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                         <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                           <span className="text-sm font-medium flex items-center gap-2">
                             <Calendar className="w-4 h-4" /> {route.departureDay}
                           </span>
                         </div>
                         <div className="bg-[#3870db] px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                           <span className="text-sm font-bold flex items-center gap-1">
                             <span className="text-xs opacity-80">de la</span>
                             {route.currency}{route.price}
                           </span>
                         </div>
                      </div>

                      <div>
                        <div className="mb-4 opacity-80 text-sm font-medium tracking-wider uppercase text-blue-200">
                          Via Comrat, Cahul • {route.duration}
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                          <h2 className="text-3xl md:text-4xl font-bold">{route.origin}</h2>
                          <ChevronRight className="w-8 h-8 text-[#3870db]" />
                          <h2 className="text-3xl md:text-4xl font-bold">{route.destination}</h2>
                        </div>

                        <div className="w-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white hover:text-[#012141] transition-all duration-300 rounded-xl py-4 flex items-center justify-center font-bold gap-2 group/btn">
                          Vezi Detalii și Program
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
