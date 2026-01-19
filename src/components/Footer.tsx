import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import logoImage from '../assets/efa08d3efe27d7b6c4af6e74f509e93eedbbb850.png';

export function Footer() {
  return (
    <footer className="bg-[#012141] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo & Description */}
          <div>
            <img 
              src={logoImage} 
              alt="RUTEMD Logo" 
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              Transport confortabil și sigur între Moldova și Turcia. Peste 10 ani de experiență în servicii de transport pasageri.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white mb-4 text-[20px] font-semibold">Link-uri Rapide</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-[#3870db] transition-colors">
                  Acasă
                </Link>
              </li>
              <li>
                <Link to="/routes" className="text-sm hover:text-[#3870db] transition-colors">
                  Rute
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-[#3870db] transition-colors">
                  Despre Noi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[#3870db] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white mb-4 text-[20px] font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 text-[#3870db] flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+37312345678" className="text-sm hover:text-[#3870db] transition-colors">
                    +373 123 456 78
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 text-[#3870db] flex-shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:info@rutemd.md" className="text-sm hover:text-[#3870db] transition-colors">
                    info@rutemd.md
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-[#3870db] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm">
                    Str. Ștefan cel Mare 123, Chișinău, Moldova
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Program */}
          <div>
            <h3 className="text-white mb-4 text-[20px] font-semibold">Program</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400">Luni - Vineri:</span>
                <br />
                <span className="text-white">08:00 - 20:00</span>
              </li>
              <li>
                <span className="text-gray-400">Sâmbătă - Duminică:</span>
                <br />
                <span className="text-white">09:00 - 18:00</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-[#3870db] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3870db] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3870db] transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} RUTEMD. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}