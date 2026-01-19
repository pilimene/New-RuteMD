import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import logo from '../assets/efa08d3efe27d7b6c4af6e74f509e93eedbbb850.png';

export function Footer() {
  return (
    <footer className="bg-[#012141] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo & Description */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logo} 
                alt="RUTEMD Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Transport confortabil și sigur între Moldova și Turcia. Peste 28 ani de experiență în servicii de transport pasageri.
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
                  Rute Regulate
                </Link>
              </li>
              <li>
                <Link to="/bus-charter" className="text-sm hover:text-[#3870db] transition-colors">
                  Închiriere Autocare
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
                <div className="space-y-1">
                  <a href="tel:+37369101912" className="text-sm hover:text-[#3870db] transition-colors block">
                    +373 69 101 912
                  </a>
                  <a href="tel:+37368112811" className="text-sm hover:text-[#3870db] transition-colors block">
                    +373 68 112 811
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 text-[#3870db] flex-shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:info@rutemd.md" className="text-sm hover:text-[#3870db] transition-colors">
                    rutemd@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-[#3870db] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm">
                    Hotelul Chișinău, etajul 2, of. 202<br/>
                    blvd. Negruzzi 7, Chișinău, Moldova
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Disponibilitate */}
          <div>
            <h3 className="text-white mb-4 text-[20px] font-semibold">Disponibilitate</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400">Suntem disponibili</span>
                <br />
                <span className="text-white">Prin apel telefonic sau email</span>
              </li>
              <li className="pt-2">
                <span className="text-gray-400">Pentru rezervări și informații, contactați-ne la numerele de telefon indicate.</span>
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