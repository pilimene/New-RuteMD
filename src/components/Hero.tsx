import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-[75vh] min-h-[600px] flex items-center justify-center bg-[#012141] overflow-hidden">
      {/* Background Image with Parallax-like feel (static for now but high quality) */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1559926629-2ac1c49b0257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBidXMlMjBoaWdod2F5JTIwc3Vuc2V0JTIwc2NlbmljJTIwdHVya2V5fGVufDF8fHx8MTc2MzU2MjExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury travel experience"
          className="w-full h-full object-cover opacity-80"
        />
        {/* Gradient Overlays for text readability and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#012141]/90 via-[#012141]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#012141] via-transparent to-transparent opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[#3870db]/20 text-[#3870db] border border-[#3870db]/30 backdrop-blur-sm mb-4 font-medium tracking-wide text-xs uppercase">
              Premium Transport Services
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-white mb-4 font-bold text-4xl md:text-6xl leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Călătorește cu stil <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Moldova - Turcia</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 mb-8 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experiență de 5 stele la preț de autocar. Conexiune directă Chișinău, Varna, Burgas și Istanbul.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button size="lg" className="bg-[#3870db] hover:bg-[#2b5bb8] text-white px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(56,112,219,0.4)] hover:shadow-[0_0_30px_rgba(56,112,219,0.6)] transition-all duration-300">
              Rezervă Acum
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm">
              Despre Noi
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
