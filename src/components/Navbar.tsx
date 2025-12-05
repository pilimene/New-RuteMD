import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#012141] text-white sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-opacity-95 supports-[backdrop-filter]:bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="bg-white text-[#012141] px-4 py-2 rounded-lg transition-transform group-hover:scale-105 duration-300">
              <span className="text-xl md:text-2xl tracking-tighter font-black">RUTEMD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase hover:underline decoration-[#3870db] underline-offset-4 decoration-2">
              Acasă
            </Link>
            <Link to="/routes" className="text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase hover:underline decoration-[#3870db] underline-offset-4 decoration-2">
              Rute
            </Link>
            <Link to="/bus-charter" className="text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase hover:underline decoration-[#3870db] underline-offset-4 decoration-2">
              Închiriere
            </Link>
            <Link to="/about" className="text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase hover:underline decoration-[#3870db] underline-offset-4 decoration-2">
              Despre Noi
            </Link>
            <Link to="/contact" className="text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase hover:underline decoration-[#3870db] underline-offset-4 decoration-2">
              Contact
            </Link>
          </div>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+37312345678" className="flex items-center text-white/90 hover:text-white transition-colors group">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#3870db] transition-colors mr-3">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold tracking-wide">+373 123 456 78</span>
            </a>
            <Link to="/contact">
              <Button className="bg-[#3870db] hover:bg-[#2b5bb8] text-white px-6 rounded-full font-bold shadow-lg shadow-blue-900/20 transition-all hover:shadow-blue-900/40">
                Contacteaza-ne
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#012141] border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block text-white hover:text-[#3870db] transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Acasă
              </Link>
              <Link
                to="/routes"
                className="block text-white hover:text-[#3870db] transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Rute
              </Link>
              <Link
                to="/bus-charter"
                className="block text-white hover:text-[#3870db] transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Închiriere Autobuze
              </Link>
              <Link
                to="/about"
                className="block text-white hover:text-[#3870db] transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Despre Noi
              </Link>
              <Link
                to="/contact"
                className="block text-white hover:text-[#3870db] transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 mt-4 border-t border-white/10">
                <a href="tel:+37312345678" className="flex items-center text-white mb-4">
                  <Phone className="w-5 h-5 mr-3 text-[#3870db]" />
                  <span className="text-lg">+373 123 456 78</span>
                </a>
                <Link to="/contact">
                  <Button className="w-full bg-[#3870db] hover:bg-[#2b5bb8] text-white py-6 text-lg rounded-xl">
                    Contacteaza-ne
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
