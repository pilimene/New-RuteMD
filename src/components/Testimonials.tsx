import { Link } from 'react-router-dom';
import { Star, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useTranslation } from '../i18n';
import mariaAvatar from '../assets/Maria.png';
import pavelAvatar from '../assets/Pavel Istrati.jpg';

export function Testimonials() {
  const { t, language } = useTranslation();

  const testimonials = [
    {
      name: 'Maria Andreeva',
      role: t.testimonials.tourist,
      text: t.testimonials.review1,
      avatar: mariaAvatar,
    },
    {
      name: 'Pavel Istrati',
      role: t.testimonials.business,
      text: t.testimonials.review2,
      avatar: pavelAvatar,
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left: Testimonials (Col-Span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-[#3870db] font-bold tracking-wider uppercase text-xs">{t.testimonials.badge}</span>
              <h2 className="text-[#012141] text-3xl font-bold mt-2">{t.testimonials.title}</h2>
            </div>

            <div className="grid gap-6">
              {testimonials.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex gap-4"
                >
                   <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                   <div>
                     <div className="flex gap-1 text-yellow-400 mb-2">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                     </div>
                     <p className="text-gray-600 text-sm italic mb-2">"{item.text}"</p>
                     <div className="flex items-center gap-2">
                       <span className="font-bold text-[#012141] text-sm">{item.name}</span>
                       <span className="text-gray-300 text-xs">•</span>
                       <span className="text-gray-400 text-xs">{item.role}</span>
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
                <h3 className="text-3xl font-bold mb-4">{t.testimonials.ctaTitle}</h3>
                <p className="text-blue-100/80 mb-8 leading-relaxed">
                  {t.testimonials.ctaDescription}
                </p>

                <div className="space-y-3">
                  <Button asChild className="w-full bg-white text-[#012141] hover:bg-gray-100 h-12 font-bold text-base rounded-xl shadow-lg">
                    <a href="tel:+37369101912">
                      <Phone className="w-4 h-4 mr-2" /> {t.testimonials.callNow}: +373 69 10 19 12
                    </a>
                  </Button>
                  <Button asChild className="w-full bg-[#25D366] hover:bg-[#20b858] text-white h-12 font-medium rounded-xl">
                    <a href="https://wa.me/37368501182" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" /> {t.testimonials.chatWhatsApp}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex justify-end text-xs text-blue-200/60 relative z-10">
                <Link to={`/${language}/contact`} className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  {t.testimonials.contactPage} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
