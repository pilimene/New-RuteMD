import { Star, Quote, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

const testimonials = [
  {
    name: 'Maria Popescu',
    role: 'Turistă',
    text: 'Servicii excelente! Autocarul era curat și confortabil. Recomand cu încredere!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100',
  },
  {
    name: 'Ion Moraru',
    role: 'Business',
    text: 'Prețuri accesibile, condiții foarte bune și personalul amabil. Cea mai bună opțiune.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100',
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left: Testimonials (Col-Span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-[#3870db] font-bold tracking-wider uppercase text-xs">Recenzii</span>
              <h2 className="text-[#012141] text-3xl font-bold mt-2">Ce spun călătorii</h2>
            </div>

            <div className="grid gap-6">
              {testimonials.map((t, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex gap-4"
                >
                   <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                   <div>
                     <div className="flex gap-1 text-yellow-400 mb-2">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                     </div>
                     <p className="text-gray-600 text-sm italic mb-2">"{t.text}"</p>
                     <div className="flex items-center gap-2">
                       <span className="font-bold text-[#012141] text-sm">{t.name}</span>
                       <span className="text-gray-300 text-xs">•</span>
                       <span className="text-gray-400 text-xs">{t.role}</span>
                     </div>
                   </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: CTA Card (Col-Span-5) */}
          <div className="lg:col-span-5">
            <div className="h-full bg-[#012141] rounded-[2rem] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Background Art */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3870db] rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10 -ml-10 -mb-10"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Gata de plecare?</h3>
                <p className="text-blue-100/80 mb-8 leading-relaxed">
                  Rezervă-ți locul acum și bucură-te de o călătorie premium la cel mai bun preț. Suntem aici 24/7.
                </p>

                <div className="space-y-3">
                  <Button className="w-full bg-white text-[#012141] hover:bg-gray-100 h-12 font-bold text-base rounded-xl shadow-lg">
                    <Phone className="w-4 h-4 mr-2" /> Sună Acum: +373 123 456
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-12 font-medium rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" /> Chat pe WhatsApp
                  </Button>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-blue-200/60 relative z-10">
                <span>Dispecerat Non-Stop</span>
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  Contact Page <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}