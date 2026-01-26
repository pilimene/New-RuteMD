import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Home, Route, Bus, Info, MessageSquare, Facebook, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../assets/efa08d3efe27d7b6c4af6e74f509e93eedbbb850.png';
import { useLanguage } from '../i18n';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.home, path: '/', icon: Home },
    { name: t.nav.routes, path: '/routes', icon: Route },
    { name: t.nav.busCharter, path: '/bus-charter', icon: Bus },
    { name: t.nav.about, path: '/about', icon: Info },
    { name: t.nav.contact, path: '/contact', icon: MessageSquare },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ro' ? 'ru' : 'ro');
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <nav className="bg-[#012141] text-white sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="RUTEMD Logo" 
              className="h-12 md:h-14 w-auto transition-transform group-hover:scale-105 duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3 lg:space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-white/90 hover:text-white transition-colors text-sm font-medium tracking-normal lg:tracking-wide uppercase hover:underline decoration-[#3870db] underline-offset-4 decoration-2 ${
                  location.pathname === link.path ? 'text-white underline underline-offset-8' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Phone & CTA */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/90 hover:text-white"
              title={language === 'ro' ? 'Переключить на русский' : 'Comută în română'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase">{language === 'ro' ? 'RU' : 'RO'}</span>
            </button>

            <a href="tel:+37368501182" className="hidden xl:flex items-center text-white/90 hover:text-white transition-colors group">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#3870db] transition-colors mr-2">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold tracking-normal">+373 68 50 11 82</span>
            </a>
            <Link to="/contact">
              <Button className="bg-[#3870db] hover:bg-[#2b5bb8] text-white px-4 xl:px-6 rounded-full font-bold shadow-lg shadow-blue-900/20 transition-all hover:shadow-blue-900/40 text-sm">
                {t.nav.contactUs}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 z-[60] relative rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#012141] z-[58] lg:hidden shadow-2xl flex flex-col"
            >
              {/* Header inside drawer */}
              <div className="h-20 flex items-center px-6 border-b border-white/5">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
              </div>

              <div className="flex-1 overflow-y-auto pt-2 pb-8 px-4 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <Link
                        to={link.path}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-[#3870db] text-white' 
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-base font-semibold tracking-tight">{link.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Footer inside drawer */}
              <motion.div variants={itemVariants} className="p-6 border-t border-white/5 space-y-6">
                {/* Language Switcher for Mobile */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Globe className="w-5 h-5 text-[#3870db]" />
                  <span className="text-white font-bold">
                    {language === 'ro' ? 'Русский' : 'Română'}
                  </span>
                </button>

                <a href="tel:+37368501182" className="flex items-center group bg-white/5 p-4 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-[#3870db]/20 flex items-center justify-center mr-3">
                    <Phone className="w-4 h-4 text-[#3870db]" />
                  </div>
                  <div>
                    <span className="block text-white/40 text-[10px] font-bold uppercase tracking-widest">{t.nav.callNow}</span>
                    <span className="block text-sm font-bold text-white tracking-tight">+373 68 50 11 82</span>
                  </div>
                </a>

                <div className="flex gap-3">
                  <a href="https://www.facebook.com/mdrute" target="_blank" rel="noopener noreferrer" className="flex-1 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#3870db] hover:text-white transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://wa.me/37368501182" target="_blank" rel="noopener noreferrer" className="flex-1 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#3870db] hover:text-white transition-all">
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
