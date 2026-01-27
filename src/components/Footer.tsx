import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, MessageCircle } from 'lucide-react';
import logo from '../assets/efa08d3efe27d7b6c4af6e74f509e93eedbbb850.png';
import { useTranslation } from '../i18n';

export function Footer() {
  const { t, language } = useTranslation();
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
              {t.footer.description}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white mb-4 text-[20px] font-semibold">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-[#3870db] transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/routes`} className="text-sm hover:text-[#3870db] transition-colors">
                  {t.nav.routes}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/bus-charter`} className="text-sm hover:text-[#3870db] transition-colors">
                  {t.nav.busCharter}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/about`} className="text-sm hover:text-[#3870db] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/contact`} className="text-sm hover:text-[#3870db] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white mb-4 text-[20px] font-semibold">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 text-[#3870db] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:+37369101912" className="text-sm hover:text-[#3870db] transition-colors block">
                    +373 69 10 19 12
                  </a>
                  <a href="tel:+37368501182" className="text-sm hover:text-[#3870db] transition-colors block">
                    +373 68 50 11 82
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
            <h3 className="text-white mb-4 text-[20px] font-semibold">{t.footer.availability}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400">{t.footer.availableBy}</span>
                <br />
                <span className="text-white">{t.footer.byPhoneOrEmail}</span>
              </li>
              <li className="pt-2">
                <span className="text-gray-400">{t.footer.bookingInfo}</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/mdrute" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3870db] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://wa.me/37368501182" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3870db] transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} RUTEMD. {t.footer.allRights}
          </p>
        </div>
      </div>
    </footer>
  );
}