import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { ChevronRight, MapPin, Phone, Mail, MessageSquare, ArrowRight, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100 selection:text-[#012141]">
      <Navbar />

      {/* Compact Cinematic Hero */}
      <div className="relative h-[40vh] min-h-[350px] w-full overflow-hidden group">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Corporate Skyscraper"
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[20s]"
        />
        <div className="absolute inset-0 bg-[#012141]/80" />
        
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-white font-bold text-4xl md:text-5xl mb-4 tracking-tight">
            Contactează-ne
          </h1>
          <p className="text-blue-100/80 text-lg max-w-xl">
            Suntem aici pentru a te ajuta cu orice informație.
          </p>
        </div>
      </div>

      {/* Main Content - Overlapping Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24">
        <div className="space-y-6">
          
          {/* Primary Spotlight: Phone Numbers */}
          <div className="bg-[#012141] rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden group hover:shadow-blue-900/20 transition-all duration-500">
             {/* Decorative Shine */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#3870db]/20 to-transparent rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                <div className="flex items-center gap-6 md:gap-8 w-full md:w-auto">
                   <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-md ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                      <Phone className="w-9 h-9 text-blue-100" />
                   </div>
                   <div>
                      <h2 className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-2 text-[11px]">Dispecerat Non-Stop</h2>
                      <div className="space-y-1">
                        <a href="tel:+37369000000" className="block text-3xl md:text-5xl font-bold tracking-tight hover:text-blue-200 transition-colors text-[32px]">
                          +373 69 123 456
                        </a>
                        <a href="tel:+37368000000" className="block text-xl md:text-2xl font-medium text-blue-100/60 hover:text-white transition-colors">
                          +373 68 123 456
                        </a>
                      </div>
                   </div>
                </div>

                <div className="hidden md:block w-px h-24 bg-white/10" />

                <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
                   <Button className="w-full bg-white text-[#012141] hover:bg-blue-50 font-bold h-12 rounded-xl shadow-lg border border-transparent hover:border-blue-100">
                     Apelează Acum
                   </Button>
                   <p className="text-center text-xs text-blue-200/60">Disponibil 24/7</p>
                </div>
             </div>
          </div>

          {/* Secondary Grid: WhatsApp & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* WhatsApp Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-blue-900/5 border border-gray-100 group hover:border-[#25D366]/30 transition-all duration-300 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-[#25D366]/10 transition-colors" />
               
               <div className="relative z-10">
                 <div className="w-14 h-14 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-7 h-7" />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-[#012141] mb-2">WhatsApp</h3>
                 <p className="text-gray-500 mb-8 leading-relaxed">
                   Preferi să scrii? Răspundem instant la mesaje.
                 </p>
                 
                 <Button className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold h-12 rounded-xl shadow-lg shadow-[#25D366]/20">
                    Deschide Chat <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>
               </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-blue-900/5 border border-gray-100 group hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#3870db]/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-[#3870db]/10 transition-colors" />
               
               <div className="relative z-10">
                 <div className="w-14 h-14 bg-[#3870db]/10 rounded-2xl flex items-center justify-center text-[#3870db] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7" />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-[#012141] mb-2">Email</h3>
                 <p className="text-gray-500 mb-8 leading-relaxed">
                   Pentru oferte personalizate și colaborări.
                 </p>
                 
                 <a href="mailto:contact@rutemd.com" className="flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 text-[#012141] font-bold h-12 rounded-xl border border-gray-200 transition-all">
                    contact@rutemd.com
                 </a>
               </div>
            </div>

          </div>

          {/* Address Section */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
               <div className="md:w-1/3 p-6 md:p-8 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#012141] mb-6">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#012141] mb-2">Sediul Central</h3>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    Strada Mitropolit Varlaam 58,<br/>
                    Chișinău, Republica Moldova
                  </p>
                  <Button variant="outline" className="w-fit gap-2 text-[#3870db] border-blue-100 hover:bg-blue-50">
                    <Globe className="w-4 h-4" /> Navighează
                  </Button>
               </div>
               <div className="md:w-2/3 h-64 md:h-auto min-h-[250px] rounded-2xl overflow-hidden relative bg-gray-100">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.087879308436!2d28.8337!3d47.0245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3101c90001%3A0x500c163829c967a!2sChisinau%2C%20Moldova!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                   className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                   loading="lazy"
                   title="RUTEMD Location"
                 ></iframe>
               </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}