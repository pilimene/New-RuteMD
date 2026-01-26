import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import heroBusImage from '../assets/b18185243268eb818aabe5c1d596d6c6d3042822.jpg';
import { useTranslation } from '../i18n';

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative h-[75vh] min-h-[600px] flex items-center justify-center bg-[#012141] overflow-hidden">
      {/* Background Image with Parallax-like feel (static for now but high quality) */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBusImage}
          alt="Autocar Chișinău Istanbul - Transport Moldova Turcia | RUTEMD"
          className="w-full h-full object-cover scale-x-[-1] brightness-90 saturate-75"
          loading="eager"
          fetchpriority="high"
        />
        {/* Gradient Overlays for text readability and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#012141]/90 via-[#012141]/60 to-[#012141]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#012141]/85 via-[#012141]/30 to-transparent"></div>
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
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            className="text-white mb-4 font-bold text-4xl md:text-6xl leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.hero.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            className="text-gray-300 mb-8 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/routes">
              <Button size="lg" className="bg-[#3870db] hover:bg-[#2b5bb8] text-white px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(56,112,219,0.4)] hover:shadow-[0_0_30px_rgba(56,112,219,0.6)] transition-all duration-300">
                {t.hero.bookNow}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm">
                {t.hero.aboutUs}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
